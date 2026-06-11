-- ========================================================================
-- MIGRACIONES SWEETBITES - EJECUTAR TODO JUNTO
-- ========================================================================
-- INSTRUCCIONES:
-- 1. Abre phpMyAdmin: http://localhost/phpmyadmin
-- 2. Selecciona la base de datos: sweetbites_db
-- 3. Ve a la pestaña "SQL"
-- 4. Copia TODO este archivo y pégalo
-- 5. Haz clic en "Continuar" o "Go"
-- ========================================================================

USE sweetbites_db;

-- ========================================================================
-- MIGRACIÓN 1: ELIMINAR ROL "EDITOR"
-- ========================================================================

-- Paso 1: Actualizar usuarios existentes con rol 'editor' a 'usuario'
UPDATE users
SET rol = 'usuario'
WHERE rol = 'editor';

-- Paso 2: Modificar la columna para eliminar 'editor' del ENUM
ALTER TABLE users
MODIFY COLUMN rol ENUM('usuario', 'admin') DEFAULT 'usuario';

-- Verificación
SELECT
    'MIGRACIÓN 1 COMPLETADA' as estado,
    rol,
    COUNT(*) as cantidad
FROM users
GROUP BY rol;

-- ========================================================================
-- MIGRACIÓN 2: AGREGAR ESTADO ACTIVO/INACTIVO A RECETAS
-- ========================================================================

-- Verificar si la columna ya existe
SET @column_exists = (
    SELECT COUNT(*)
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = 'sweetbites_db'
    AND TABLE_NAME = 'recipes'
    AND COLUMN_NAME = 'activo'
);

-- Agregar columna 'activo' solo si NO existe
SET @sql = IF(
    @column_exists = 0,
    'ALTER TABLE recipes ADD COLUMN activo BOOLEAN DEFAULT TRUE AFTER estado',
    'SELECT "La columna activo ya existe" AS mensaje'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Establecer todas las recetas existentes como activas
UPDATE recipes
SET activo = TRUE
WHERE activo IS NULL;

-- Verificación
SELECT
    'MIGRACIÓN 2 COMPLETADA' as estado,
    estado,
    activo,
    COUNT(*) as cantidad
FROM recipes
GROUP BY estado, activo;

-- ========================================================================
-- MIGRACIÓN 3: SISTEMA DE COMENTARIOS INTERACTIVOS
-- ========================================================================

-- PARTE A: Respuestas Anidadas (parent_id)
-- ----------------------------------------

-- Verificar si parent_id ya existe
SET @parent_column_exists = (
    SELECT COUNT(*)
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = 'sweetbites_db'
    AND TABLE_NAME = 'comments'
    AND COLUMN_NAME = 'parent_id'
);

-- Agregar columna parent_id
SET @sql_parent = IF(
    @parent_column_exists = 0,
    'ALTER TABLE comments ADD COLUMN parent_id INT DEFAULT NULL AFTER receta_id',
    'SELECT "La columna parent_id ya existe" AS mensaje'
);

PREPARE stmt1 FROM @sql_parent;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;

-- Agregar foreign key para parent_id (solo si no existe)
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
    'SELECT "La foreign key ya existe o no fue necesaria" AS mensaje'
);

PREPARE stmt2 FROM @sql_fk;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;

-- PARTE B: Tabla de Reacciones (Like/Dislike)
-- --------------------------------------------

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

-- Verificación de comentarios
SELECT
    'MIGRACIÓN 3 COMPLETADA - Comentarios' as estado,
    COUNT(*) as total_comentarios,
    SUM(CASE WHEN parent_id IS NULL THEN 1 ELSE 0 END) as comentarios_principales,
    SUM(CASE WHEN parent_id IS NOT NULL THEN 1 ELSE 0 END) as respuestas
FROM comments;

-- Verificación de reacciones
SELECT
    'MIGRACIÓN 3 COMPLETADA - Reacciones' as estado,
    COUNT(*) as total_reacciones,
    SUM(CASE WHEN tipo = 'like' THEN 1 ELSE 0 END) as likes,
    SUM(CASE WHEN tipo = 'dislike' THEN 1 ELSE 0 END) as dislikes
FROM comment_reactions;

-- ========================================================================
-- RESUMEN FINAL
-- ========================================================================

SELECT '========================================' as '';
SELECT '✅ TODAS LAS MIGRACIONES COMPLETADAS' as ESTADO;
SELECT '========================================' as '';

-- Verificar roles de usuarios
SELECT 'Usuarios por rol:' as VERIFICACION;
SELECT rol, COUNT(*) as cantidad FROM users GROUP BY rol;

-- Verificar estado de recetas
SELECT 'Recetas por estado:' as VERIFICACION;
SELECT
    CONCAT(estado, ' - ', IF(activo, 'Activa', 'Inactiva')) as estado_completo,
    COUNT(*) as cantidad
FROM recipes
GROUP BY estado, activo;

-- Verificar estructura de comentarios
SELECT 'Estructura de comentarios:' as VERIFICACION;
SELECT
    CASE
        WHEN parent_id IS NULL THEN 'Comentario principal'
        ELSE 'Respuesta'
    END as tipo,
    COUNT(*) as cantidad
FROM comments
GROUP BY parent_id IS NULL;

-- Verificar tabla de reacciones
SELECT 'Tabla de reacciones creada:' as VERIFICACION;
SELECT
    CASE
        WHEN COUNT(*) >= 0 THEN 'Tabla comment_reactions creada correctamente'
    END as estado
FROM comment_reactions;

SELECT '========================================' as '';
SELECT '🎉 LISTO PARA USAR LA APLICACIÓN' as MENSAJE;
SELECT '========================================' as '';
