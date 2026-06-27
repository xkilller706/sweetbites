const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken, verifyEditor } = require('../middleware/auth');
const upload = require('../config/multer');

// Middleware para verificar límites de plan
const checkRecipeLimits = async (req, res, next) => {
    try {
        const [users] = await db.execute(
            'SELECT plan FROM users WHERE id = ?',
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        if (users[0].plan === 'gratis') {
            // Contar recetas del usuario
            const [recipes] = await db.execute(
                'SELECT COUNT(*) as count FROM recipes WHERE autor_id = ?',
                [req.user.id]
            );

            if (recipes[0].count >= 5) {
                return res.status(403).json({
                    success: false,
                    message: 'Los usuarios gratis pueden crear máximo 5 recetas. Actualiza a Premium para recetas ilimitadas.'
                });
            }
        }

        next();
    } catch (error) {
        console.error('Error verificando límites de plan:', error);
        // En caso de error, permitir continuar (fail open)
        next();
    }
};

// POST /api/recipes/upload-image - Subir imagen de receta
router.post('/upload-image', verifyToken, upload.single('imagen'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No se subió ningún archivo'
            });
        }

        // Construir URL de la imagen
        const imageUrl = `/uploads/recipes/${req.file.filename}`;

        res.json({
            success: true,
            message: 'Imagen subida exitosamente',
            imageUrl: imageUrl,
            filename: req.file.filename
        });

    } catch (error) {
        console.error('Error al subir imagen:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error al subir la imagen'
        });
    }
});

// GET /api/recipes - Listar todas las recetas
router.get('/', async (req, res) => {
    try {
        const [recipes] = await db.execute(`
            SELECT
                r.id, r.nombre, r.descripcion, r.categoria_id,
                c.nombre as categoria_nombre,
                c.icono as categoria_icono,
                c.color as categoria_color,
                r.dificultad, r.tiempo_preparacion, r.porciones, r.foto_principal,
                r.fecha_creacion, u.nombre as autor,
                COALESCE(AVG(rat.puntuacion), 0) as calificacion_promedio,
                COUNT(DISTINCT rat.id) as total_valoraciones,
                COUNT(DISTINCT f.id) as total_favoritos
            FROM recipes r
            LEFT JOIN categories c ON r.categoria_id = c.id
            LEFT JOIN users u ON r.autor_id = u.id
            LEFT JOIN ratings rat ON r.id = rat.receta_id
            LEFT JOIN favorites f ON r.id = f.receta_id
            WHERE r.estado = 'publicada'
            GROUP BY r.id
            ORDER BY r.fecha_creacion DESC
        `);

        res.json({
            success: true,
            recipes
        });

    } catch (error) {
        console.error('Error al obtener recetas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener recetas'
        });
    }
});

// GET /api/recipes/search?q= - Buscar recetas
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'El parámetro de búsqueda es requerido'
            });
        }

        const [recipes] = await db.execute(`
            SELECT
                r.id, r.nombre, r.descripcion, r.categoria_id,
                c.nombre as categoria_nombre,
                c.icono as categoria_icono,
                c.color as categoria_color,
                r.dificultad, r.tiempo_preparacion, r.porciones, r.foto_principal,
                COALESCE(AVG(rat.puntuacion), 0) as calificacion_promedio,
                COUNT(DISTINCT rat.id) as total_valoraciones,
                COUNT(DISTINCT f.id) as total_favoritos
            FROM recipes r
            LEFT JOIN categories c ON r.categoria_id = c.id
            LEFT JOIN ratings rat ON r.id = rat.receta_id
            LEFT JOIN favorites f ON r.id = f.receta_id
            WHERE r.estado = 'publicada'
            AND (r.nombre LIKE ? OR r.descripcion LIKE ? OR c.nombre LIKE ?)
            GROUP BY r.id
        `, [`%${q}%`, `%${q}%`, `%${q}%`]);

        res.json({
            success: true,
            recipes
        });

    } catch (error) {
        console.error('Error en búsqueda:', error);
        res.status(500).json({
            success: false,
            message: 'Error en la búsqueda'
        });
    }
});

// GET /api/recipes/filter - Filtrar recetas
router.get('/filter', async (req, res) => {
    try {
        const { categoria, dificultad, tiempo } = req.query;

        let query = `
            SELECT
                r.id, r.nombre, r.descripcion, r.categoria_id, c.nombre as categoria,
                r.dificultad, r.tiempo_preparacion, r.porciones, r.foto_principal,
                COALESCE(AVG(rat.puntuacion), 0) as calificacion_promedio
            FROM recipes r
            LEFT JOIN categories c ON r.categoria_id = c.id
            LEFT JOIN ratings rat ON r.id = rat.receta_id
            WHERE r.estado = 'publicada'
        `;

        const params = [];

        if (categoria) {
            query += ' AND r.categoria_id = ?';
            params.push(categoria);
        }

        if (dificultad) {
            query += ' AND r.dificultad = ?';
            params.push(dificultad);
        }

        if (tiempo) {
            if (tiempo === 'rapido') {
                query += ' AND r.tiempo_preparacion <= 30';
            } else if (tiempo === 'medio') {
                query += ' AND r.tiempo_preparacion > 30 AND r.tiempo_preparacion <= 60';
            } else if (tiempo === 'largo') {
                query += ' AND r.tiempo_preparacion > 60';
            }
        }

        query += ' GROUP BY r.id ORDER BY r.fecha_creacion DESC';

        const [recipes] = await db.execute(query, params);

        res.json({
            success: true,
            recipes
        });

    } catch (error) {
        console.error('Error al filtrar:', error);
        res.status(500).json({
            success: false,
            message: 'Error al filtrar recetas'
        });
    }
});

// GET /api/recipes/my-recipes - Obtener recetas del usuario autenticado
router.get('/my-recipes', verifyToken, async (req, res) => {
    try {
        const [recipes] = await db.execute(`
            SELECT
                r.id, r.nombre, r.descripcion, r.categoria_id, r.dificultad,
                r.tiempo_preparacion, r.porciones, r.foto_principal,
                r.estado, r.estado_rechazo, r.fecha_creacion,
                c.nombre as categoria_nombre, c.color as categoria_color,
                COALESCE(AVG(rat.puntuacion), 0) as calificacion_promedio,
                COUNT(DISTINCT com.id) as total_comentarios
            FROM recipes r
            LEFT JOIN categories c ON r.categoria_id = c.id
            LEFT JOIN ratings rat ON r.id = rat.receta_id
            LEFT JOIN comments com ON r.id = com.receta_id
            WHERE r.autor_id = ?
            GROUP BY r.id
            ORDER BY r.fecha_creacion DESC
        `, [req.user.id]);

        res.json({
            success: true,
            recipes
        });

    } catch (error) {
        console.error('Error al obtener mis recetas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener tus recetas'
        });
    }
});

// GET /api/recipes/featured - Obtener recetas destacadas
router.get('/featured', async (req, res) => {
    try {
        const [recipes] = await db.execute(`
            SELECT
                r.id, r.nombre, r.descripcion, r.categoria_id,
                c.nombre as categoria_nombre,
                c.icono as categoria_icono,
                c.color as categoria_color,
                r.dificultad, r.tiempo_preparacion, r.porciones, r.foto_principal,
                r.destacada, r.temporada, r.dieta_especial,
                COALESCE(AVG(rat.puntuacion), 0) as calificacion_promedio,
                COUNT(DISTINCT rat.id) as total_valoraciones,
                COUNT(DISTINCT f.id) as total_favoritos
            FROM recipes r
            LEFT JOIN categories c ON r.categoria_id = c.id
            LEFT JOIN ratings rat ON r.id = rat.receta_id
            LEFT JOIN favorites f ON r.id = f.receta_id
            WHERE r.estado = 'publicada' AND r.destacada = TRUE
            GROUP BY r.id
            ORDER BY r.fecha_creacion DESC
            LIMIT 6
        `);

        res.json({
            success: true,
            recipes
        });
    } catch (error) {
        console.error('Error al obtener recetas destacadas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener recetas destacadas'
        });
    }
});

// GET /api/recipes/week - Obtener receta de la semana
router.get('/week', async (req, res) => {
    try {
        const [recipes] = await db.execute(`
            SELECT
                r.*, c.nombre as categoria, c.icono as categoria_icono,
                u.nombre as autor,
                COALESCE(AVG(rat.puntuacion), 0) as calificacion_promedio,
                COUNT(DISTINCT rat.id) as total_valoraciones,
                COUNT(DISTINCT f.id) as total_favoritos
            FROM recipes r
            LEFT JOIN categories c ON r.categoria_id = c.id
            LEFT JOIN users u ON r.autor_id = u.id
            LEFT JOIN ratings rat ON r.id = rat.receta_id
            LEFT JOIN favorites f ON r.id = f.receta_id
            WHERE r.estado = 'publicada' AND r.receta_semana = TRUE
            GROUP BY r.id
            ORDER BY r.fecha_creacion DESC
            LIMIT 1
        `);

        if (recipes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No hay receta de la semana configurada'
            });
        }

        res.json({
            success: true,
            recipe: recipes[0]
        });
    } catch (error) {
        console.error('Error al obtener receta de la semana:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener receta de la semana'
        });
    }
});

// GET /api/recipes/seasonal?season=verano - Obtener recetas por temporada
router.get('/seasonal', async (req, res) => {
    try {
        const { season } = req.query;

        if (!season) {
            return res.status(400).json({
                success: false,
                message: 'El parámetro season es requerido'
            });
        }

        const validSeasons = ['verano', 'otoño', 'invierno', 'primavera', 'todas'];
        if (!validSeasons.includes(season)) {
            return res.status(400).json({
                success: false,
                message: 'Temporada inválida'
            });
        }

        const [recipes] = await db.execute(`
            SELECT
                r.id, r.nombre, r.descripcion, r.categoria_id, c.nombre as categoria,
                r.dificultad, r.tiempo_preparacion, r.porciones, r.foto_principal,
                r.temporada, r.dieta_especial,
                COALESCE(AVG(rat.puntuacion), 0) as calificacion_promedio,
                COUNT(DISTINCT f.id) as total_favoritos
            FROM recipes r
            LEFT JOIN categories c ON r.categoria_id = c.id
            LEFT JOIN ratings rat ON r.id = rat.receta_id
            LEFT JOIN favorites f ON r.id = f.receta_id
            WHERE r.estado = 'publicada' AND (r.temporada = ? OR r.temporada = 'todas')
            GROUP BY r.id
            ORDER BY r.fecha_creacion DESC
        `, [season]);

        res.json({
            success: true,
            recipes
        });
    } catch (error) {
        console.error('Error al obtener recetas por temporada:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener recetas por temporada'
        });
    }
});

// GET /api/recipes/diet?type=sin_gluten - Obtener recetas por dieta especial
router.get('/diet', async (req, res) => {
    try {
        const { type } = req.query;

        if (!type) {
            return res.status(400).json({
                success: false,
                message: 'El parámetro type es requerido'
            });
        }

        const validDiets = ['sin_gluten', 'vegana', 'vegetariana', 'sin_lactosa', 'sin_azucar', 'ninguna'];
        if (!validDiets.includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Tipo de dieta inválida'
            });
        }

        const [recipes] = await db.execute(`
            SELECT
                r.id, r.nombre, r.descripcion, r.categoria_id, c.nombre as categoria,
                r.dificultad, r.tiempo_preparacion, r.porciones, r.foto_principal,
                r.temporada, r.dieta_especial,
                COALESCE(AVG(rat.puntuacion), 0) as calificacion_promedio,
                COUNT(DISTINCT f.id) as total_favoritos
            FROM recipes r
            LEFT JOIN categories c ON r.categoria_id = c.id
            LEFT JOIN ratings rat ON r.id = rat.receta_id
            LEFT JOIN favorites f ON r.id = f.receta_id
            WHERE r.estado = 'publicada' AND r.dieta_especial = ?
            GROUP BY r.id
            ORDER BY r.fecha_creacion DESC
        `, [type]);

        res.json({
            success: true,
            recipes
        });
    } catch (error) {
        console.error('Error al obtener recetas por dieta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener recetas por dieta'
        });
    }
});

// GET /api/recipes/:id - Detalle completo de una receta
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener datos de la receta
        const [recipes] = await db.execute(`
            SELECT
                r.*,
                c.nombre as categoria_nombre,
                c.icono as categoria_icono,
                c.color as categoria_color,
                u.nombre as autor,
                COALESCE(AVG(rat.puntuacion), 0) as calificacion_promedio,
                COUNT(DISTINCT rat.id) as total_valoraciones
            FROM recipes r
            LEFT JOIN categories c ON r.categoria_id = c.id
            LEFT JOIN users u ON r.autor_id = u.id
            LEFT JOIN ratings rat ON r.id = rat.receta_id
            WHERE r.id = ?
            GROUP BY r.id
        `, [id]);

        if (recipes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Receta no encontrada'
            });
        }

        // Obtener ingredientes
        const [ingredients] = await db.execute(
            'SELECT * FROM ingredients WHERE receta_id = ? ORDER BY id',
            [id]
        );

        // Obtener pasos
        const [steps] = await db.execute(
            'SELECT * FROM steps WHERE receta_id = ? ORDER BY numero_paso',
            [id]
        );

        res.json({
            success: true,
            recipe: {
                ...recipes[0],
                ingredients,
                steps
            }
        });

    } catch (error) {
        console.error('Error al obtener receta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener receta'
        });
    }
});

// POST /api/recipes - Crear nueva receta (todos los usuarios autenticados)
router.post('/', verifyToken, checkRecipeLimits, async (req, res) => {
    try {
        const {
            nombre, descripcion, categoria_id, dificultad,
            tiempo_preparacion, porciones, foto_principal,
            ingredients, steps
        } = req.body;

        // Validar campos obligatorios
        if (!nombre || !descripcion || !categoria_id || !dificultad || !tiempo_preparacion || !porciones) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios'
            });
        }

        // Determinar estado inicial según rol del usuario
        let estado = 'pendiente'; // Por defecto, pendiente de aprobación
        if (req.user.rol === 'admin' || req.user.rol === 'editor') {
            estado = 'publicada'; // Admin y editores publican directamente
        }

        // Insertar receta (foto_principal puede ser null si no se proporciona)
        const [result] = await db.execute(
            `INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad,
             tiempo_preparacion, porciones, foto_principal, autor_id, estado, fecha_creacion)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [nombre, descripcion, categoria_id, dificultad, tiempo_preparacion,
             porciones, foto_principal || null, req.user.id, estado]
        );

        const recetaId = result.insertId;

        // Insertar ingredientes
        if (ingredients && ingredients.length > 0) {
            for (const ing of ingredients) {
                await db.execute(
                    'INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES (?, ?, ?, ?)',
                    [recetaId, ing.nombre, ing.cantidad, ing.unidad]
                );
            }
        }

        // Insertar pasos
        if (steps && steps.length > 0) {
            for (const step of steps) {
                await db.execute(
                    'INSERT INTO steps (receta_id, numero_paso, descripcion, foto) VALUES (?, ?, ?, ?)',
                    [recetaId, step.numero_paso, step.descripcion, step.foto || null]
                );
            }
        }

        const mensaje = estado === 'pendiente'
            ? 'Receta enviada exitosamente. Está pendiente de aprobación por un administrador.'
            : 'Receta publicada exitosamente';

        res.status(201).json({
            success: true,
            message: mensaje,
            recetaId,
            estado
        });

    } catch (error) {
        console.error('Error al crear receta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear receta'
        });
    }
});

// PUT /api/recipes/:id - Actualizar receta
router.put('/:id', verifyToken, verifyEditor, async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones } = req.body;

        await db.execute(
            `UPDATE recipes SET nombre = ?, descripcion = ?, categoria_id = ?,
             dificultad = ?, tiempo_preparacion = ?, porciones = ? WHERE id = ?`,
            [nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, id]
        );

        res.json({
            success: true,
            message: 'Receta actualizada exitosamente'
        });

    } catch (error) {
        console.error('Error al actualizar receta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar receta'
        });
    }
});

// DELETE /api/recipes/:id - Eliminar receta (solo admin)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si es admin
        if (req.user.rol !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Solo administradores pueden eliminar recetas'
            });
        }

        await db.execute('DELETE FROM recipes WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Receta eliminada exitosamente'
        });

    } catch (error) {
        console.error('Error al eliminar receta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar receta'
        });
    }
});

module.exports = router;
