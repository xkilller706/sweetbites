# 🗄️ INSTRUCCIONES PARA EJECUTAR MIGRACIONES

## ⚠️ IMPORTANTE - LEER ANTES DE EJECUTAR

Estas migraciones modificarán tu base de datos. Sigue estos pasos cuidadosamente.

---

## 📋 Pasos para Ejecutar las Migraciones

### 1. Hacer Backup de la Base de Datos (RECOMENDADO)

1. Abre phpMyAdmin: `http://localhost/phpmyadmin`
2. Selecciona la base de datos `sweetbites_db`
3. Haz clic en la pestaña **"Exportar"**
4. Click en **"Continuar"**
5. Se descargará un archivo `.sql` - **guárdalo en un lugar seguro**

### 2. Ejecutar las Migraciones

1. En phpMyAdmin, asegúrate de estar en la base de datos `sweetbites_db`
2. Haz clic en la pestaña **"SQL"**
3. Abre el archivo: `database/EJECUTAR_MIGRACIONES.sql`
4. **Copia TODO el contenido** del archivo
5. **Pégalo** en el campo de texto de phpMyAdmin
6. Haz clic en **"Continuar"** o **"Go"**
7. Espera a que se ejecute (debería tardar 2-3 segundos)

### 3. Verificar que Funcionó

Deberías ver varios mensajes verdes con:
- ✅ MIGRACIÓN 1 COMPLETADA
- ✅ MIGRACIÓN 2 COMPLETADA  
- ✅ MIGRACIÓN 3 COMPLETADA
- 🎉 LISTO PARA USAR LA APLICACIÓN

---

## 📝 ¿Qué Hacen Estas Migraciones?

### Migración 1: Eliminar Rol "Editor"
- Convierte todos los usuarios con rol `editor` a `usuario`
- Elimina la opción `editor` del sistema
- Ahora solo existen: `usuario` y `admin`

### Migración 2: Activar/Desactivar Recetas
- Agrega columna `activo` (verdadero/falso) a la tabla `recipes`
- Permite que el admin active o desactive recetas
- Por defecto, todas las recetas quedan activas

### Migración 3: Comentarios Interactivos
- Agrega columna `parent_id` para respuestas anidadas
- Crea tabla `comment_reactions` para likes/dislikes
- Ahora los comentarios pueden responderse entre sí
- Los usuarios pueden dar like o dislike a comentarios

---

## ❓ Si Algo Sale Mal

### Si ves un error:
1. **No entres en pánico**
2. Lee el mensaje de error
3. Si dice "column already exists" → significa que ya ejecutaste esta migración antes (está bien)
4. Si es otro error → toma captura de pantalla y consúltame

### Si necesitas revertir los cambios:
1. Ve a phpMyAdmin
2. Click en **"Importar"**
3. Selecciona el archivo de backup que hiciste en el paso 1
4. Click en **"Continuar"**

---

## ✅ Después de Ejecutar las Migraciones

1. **Reinicia el backend** si está corriendo:
   - En la terminal donde corre el backend, presiona `Ctrl+C`
   - Vuelve a ejecutar: `npm start`

2. **Reinicia el frontend** si está corriendo:
   - En la terminal donde corre el frontend, presiona `Ctrl+C`
   - Vuelve a ejecutar: `npm run dev`

3. **Refresca el navegador** (F5) en la aplicación

---

## 🎯 ¿Todo Listo?

Si viste los mensajes de éxito ✅, las migraciones se ejecutaron correctamente.

Ahora puedes usar la aplicación con las nuevas funcionalidades:
- Sistema de roles actualizado (solo usuario y admin)
- Admin puede activar/desactivar recetas
- Comentarios interactivos con respuestas y reacciones

---

**Fecha de creación**: Mayo 2026  
**Versión**: 1.0
