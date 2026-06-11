-- Migración 001: Crear tabla categories
-- Ejecutar en phpMyAdmin en la base de datos sweetbites_db

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(50) DEFAULT '🍰',
    color VARCHAR(7) DEFAULT '#6BD080',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar categorías iniciales con NUEVA paleta de colores (sin rosa vivo)
INSERT INTO categories (nombre, descripcion, icono, color) VALUES
('Tortas', 'Tortas y pasteles esponjosos', '🎂', '#6BD080'),      -- Verde menta
('Galletas', 'Galletas crujientes y suaves', '🍪', '#A4C3B2'),    -- Verde agua
('Postres Fríos', 'Helados, mousses y más', '🍨', '#B5C7E8'),     -- Azul pastel
('Chocolates', 'Delicias de chocolate', '🍫', '#D4A5D4'),         -- Lavanda pastel
('Tartas', 'Tartas y pays deliciosos', '🥧', '#F5DBA5'),          -- Amarillo pastel
('Cupcakes', 'Cupcakes decorados', '🧁', '#F5B5C7'),              -- Rosa pastel suave (no rosa vivo)
('Otros', 'Otras delicias dulces', '🍰', '#DED6D1');              -- Beige cálido
