# SOLUCIÓN AL ERROR: Unknown column 'enlace' in 'field list'

## Descripción del Problema

Al cargar la aplicación SweetBites, aparece el siguiente error en la consola del navegador:

```
Error al obtener notificaciones: Error: Unknown column 'enlace' in 'field list'
sqlMessage: "Unknown column 'enlace' in 'field list'"
```

### ¿Por qué ocurre este error?

Existe una **inconsistencia entre la estructura de la base de datos y el código de la aplicación**:

- **Migración antigua** (`003_add_notifications_table.sql`): Creó la tabla con el campo `receta_id`
- **Código del backend** (`backend/routes/notifications.js`): Espera el campo `enlace`
- **Schema completo** (`database/schema_completo.sql`): Define correctamente el campo `enlace`

La tabla notifications fue creada con una versión antigua de la migración que usaba `receta_id` en lugar de `enlace`.

---

## Solución Rápida

### Paso 1: Abrir phpMyAdmin

1. Abre tu navegador
2. Ve a: **http://localhost/phpmyadmin**
3. Haz clic en la base de datos **sweetbites_db** en el panel izquierdo

### Paso 2: Ejecutar el Script de Corrección

1. Haz clic en la pestaña **"SQL"** en el menú superior
2. Copia **TODO** el contenido del archivo: `database/fix_notifications_table.sql`
3. Pégalo en el área de texto grande
4. Haz clic en el botón **"Continuar"** o **"Go"** en la parte inferior derecha
5. Espera a que termine la ejecución (1-2 segundos)

### Paso 3: Verificar el Resultado

Deberías ver mensajes similares a:

```
✅ Tabla notifications corregida exitosamente!
Total Notificaciones Creadas: 4
```

Y una tabla mostrando las columnas de la tabla notifications, incluyendo:
- id
- usuario_id
- tipo
- titulo
- mensaje
- **enlace** ← Este es el campo correcto
- leida
- fecha_creacion

### Paso 4: Reiniciar el Backend

1. Ve a la terminal donde está corriendo el backend
2. Presiona **Ctrl+C** para detenerlo
3. Ejecuta de nuevo:
   ```bash
   npm run dev
   ```
4. Espera a ver el mensaje:
   ```
   ╔═══════════════════════════════════════╗
   ║   🍰 SweetBites Backend Server 🍰    ║
   ╚═══════════════════════════════════════╝
   ✅ Conexión exitosa a MySQL
   ```

### Paso 5: Recargar la Aplicación

1. Ve a tu navegador (http://localhost:5173)
2. Presiona **Ctrl+Shift+R** (recarga completa)
3. El error debería haber desaparecido

---

## Verificación de que Todo Funciona

### 1. Verificar Consola del Navegador

1. Presiona **F12** para abrir las DevTools
2. Ve a la pestaña **Console**
3. **NO** deberías ver errores de "Unknown column 'enlace'"
4. **NO** deberían aparecer errores 500 en notificationService.js

### 2. Verificar Campana de Notificaciones

1. Inicia sesión con:
   - Email: **maria@sweetbites.com**
   - Contraseña: **password123**
2. Haz clic en el icono de la campanita 🔔 en la parte superior derecha
3. Deberías ver:
   - Un badge rojo con el número "1" (indica 1 notificación sin leer)
   - Al abrir, deberías ver 2 notificaciones:
     - ✅ "¡Receta aprobada!" (no leída, con enlace "Ver →")
     - 🔔 "Bienvenido a SweetBites" (leída)
4. Haz clic en "Ver →" en la primera notificación
   - Debería navegar a la página de la receta
   - La notificación debería marcarse como leída

### 3. Verificar Consola del Backend

1. Ve a la terminal donde corre el backend
2. Deberías ver logs como:
   ```
   GET /api/notifications 200 - 45ms
   ```
3. **NO** deberían aparecer errores SQL

---

## ¿Qué Cambió?

### Antes (Estructura Incorrecta):
```sql
CREATE TABLE notifications (
    ...
    receta_id INT NULL,  ❌ Campo incorrecto
    ...
);
```

### Después (Estructura Correcta):
```sql
CREATE TABLE notifications (
    ...
    enlace VARCHAR(255) DEFAULT NULL,  ✅ Campo correcto
    ...
);
```

### Ventajas del campo `enlace`:

- **Más flexible**: Puede apuntar a cualquier ruta (`/recipes/5`, `/profile`, etc.)
- **No requiere FK**: No depende de que exista un registro en otra tabla
- **Permite NULL**: Las notificaciones del sistema no necesitan enlace
- **Consistente**: Coincide con el código del frontend y backend

---

## Archivos Modificados

1. ✅ **database/migrations/003_add_notifications_table.sql** - Actualizado para usar `enlace`
2. ✅ **database/fix_notifications_table.sql** - Script de corrección (NUEVO)
3. ✅ **SOLUCION_ERROR_NOTIFICATIONS.md** - Este archivo (NUEVO)

---

## Preguntas Frecuentes

### ¿Perderé las notificaciones existentes?

Sí, el script elimina y recrea la tabla. Pero las notificaciones son datos no críticos y se recrean automáticamente con 4 notificaciones de ejemplo.

### ¿Afectará a otras funcionalidades?

No, solo afecta a la tabla `notifications`. Todas las demás tablas y funcionalidades permanecen intactas.

### ¿Necesito ejecutar este fix cada vez que inicio la app?

No, solo es necesario ejecutarlo **una vez**. Después de esto, el error no volverá a aparecer.

### ¿Qué pasa si ya ejecuté el schema_completo.sql?

Si importaste `database/schema_completo.sql` después de crear la base de datos, la tabla ya debería tener el campo `enlace` correcto. En ese caso, este error no debería ocurrir. Si sí ocurre, significa que usaste la migración antigua y necesitas ejecutar el fix.

### ¿Puedo usar este script en producción?

Este script es seguro, pero elimina todas las notificaciones. Si estás en producción y quieres conservar las notificaciones, deberías hacer:
1. Backup de la tabla notifications
2. Modificar el script para hacer un ALTER TABLE en lugar de DROP/CREATE
3. Migrar los datos de receta_id a enlace con una función de conversión

---

## Solución Alternativa (Sin Perder Datos)

Si **necesitas conservar** las notificaciones existentes, ejecuta esto en su lugar:

```sql
USE sweetbites_db;

-- Agregar nueva columna
ALTER TABLE notifications ADD COLUMN enlace VARCHAR(255) DEFAULT NULL AFTER mensaje;

-- Copiar datos de receta_id a enlace (convertir a ruta)
UPDATE notifications 
SET enlace = CONCAT('/recipes/', receta_id) 
WHERE receta_id IS NOT NULL;

-- Eliminar la columna antigua
ALTER TABLE notifications DROP FOREIGN KEY notifications_ibfk_2;
ALTER TABLE notifications DROP COLUMN receta_id;

-- Actualizar el tipo enum
ALTER TABLE notifications MODIFY COLUMN tipo ENUM('receta_aprobada', 'receta_rechazada', 'nuevo_comentario', 'nueva_valoracion', 'sistema') DEFAULT 'sistema';
```

---

## Soporte

Si después de seguir estos pasos el error persiste:

1. Verifica que XAMPP esté corriendo (MySQL en verde)
2. Verifica que la tabla se creó correctamente en phpMyAdmin
3. Verifica que el backend se reinició después del fix
4. Limpia la caché del navegador (Ctrl+Shift+R)
5. Revisa la consola del navegador (F12) para otros errores

---

**Última actualización:** Mayo 2026  
**Versión:** 1.0

---

¡Problema resuelto! 🎉
