-- Revertir la tabla users para que password_hash sea obligatorio de nuevo
-- Esto restaura el comportamiento de autenticación tradicional con contraseña

USE sweetbites;

-- Primero, eliminar usuarios que tengan password_hash NULL (usuarios creados con Firebase)
DELETE FROM users WHERE password_hash IS NULL;

-- Luego, modificar la columna para que sea NOT NULL
ALTER TABLE users
MODIFY COLUMN password_hash VARCHAR(255) NOT NULL;

-- Verificar el cambio
DESCRIBE users;
