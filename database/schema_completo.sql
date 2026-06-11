-- =====================================================
-- SWEETBITES - SCHEMA COMPLETO DE BASE DE DATOS
-- Versión: 1.0
-- Descripción: Script completo para crear toda la base de datos
-- Incluye: Tablas, relaciones, datos de ejemplo y usuarios
-- =====================================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS sweetbites_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE sweetbites_db;

-- =====================================================
-- TABLA: users
-- Descripción: Almacena usuarios del sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol ENUM('usuario', 'editor', 'admin') DEFAULT 'usuario',
    foto_perfil VARCHAR(255) DEFAULT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_rol (rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: categories
-- Descripción: Categorías de recetas
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(50) DEFAULT '🍰',
    color VARCHAR(7) DEFAULT '#6BD080',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: recipes
-- Descripción: Almacena las recetas publicadas
-- =====================================================
CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    categoria_id INT NOT NULL,
    dificultad ENUM('Fácil', 'Intermedio', 'Difícil') DEFAULT 'Intermedio',
    tiempo_preparacion INT, -- en minutos
    porciones INT DEFAULT 1,
    foto_principal VARCHAR(255),
    autor_id INT,
    estado ENUM('publicada', 'borrador', 'archivada', 'pendiente', 'rechazada') DEFAULT 'publicada',
    estado_rechazo TEXT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (categoria_id) REFERENCES categories(id),
    INDEX idx_categoria (categoria_id),
    INDEX idx_autor (autor_id),
    INDEX idx_estado (estado),
    INDEX idx_estado_categoria (estado, categoria_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: ingredients
-- Descripción: Ingredientes de cada receta
-- =====================================================
CREATE TABLE IF NOT EXISTS ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receta_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    cantidad DECIMAL(10,2),
    unidad VARCHAR(50), -- taza, gramos, ml, etc.
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE,
    INDEX idx_receta (receta_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: steps
-- Descripción: Pasos de preparación de cada receta
-- =====================================================
CREATE TABLE IF NOT EXISTS steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receta_id INT NOT NULL,
    numero_paso INT NOT NULL,
    descripcion TEXT NOT NULL,
    foto VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE,
    INDEX idx_receta (receta_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: favorites
-- Descripción: Recetas favoritas de los usuarios
-- =====================================================
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    receta_id INT NOT NULL,
    fecha_guardado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (usuario_id, receta_id),
    INDEX idx_usuario (usuario_id),
    INDEX idx_receta (receta_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: collections
-- Descripción: Colecciones personalizadas de recetas
-- =====================================================
CREATE TABLE IF NOT EXISTS collections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: collection_recipes
-- Descripción: Relación entre colecciones y recetas
-- =====================================================
CREATE TABLE IF NOT EXISTS collection_recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coleccion_id INT NOT NULL,
    receta_id INT NOT NULL,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coleccion_id) REFERENCES collections(id) ON DELETE CASCADE,
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_collection_recipe (coleccion_id, receta_id),
    INDEX idx_coleccion (coleccion_id),
    INDEX idx_receta (receta_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: ratings
-- Descripción: Valoraciones de recetas (1-5 estrellas)
-- =====================================================
CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receta_id INT NOT NULL,
    usuario_id INT NOT NULL,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_rating (receta_id, usuario_id),
    INDEX idx_receta (receta_id),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: comments
-- Descripción: Comentarios en las recetas
-- =====================================================
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receta_id INT NOT NULL,
    usuario_id INT NOT NULL,
    comentario TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (receta_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_receta (receta_id),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLA: notifications
-- Descripción: Notificaciones para los usuarios
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo ENUM('receta_aprobada', 'receta_rechazada', 'nuevo_comentario', 'nueva_valoracion', 'sistema') DEFAULT 'sistema',
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    enlace VARCHAR(255) DEFAULT NULL,
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_leida (leida),
    INDEX idx_fecha (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- INSERTAR DATOS INICIALES
-- =====================================================

-- Insertar categorías
INSERT INTO categories (nombre, descripcion, icono, color) VALUES
('Tortas', 'Tortas y pasteles esponjosos', '🎂', '#6BD080'),
('Galletas', 'Galletas crujientes y suaves', '🍪', '#A4C3B2'),
('Postres Fríos', 'Helados, mousses y más', '🍨', '#B5C7E8'),
('Chocolates', 'Delicias de chocolate', '🍫', '#D4A5D4'),
('Tartas', 'Tartas y pays deliciosos', '🥧', '#F5DBA5'),
('Cupcakes', 'Cupcakes decorados', '🧁', '#F5B5C7'),
('Otros', 'Otras delicias dulces', '🍰', '#DED6D1');

-- Insertar usuarios de prueba
-- Contraseña para todos: password123
-- Hash bcrypt de "password123": $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO users (nombre, email, password_hash, telefono, rol) VALUES
('Administrador', 'admin@sweetbites.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '3001111111', 'admin'),
('Editor Principal', 'editor@sweetbites.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '3002222222', 'editor'),
('María García', 'maria@sweetbites.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '3003333333', 'usuario'),
('Juan Pérez', 'juan@sweetbites.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '3004444444', 'usuario');

-- =====================================================
-- INSERTAR RECETAS DE EJEMPLO
-- =====================================================

-- RECETA 1: Brownie de Chocolate Intenso
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado)
VALUES (
    'Brownie de Chocolate Intenso',
    'Delicioso brownie casero con trozos de chocolate y nueces, textura húmeda por dentro y crujiente por fuera.',
    4, -- Chocolates
    'Fácil',
    45,
    8,
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop',
    2,
    'publicada'
);

SET @receta1_id = LAST_INSERT_ID();

INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta1_id, 'chocolate oscuro', 200, 'gramos'),
(@receta1_id, 'mantequilla', 100, 'gramos'),
(@receta1_id, 'azúcar', 150, 'gramos'),
(@receta1_id, 'huevos', 3, 'unidades'),
(@receta1_id, 'harina', 80, 'gramos'),
(@receta1_id, 'nueces', 50, 'gramos');

INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta1_id, 1, 'Derretir el chocolate con la mantequilla a baño maría, revolviendo constantemente hasta obtener una mezcla homogénea.'),
(@receta1_id, 2, 'Batir los huevos con el azúcar hasta que la mezcla esté espumosa y haya duplicado su volumen.'),
(@receta1_id, 3, 'Incorporar el chocolate derretido a la mezcla de huevos, mezclando con movimientos envolventes.'),
(@receta1_id, 4, 'Agregar la harina tamizada y mezclar suavemente hasta integrar.'),
(@receta1_id, 5, 'Añadir las nueces picadas y verter en un molde engrasado de 20x20 cm.'),
(@receta1_id, 6, 'Hornear a 180°C durante 25-30 minutos. El centro debe quedar ligeramente húmedo.');

-- RECETA 2: Cheesecake de Fresas
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado)
VALUES (
    'Cheesecake de Fresas',
    'Cremoso cheesecake con base de galleta y cobertura de fresas frescas. Perfecto para celebraciones especiales.',
    3, -- Postres Fríos
    'Intermedio',
    90,
    12,
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
    2,
    'publicada'
);

SET @receta2_id = LAST_INSERT_ID();

INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta2_id, 'galletas maría', 200, 'gramos'),
(@receta2_id, 'mantequilla derretida', 80, 'gramos'),
(@receta2_id, 'queso crema', 500, 'gramos'),
(@receta2_id, 'azúcar', 150, 'gramos'),
(@receta2_id, 'crema de leche', 200, 'ml'),
(@receta2_id, 'fresas frescas', 300, 'gramos'),
(@receta2_id, 'gelatina sin sabor', 15, 'gramos');

INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta2_id, 1, 'Triturar las galletas hasta obtener un polvo fino y mezclar con la mantequilla derretida.'),
(@receta2_id, 2, 'Presionar la mezcla en el fondo de un molde desmontable de 24 cm. Refrigerar 30 minutos.'),
(@receta2_id, 3, 'Batir el queso crema con el azúcar hasta obtener una crema suave.'),
(@receta2_id, 4, 'Hidratar la gelatina en 50ml de agua fría y luego disolver a baño maría.'),
(@receta2_id, 5, 'Incorporar la crema de leche batida y la gelatina disuelta a la mezcla de queso.'),
(@receta2_id, 6, 'Verter sobre la base de galleta y refrigerar 4 horas o hasta que esté firme.'),
(@receta2_id, 7, 'Decorar con fresas frescas antes de servir.');

-- RECETA 3: Galletas de Avena y Chocolate
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado)
VALUES (
    'Galletas de Avena y Chocolate',
    'Galletas saludables con avena, chocolate chips y un toque de canela. Crujientes por fuera, suaves por dentro.',
    2, -- Galletas
    'Fácil',
    30,
    24,
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop',
    3,
    'publicada'
);

SET @receta3_id = LAST_INSERT_ID();

INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta3_id, 'avena', 150, 'gramos'),
(@receta3_id, 'harina integral', 100, 'gramos'),
(@receta3_id, 'azúcar morena', 100, 'gramos'),
(@receta3_id, 'mantequilla', 100, 'gramos'),
(@receta3_id, 'huevo', 1, 'unidad'),
(@receta3_id, 'chocolate chips', 100, 'gramos'),
(@receta3_id, 'canela', 1, 'cucharadita');

INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta3_id, 1, 'Precalentar el horno a 175°C y forrar una bandeja con papel manteca.'),
(@receta3_id, 2, 'Batir la mantequilla con el azúcar hasta obtener una crema.'),
(@receta3_id, 3, 'Agregar el huevo y batir hasta integrar.'),
(@receta3_id, 4, 'Incorporar la avena, harina, canela y mezclar bien.'),
(@receta3_id, 5, 'Añadir los chips de chocolate y mezclar.'),
(@receta3_id, 6, 'Formar bolitas y aplanar ligeramente sobre la bandeja.'),
(@receta3_id, 7, 'Hornear 12-15 minutos hasta que los bordes estén dorados.');

-- RECETA 4: Torta Tres Leches
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado)
VALUES (
    'Torta Tres Leches',
    'Clásica torta tres leches, esponjosa y húmeda, bañada en tres tipos de leche y decorada con merengue.',
    1, -- Tortas
    'Intermedio',
    120,
    16,
    'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&h=400&fit=crop',
    3,
    'publicada'
);

SET @receta4_id = LAST_INSERT_ID();

INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta4_id, 'harina', 200, 'gramos'),
(@receta4_id, 'huevos', 6, 'unidades'),
(@receta4_id, 'azúcar', 200, 'gramos'),
(@receta4_id, 'leche evaporada', 400, 'ml'),
(@receta4_id, 'leche condensada', 400, 'ml'),
(@receta4_id, 'crema de leche', 200, 'ml'),
(@receta4_id, 'vainilla', 1, 'cucharadita');

INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta4_id, 1, 'Batir los huevos con el azúcar hasta triplicar el volumen (15 minutos aprox).'),
(@receta4_id, 2, 'Incorporar la harina tamizada con movimientos envolventes.'),
(@receta4_id, 3, 'Verter en un molde engrasado y hornear a 180°C por 30 minutos.'),
(@receta4_id, 4, 'Mezclar las tres leches con la vainilla.'),
(@receta4_id, 5, 'Pinchar el bizcocho frío con un tenedor y bañar con la mezcla de leches.'),
(@receta4_id, 6, 'Refrigerar por lo menos 4 horas o toda la noche.'),
(@receta4_id, 7, 'Decorar con merengue o crema batida antes de servir.');

-- RECETA 5: Mousse de Maracuyá
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado)
VALUES (
    'Mousse de Maracuyá',
    'Ligero y refrescante mousse de maracuyá con base de galleta. Ideal para días calurosos.',
    3, -- Postres Fríos
    'Fácil',
    40,
    6,
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
    4,
    'publicada'
);

SET @receta5_id = LAST_INSERT_ID();

INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta5_id, 'pulpa de maracuyá', 200, 'ml'),
(@receta5_id, 'crema de leche', 300, 'ml'),
(@receta5_id, 'azúcar', 100, 'gramos'),
(@receta5_id, 'gelatina sin sabor', 10, 'gramos'),
(@receta5_id, 'claras de huevo', 2, 'unidades');

INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta5_id, 1, 'Hidratar la gelatina en 50ml de agua fría por 5 minutos.'),
(@receta5_id, 2, 'Calentar la pulpa de maracuyá con el azúcar y disolver la gelatina en esta mezcla.'),
(@receta5_id, 3, 'Dejar enfriar hasta que empiece a espesar.'),
(@receta5_id, 4, 'Batir la crema de leche hasta punto chantilly.'),
(@receta5_id, 5, 'Incorporar la crema batida a la mezcla de maracuyá con movimientos envolventes.'),
(@receta5_id, 6, 'Servir en copas individuales y refrigerar 2 horas antes de servir.');

-- RECETA 6: Red Velvet Cupcakes
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado)
VALUES (
    'Red Velvet Cupcakes',
    'Esponjosos cupcakes red velvet con frosting de queso crema. Un clásico americano irresistible.',
    6, -- Cupcakes
    'Intermedio',
    50,
    12,
    'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&h=400&fit=crop',
    4,
    'publicada'
);

SET @receta6_id = LAST_INSERT_ID();

INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta6_id, 'harina', 150, 'gramos'),
(@receta6_id, 'cacao en polvo', 15, 'gramos'),
(@receta6_id, 'colorante rojo', 30, 'ml'),
(@receta6_id, 'mantequilla', 100, 'gramos'),
(@receta6_id, 'azúcar', 150, 'gramos'),
(@receta6_id, 'huevos', 2, 'unidades'),
(@receta6_id, 'queso crema', 200, 'gramos'),
(@receta6_id, 'azúcar glass', 200, 'gramos');

INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta6_id, 1, 'Precalentar el horno a 175°C y preparar moldes para cupcakes.'),
(@receta6_id, 2, 'Mezclar la harina con el cacao en polvo y una pizca de sal.'),
(@receta6_id, 3, 'Batir la mantequilla con el azúcar, agregar los huevos uno a uno.'),
(@receta6_id, 4, 'Incorporar el colorante rojo y la vainilla.'),
(@receta6_id, 5, 'Añadir los ingredientes secos alternando con buttermilk.'),
(@receta6_id, 6, 'Hornear 18-20 minutos. Dejar enfriar completamente.'),
(@receta6_id, 7, 'Preparar el frosting batiendo queso crema con azúcar glass y decorar.');

-- =====================================================
-- INSERTAR NOTIFICACIONES DE EJEMPLO
-- =====================================================

-- Notificaciones para María (usuario_id = 3)
INSERT INTO notifications (usuario_id, tipo, titulo, mensaje, enlace, leida) VALUES
(3, 'receta_aprobada', '¡Receta aprobada!', 'Tu receta "Galletas de Avena y Chocolate" ha sido aprobada y publicada.', '/recipes/3', FALSE),
(3, 'sistema', 'Bienvenido a SweetBites', 'Gracias por unirte a nuestra comunidad de reposteros.', NULL, TRUE);

-- Notificaciones para Juan (usuario_id = 4)
INSERT INTO notifications (usuario_id, tipo, titulo, mensaje, enlace, leida) VALUES
(4, 'nuevo_comentario', 'Nuevo comentario', 'Alguien comentó en tu receta "Mousse de Maracuyá".', '/recipes/5', FALSE),
(4, 'sistema', 'Bienvenido a SweetBites', 'Gracias por unirte a nuestra comunidad de reposteros.', NULL, TRUE);

-- =====================================================
-- MENSAJE DE CONFIRMACIÓN
-- =====================================================
SELECT '✅ Base de datos SweetBites creada exitosamente!' AS 'RESULTADO',
       (SELECT COUNT(*) FROM users) AS 'Total Usuarios',
       (SELECT COUNT(*) FROM categories) AS 'Total Categorías',
       (SELECT COUNT(*) FROM recipes) AS 'Total Recetas',
       (SELECT COUNT(*) FROM notifications) AS 'Total Notificaciones';
