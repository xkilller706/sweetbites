-- =====================================================
-- SCRIPT: Agregar Secciones a Ingredientes
-- =====================================================
-- Fecha: Mayo 2026
-- Propósito: Permitir agrupar ingredientes por secciones
--            (Ej: "Para la Base", "Para el Relleno", etc.)
-- =====================================================

USE sweetbites_db;

-- Agregar columna 'seccion' a la tabla ingredients
ALTER TABLE ingredients
ADD COLUMN seccion VARCHAR(100) DEFAULT NULL COMMENT 'Sección del ingrediente (ej: Para la Base, Para el Relleno)';

-- Verificar que se agregó correctamente
SELECT '✅ Campo seccion agregado a la tabla ingredients!' AS 'RESULTADO';

-- Mostrar estructura actualizada
SHOW COLUMNS FROM ingredients;

-- Ejemplo de cómo se usaría:
-- Ingredientes con secciones para una receta de ejemplo
-- (Esto es solo para mostrar cómo funciona, puedes comentarlo si no quieres datos de ejemplo)

/*
-- Ejemplo: Tarta de Limón con Merengue
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad, seccion) VALUES
-- Sección 1: Base
(1, 'harina de trigo común', 200, 'gramos', 'Para la Base'),
(1, 'mantequilla fría (en cubitos)', 100, 'gramos', 'Para la Base'),
(1, 'azúcar glass', 50, 'gramos', 'Para la Base'),
(1, 'huevo', 1, 'unidad', 'Para la Base'),
(1, 'sal', 1, 'pizca', 'Para la Base'),

-- Sección 2: Relleno
(1, 'jugo de limón', 150, 'ml', 'Para el Relleno de Limón'),
(1, 'ralladura de 2 limones', 1, 'unidad', 'Para el Relleno de Limón'),
(1, 'azúcar blanca', 150, 'gramos', 'Para el Relleno de Limón'),
(1, 'yemas de huevo', 4, 'unidades', 'Para el Relleno de Limón'),
(1, 'fécula de maíz (Maicena)', 35, 'gramos', 'Para el Relleno de Limón'),
(1, 'agua', 150, 'ml', 'Para el Relleno de Limón'),
(1, 'mantequilla (a temperatura ambiente)', 40, 'gramos', 'Para el Relleno de Limón'),

-- Sección 3: Merengue
(1, 'claras de huevo', 4, 'unidades', 'Para el Merengue'),
(1, 'azúcar blanca', 240, 'gramos', 'Para el Merengue'),
(1, 'agua (para el almíbar)', 80, 'ml', 'Para el Merengue');
*/

-- =====================================================
-- INSTRUCCIONES DE USO:
-- =====================================================
-- 1. Abrir phpMyAdmin: http://localhost/phpmyadmin
-- 2. Seleccionar la base de datos: sweetbites_db
-- 3. Ir a la pestaña "SQL"
-- 4. Copiar TODO este archivo y pegarlo
-- 5. Hacer clic en "Continuar"
-- 6. Reiniciar backend (Ctrl+C, npm run dev)
-- =====================================================
