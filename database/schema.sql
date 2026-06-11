-- Base de Datos: SweetBites
-- Creación de tablas para la aplicación de recetas de postres

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS sweetbites_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE sweetbites_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol ENUM('usuario', 'admin') DEFAULT 'usuario',
    foto_perfil VARCHAR(255) DEFAULT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de recetas
CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    categoria ENUM('Tortas', 'Galletas', 'Postres Fríos', 'Chocolates', 'Tartas', 'Cupcakes', 'Otros') NOT NULL,
    dificultad ENUM('Fácil', 'Intermedio', 'Difícil') DEFAULT 'Intermedio',
    tiempo_preparacion INT, -- en minutos
    porciones INT DEFAULT 1,
    foto_principal VARCHAR(255),
    autor_id INT,
    estado ENUM('publicada', 'borrador', 'archivada') DEFAULT 'publicada',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_categoria (categoria),
    INDEX idx_autor (autor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de ingredientes
CREATE TABLE IF NOT EXISTS ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receta_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    cantidad DECIMAL(10,2),
    unidad VARCHAR(50), -- taza, gramos, ml, etc.
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de pasos de preparación
CREATE TABLE IF NOT EXISTS steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receta_id INT NOT NULL,
    numero_paso INT NOT NULL,
    descripcion TEXT NOT NULL,
    foto VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de favoritos
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    receta_id INT NOT NULL,
    fecha_guardado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (usuario_id, receta_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de colecciones
CREATE TABLE IF NOT EXISTS collections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de valoraciones/ratings
CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receta_id INT NOT NULL,
    usuario_id INT NOT NULL,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_rating (receta_id, usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de comentarios
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receta_id INT NOT NULL,
    usuario_id INT NOT NULL,
    comentario TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar usuarios de prueba
INSERT INTO users (nombre, email, password_hash, rol) VALUES
('Admin SweetBites', 'admin@sweetbites.com', '$2a$10$YourHashedPasswordHere', 'admin'),
('María García', 'maria@email.com', '$2a$10$YourHashedPasswordHere', 'editor'),
('Juan Pérez', 'juan@email.com', '$2a$10$YourHashedPasswordHere', 'usuario');

-- Insertar recetas de ejemplo
INSERT INTO recipes (nombre, descripcion, categoria, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id) VALUES
('Brownie de Chocolate', 'Delicioso brownie con trozos de chocolate', 'Chocolates', 'Fácil', 45, 8, 'brownie.jpg', 2),
('Cheesecake de Fresa', 'Suave cheesecake con cobertura de fresas frescas', 'Tartas', 'Intermedio', 90, 12, 'cheesecake.jpg', 2),
('Galletas de Chispas', 'Galletas crujientes con chispas de chocolate', 'Galletas', 'Fácil', 30, 24, 'galletas.jpg', 2),
('Torta de Chocolate', 'Esponjosa torta de chocolate con ganache', 'Tortas', 'Intermedio', 60, 10, 'torta-chocolate.jpg', 2),
('Helado de Vainilla', 'Cremoso helado casero de vainilla', 'Postres Fríos', 'Fácil', 20, 6, 'helado.jpg', 2),
('Cupcakes de Vainilla', 'Cupcakes decorados con buttercream', 'Cupcakes', 'Fácil', 40, 12, 'cupcakes.jpg', 2);

-- Insertar ingredientes para Brownie de Chocolate (ID 1)
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(1, 'Chocolate oscuro', 200, 'gramos'),
(1, 'Mantequilla', 150, 'gramos'),
(1, 'Azúcar', 200, 'gramos'),
(1, 'Huevos', 3, 'unidades'),
(1, 'Harina', 100, 'gramos'),
(1, 'Cacao en polvo', 50, 'gramos'),
(1, 'Sal', 1, 'pizca');

-- Insertar pasos para Brownie de Chocolate
INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(1, 1, 'Precalienta el horno a 180°C y engrasa un molde cuadrado'),
(1, 2, 'Derrite el chocolate y la mantequilla en baño maría'),
(1, 3, 'En un bol, bate los huevos con el azúcar hasta que esté espumoso'),
(1, 4, 'Incorpora el chocolate derretido a la mezcla de huevos'),
(1, 5, 'Tamiza la harina y el cacao, añade a la mezcla'),
(1, 6, 'Vierte en el molde y hornea por 25-30 minutos'),
(1, 7, 'Deja enfriar completamente antes de cortar');

-- Insertar ingredientes para Cheesecake de Fresa (ID 2)
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(2, 'Queso crema', 500, 'gramos'),
(2, 'Azúcar', 200, 'gramos'),
(2, 'Huevos', 3, 'unidades'),
(2, 'Crema de leche', 200, 'ml'),
(2, 'Galletas María', 200, 'gramos'),
(2, 'Mantequilla derretida', 100, 'gramos'),
(2, 'Fresas frescas', 300, 'gramos');

-- Insertar pasos para Cheesecake
INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(2, 1, 'Tritura las galletas y mézclalas con la mantequilla derretida'),
(2, 2, 'Presiona la mezcla en el fondo de un molde desmoldable'),
(2, 3, 'Bate el queso crema con el azúcar hasta que esté suave'),
(2, 4, 'Añade los huevos uno por uno, batiendo después de cada adición'),
(2, 5, 'Incorpora la crema de leche'),
(2, 6, 'Vierte sobre la base de galletas y hornea a 160°C por 50 minutos'),
(2, 7, 'Deja enfriar en el refrigerador por al menos 4 horas'),
(2, 8, 'Decora con fresas frescas antes de servir');

-- Insertar ingredientes para Galletas de Chispas (ID 3)
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(3, 'Harina', 250, 'gramos'),
(3, 'Mantequilla', 125, 'gramos'),
(3, 'Azúcar morena', 150, 'gramos'),
(3, 'Huevo', 1, 'unidad'),
(3, 'Chispas de chocolate', 200, 'gramos'),
(3, 'Polvo de hornear', 1, 'cucharadita'),
(3, 'Esencia de vainilla', 1, 'cucharadita');

-- Insertar pasos para Galletas
INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(3, 1, 'Precalienta el horno a 180°C'),
(3, 2, 'Bate la mantequilla con el azúcar hasta que esté cremosa'),
(3, 3, 'Añade el huevo y la vainilla, mezcla bien'),
(3, 4, 'Incorpora la harina tamizada y el polvo de hornear'),
(3, 5, 'Agrega las chispas de chocolate y mezcla'),
(3, 6, 'Forma bolitas y colócalas en una bandeja con papel encerado'),
(3, 7, 'Hornea por 12-15 minutos hasta que estén doradas'),
(3, 8, 'Deja enfriar en una rejilla');

-- Nota: La contraseña hasheada en estos ejemplos es solo un placeholder
-- Para crear usuarios reales, usa bcrypt para hashear las contraseñas
