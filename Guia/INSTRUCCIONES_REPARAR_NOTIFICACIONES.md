# 🔧 INSTRUCCIONES: Reparar Tabla Notifications

## 🚨 PROBLEMA ACTUAL

Tu aplicación está mostrando este error constantemente:
```
Error: Unknown column 'enlace' in 'field list'
```

**Causa**: La tabla `notifications` en tu base de datos no tiene el campo `enlace` que el código necesita.

**Solución**: Ejecutar el script SQL que recreará la tabla con la estructura correcta.

---

## ✅ PASO A PASO - EJECUTAR EN PHPMYADMIN

### Paso 1: Abrir phpMyAdmin
1. Abre tu navegador web (Chrome, Firefox, Edge)
2. Ve a esta URL: **http://localhost/phpmyadmin**
3. Espera a que cargue la interfaz de phpMyAdmin

### Paso 2: Seleccionar la Base de Datos
1. En el **panel izquierdo**, busca y haz clic en: **`sweetbites_db`**
2. Deberías ver el nombre de la base de datos resaltado

### Paso 3: Ir a la Pestaña SQL
1. En el **menú superior**, haz clic en la pestaña **"SQL"**
2. Verás un área de texto grande donde puedes escribir comandos SQL

### Paso 4: Copiar el Script SQL
1. **COPIA TODO** el siguiente código SQL (desde USE hasta el final):

```sql
-- =====================================================
-- SCRIPT DE CORRECCIÓN: Tabla Notifications
-- =====================================================
-- Fecha: Mayo 2026
-- Problema: La tabla notifications no tiene el campo 'enlace'
-- Solución: Recrear la tabla con la estructura correcta
-- =====================================================

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
    enlace VARCHAR(255) DEFAULT NULL,  -- ⭐ ESTE ES EL CAMPO QUE FALTABA
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_leida (leida),
    INDEX idx_fecha (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Paso 3: Insertar notificaciones de ejemplo para los usuarios de prueba
INSERT INTO notifications (usuario_id, tipo, titulo, mensaje, enlace, leida) VALUES
-- Notificaciones para usuario ID 3 (maria@sweetbites.com)
(3, 'sistema', '¡Bienvenido a SweetBites!', 'Gracias por unirte a nuestra comunidad de reposteros.', NULL, TRUE),

-- Notificaciones para usuario ID 4 (juan@sweetbites.com)
(4, 'sistema', '¡Bienvenido a SweetBites!', 'Gracias por unirte a nuestra comunidad de reposteros.', NULL, TRUE);

-- Paso 4: Verificar que todo se creó correctamente
SELECT '✅ Tabla notifications corregida exitosamente!' AS 'RESULTADO';
SELECT COUNT(*) as 'Total Notificaciones Creadas' FROM notifications;

-- Paso 5: Mostrar estructura de la tabla para verificar que el campo 'enlace' existe
SHOW COLUMNS FROM notifications;
```

### Paso 5: Pegar el SQL en phpMyAdmin
1. Haz clic dentro del **área de texto SQL** en phpMyAdmin
2. Presiona **Ctrl+A** (para seleccionar todo si hay algo escrito)
3. **Pega** el código SQL que copiaste (Ctrl+V)
4. Verifica que todo el código se pegó correctamente

### Paso 6: Ejecutar el Script
1. Haz clic en el botón **"Continuar"** o **"Go"** (esquina inferior derecha)
2. **Espera 2-3 segundos** mientras se ejecuta

### Paso 7: Verificar el Resultado ✅
Deberías ver varios mensajes de éxito:

```
✅ Tabla notifications corregida exitosamente!
Total Notificaciones Creadas: 2
```

Y una tabla mostrando la estructura de `notifications` con el campo `enlace`.

**Si ves estos mensajes = ¡ÉXITO! ✅**

---

## 🔄 PASO FINAL: REINICIAR EL BACKEND

Después de ejecutar el SQL, **DEBES** reiniciar el servidor backend:

### En Windows (PowerShell o CMD):
1. Ve a la terminal donde está corriendo el backend
2. Presiona **Ctrl+C** para detenerlo
3. Espera a que se detenga completamente
4. Ejecuta de nuevo:
   ```bash
   npm run dev
   ```

### Verificar que inició correctamente:
Deberías ver:
```
╔═══════════════════════════════════════╗
║   🍰 SweetBites Backend Server 🍰    ║
╠═══════════════════════════════════════╣
║   Puerto: 3000                        ║
║   Entorno: Desarrollo                 ║
║   URL: http://localhost:3000          ║
╚═══════════════════════════════════════╝
✅ Conexión exitosa a MySQL
```

---

## 🎯 VERIFICAR QUE EL ERROR DESAPARECIÓ

1. Ve al navegador donde está tu aplicación (http://localhost:5173)
2. Presiona **Ctrl+Shift+R** (recarga completa)
3. Abre la consola del navegador (presiona **F12**)
4. Mira la pestaña **"Console"**

**ANTES** (con error):
```
❌ Error: Unknown column 'enlace' in 'field list'
```

**DESPUÉS** (sin error):
```
✅ No deberías ver más el error de 'enlace'
```

5. Haz clic en la **campanita 🔔** en la esquina superior derecha
6. Las notificaciones deberían cargar **SIN ERRORES**

---

## ❓ SOLUCIÓN DE PROBLEMAS

### Si ves: "Table 'notifications' already exists"
**Solución**: El script tiene `DROP TABLE IF EXISTS` así que esto no debería pasar. Pero si pasa:
1. Ejecuta solo esta línea primero:
   ```sql
   DROP TABLE IF EXISTS notifications;
   ```
2. Luego ejecuta el resto del script

### Si ves: "Cannot delete or update a parent row"
**Solución**: Hay referencias a la tabla. Ejecuta esto primero:
```sql
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS notifications;
SET FOREIGN_KEY_CHECKS = 1;
```
Luego ejecuta el CREATE TABLE completo.

### Si el backend sigue mostrando el error
**Verifica**:
1. ¿Reiniciaste el backend? (Ctrl+C y npm run dev)
2. ¿Recargaste el navegador? (Ctrl+Shift+R)
3. ¿XAMPP está corriendo? (MySQL debe estar en verde)
4. ¿Ejecutaste el SQL en la base de datos correcta? (sweetbites_db)

---

## 📋 CHECKLIST FINAL

Marca cada item cuando lo completes:

- [ ] Abrí phpMyAdmin (http://localhost/phpmyadmin)
- [ ] Seleccioné la base de datos `sweetbites_db`
- [ ] Fui a la pestaña "SQL"
- [ ] Copié el script SQL completo
- [ ] Pegué el script en el área de texto
- [ ] Hice clic en "Continuar" / "Go"
- [ ] Vi el mensaje de éxito ✅
- [ ] Reinicié el backend (Ctrl+C, npm run dev)
- [ ] Recargué el navegador (Ctrl+Shift+R)
- [ ] Verifiqué que el error desapareció
- [ ] Las notificaciones cargan sin error

---

## ✅ RESULTADO ESPERADO

Después de completar estos pasos:
- ✅ No más errores de "Unknown column 'enlace'"
- ✅ La campanita de notificaciones funciona correctamente
- ✅ Puedes ver, marcar como leídas y eliminar notificaciones
- ✅ Los administradores pueden aprobar recetas y se crean notificaciones

---

## 🆘 ¿NECESITAS AYUDA?

Si algo no funciona:
1. Copia el **error exacto** que ves
2. Toma una **captura de pantalla** de phpMyAdmin
3. Avísame y te ayudo a resolverlo

---

**¡IMPORTANTE!**: No cierres este archivo hasta que hayas completado todos los pasos y verificado que funciona. 🎯
