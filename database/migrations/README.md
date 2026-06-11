# Migraciones de Base de Datos - SweetBites

## ⚠️ IMPORTANTE: Hacer Backup Antes de Ejecutar

Antes de ejecutar cualquier migración, **haz un backup completo** de tu base de datos `sweetbites_db` desde phpMyAdmin.

---

## Orden de Ejecución

Ejecuta las migraciones en el siguiente orden:

### 1️⃣ Migración 001: Crear Tabla Categories
**Archivo:** `001_add_categories_table.sql`

**Qué hace:**
- Crea la tabla `categories` con campos: id, nombre, descripcion, icono, color
- Inserta 7 categorías iniciales con la **nueva paleta de colores** (verde menta, beige, azul/lavanda pastel - sin rosa vivo)

**Cómo ejecutar:**
1. Abrir http://localhost/phpmyadmin
2. Seleccionar base de datos `sweetbites_db`
3. Ir a la pestaña **"SQL"**
4. Copiar y pegar el contenido completo de `001_add_categories_table.sql`
5. Hacer clic en **"Continuar"**
6. Verificar que aparezcan las 7 categorías en la tabla `categories`

**Verificación:**
```sql
SELECT * FROM categories;
```
Deberías ver 7 categorías con colores como #6BD080, #A4C3B2, #B5C7E8, etc.

---

### 2️⃣ Migración 002: Modificar Tabla Recipes
**Archivo:** `002_modify_recipes_categoria.sql`

**Qué hace:**
- Agrega columna `categoria_id` (INT) a la tabla `recipes`
- Migra los datos de la columna antigua `categoria` (ENUM) a `categoria_id` (INT con FK)
- Elimina la columna antigua `categoria`
- Agrega nuevos estados: 'pendiente' y 'rechazada'
- Agrega columna `estado_rechazo` (TEXT) para guardar motivo de rechazo
- Crea índice para mejorar performance

**⚠️ ADVERTENCIA:**
Esta migración **elimina la columna `categoria`** antigua. Asegúrate de hacer backup antes.

**Cómo ejecutar:**
1. Abrir http://localhost/phpmyadmin
2. Seleccionar base de datos `sweetbites_db`
3. Ir a la pestaña **"SQL"**
4. Copiar y pegar el contenido completo de `002_modify_recipes_categoria.sql`
5. Hacer clic en **"Continuar"**
6. Esperar a que termine (puede tardar unos segundos si hay muchas recetas)

**Verificación:**
```sql
DESCRIBE recipes;
```
Deberías ver:
- ✅ Columna `categoria_id` (INT, NOT NULL, con FK a `categories`)
- ✅ Columna `estado` con valores: publicada, borrador, archivada, pendiente, rechazada
- ✅ Columna `estado_rechazo` (TEXT, NULL)
- ❌ NO debe existir columna `categoria`

---

### 3️⃣ Migración 003: Crear Tabla Notifications (Opcional)
**Archivo:** `003_add_notifications_table.sql`

**Qué hace:**
- Crea la tabla `notifications` para notificar a usuarios cuando:
  - Su receta es aprobada
  - Su receta es rechazada
  - Reciben un nuevo comentario
  - Notificaciones del sistema

**Es opcional pero recomendada** para mejorar la experiencia de usuario.

**Cómo ejecutar:**
1. Abrir http://localhost/phpmyadmin
2. Seleccionar base de datos `sweetbites_db`
3. Ir a la pestaña **"SQL"**
4. Copiar y pegar el contenido completo de `003_add_notifications_table.sql`
5. Hacer clic en **"Continuar"**

**Verificación:**
```sql
SHOW TABLES LIKE 'notifications';
```
Debería aparecer la tabla `notifications`.

---

## Resumen de Cambios

### Tablas Nuevas:
- ✅ `categories` - Categorías dinámicas con colores personalizables
- ✅ `notifications` - Sistema de notificaciones (opcional)

### Tablas Modificadas:
- ✅ `recipes` - Ahora usa `categoria_id` (INT con FK) en vez de ENUM
- ✅ `recipes` - Nuevos estados: 'pendiente' y 'rechazada'
- ✅ `recipes` - Campo `estado_rechazo` para motivos de rechazo

### Índices Nuevos:
- ✅ `idx_recipes_estado_categoria` - Mejora performance en filtros

---

## Verificación Final

Ejecuta esta consulta para verificar que todo está correcto:

```sql
-- Verificar estructura de recipes
DESCRIBE recipes;

-- Verificar categorías
SELECT id, nombre, color FROM categories;

-- Verificar que las recetas existentes tienen categoria_id
SELECT id, nombre, categoria_id FROM recipes LIMIT 5;

-- Verificar tabla notifications (si la creaste)
SHOW TABLES LIKE 'notifications';
```

---

## Rollback (Volver Atrás)

Si algo sale mal, puedes restaurar el backup que hiciste antes de empezar:

1. Ir a phpMyAdmin
2. Seleccionar `sweetbites_db`
3. Pestaña **"Importar"**
4. Seleccionar tu archivo de backup (.sql)
5. Hacer clic en **"Continuar"**

---

## ¿Problemas?

### Error: "Cannot add foreign key constraint"
**Solución:** Ejecuta la migración 001 primero para crear la tabla `categories`.

### Error: "Duplicate column name 'categoria_id'"
**Solución:** La migración 002 ya fue ejecutada. Verifica con `DESCRIBE recipes;`

### Error: "Unknown column 'categoria'"
**Solución:** La migración 002 ya eliminó la columna antigua. Todo está bien.

---

**¡Listo!** Una vez ejecutadas las 3 migraciones, el backend está listo para funcionar con React + Vite.
