-- Fix encoding UTF-8 para SweetBites
-- Este script corrige problemas de encoding de caracteres especiales

-- Cambiar collation de toda la base de datos
ALTER DATABASE sweetbites_db CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Corregir tabla recipes
ALTER TABLE recipes CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Corregir tabla ingredients
ALTER TABLE ingredients CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Corregir tabla steps
ALTER TABLE steps CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Corregir tabla users
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Corregir tabla comments
ALTER TABLE comments CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Corregir tabla categories
ALTER TABLE categories CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Corregir tabla collections
ALTER TABLE collections CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Corregir tabla notifications
ALTER TABLE notifications CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
