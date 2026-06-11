-- =====================================================
-- Agregar tabla de notificaciones a SweetBites
-- Ejecutar en phpMyAdmin después de schema_completo.sql
-- =====================================================

USE sweetbites_db;

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

-- Insertar notificaciones de ejemplo
INSERT INTO notifications (usuario_id, tipo, titulo, mensaje, enlace, leida) VALUES
(3, 'receta_aprobada', '¡Receta aprobada!', 'Tu receta "Galletas de Avena y Chocolate" ha sido aprobada y publicada.', '/recipes/3', FALSE),
(4, 'nuevo_comentario', 'Nuevo comentario', 'Alguien comentó en tu receta "Mousse de Maracuyá".', '/recipes/5', FALSE),
(3, 'sistema', 'Bienvenido a SweetBites', 'Gracias por unirte a nuestra comunidad de reposteros.', NULL, TRUE);

SELECT '✅ Tabla de notificaciones creada exitosamente!' AS 'RESULTADO';
