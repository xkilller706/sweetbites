-- ================================================
-- Migración: Sistema de Comentarios Interactivos
-- Archivo: 003_add_comment_features.sql
-- Descripción:
--   1. Agrega columna 'parent_id' para respuestas anidadas
--   2. Crea tabla 'comment_reactions' para likes/dislikes
-- ================================================

USE sweetbites_db;

-- ========================================
-- PARTE 1: Respuestas Anidadas
-- ========================================

-- Verificar si parent_id ya existe
SET @parent_column_exists = (
    SELECT COUNT(*)
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = 'sweetbites_db'
    AND TABLE_NAME = 'comments'
    AND COLUMN_NAME = 'parent_id'
);

-- Agregar columna parent_id solo si NO existe
SET @sql_parent = IF(
    @parent_column_exists = 0,
    'ALTER TABLE comments ADD COLUMN parent_id INT DEFAULT NULL AFTER receta_id',
    'SELECT "La columna parent_id ya existe en comments" AS mensaje'
);

PREPARE stmt1 FROM @sql_parent;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;

-- Agregar foreign key para parent_id (solo si la columna se creó)
SET @fk_exists = (
    SELECT COUNT(*)
    FROM information_schema.TABLE_CONSTRAINTS
    WHERE CONSTRAINT_SCHEMA = 'sweetbites_db'
    AND TABLE_NAME = 'comments'
    AND CONSTRAINT_NAME = 'comments_ibfk_parent'
);

SET @sql_fk = IF(
    @fk_exists = 0 AND @parent_column_exists = 0,
    'ALTER TABLE comments ADD CONSTRAINT comments_ibfk_parent FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE',
    'SELECT "La foreign key para parent_id ya existe o no fue necesaria" AS mensaje'
);

PREPARE stmt2 FROM @sql_fk;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;

-- ========================================
-- PARTE 2: Tabla de Reacciones (Like/Dislike)
-- ========================================

-- Crear tabla comment_reactions si NO existe
CREATE TABLE IF NOT EXISTS comment_reactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo ENUM('like', 'dislike') NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Foreign keys
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,

    -- Un usuario solo puede dar 1 reacción por comentario
    UNIQUE KEY unique_reaction (comment_id, usuario_id),

    -- Índices para mejorar performance
    INDEX idx_comment (comment_id),
    INDEX idx_user (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================
-- VERIFICACIÓN Y ESTADÍSTICAS
-- ========================================

-- Verificar estructura de comments
SELECT
    'comments' as tabla,
    COUNT(*) as total_comentarios,
    SUM(CASE WHEN parent_id IS NULL THEN 1 ELSE 0 END) as comentarios_principales,
    SUM(CASE WHEN parent_id IS NOT NULL THEN 1 ELSE 0 END) as respuestas
FROM comments;

-- Verificar tabla comment_reactions
SELECT
    'comment_reactions' as tabla,
    COUNT(*) as total_reacciones,
    SUM(CASE WHEN tipo = 'like' THEN 1 ELSE 0 END) as likes,
    SUM(CASE WHEN tipo = 'dislike' THEN 1 ELSE 0 END) as dislikes
FROM comment_reactions;

-- Mensaje de confirmación
SELECT 'Migración 003 completada: Sistema de comentarios interactivos habilitado' AS mensaje;
