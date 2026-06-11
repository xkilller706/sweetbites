-- ================================================
-- Migración: Agregar Estado Activo/Inactivo a Recetas
-- Archivo: 002_add_recipe_active_status.sql
-- Descripción: Agrega columna 'activo' (BOOLEAN) para que el admin
--              pueda activar/desactivar recetas
-- ================================================

USE sweetbites_db;

-- Verificar si la columna ya existe (evitar error si se ejecuta 2 veces)
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
    'SELECT "La columna activo ya existe en la tabla recipes" AS mensaje'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Establecer todas las recetas existentes como activas por defecto
UPDATE recipes
SET activo = TRUE
WHERE activo IS NULL;

-- Verificación: Mostrar estadísticas de recetas
SELECT
    estado,
    activo,
    COUNT(*) as cantidad
FROM recipes
GROUP BY estado, activo;

-- Mensaje de confirmación
SELECT 'Migración 002 completada: Columna "activo" agregada exitosamente' AS mensaje;
