const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// POST /api/auth/register - Registrar nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password, telefono } = req.body;

        // Validar campos obligatorios
        if (!nombre || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, email y contraseña son obligatorios'
            });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Formato de email inválido'
            });
        }

        // Validar contraseña (mínimo 8 caracteres + complejidad)
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña debe tener mínimo 8 caracteres'
            });
        }

        // Validar complejidad de contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña debe contener al menos: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (@$!%*?&)'
            });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Verificar si el email ya existe
        const [existingUser] = await db.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El email ya está registrado'
            });
        }

        // Insertar nuevo usuario
        const [result] = await db.execute(
            'INSERT INTO users (nombre, email, password_hash, telefono, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, NOW())',
            [nombre, email, hashedPassword, telefono || null, 'usuario']
        );

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario'
        });
    }
});

// POST /api/auth/login - Iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar campos
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y contraseña son obligatorios'
            });
        }

        // Buscar usuario por email
        const [users] = await db.execute(
            'SELECT id, nombre, email, password_hash, rol, foto_perfil, bio, plan, fecha_registro FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        const user = users[0];

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                rol: user.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                foto_perfil: user.foto_perfil,
                bio: user.bio,
                plan: user.plan,
                fecha_registro: user.fecha_registro
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión'
        });
    }
});

// GET /api/auth/profile - Obtener perfil del usuario autenticado
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const [users] = await db.execute(
            'SELECT id, nombre, email, telefono, rol, foto_perfil, fecha_registro FROM users WHERE id = ?',
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil'
        });
    }
});

// PUT /api/auth/profile - Actualizar perfil
router.put('/profile', verifyToken, async (req, res) => {
    try {
        const { nombre, telefono, plan, bio, foto_perfil } = req.body;

        // Construir query dinámicamente según los campos enviados
        const updates = [];
        const values = [];

        if (nombre !== undefined) {
            updates.push('nombre = ?');
            values.push(nombre);
        }
        if (telefono !== undefined) {
            updates.push('telefono = ?');
            values.push(telefono || null); // Convertir '' a null
        }
        if (plan !== undefined) {
            updates.push('plan = ?');
            values.push(plan);
        }
        if (bio !== undefined) {
            updates.push('bio = ?');
            values.push(bio || null); // Convertir '' a null
        }
        if (foto_perfil !== undefined) {
            updates.push('foto_perfil = ?');
            values.push(foto_perfil || null);
        }

        // Si no hay nada que actualizar
        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No hay campos para actualizar'
            });
        }

        values.push(req.user.id);

        await db.execute(
            `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        // Si se actualizó a premium, agregar fecha
        if (plan === 'premium') {
            await db.execute(
                'UPDATE users SET fecha_premium = NOW() WHERE id = ?',
                [req.user.id]
            );
        }

        res.json({
            success: true,
            message: 'Perfil actualizado exitosamente'
        });

    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar perfil'
        });
    }
});

module.exports = router;
