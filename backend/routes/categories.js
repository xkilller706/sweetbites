const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// ========== RUTAS PÚBLICAS ==========

// GET /api/categories - Listar todas las categorías (público)
router.get('/', async (req, res) => {
    try {
        const [categories] = await db.execute(`
            SELECT
                c.id, c.nombre, c.descripcion, c.icono, c.color, c.fecha_creacion,
                COUNT(r.id) as total_recetas
            FROM categories c
            LEFT JOIN recipes r ON c.id = r.categoria_id AND r.estado = 'publicada'
            GROUP BY c.id
            ORDER BY c.nombre ASC
        `);

        res.json({
            success: true,
            categories
        });

    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener categorías'
        });
    }
});

// GET /api/categories/:id - Obtener una categoría específica
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [categories] = await db.execute(`
            SELECT
                c.id, c.nombre, c.descripcion, c.icono, c.color, c.fecha_creacion,
                COUNT(r.id) as total_recetas
            FROM categories c
            LEFT JOIN recipes r ON c.id = r.categoria_id AND r.estado = 'publicada'
            WHERE c.id = ?
            GROUP BY c.id
        `, [id]);

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        res.json({
            success: true,
            category: categories[0]
        });

    } catch (error) {
        console.error('Error al obtener categoría:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener categoría'
        });
    }
});

// ========== RUTAS DE ADMINISTRADOR ==========

// POST /api/categories - Crear nueva categoría (solo admin)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { nombre, descripcion, icono, color } = req.body;

        // Validar campos obligatorios
        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de la categoría es obligatorio'
            });
        }

        // Validar formato de color hex
        if (color && !/^#[0-9A-F]{6}$/i.test(color)) {
            return res.status(400).json({
                success: false,
                message: 'El color debe estar en formato hexadecimal (#RRGGBB)'
            });
        }

        // Verificar si la categoría ya existe
        const [existing] = await db.execute(
            'SELECT id FROM categories WHERE nombre = ?',
            [nombre]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una categoría con ese nombre'
            });
        }

        const [result] = await db.execute(
            'INSERT INTO categories (nombre, descripcion, icono, color, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
            [nombre, descripcion || null, icono || '🍰', color || '#6BD080']
        );

        res.status(201).json({
            success: true,
            message: 'Categoría creada exitosamente',
            categoryId: result.insertId
        });

    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear categoría'
        });
    }
});

// PUT /api/categories/:id - Actualizar categoría (solo admin)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, icono, color } = req.body;

        // Validar campos obligatorios
        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de la categoría es obligatorio'
            });
        }

        // Validar formato de color hex
        if (color && !/^#[0-9A-F]{6}$/i.test(color)) {
            return res.status(400).json({
                success: false,
                message: 'El color debe estar en formato hexadecimal (#RRGGBB)'
            });
        }

        // Verificar si existe otra categoría con el mismo nombre
        const [existing] = await db.execute(
            'SELECT id FROM categories WHERE nombre = ? AND id != ?',
            [nombre, id]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe otra categoría con ese nombre'
            });
        }

        await db.execute(
            'UPDATE categories SET nombre = ?, descripcion = ?, icono = ?, color = ? WHERE id = ?',
            [nombre, descripcion || null, icono || '🍰', color || '#6BD080', id]
        );

        res.json({
            success: true,
            message: 'Categoría actualizada exitosamente'
        });

    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar categoría'
        });
    }
});

// DELETE /api/categories/:id - Eliminar categoría (solo admin)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si hay recetas asociadas a esta categoría
        const [recipes] = await db.execute(
            'SELECT COUNT(*) as total FROM recipes WHERE categoria_id = ?',
            [id]
        );

        if (recipes[0].total > 0) {
            return res.status(400).json({
                success: false,
                message: `No se puede eliminar la categoría porque tiene ${recipes[0].total} receta(s) asociada(s)`
            });
        }

        await db.execute('DELETE FROM categories WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Categoría eliminada exitosamente'
        });

    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar categoría'
        });
    }
});

module.exports = router;
