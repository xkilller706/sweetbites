-- ==========================================
-- CREAR USUARIO ADMINISTRADOR DE PRUEBA
-- ==========================================
-- Este script crea un usuario admin para probar la plataforma SweetBites

-- Usuario Admin
INSERT INTO users (nombre, email, password, telefono, rol, fecha_registro)
VALUES (
  'Admin SweetBites',
  'admin@sweetbites.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  '3001234567',
  'admin',
  NOW()
);

-- Usuario Editor de Prueba
INSERT INTO users (nombre, email, password, telefono, rol, fecha_registro)
VALUES (
  'Editor SweetBites',
  'editor@sweetbites.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  '3009876543',
  'editor',
  NOW()
);

-- Usuario Normal de Prueba
INSERT INTO users (nombre, email, password, telefono, rol, fecha_registro)
VALUES (
  'Usuario Prueba',
  'usuario@sweetbites.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  '3005551234',
  'usuario',
  NOW()
);

-- ==========================================
-- CREDENCIALES DE PRUEBA
-- ==========================================

-- ADMIN:
--   Email: admin@sweetbites.com
--   Password: password

-- EDITOR:
--   Email: editor@sweetbites.com
--   Password: password

-- USUARIO:
--   Email: usuario@sweetbites.com
--   Password: password

-- ==========================================
-- NOTAS
-- ==========================================
-- El hash corresponde a la contraseña "password"
-- Hash generado con bcrypt rounds=10
-- Para crear tu propio hash, puedes usar:
-- https://bcrypt-generator.com/ (rounds: 10)
--
-- O desde Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('tuContraseña', 10);
-- console.log(hash);

-- ==========================================
-- VERIFICACIÓN
-- ==========================================
-- Para verificar que los usuarios se crearon:
-- SELECT id, nombre, email, rol FROM users WHERE rol IN ('admin', 'editor');
