# 📖 ¿Qué Hace Cada Cosa en SweetBites?

## Guía Completa para Entender Tu Aplicación

---

## 🏠 **PÁGINA PRINCIPAL (index.html)**

### ¿Para qué sirve?
Es la **primera página** que ven los visitantes. Como la portada de un libro.

### ¿Qué hace?
1. **Muestra el logo y nombre** de la app (SweetBites 🍰)
2. **Presenta la app** con un diseño bonito
3. **Botón "Explorar Recetas"** → lleva al catálogo
4. **Explica las características** (recetas detalladas, calificaciones, favoritos)
5. **Muestra categorías** (Tortas, Galletas, Chocolates, etc.)

### ¿Cómo funciona?
- Si haces clic en "Explorar Recetas" → te lleva a `recipes.html`
- Si haces clic en una categoría → te lleva a recetas de esa categoría
- Si haces clic en "Iniciar Sesión" → te lleva a `login.html`

---

## 🔐 **LOGIN/REGISTRO (login.html)**

### ¿Para qué sirve?
Para que los usuarios **creen una cuenta** o **entren** a su cuenta.

### ¿Qué hace?
**Tiene 2 pestañas:**

#### **PESTAÑA 1: Iniciar Sesión**
- Ingresas tu **email** y **contraseña**
- Al hacer clic en "Iniciar Sesión":
  - ✅ Si los datos son correctos → te lleva al catálogo (ya logueado)
  - ❌ Si son incorrectos → muestra error "Credenciales incorrectas"

#### **PESTAÑA 2: Registrarse**
- Ingresas: **nombre, email, teléfono, contraseña**
- Al hacer clic en "Crear Cuenta":
  - Guarda tus datos en la base de datos
  - Encripta tu contraseña (para seguridad)
  - Te cambia a la pestaña de login para que entres

### ¿Cómo funciona técnicamente?
1. **Frontend** (login.html) captura los datos del formulario
2. **JavaScript** (auth.js) envía los datos al backend
3. **Backend** (routes/auth.js) verifica/guarda en MySQL
4. Si todo está bien, **genera un token JWT**
5. El token se guarda en **localStorage** del navegador
6. Con ese token, ya estás "logueado"

---

## 🍰 **CATÁLOGO DE RECETAS (recipes.html)**

### ¿Para qué sirve?
Para **ver todas las recetas** disponibles y buscar la que quieres hacer.

### ¿Qué hace?

#### **1. Búsqueda**
- Escribes en la barra de búsqueda (ej: "brownie")
- Automáticamente filtra y muestra solo recetas que contengan esa palabra

#### **2. Filtros**
- **Categoría**: Tortas, Galletas, Chocolates, etc.
- **Dificultad**: Fácil, Intermedio, Difícil
- Puedes combinarlos (ej: Galletas + Fácil)

#### **3. Tarjetas de Recetas**
Cada tarjeta muestra:
- 📸 **Foto** de la receta
- 📝 **Nombre** (ej: "Brownie de Chocolate")
- ⏱️ **Tiempo** (45 minutos)
- 👨‍🍳 **Dificultad** (Fácil)
- ⭐ **Calificación** promedio
- 💝 **Cuántos favoritos** tiene

#### **4. Botón "Ver Receta"**
Al hacer clic → te lleva al detalle completo

### ¿Cómo funciona?
1. Al abrir la página, **JavaScript** pide las recetas al backend
2. **Backend** consulta MySQL: `SELECT * FROM recipes`
3. Devuelve las recetas en formato JSON
4. **JavaScript** las muestra en tarjetas bonitas
5. Si buscas/filtras, se filtran sin recargar la página

---

## 📄 **DETALLE DE RECETA (recipe-detail.html)**

### ¿Para qué sirve?
Para ver **toda la información** de una receta específica.

### ¿Qué hace?

#### **SECCIÓN 1: Información General**
- **Foto grande** de la receta
- **Nombre** y **descripción**
- **Tiempo, Porciones, Dificultad, Calificación**

#### **SECCIÓN 2: Ingredientes**
- Lista completa con **cantidades exactas**
- **Calculadora de porciones**: 
  - Si la receta es para 4 personas y tú quieres 8
  - Haces clic en **+** → automáticamente **duplica** todas las cantidades
  - Ejemplo: 2 tazas de harina → 4 tazas

#### **SECCIÓN 3: Pasos de Preparación**
- **Paso a paso numerado** (Paso 1, Paso 2, etc.)
- Instrucciones claras
- **Botón "Modo Cocina"** → ver abajo

#### **SECCIÓN 4: Comentarios y Valoraciones**
- Ver comentarios de otros usuarios
- **Agregar tu comentario** (si estás logueado)
- **Valorar con estrellas** (1-5 ⭐)

### ¿Qué es el **MODO COCINA**? 🍳

Es una **funcionalidad especial** para cuando estás cocinando:

1. Haces clic en "Iniciar Modo Cocina"
2. La pantalla se pone **fullscreen** (pantalla completa)
3. Muestra **1 paso a la vez** con letras GRANDES
4. Botones grandes "Anterior" y "Siguiente"
5. Indicador: "Paso 3 de 7"
6. Así puedes ver el paso sin acercarte al dispositivo

**¿Para qué?** Para leer fácilmente mientras cocinas con las manos sucias 😊

### ¿Cómo funciona la **Calculadora de Porciones**?

**Ejemplo real:**
- Receta original: 4 porciones
- Ingrediente: 2 tazas de harina

Si ajustas a **8 porciones**:
- Cálculo: `2 tazas × (8 / 4) = 4 tazas`
- Resultado: Ahora dice "4 tazas de harina"

**Todo automático con JavaScript** 🎯

---

## 💝 **MIS FAVORITOS (favorites.html)**

### ¿Para qué sirve?
Para **guardar** las recetas que más te gustan y tenerlas siempre a mano.

### ¿Qué hace?

#### **1. Ver Favoritos**
- Todas las recetas que guardaste con el corazón ❤️
- Grid bonito igual que el catálogo
- Botón para **quitar** de favoritos

#### **2. Colecciones**
**¿Qué son las colecciones?**
Son como "carpetas" para organizar tus recetas.

**Ejemplos de colecciones:**
- "Para cumpleaños" 🎂
- "Sin gluten" 🌾
- "Recetas fáciles" ✨
- "Para vender" 💰

**¿Cómo crear una colección?**
1. Clic en "+ Nueva Colección"
2. Poner nombre (ej: "Para cumpleaños")
3. Poner descripción opcional
4. Guardar

### ¿Cómo funciona guardar en favoritos?

1. En cualquier receta, haces clic en el **corazón ❤️**
2. **JavaScript** envía al backend: `POST /api/users/favorites/5`
3. **Backend** guarda en MySQL: 
   ```sql
   INSERT INTO favorites (usuario_id, receta_id, fecha_guardado)
   VALUES (tu_id, 5, NOW())
   ```
4. El corazón se **llena** de color rosa
5. La receta aparece en "Mis Favoritos"

---

## 👤 **MI PERFIL (profile.html)**

### ¿Para qué sirve?
Para **ver y editar** tu información personal.

### ¿Qué tiene?

#### **SECCIÓN 1: Información Personal**
- **Nombre**: Lo que aparece en tus comentarios
- **Email**: Tu email (no se puede cambiar)
- **Teléfono**: Opcional
- Botón "Guardar Cambios"

#### **SECCIÓN 2: Mis Estadísticas**
Muestra **automáticamente**:
- ❤️ **Cuántas recetas** tienes en favoritos
- 📚 **Cuántas colecciones** creaste
- 💬 **Cuántos comentarios** publicaste

**Son números en vivo** que se actualizan solos.

#### **SECCIÓN 3: Cambiar Contraseña**
- Ingresas tu contraseña **actual** (para verificar que eres tú)
- Ingresas tu **nueva contraseña**
- Se actualiza en la base de datos (encriptada)

### ¿Cómo sabe cuántas recetas favoritas tengo?

1. **JavaScript** pide al backend: `GET /api/users/favorites`
2. **Backend** consulta MySQL:
   ```sql
   SELECT COUNT(*) FROM favorites WHERE usuario_id = tu_id
   ```
3. Devuelve el número
4. Se muestra en la tarjeta rosa

---

## 🛠️ **PANEL DE ADMINISTRACIÓN (admin.html)**

### ¿Para qué sirve?
Solo para **ADMINISTRADORES**. Para gestionar toda la aplicación.

### ¿Quién puede entrar?
Solo usuarios con rol = "admin" en la base de datos.

Si intentas entrar y no eres admin → mensaje de error y te saca.

### ¿Qué tiene?

#### **1. Estadísticas Generales**
4 tarjetas con números en vivo:
- 👥 **Total de usuarios** registrados
- 🍰 **Total de recetas** publicadas
- 💬 **Total de comentarios**
- ❤️ **Total de favoritos**

#### **2. Acciones Rápidas**
3 botones grandes:
- **➕ Nueva Receta**: Crear receta nueva
- **👥 Gestionar Usuarios**: Ver/editar usuarios
- **💬 Ver Comentarios**: Moderar comentarios

_(Nota: Estas funciones muestran "Por implementar" pero están preparadas para agregar)_

#### **3. Tabla de Recetas Recientes**
- Muestra las últimas 10 recetas creadas
- Con: ID, Nombre, Categoría, Autor, Fecha
- Botón "Ver" para ver detalle

#### **4. Tabla de Usuarios Recientes**
- Lista de usuarios registrados
- Con: ID, Nombre, Email, Rol, Fecha de registro

### ¿Cómo funciona?

Cuando entras:
1. **JavaScript** verifica que seas admin
2. Si NO eres admin → te redirige a index.html
3. Si SÍ eres admin → carga las estadísticas
4. Hace peticiones al backend para obtener los datos
5. Los muestra en las tarjetas y tablas

---

## 🔧 **BACKEND - ¿Qué Hace Cada Archivo?**

### **server.js** - El Cerebro
**¿Qué hace?**
- Inicia el servidor en puerto 3000
- Conecta todas las partes
- Recibe peticiones del frontend
- Las envía a la ruta correcta

**Ejemplo:**
- Frontend pide: `GET /api/recipes`
- Server.js recibe la petición
- La envía a `routes/recipes.js`
- Devuelve la respuesta al frontend

### **config/database.js** - Conexión a MySQL
**¿Qué hace?**
- Se conecta a la base de datos MySQL
- Verifica que la conexión funcione
- Permite hacer consultas (SELECT, INSERT, etc.)

### **routes/auth.js** - Login y Registro
**¿Qué hace?**
- **POST /api/auth/register**: Registrar usuario nuevo
  - Valida datos
  - Encripta contraseña con bcrypt
  - Guarda en tabla `users`

- **POST /api/auth/login**: Iniciar sesión
  - Busca usuario por email
  - Compara contraseña
  - Si es correcta → genera token JWT
  - Devuelve token

- **GET /api/auth/profile**: Ver perfil
  - Verifica token
  - Devuelve datos del usuario

### **routes/recipes.js** - Gestión de Recetas
**¿Qué hace?**
- **GET /api/recipes**: Listar todas las recetas
- **GET /api/recipes/search?q=brownie**: Buscar recetas
- **GET /api/recipes/filter**: Filtrar por categoría/dificultad
- **GET /api/recipes/:id**: Detalle de receta específica
- **POST /api/recipes**: Crear receta nueva (solo editor/admin)
- **PUT /api/recipes/:id**: Editar receta
- **DELETE /api/recipes/:id**: Eliminar receta (solo admin)

### **routes/users.js** - Favoritos y Colecciones
**¿Qué hace?**
- **GET /api/users/favorites**: Ver mis favoritos
- **POST /api/users/favorites/:id**: Guardar en favoritos
- **DELETE /api/users/favorites/:id**: Quitar de favoritos
- **GET /api/users/collections**: Ver mis colecciones
- **POST /api/users/collections**: Crear colección
- **DELETE /api/users/collections/:id**: Eliminar colección

### **routes/comments.js** - Comentarios y Valoraciones
**¿Qué hace?**
- **GET /api/comments/:recipeId**: Ver comentarios de una receta
- **POST /api/comments/:recipeId**: Agregar comentario
- **DELETE /api/comments/:id**: Eliminar comentario
- **POST /api/comments/rate/:recipeId**: Valorar con estrellas

### **middleware/auth.js** - Seguridad
**¿Qué hace?**
- Verifica el **token JWT** en cada petición protegida
- Si el token es válido → permite continuar
- Si es inválido → rechaza (Error 403)

**¿Cuándo se usa?**
- Al guardar favoritos (debes estar logueado)
- Al comentar (debes estar logueado)
- Al crear recetas (debes ser editor/admin)

---

## 🗄️ **BASE DE DATOS - ¿Qué Hay en Cada Tabla?**

### **Tabla: users**
**Guarda:** Todos los usuarios registrados

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| id | Número único de usuario | 1 |
| nombre | Nombre completo | "María García" |
| email | Email para login | "maria@email.com" |
| password_hash | Contraseña encriptada | "$2a$10$abc..." |
| rol | Tipo de usuario | "usuario" / "editor" / "admin" |
| telefono | Teléfono opcional | "3001234567" |
| fecha_registro | Cuándo se registró | "2024-01-15" |

### **Tabla: recipes**
**Guarda:** Todas las recetas

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| id | Número único de receta | 1 |
| nombre | Nombre de la receta | "Brownie de Chocolate" |
| descripcion | Descripción corta | "Delicioso brownie..." |
| categoria | Tipo de postre | "Chocolates" |
| dificultad | Qué tan difícil es | "Fácil" |
| tiempo_preparacion | Minutos | 45 |
| porciones | Para cuántas personas | 8 |
| foto_principal | Nombre de la foto | "brownie.jpg" |
| autor_id | Quién la creó | 2 |

### **Tabla: ingredients**
**Guarda:** Ingredientes de cada receta

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| id | Número único | 1 |
| receta_id | De qué receta es | 1 (Brownie) |
| nombre | Nombre del ingrediente | "Chocolate oscuro" |
| cantidad | Cuánto | 200 |
| unidad | En qué se mide | "gramos" |

### **Tabla: steps**
**Guarda:** Pasos de preparación

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| id | Número único | 1 |
| receta_id | De qué receta | 1 |
| numero_paso | Cuál paso es | 1 |
| descripcion | Qué hacer | "Precalienta el horno a 180°C" |
| foto | Foto del paso (opcional) | NULL |

### **Tabla: favorites**
**Guarda:** Qué recetas guardó cada usuario

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| id | Número único | 1 |
| usuario_id | Quién guardó | 5 |
| receta_id | Qué receta | 1 |
| fecha_guardado | Cuándo | "2024-01-20 14:30:00" |

### **Tabla: collections**
**Guarda:** Colecciones de cada usuario

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| id | Número único | 1 |
| usuario_id | De quién es | 5 |
| nombre | Nombre de la colección | "Para cumpleaños" |
| descripcion | Descripción opcional | "Recetas para fiestas" |

### **Tabla: ratings**
**Guarda:** Valoraciones con estrellas

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| id | Número único | 1 |
| receta_id | Qué receta | 1 |
| usuario_id | Quién valoró | 5 |
| puntuacion | Cuántas estrellas | 5 |
| fecha | Cuándo | "2024-01-20" |

### **Tabla: comments**
**Guarda:** Comentarios en recetas

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| id | Número único | 1 |
| receta_id | En qué receta | 1 |
| usuario_id | Quién comentó | 5 |
| comentario | El comentario | "¡Quedó delicioso!" |
| fecha | Cuándo | "2024-01-20 15:45:00" |

---

## 🔄 **FLUJO COMPLETO - Ejemplo Real**

### Ejemplo: "Guardar una receta en favoritos"

1. **Usuario** hace clic en el corazón ❤️ en recipe-detail.html

2. **JavaScript** (recipes.js) ejecuta:
   ```javascript
   fetchAPI('/api/users/favorites/1', 'POST')
   ```

3. La petición incluye el **token JWT** en el header:
   ```
   Authorization: Bearer eyJhbGc...
   ```

4. **Servidor** (server.js) recibe la petición

5. **Middleware** (auth.js) verifica el token:
   - ✅ Token válido → continúa
   - ❌ Token inválido → Error 403

6. **Backend** (routes/users.js) ejecuta:
   ```javascript
   await db.execute(
     'INSERT INTO favorites VALUES (?, ?, NOW())',
     [usuario_id, receta_id]
   )
   ```

7. **MySQL** guarda en la tabla `favorites`

8. **Backend** responde:
   ```json
   {
     "success": true,
     "message": "Receta agregada a favoritos"
   }
   ```

9. **JavaScript** recibe la respuesta

10. **Frontend** actualiza:
    - Corazón se pone rosa
    - Muestra toast "Receta agregada a favoritos"

¡**TODO EN MENOS DE 1 SEGUNDO**! ⚡

---

## 📝 **RESUMEN PARA TU PRESENTACIÓN**

**Tu aplicación tiene:**

1. **7 páginas HTML** (frontend)
2. **4 archivos JavaScript** (lógica frontend)
3. **5 rutas de API** (backend)
4. **8 tablas en base de datos**
5. **15+ funcionalidades completas**
6. **Diseño responsive** (móvil y escritorio)
7. **Sistema de autenticación** con JWT
8. **Animaciones y efectos** profesionales

**Todo conectado y funcionando** 🎉

---

**¿Tienes alguna pregunta sobre cómo funciona algo?** 😊
