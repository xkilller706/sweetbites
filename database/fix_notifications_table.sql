-- =====================================================
-- SCRIPT DE CORRECCIÓN: Tabla Notifications
-- =====================================================
-- Fecha: Mayo 2026
-- Problema: La tabla notifications tiene el campo 'receta_id'
--           pero el código espera el campo 'enlace'
-- Solución: Recrear la tabla con la estructura correcta
-- =====================================================

-- IMPORTANTE: Este script eliminará todas las notificaciones existentes
-- Si necesitas conservar notificaciones, haz un backup primero

USE sweetbites_db;

-- Paso 1: Eliminar la tabla notifications con estructura incorrecta
DROP TABLE IF EXISTS notifications;

-- Paso 2: Recrear la tabla con la estructura correcta
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo ENUM('receta_aprobada', 'receta_rechazada', 'nuevo_comentario', 'nueva_valoracion', 'sistema') DEFAULT 'sistema',
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    enlace VARCHAR(255) DEFAULT NULL,  -- Campo correcto: enlace (URL)
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_leida (leida),
    INDEX idx_fecha (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Paso 3: Insertar notificaciones de ejemplo
INSERT INTO notifications (usuario_id, tipo, titulo, mensaje, enlace, leida) VALUES
-- Notificaciones para María (usuario_id = 3)
(3, 'receta_aprobada', '¡Receta aprobada!', 'Tu receta "Galletas de Avena y Chocolate" ha sido aprobada y publicada.', '/recipes/3', FALSE),
(3, 'sistema', 'Bienvenido a SweetBites', 'Gracias por unirte a nuestra comunidad de reposteros.', NULL, TRUE),

-- Notificaciones para Juan (usuario_id = 4)
(4, 'nuevo_comentario', 'Nuevo comentario', 'Alguien comentó en tu receta "Mousse de Maracuyá".', '/recipes/5', FALSE),
(4, 'sistema', 'Bienvenido a SweetBites', 'Gracias por unirte a nuestra comunidad de reposteros.', NULL, TRUE);

-- Paso 4: Verificar que todo se creó correctamente
SELECT '✅ Tabla notifications corregida exitosamente!' AS 'RESULTADO';
SELECT COUNT(*) as 'Total Notificaciones Creadas' FROM notifications;
SELECT COLUMN_NAME, COLUMN_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'sweetbites_db'
  AND TABLE_NAME = 'notifications'
ORDER BY ORDINAL_POSITION;

-- =====================================================
-- INSTRUCCIONES DE USO:
-- =====================================================
-- 1. Abrir phpMyAdmin: http://localhost/phpmyadmin
-- 2. Seleccionar la base de datos: sweetbites_db
-- 3. Ir a la pestaña "SQL"
-- 4. Copiar TODO este archivo y pegarlo en el área de texto
-- 5. Hacer clic en el botón "Continuar" o "Go"
-- 6. Verificar el mensaje de éxito
-- 7. Reiniciar el servidor backend (Ctrl+C y luego npm run dev)
-- 8. Recargar la aplicación en el navegador
-- =====================================================
