-- =====================================================
-- SCRIPT: Agregar Sistema de Planes (Gratis/Premium)
-- =====================================================
-- Fecha: Junio 2026
-- Propósito: Agregar columnas para manejar planes gratis y premium
-- =====================================================

USE sweetbites_db;

-- Agregar columnas para el sistema de planes
ALTER TABLE users
ADD COLUMN IF NOT EXISTS plan ENUM('gratis', 'premium') DEFAULT 'gratis' COMMENT 'Plan del usuario (gratis o premium)',
ADD COLUMN IF NOT EXISTS fecha_premium DATETIME NULL COMMENT 'Fecha cuando se activó premium';

-- Crear índice para búsquedas por plan
CREATE INDEX IF NOT EXISTS idx_plan ON users(plan);

-- Establecer todos los usuarios existentes como plan gratis
UPDATE users
SET plan = 'gratis'
WHERE plan IS NULL;

-- Verificar cambios
SELECT '✅ Sistema de planes agregado exitosamente!' AS 'RESULTADO';

-- Mostrar estructura actualizada de la tabla users
SHOW COLUMNS FROM users;

-- Mostrar usuarios con sus planes
SELECT id, nombre, email, rol, plan, fecha_premium, fecha_registro
FROM users
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

-- =====================================================
-- NOTAS IMPORTANTES:
-- =====================================================
-- * Por defecto todos los usuarios tienen plan "gratis"
-- * Los usuarios pueden actualizar a "premium" desde la interfaz
-- * fecha_premium registra cuándo se activó el plan premium
-- * Este es un sistema simulado (sin pasarela de pago real)
-- * Ideal para proyectos académicos o demos
-- =====================================================
