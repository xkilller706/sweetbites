-- =====================================================
-- SCRIPT: Agregar Campos para Recetas Especiales
-- =====================================================
-- Fecha: Mayo 2026
-- Propósito: Agregar campos para recetas destacadas,
--            de la semana, por temporada y dietas especiales
-- =====================================================

USE sweetbites_db;

-- Agregar campos a la tabla recipes
ALTER TABLE recipes
ADD COLUMN IF NOT EXISTS destacada BOOLEAN DEFAULT FALSE COMMENT 'Marca si la receta es destacada',
ADD COLUMN IF NOT EXISTS receta_semana BOOLEAN DEFAULT FALSE COMMENT 'Marca si es la receta de la semana',
ADD COLUMN IF NOT EXISTS temporada ENUM('verano', 'otoño', 'invierno', 'primavera', 'todas') DEFAULT 'todas' COMMENT 'Temporada de la receta',
ADD COLUMN IF NOT EXISTS dieta_especial ENUM('sin_gluten', 'vegana', 'vegetariana', 'sin_lactosa', 'sin_azucar', 'ninguna') DEFAULT 'ninguna' COMMENT 'Dieta especial de la receta';

-- Crear índices para mejorar rendimiento de consultas
CREATE INDEX IF NOT EXISTS idx_destacada ON recipes(destacada);
CREATE INDEX IF NOT EXISTS idx_receta_semana ON recipes(receta_semana);
CREATE INDEX IF NOT EXISTS idx_temporada ON recipes(temporada);
CREATE INDEX IF NOT EXISTS idx_dieta_especial ON recipes(dieta_especial);

-- Marcar algunas recetas existentes como ejemplos (opcional)
-- Puedes modificar estos IDs según las recetas que tengas en tu base de datos

-- Marcar receta ID 1 como destacada
UPDATE recipes SET destacada = TRUE WHERE id = 1;

-- Marcar receta ID 2 como receta de la semana
UPDATE recipes SET receta_semana = TRUE WHERE id = 2;

-- Asignar temporadas a recetas (ejemplos)
UPDATE recipes SET temporada = 'verano' WHERE id IN (1, 2) AND estado = 'publicada';
UPDATE recipes SET temporada = 'invierno' WHERE id IN (3, 4) AND estado = 'publicada';

-- Asignar dietas especiales (ejemplos)
UPDATE recipes SET dieta_especial = 'vegana' WHERE id = 1 AND estado = 'publicada';
UPDATE recipes SET dieta_especial = 'sin_gluten' WHERE id = 2 AND estado = 'publicada';

-- Verificar cambios
SELECT '✅ Campos agregados exitosamente a la tabla recipes!' AS 'RESULTADO';

-- Mostrar estructura actualizada de la tabla
SHOW COLUMNS FROM recipes;

-- Mostrar recetas con los nuevos campos
SELECT id, nombre, destacada, receta_semana, temporada, dieta_especial, estado
FROM recipes
WHERE estado = 'publicada'
LIMIT 10;

-- =====================================================
-- INSTRUCCIONES DE USO:
-- =====================================================
-- 1. Abrir phpMyAdmin: http://localhost/phpmyadmin
-- 2. Seleccionar la base de datos: sweetbites_db
-- 3. Ir a la pestaña "SQL"
-- 4. Copiar TODO este archivo y pegarlo en el área de texto
-- 5. Hacer clic en el botón "Continuar" o "Go"
-- 6. Verificar el mensaje de éxito
-- 7. Reiniciar el servidor backend (Ctrl+C y luego npm run dev)
-- =====================================================
