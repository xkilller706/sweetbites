-- =====================================================
-- SCRIPT DE REPARACIÓN: Recetas Destacadas
-- Ejecutar este script para asegurar que las recetas destacadas funcionen
-- =====================================================

USE sweetbites_db;

-- 1. Verificar que la tabla categories existe con los campos necesarios
SELECT 'Verificando tabla categories...' as paso;
DESCRIBE categories;

-- 2. Verificar que existen categorías con iconos
SELECT 'Categorías existentes:' as paso;
SELECT id, nombre, icono, color FROM categories;

-- 3. Verificar que la columna destacada existe en recipes
SELECT 'Verificando columna destacada en recipes...' as paso;
SHOW COLUMNS FROM recipes LIKE 'destacada';

-- 4. Si la columna destacada NO existe, agregarla
-- (Descomentar la siguiente línea si es necesario)
-- ALTER TABLE recipes ADD COLUMN IF NOT EXISTS destacada BOOLEAN DEFAULT FALSE COMMENT 'Marca si la receta es destacada';

-- 5. Verificar recetas existentes
SELECT 'Recetas existentes:' as paso;
SELECT id, nombre, estado, destacada FROM recipes LIMIT 10;

-- 6. Marcar las primeras 6 recetas publicadas como destacadas
SELECT 'Marcando recetas como destacadas...' as paso;
UPDATE recipes
SET destacada = TRUE
WHERE estado = 'publicada'
ORDER BY fecha_creacion DESC
LIMIT 6;

-- 7. Verificar recetas destacadas
SELECT 'Recetas destacadas después de la actualización:' as paso;
SELECT id, nombre, estado, destacada
FROM recipes
WHERE destacada = TRUE;

-- 8. Crear índice si no existe (para mejor performance)
-- CREATE INDEX IF NOT EXISTS idx_destacada ON recipes(destacada);

SELECT 'Script de reparación completado!' as resultado;
