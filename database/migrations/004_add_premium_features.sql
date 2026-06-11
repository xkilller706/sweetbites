-- Migración 004: Agregar funcionalidades Premium y bio de usuario
-- Fecha: 2026-06-10
-- Descripción: Agrega sistema de planes (gratis/premium), bio de usuario y recetas premium

USE sweetbites;

-- 1. Agregar campos a la tabla users
ALTER TABLE users
ADD COLUMN plan ENUM('gratis', 'premium') DEFAULT 'gratis' AFTER rol,
ADD COLUMN bio TEXT DEFAULT NULL AFTER foto_perfil,
ADD COLUMN fecha_premium DATETIME DEFAULT NULL AFTER bio;

-- 2. Agregar campo a la tabla recipes para marcar recetas premium
ALTER TABLE recipes
ADD COLUMN es_premium BOOLEAN DEFAULT FALSE AFTER estado;

-- 3. Crear índices para mejorar rendimiento de queries
CREATE INDEX idx_plan ON users(plan);
CREATE INDEX idx_es_premium ON recipes(es_premium);

-- 4. Actualizar todos los usuarios existentes al plan gratis por defecto
UPDATE users SET plan = 'gratis' WHERE plan IS NULL;

-- 5. Marcar algunas recetas como premium (opcional - puedes hacerlo manualmente después)
-- Esto es solo un ejemplo, puedes eliminar o modificar según necesites
-- UPDATE recipes SET es_premium = TRUE WHERE dificultad = 'Difícil' LIMIT 5;

-- Verificar cambios
DESCRIBE users;
DESCRIBE recipes;

SELECT 'Migración 004 completada exitosamente' AS mensaje;
