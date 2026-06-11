-- Migración 002: Modificar tabla recipes para usar categoria_id en vez de ENUM
-- IMPORTANTE: Hacer backup de la base de datos antes de ejecutar
-- Ejecutar en phpMyAdmin en la base de datos sweetbites_db

USE sweetbites_db;

-- Paso 1: Agregar columna categoria_id (temporal, NULL permitido)
ALTER TABLE recipes ADD COLUMN categoria_id INT NULL AFTER descripcion;

-- Paso 2: Migrar datos existentes de ENUM a INT
UPDATE recipes r
JOIN categories c ON r.categoria = c.nombre
SET r.categoria_id = c.id;

-- Paso 3: Establecer FK y hacer NOT NULL
ALTER TABLE recipes
    MODIFY categoria_id INT NOT NULL,
    ADD FOREIGN KEY (categoria_id) REFERENCES categories(id);

-- Paso 4: Eliminar la columna antigua (ENUM)
-- ADVERTENCIA: hacer backup antes de ejecutar esta línea
ALTER TABLE recipes DROP COLUMN categoria;

-- Paso 5: Agregar nuevos estados y campo de rechazo
ALTER TABLE recipes
    MODIFY estado ENUM('publicada', 'borrador', 'archivada', 'pendiente', 'rechazada') DEFAULT 'publicada',
    ADD COLUMN estado_rechazo TEXT NULL AFTER estado;

-- Paso 6: Agregar índice para mejorar performance
CREATE INDEX idx_recipes_estado_categoria ON recipes(estado, categoria_id);
