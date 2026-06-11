-- Modificar la tabla users para permitir password_hash NULL
-- Esto es necesario para la autenticación sin contraseña (Email Link de Firebase)

USE sweetbites;

ALTER TABLE users
MODIFY COLUMN password_hash VARCHAR(255) NULL;

-- Verificar el cambio
DESCRIBE users;
