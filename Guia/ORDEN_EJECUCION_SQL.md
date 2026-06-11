# 📋 ORDEN DE EJECUCIÓN DE SCRIPTS SQL - SWEETBITES

## 🎯 GUÍA COMPLETA PARA RECREAR LA BASE DE DATOS DESDE CERO

---

## ⚠️ IMPORTANTE - ANTES DE EMPEZAR

1. **Abrir XAMPP Control Panel**
   - Verificar que MySQL está corriendo (botón verde)
   - Verificar que Apache está corriendo (botón verde)

2. **Abrir phpMyAdmin**
   - Ir a: http://localhost/phpmyadmin

---

## 📊 OPCIÓN RÁPIDA (RECOMENDADA) - 1 SOLO ARCHIVO

Si quieres hacerlo rápido, ejecuta SOLO este archivo que tiene TODO incluido:

### ✅ PASO ÚNICO: Ejecutar schema_completo.sql

**Archivo**: `database/schema_completo.sql`

**Qué incluye este archivo**:
- ✅ Creación de la base de datos `sweetbites_db`
- ✅ Todas las tablas (users, recipes, categories, ingredients, steps, favorites, collections, comments, ratings, notifications)
- ✅ Categorías de ejemplo (7 categorías)
- ✅ Usuarios de prueba (4 usuarios)
- ✅ Recetas de ejemplo (6 recetas completas con ingredientes y pasos)
- ✅ Tabla notifications CON el campo 'enlace' ✅
- ✅ Tabla collection_recipes para colecciones

**Pasos**:
1. En phpMyAdmin, click en pestaña "SQL"
2. Abre el archivo `database/schema_completo.sql` en un editor de texto
3. Copia TODO el contenido (Ctrl+A, Ctrl+C)
4. Pega en el área de texto de phpMyAdmin (Ctrl+V)
5. Click en botón "Continuar" o "Go"
6. Espera 5-10 segundos
7. Deberías ver mensajes de éxito ✅

**Verificar**:
1. En phpMyAdmin, panel izquierdo, deberías ver `sweetbites_db`
2. Dentro de ella, deberías ver estas tablas:
   - categories
   - collection_recipes
   - collections
   - comments
   - favorites
   - ingredients
   - notifications ← **Con campo 'enlace'**
   - ratings
   - recipes
   - steps
   - users

**¡LISTO!** Puedes saltar a la sección "PASO FINAL" al final de este documento.

---

## 📊 OPCIÓN PASO A PASO (MANUAL) - SI PREFIERES HACERLO MANUALMENTE

Si prefieres entender cada paso y ejecutar los scripts uno por uno:

### FASE 1: ESQUEMA BASE (OBLIGATORIO)

#### ✅ PASO 1: Crear estructura básica
**Archivo**: `database/schema.sql`

**Qué hace**:
- Crea la base de datos `sweetbites_db`
- Crea todas las tablas básicas (users, recipes, ingredients, steps, favorites, comments, ratings)

**Ejecutar**:
1. phpMyAdmin > SQL
2. Copiar contenido de `database/schema.sql`
3. Pegar y ejecutar

---

### FASE 2: MIGRACIONES (OBLIGATORIO)

Las migraciones agregan funcionalidades que no estaban en el schema original.

#### ✅ PASO 2: Agregar tabla de categorías
**Archivo**: `database/migrations/001_add_categories_table.sql`

**Qué hace**:
- Crea la tabla `categories`
- Inserta 7 categorías con iconos y colores

**Ejecutar**:
1. phpMyAdmin > SQL
2. Copiar contenido de `database/migrations/001_add_categories_table.sql`
3. Pegar y ejecutar

---

#### ✅ PASO 3: Modificar recetas para usar categorías
**Archivo**: `database/migrations/002_modify_recipes_categoria.sql`

**Qué hace**:
- Agrega columna `categoria_id` a la tabla `recipes`
- Crea relación con tabla `categories`

**Ejecutar**:
1. phpMyAdmin > SQL
2. Copiar contenido de `database/migrations/002_modify_recipes_categoria.sql`
3. Pegar y ejecutar

---

#### ✅ PASO 4: Agregar tabla de notificaciones
**Archivo**: `database/migrations/003_add_notifications_table.sql`

**Qué hace**:
- Crea la tabla `notifications` básica (sin campo 'enlace')

**Ejecutar**:
1. phpMyAdmin > SQL
2. Copiar contenido de `database/migrations/003_add_notifications_table.sql`
3. Pegar y ejecutar

---

### FASE 3: REPARAR NOTIFICACIONES (OBLIGATORIO)

#### ✅ PASO 5: Agregar campo 'enlace' a notificaciones
**Archivo**: `database/fix_notifications_table.sql`

**Qué hace**:
- Elimina la tabla `notifications` anterior
- Recrea la tabla con el campo `enlace` incluido ← **IMPORTANTE**
- Inserta notificaciones de ejemplo

**Ejecutar**:
1. phpMyAdmin > SQL
2. Copiar TODO el contenido de `database/fix_notifications_table.sql`
3. Pegar y ejecutar

**⚠️ MUY IMPORTANTE**: Este paso es OBLIGATORIO para que no tengas el error de "Unknown column 'enlace'"

---

### FASE 4: DATOS DE EJEMPLO (RECOMENDADO)

#### ✅ PASO 6: Crear usuario administrador
**Archivo**: `database/create_admin_user.sql`

**Qué hace**:
- Inserta usuario admin@sweetbites.com
- Inserta usuario editor@sweetbites.com
- Contraseña de ambos: password123

**Ejecutar**:
1. phpMyAdmin > SQL
2. Copiar contenido de `database/create_admin_user.sql`
3. Pegar y ejecutar

---

#### ✅ PASO 7: Insertar recetas de ejemplo
**Archivo**: `database/seed_recetas_ejemplo.sql`

**Qué hace**:
- Inserta 2 usuarios adicionales (maria@sweetbites.com, juan@sweetbites.com)
- Inserta 6 recetas de ejemplo completas
- Inserta ingredientes y pasos para cada receta
- Inserta algunos comentarios y ratings de ejemplo

**Ejecutar**:
1. phpMyAdmin > SQL
2. Copiar contenido de `database/seed_recetas_ejemplo.sql`
3. Pegar y ejecutar

---

### FASE 5: FUNCIONALIDADES ESPECIALES (OPCIONAL PERO RECOMENDADO)

#### ✅ PASO 8: Agregar campos de recetas especiales
**Archivo**: `database/add_special_recipes_fields.sql`

**Qué hace**:
- Agrega campos: `destacada`, `receta_semana`, `temporada`, `dieta_especial`
- Marca algunas recetas como ejemplos
- Crea índices para mejorar rendimiento

**Ejecutar**:
1. phpMyAdmin > SQL
2. Copiar TODO el contenido de `database/add_special_recipes_fields.sql`
3. Pegar y ejecutar

**Nota**: Este paso es opcional pero recomendado si quieres usar las funcionalidades de:
- Recetas destacadas
- Receta de la semana
- Recetas por temporada (verano, otoño, invierno, primavera)
- Recetas por dieta especial (sin gluten, vegana, vegetariana, sin lactosa)

---

## 🎯 RESUMEN DE ORDEN DE EJECUCIÓN

### OPCIÓN A: RÁPIDA (Recomendada) ✅
```
1. schema_completo.sql
2. add_special_recipes_fields.sql (opcional)
```

### OPCIÓN B: PASO A PASO
```
1. schema.sql
2. migrations/001_add_categories_table.sql
3. migrations/002_modify_recipes_categoria.sql
4. migrations/003_add_notifications_table.sql
5. fix_notifications_table.sql ← ⚠️ IMPORTANTE
6. create_admin_user.sql
7. seed_recetas_ejemplo.sql
8. add_special_recipes_fields.sql (opcional)
```

---

## 🔍 VERIFICACIÓN FINAL

Después de ejecutar los scripts, verifica en phpMyAdmin:

### 1. Verificar Base de Datos
- Panel izquierdo > Deberías ver `sweetbites_db`

### 2. Verificar Tablas
Click en `sweetbites_db`, deberías ver **11 tablas**:
- ✅ categories
- ✅ collection_recipes
- ✅ collections
- ✅ comments
- ✅ favorites
- ✅ ingredients
- ✅ notifications ← **Verificar que tiene campo 'enlace'**
- ✅ ratings
- ✅ recipes
- ✅ steps
- ✅ users

### 3. Verificar Datos
```sql
-- Ejecuta estas queries en phpMyAdmin > SQL para verificar:

-- Debería mostrar 7 categorías
SELECT COUNT(*) FROM categories;

-- Debería mostrar 4 usuarios
SELECT COUNT(*) FROM users;

-- Debería mostrar 6 recetas
SELECT COUNT(*) FROM recipes;

-- ⚠️ IMPORTANTE: Verificar que existe el campo 'enlace'
SHOW COLUMNS FROM notifications;
-- Deberías ver una fila que diga: enlace | varchar(255) | YES | | NULL |
```

### 4. Verificar Estructura de Notifications
**MUY IMPORTANTE**: Ejecuta esto en phpMyAdmin > SQL:
```sql
SHOW COLUMNS FROM notifications;
```

Deberías ver estas columnas:
- ✅ id
- ✅ usuario_id
- ✅ tipo
- ✅ titulo
- ✅ mensaje
- ✅ enlace ← **⚠️ ESTE CAMPO DEBE EXISTIR**
- ✅ leida
- ✅ fecha_creacion

**Si NO ves el campo 'enlace'**, ejecuta de nuevo: `database/fix_notifications_table.sql`

---

## 📝 PASO FINAL: REINICIAR BACKEND

Después de ejecutar todos los scripts SQL:

### 1. Ir a la terminal del backend
```bash
# Si está corriendo, detenerlo:
Ctrl+C

# Iniciarlo de nuevo:
npm run dev
```

### 2. Verificar que inició correctamente
Deberías ver:
```
╔═══════════════════════════════════════╗
║   🍰 SweetBites Backend Server 🍰    ║
║   Puerto: 3000                        ║
╚═══════════════════════════════════════╝
✅ Conexión exitosa a MySQL
```

---

## 🧪 PROBAR QUE TODO FUNCIONA

### 1. Abrir la aplicación
Ir a: http://localhost:5173

### 2. Iniciar sesión con usuario de prueba
```
Email: admin@sweetbites.com
Password: password123
```

### 3. Verificar notificaciones
- Click en la campanita 🔔 (esquina superior derecha)
- **NO deberías ver ningún error** en la consola (F12)
- Si ves errores de "Unknown column 'enlace'" → Ejecuta de nuevo `fix_notifications_table.sql`

### 4. Verificar recetas
- Ir a "Recetas"
- Deberías ver 6 recetas de ejemplo
- Las imágenes deberían cargarse correctamente

### 5. Crear una receta de prueba
- Click en "Crear Receta"
- Completar formulario
- Subir imagen
- Enviar
- Como admin, ir a "Panel Admin" > "Aprobar Recetas"
- Aprobar la receta
- Verificar que se crea una notificación ✅

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "Table 'sweetbites_db' doesn't exist"
- Ejecuta primero `schema.sql` o `schema_completo.sql`
- Verifica que XAMPP > MySQL está corriendo (verde)

### Error: "Table 'notifications' already exists"
- Si ejecutaste `schema_completo.sql`, NO ejecutes `migrations/003_add_notifications_table.sql`
- O ejecuta esto primero: `DROP TABLE IF EXISTS notifications;`

### Error: "Unknown column 'enlace' in 'field list'"
- Ejecuta `database/fix_notifications_table.sql`
- Reinicia backend (Ctrl+C, npm run dev)
- Recarga navegador (Ctrl+Shift+R)

### Error: "Duplicate entry for key 'PRIMARY'"
- Estás ejecutando un script dos veces
- Elimina la base de datos completa y empieza de nuevo:
```sql
DROP DATABASE IF EXISTS sweetbites_db;
```
- Luego ejecuta `schema_completo.sql`

---

## ✅ CHECKLIST DE VERIFICACIÓN

Marca cada item después de completarlo:

- [ ] XAMPP corriendo (MySQL verde)
- [ ] phpMyAdmin abierto (http://localhost/phpmyadmin)
- [ ] Script SQL ejecutado (opción rápida o paso a paso)
- [ ] Base de datos `sweetbites_db` existe
- [ ] 11 tablas creadas
- [ ] Tabla `notifications` tiene campo `enlace` ✅
- [ ] 4 usuarios creados (admin, editor, maria, juan)
- [ ] 7 categorías creadas
- [ ] 6 recetas de ejemplo creadas
- [ ] Backend reiniciado
- [ ] Frontend corriendo
- [ ] Login exitoso con admin@sweetbites.com
- [ ] Notificaciones funcionan sin errores ✅

---

## 🎉 ¡LISTO!

Si completaste todos los pasos y el checklist, tu base de datos está **100% configurada y funcional** ✅

**Usuarios de prueba creados**:
- 🔴 Admin: admin@sweetbites.com / password123
- 🔵 Editor: editor@sweetbites.com / password123
- 🟢 Usuario: maria@sweetbites.com / password123
- 🟡 Usuario: juan@sweetbites.com / password123

**Próximo paso**: Ir a `INICIO_RAPIDO.md` para probar todas las funcionalidades.

---

**¿Tienes algún error?** Busca el error específico en la sección "SOLUCIÓN DE PROBLEMAS" arriba.
