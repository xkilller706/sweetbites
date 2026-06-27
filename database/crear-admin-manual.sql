-- Crear Usuario Administrador para SweetBites
-- Este script crea un usuario admin con contraseña hasheada

USE sweetbites_db;

-- Insertar nuevo administrador
-- Email: admin@sweetbites.com
-- Password: admin123
-- El hash corresponde a bcrypt de "admin123" con salt de 10 rondas

INSERT INTO users (nombre, email, password_hash, telefono, rol, fecha_registro)
VALUES (
    'Admin Principal',
    'admin@sweetbites.com',
    '$2a$10$YPZ9Z3Z9Z3Z9Z3Z9Z3Z9ZuXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX',  -- Este es un placeholder
    '3001234567',
    'admin',
    NOW()
);

-- Verificar que se creó correctamente
SELECT id, nombre, email, rol, fecha_registro
FROM users
WHERE email = 'admin@sweetbites.com';

-- NOTA IMPORTANTE:
-- Este hash de contraseña es un PLACEHOLDER y NO funcionará.
-- Debes usar el script de Node.js (crear-admin.js) para generar el hash correcto.
-- O ejecutar este comando en Node.js para generar tu hash:
--
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('tu_contraseña', 10);
-- console.log(hash);
