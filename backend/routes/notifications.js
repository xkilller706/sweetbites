const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(verifyToken);

// GET /api/notifications - Obtener notificaciones del usuario
router.get('/', async (req, res) => {
    try {
        const [notifications] = await db.execute(`
            SELECT id, tipo, titulo, mensaje, enlace, leida, fecha_creacion
            FROM notifications
            WHERE usuario_id = ?
            ORDER BY fecha_creacion DESC
            LIMIT 50
        `, [req.user.id]);

        // Contar no leídas
        const [unreadCount] = await db.execute(`
            SELECT COUNT(*) as count
            FROM notifications
            WHERE usuario_id = ? AND leida = FALSE
        `, [req.user.id]);

        res.json({
            success: true,
            notifications,
            unreadCount: unreadCount[0].count
        });

    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener notificaciones'
        });
    }
});

// PUT /api/notifications/:id/read - Marcar notificación como leída
router.put('/:id/read', async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que la notificación pertenece al usuario
        const [notifications] = await db.execute(
            'SELECT usuario_id FROM notifications WHERE id = ?',
            [id]
        );

        if (notifications.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Notificación no encontrada'
            });
        }

        if (notifications[0].usuario_id !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para esta acción'
            });
        }

        await db.execute(
            'UPDATE notifications SET leida = TRUE WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            message: 'Notificación marcada como leída'
        });

    } catch (error) {
        console.error('Error al marcar notificación:', error);
        res.status(500).json({
            success: false,
            message: 'Error al marcar notificación'
        });
    }
});

// PUT /api/notifications/read-all - Marcar todas como leídas
router.put('/read-all', async (req, res) => {
    try {
        await db.execute(
            'UPDATE notifications SET leida = TRUE WHERE usuario_id = ?',
            [req.user.id]
        );

        res.json({
            success: true,
            message: 'Todas las notificaciones marcadas como leídas'
        });

    } catch (error) {
        console.error('Error al marcar notificaciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error al marcar notificaciones'
        });
    }
});

// DELETE /api/notifications/:id - Eliminar notificación
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que la notificación pertenece al usuario
        const [notifications] = await db.execute(
            'SELECT usuario_id FROM notifications WHERE id = ?',
            [id]
        );

        if (notifications.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Notificación no encontrada'
            });
        }

        if (notifications[0].usuario_id !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para esta acción'
            });
        }

        await db.execute('DELETE FROM notifications WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Notificación eliminada'
        });

    } catch (error) {
        console.error('Error al eliminar notificación:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar notificación'
        });
    }
});

// Función helper para crear notificaciones (usada por otros módulos)
async function createNotification(usuarioId, tipo, titulo, mensaje, enlace = null) {
    try {
        await db.execute(
            'INSERT INTO notifications (usuario_id, tipo, titulo, mensaje, enlace, fecha_creacion) VALUES (?, ?, ?, ?, ?, NOW())',
            [usuarioId, tipo, titulo, mensaje, enlace]
        );
        return true;
    } catch (error) {
        console.error('Error al crear notificación:', error);
        return false;
    }
}

module.exports = router;
module.exports.createNotification = createNotification;
