-- =====================================================
-- SCRIPT: Agregar Recetas de Ejemplo a SweetBites
-- Descripción: Inserta 6 recetas completas de repostería
-- =====================================================

USE sweetbites_db;

-- Primero verificamos que tengamos las categorías necesarias
-- Si ejecutaste las migraciones, ya deberías tener estas categorías

-- RECETA 1: Brownie de Chocolate Intenso
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado, fecha_creacion)
VALUES (
    'Brownie de Chocolate Intenso',
    'Delicioso brownie casero con trozos de chocolate y nueces, textura húmeda por dentro y crujiente por fuera.',
    3, -- Chocolates
    'Fácil',
    45,
    8,
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop',
    1, -- Reemplazar con ID de usuario existente
    'publicada',
    '2026-01-15 10:00:00'
);

SET @receta1_id = LAST_INSERT_ID();

-- Ingredientes Brownie
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta1_id, 'chocolate oscuro', 200, 'g'),
(@receta1_id, 'mantequilla', 100, 'g'),
(@receta1_id, 'azúcar', 150, 'g'),
(@receta1_id, 'huevos', 3, 'unidades'),
(@receta1_id, 'harina', 80, 'g'),
(@receta1_id, 'nueces', 50, 'g');

-- Pasos Brownie
INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta1_id, 1, 'Derretir el chocolate con la mantequilla a baño maría, revolviendo constantemente hasta obtener una mezcla homogénea.'),
(@receta1_id, 2, 'Batir los huevos con el azúcar hasta que la mezcla esté espumosa y haya duplicado su volumen.'),
(@receta1_id, 3, 'Incorporar el chocolate derretido a la mezcla de huevos, mezclando con movimientos envolventes.'),
(@receta1_id, 4, 'Agregar la harina tamizada y mezclar suavemente hasta integrar.'),
(@receta1_id, 5, 'Añadir las nueces picadas y verter en un molde engrasado de 20x20 cm.'),
(@receta1_id, 6, 'Hornear a 180°C durante 25-30 minutos. El centro debe quedar ligeramente húmedo.');

-- =======================================================

-- RECETA 2: Cheesecake de Fresas
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado, fecha_creacion)
VALUES (
    'Cheesecake de Fresas',
    'Cremoso cheesecake con base de galleta y cobertura de fresas frescas. Perfecto para celebraciones especiales.',
    4, -- Postres Fríos
    'Intermedio',
    90,
    12,
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
    1,
    'publicada',
    '2026-02-20 14:30:00'
);

SET @receta2_id = LAST_INSERT_ID();

-- Ingredientes Cheesecake
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta2_id, 'galletas maría', 200, 'g'),
(@receta2_id, 'mantequilla derretida', 80, 'g'),
(@receta2_id, 'queso crema', 500, 'g'),
(@receta2_id, 'azúcar', 150, 'g'),
(@receta2_id, 'crema de leche', 200, 'ml'),
(@receta2_id, 'fresas frescas', 300, 'g'),
(@receta2_id, 'gelatina sin sabor', 15, 'g');

-- Pasos Cheesecake
INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta2_id, 1, 'Triturar las galletas hasta obtener un polvo fino y mezclar con la mantequilla derretida.'),
(@receta2_id, 2, 'Presionar la mezcla en el fondo de un molde desmontable de 24 cm. Refrigerar 30 minutos.'),
(@receta2_id, 3, 'Batir el queso crema con el azúcar hasta obtener una crema suave.'),
(@receta2_id, 4, 'Hidratar la gelatina en 50ml de agua fría y luego disolver a baño maría.'),
(@receta2_id, 5, 'Incorporar la crema de leche batida y la gelatina disuelta a la mezcla de queso.'),
(@receta2_id, 6, 'Verter sobre la base de galleta y refrigerar 4 horas o hasta que esté firme.'),
(@receta2_id, 7, 'Decorar con fresas frescas antes de servir.');

-- =======================================================

-- RECETA 3: Galletas de Avena y Chocolate
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado, fecha_creacion)
VALUES (
    'Galletas de Avena y Chocolate',
    'Galletas saludables con avena, chocolate chips y un toque de canela. Crujientes por fuera, suaves por dentro.',
    2, -- Galletas
    'Fácil',
    30,
    24,
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop',
    1,
    'publicada',
    '2026-03-05 09:15:00'
);

SET @receta3_id = LAST_INSERT_ID();

-- Ingredientes Galletas
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta3_id, 'avena', 150, 'g'),
(@receta3_id, 'harina integral', 100, 'g'),
(@receta3_id, 'azúcar morena', 100, 'g'),
(@receta3_id, 'mantequilla', 100, 'g'),
(@receta3_id, 'huevo', 1, 'unidad'),
(@receta3_id, 'chocolate chips', 100, 'g'),
(@receta3_id, 'canela', 1, 'cucharadita');

-- Pasos Galletas
INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta3_id, 1, 'Precalentar el horno a 175°C y forrar una bandeja con papel manteca.'),
(@receta3_id, 2, 'Batir la mantequilla con el azúcar hasta obtener una crema.'),
(@receta3_id, 3, 'Agregar el huevo y batir hasta integrar.'),
(@receta3_id, 4, 'Incorporar la avena, harina, canela y mezclar bien.'),
(@receta3_id, 5, 'Añadir los chips de chocolate y mezclar.'),
(@receta3_id, 6, 'Formar bolitas y aplanar ligeramente sobre la bandeja.'),
(@receta3_id, 7, 'Hornear 12-15 minutos hasta que los bordes estén dorados.');

-- =======================================================

-- RECETA 4: Torta Tres Leches
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado, fecha_creacion)
VALUES (
    'Torta Tres Leches',
    'Clásica torta tres leches, esponjosa y húmeda, bañada en tres tipos de leche y decorada con merengue.',
    1, -- Tortas
    'Intermedio',
    120,
    16,
    'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&h=400&fit=crop',
    1,
    'publicada',
    '2026-01-28 16:45:00'
);

SET @receta4_id = LAST_INSERT_ID();

-- Ingredientes Tres Leches
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta4_id, 'harina', 200, 'g'),
(@receta4_id, 'huevos', 6, 'unidades'),
(@receta4_id, 'azúcar', 200, 'g'),
(@receta4_id, 'leche evaporada', 400, 'ml'),
(@receta4_id, 'leche condensada', 400, 'ml'),
(@receta4_id, 'crema de leche', 200, 'ml'),
(@receta4_id, 'vainilla', 1, 'cucharadita');

-- Pasos Tres Leches
INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta4_id, 1, 'Batir los huevos con el azúcar hasta triplicar el volumen (15 minutos aprox).'),
(@receta4_id, 2, 'Incorporar la harina tamizada con movimientos envolventes.'),
(@receta4_id, 3, 'Verter en un molde engrasado y hornear a 180°C por 30 minutos.'),
(@receta4_id, 4, 'Mezclar las tres leches con la vainilla.'),
(@receta4_id, 5, 'Pinchar el bizcocho frío con un tenedor y bañar con la mezcla de leches.'),
(@receta4_id, 6, 'Refrigerar por lo menos 4 horas o toda la noche.'),
(@receta4_id, 7, 'Decorar con merengue o crema batida antes de servir.');

-- =======================================================

-- RECETA 5: Mousse de Maracuyá
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado, fecha_creacion)
VALUES (
    'Mousse de Maracuyá',
    'Ligero y refrescante mousse de maracuyá con base de galleta. Ideal para días calurosos.',
    4, -- Postres Fríos
    'Fácil',
    40,
    6,
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
    1,
    'publicada',
    '2026-03-12 11:20:00'
);

SET @receta5_id = LAST_INSERT_ID();

-- Ingredientes Mousse
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta5_id, 'pulpa de maracuyá', 200, 'ml'),
(@receta5_id, 'crema de leche', 300, 'ml'),
(@receta5_id, 'azúcar', 100, 'g'),
(@receta5_id, 'gelatina sin sabor', 10, 'g'),
(@receta5_id, 'claras de huevo', 2, 'unidades');

-- Pasos Mousse
INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta5_id, 1, 'Hidratar la gelatina en 50ml de agua fría por 5 minutos.'),
(@receta5_id, 2, 'Calentar la pulpa de maracuyá con el azúcar y disolver la gelatina en esta mezcla.'),
(@receta5_id, 3, 'Dejar enfriar hasta que empiece a espesar.'),
(@receta5_id, 4, 'Batir la crema de leche hasta punto chantilly.'),
(@receta5_id, 5, 'Incorporar la crema batida a la mezcla de maracuyá con movimientos envolventes.'),
(@receta5_id, 6, 'Servir en copas individuales y refrigerar 2 horas antes de servir.');

-- =======================================================

-- RECETA 6: Red Velvet Cupcakes
INSERT INTO recipes (nombre, descripcion, categoria_id, dificultad, tiempo_preparacion, porciones, foto_principal, autor_id, estado, fecha_creacion)
VALUES (
    'Red Velvet Cupcakes',
    'Esponjosos cupcakes red velvet con frosting de queso crema. Un clásico americano irresistible.',
    6, -- Cupcakes
    'Intermedio',
    50,
    12,
    'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&h=400&fit=crop',
    1,
    'publicada',
    '2026-02-14 13:00:00'
);

SET @receta6_id = LAST_INSERT_ID();

-- Ingredientes Red Velvet
INSERT INTO ingredients (receta_id, nombre, cantidad, unidad) VALUES
(@receta6_id, 'harina', 150, 'g'),
(@receta6_id, 'cacao en polvo', 15, 'g'),
(@receta6_id, 'colorante rojo', 30, 'ml'),
(@receta6_id, 'mantequilla', 100, 'g'),
(@receta6_id, 'azúcar', 150, 'g'),
(@receta6_id, 'huevos', 2, 'unidades'),
(@receta6_id, 'queso crema', 200, 'g'),
(@receta6_id, 'azúcar glass', 200, 'g');

-- Pasos Red Velvet
INSERT INTO steps (receta_id, numero_paso, descripcion) VALUES
(@receta6_id, 1, 'Precalentar el horno a 175°C y preparar moldes para cupcakes.'),
(@receta6_id, 2, 'Mezclar la harina con el cacao en polvo y una pizca de sal.'),
(@receta6_id, 3, 'Batir la mantequilla con el azúcar, agregar los huevos uno a uno.'),
(@receta6_id, 4, 'Incorporar el colorante rojo y la vainilla.'),
(@receta6_id, 5, 'Añadir los ingredientes secos alternando con buttermilk.'),
(@receta6_id, 6, 'Hornear 18-20 minutos. Dejar enfriar completamente.'),
(@receta6_id, 7, 'Preparar el frosting batiendo queso crema con azúcar glass y decorar.');

-- =======================================================
-- RESULTADO: 6 recetas completas con todos sus ingredientes y pasos
-- =======================================================

SELECT 'Script ejecutado exitosamente. Se agregaron 6 recetas de ejemplo.' AS Resultado;
