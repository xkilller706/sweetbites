-- ================================================
-- Migración: Eliminar Rol "Editor"
-- Archivo: 001_remove_editor_role.sql
-- Descripción: Actualiza todos los usuarios con rol 'editor' a 'usuario'
--              y modifica el ENUM para eliminar la opción 'editor'
-- ================================================

USE sweetbites_db;

-- Paso 1: Actualizar usuarios existentes con rol 'editor' a 'usuario'
UPDATE users
SET rol = 'usuario'
WHERE rol = 'editor';

-- Paso 2: Modificar la columna para eliminar 'editor' del ENUM
ALTER TABLE users
MODIFY COLUMN rol ENUM('usuario', 'admin') DEFAULT 'usuario';

-- Verificación: Mostrar conteo de usuarios por rol
SELECT
    rol,
    COUNT(*) as cantidad
FROM users
GROUP BY rol;

-- Mensaje de confirmación
SELECT 'Migración 001 completada: Rol "editor" eliminado exitosamente' AS mensaje;
