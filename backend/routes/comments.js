const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// GET /api/comments/:recipeId - Obtener comentarios de una receta (con respuestas y reacciones)
router.get('/:recipeId', async (req, res) => {
    try {
        const { recipeId } = req.params;

        // Obtener todos los comentarios (principales y respuestas)
        const [comments] = await db.execute(`
            SELECT
                c.id,
                c.comentario,
                c.fecha,
                c.parent_id,
                c.receta_id,
                c.usuario_id,
                u.nombre as usuario,
                u.foto_perfil,
                (SELECT COUNT(*) FROM comment_reactions WHERE comment_id = c.id AND tipo = 'like') as likes,
                (SELECT COUNT(*) FROM comment_reactions WHERE comment_id = c.id AND tipo = 'dislike') as dislikes
            FROM comments c
            JOIN users u ON c.usuario_id = u.id
            WHERE c.receta_id = ?
            ORDER BY c.fecha ASC
        `, [recipeId]);

        // Organizar comentarios en estructura de árbol
        const commentsMap = {};
        const rootComments = [];

        // Crear mapa de comentarios
        comments.forEach(comment => {
            comment.replies = [];
            commentsMap[comment.id] = comment;
        });

        // Organizar jerarquía
        comments.forEach(comment => {
            if (comment.parent_id === null) {
                rootComments.push(comment);
            } else if (commentsMap[comment.parent_id]) {
                commentsMap[comment.parent_id].replies.push(comment);
            }
        });

        res.json({
            success: true,
            comments: rootComments
        });

    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener comentarios'
        });
    }
});

// POST /api/comments/:recipeId - Agregar comentario
router.post('/:recipeId', verifyToken, async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { comentario, parent_id = null } = req.body;

        if (!comentario || comentario.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'El comentario no puede estar vacío'
            });
        }

        // Si es una respuesta, verificar que el comentario padre existe
        if (parent_id) {
            const [parentComment] = await db.execute(
                'SELECT id FROM comments WHERE id = ? AND receta_id = ?',
                [parent_id, recipeId]
            );

            if (parentComment.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Comentario padre no encontrado'
                });
            }
        }

        const [result] = await db.execute(
            'INSERT INTO comments (receta_id, usuario_id, comentario, parent_id, fecha) VALUES (?, ?, ?, ?, NOW())',
            [recipeId, req.user.id, comentario, parent_id]
        );

        // Obtener el comentario recién creado con datos del usuario
        const [newComment] = await db.execute(`
            SELECT
                c.id,
                c.comentario,
                c.fecha,
                c.parent_id,
                c.usuario_id,
                u.nombre as usuario,
                u.foto_perfil,
                0 as likes,
                0 as dislikes
            FROM comments c
            JOIN users u ON c.usuario_id = u.id
            WHERE c.id = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: parent_id ? 'Respuesta agregada exitosamente' : 'Comentario agregado exitosamente',
            comment: newComment[0]
        });

    } catch (error) {
        console.error('Error al agregar comentario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al agregar comentario'
        });
    }
});

// DELETE /api/comments/:id - Eliminar comentario
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que el comentario pertenece al usuario o que sea admin
        const [comments] = await db.execute(
            'SELECT usuario_id FROM comments WHERE id = ?',
            [id]
        );

        if (comments.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        if (comments[0].usuario_id !== req.user.id && req.user.rol !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este comentario'
            });
        }

        await db.execute('DELETE FROM comments WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Comentario eliminado exitosamente'
        });

    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar comentario'
        });
    }
});

// POST /api/comments/:commentId/react - Dar like o dislike a un comentario
router.post('/:commentId/react', verifyToken, async (req, res) => {
    try {
        const { commentId } = req.params;
        const { tipo } = req.body; // 'like' o 'dislike'

        // Validar tipo de reacción
        if (!['like', 'dislike'].includes(tipo)) {
            return res.status(400).json({
                success: false,
                message: 'Tipo de reacción inválido. Debe ser "like" o "dislike"'
            });
        }

        // Verificar si el comentario existe
        const [comment] = await db.execute(
            'SELECT id FROM comments WHERE id = ?',
            [commentId]
        );

        if (comment.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        // Verificar si ya reaccionó
        const [existing] = await db.execute(
            'SELECT id, tipo FROM comment_reactions WHERE comment_id = ? AND usuario_id = ?',
            [commentId, req.user.id]
        );

        if (existing.length > 0) {
            // Si ya reaccionó con el mismo tipo, eliminar la reacción
            if (existing[0].tipo === tipo) {
                await db.execute(
                    'DELETE FROM comment_reactions WHERE id = ?',
                    [existing[0].id]
                );

                return res.json({
                    success: true,
                    message: 'Reacción eliminada',
                    action: 'removed'
                });
            } else {
                // Si reaccionó diferente, actualizar
                await db.execute(
                    'UPDATE comment_reactions SET tipo = ?, fecha = NOW() WHERE id = ?',
                    [tipo, existing[0].id]
                );

                return res.json({
                    success: true,
                    message: 'Reacción actualizada',
                    action: 'updated',
                    tipo
                });
            }
        }

        // Crear nueva reacción
        await db.execute(
            'INSERT INTO comment_reactions (comment_id, usuario_id, tipo, fecha) VALUES (?, ?, ?, NOW())',
            [commentId, req.user.id, tipo]
        );

        res.status(201).json({
            success: true,
            message: 'Reacción agregada',
            action: 'added',
            tipo
        });

    } catch (error) {
        console.error('Error al reaccionar a comentario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al reaccionar a comentario'
        });
    }
});

// GET /api/comments/:commentId/my-reaction - Obtener mi reacción a un comentario
router.get('/:commentId/my-reaction', verifyToken, async (req, res) => {
    try {
        const { commentId } = req.params;

        const [reaction] = await db.execute(
            'SELECT tipo FROM comment_reactions WHERE comment_id = ? AND usuario_id = ?',
            [commentId, req.user.id]
        );

        res.json({
            success: true,
            reaction: reaction.length > 0 ? reaction[0].tipo : null
        });

    } catch (error) {
        console.error('Error al obtener reacción:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener reacción'
        });
    }
});

// POST /api/comments/rate/:recipeId - Valorar receta
router.post('/rate/:recipeId', verifyToken, async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { puntuacion } = req.body;

        if (!puntuacion || puntuacion < 1 || puntuacion > 5) {
            return res.status(400).json({
                success: false,
                message: 'La puntuación debe ser entre 1 y 5'
            });
        }

        // Verificar si ya valoró esta receta
        const [existing] = await db.execute(
            'SELECT id FROM ratings WHERE receta_id = ? AND usuario_id = ?',
            [recipeId, req.user.id]
        );

        if (existing.length > 0) {
            // Actualizar valoración existente
            await db.execute(
                'UPDATE ratings SET puntuacion = ? WHERE id = ?',
                [puntuacion, existing[0].id]
            );
        } else {
            // Crear nueva valoración
            await db.execute(
                'INSERT INTO ratings (receta_id, usuario_id, puntuacion, fecha) VALUES (?, ?, ?, NOW())',
                [recipeId, req.user.id, puntuacion]
            );
        }

        res.json({
            success: true,
            message: 'Valoración registrada exitosamente'
        });

    } catch (error) {
        console.error('Error al valorar receta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al valorar receta'
        });
    }
});

module.exports = router;
