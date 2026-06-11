# 📚 Guía de Uso Completa - SweetBites Recetas

## Tabla de Contenido

1. [Introducción](#introducción)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Explicación del Código](#explicación-del-código)
4. [Funcionalidades Detalladas](#funcionalidades-detalladas)
5. [Flujo de Datos](#flujo-de-datos)
6. [Personalización](#personalización)

---

## Introducción

SweetBites es una aplicación web fullstack (frontend + backend + base de datos) diseñada para gestionar recetas de postres. Está construida con tecnologías simples pero poderosas que permiten crear una aplicación profesional.

### ¿Por qué estas tecnologías?

- **Node.js**: Permite usar JavaScript tanto en el frontend como en el backend
- **MySQL**: Base de datos robusta y ampliamente utilizada
- **Express**: Framework minimalista para crear APIs
- **Tailwind CSS**: Framework de CSS que facilita el diseño
- **JWT**: Estándar de la industria para autenticación

---

## Arquitectura del Proyecto

### Estructura de Carpetas Explicada

```
appnueva/
│
├── backend/                    # Servidor Node.js
│   ├── config/
│   │   └── database.js         # Conexión a MySQL
│   ├── routes/                 # Rutas del API REST
│   │   ├── auth.js             # Maneja login/registro
│   │   ├── recipes.js          # CRUD de recetas
│   │   ├── users.js            # Favoritos y colecciones
│   │   └── comments.js         # Comentarios y valoraciones
│   ├── middleware/
│   │   └── auth.js             # Verificación de tokens JWT
│   ├── uploads/                # Fotos subidas por usuarios
│   ├── .env                    # Variables de configuración
│   ├── package.json            # Dependencias Node
│   └── server.js               # Archivo principal
│
├── frontend/                   # Interfaz de usuario
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css      # Estilos personalizados
│   │   └── js/
│   │       ├── main.js         # Funciones comunes
│   │       ├── auth.js         # Lógica de autenticación
│   │       ├── recipes.js      # Lógica de recetas
│   │       └── comments.js     # Lógica de comentarios
│   ├── index.html              # Página de inicio
│   ├── login.html              # Login/Registro
│   ├── recipes.html            # Catálogo
│   ├── recipe-detail.html      # Detalle de receta
│   └── favorites.html          # Favoritos del usuario
│
├── database/
│   └── schema.sql              # Estructura de BD + datos
│
└── docs/
    └── GUIA_DE_USO.md          # Este archivo
```

### Flujo de Comunicación

```
Usuario (Navegador)
    ↓
Frontend (HTML + JS)
    ↓
API REST (Express)
    ↓
Base de Datos (MySQL)
```

---

## Explicación del Código

### Backend

#### server.js - Servidor Principal

Este archivo es el corazón del backend. Hace lo siguiente:

1. **Importa librerías necesarias**:
   ```javascript
   const express = require('express');  // Framework web
   const cors = require('cors');        // Permitir peticiones del frontend
   ```

2. **Configura middlewares**:
   ```javascript
   app.use(cors());              // Permitir CORS
   app.use(express.json());      // Parsear JSON
   ```

3. **Define rutas**:
   ```javascript
   app.use('/api/auth', authRoutes);      // Login/Registro
   app.use('/api/recipes', recipesRoutes); // Recetas
   ```

4. **Inicia el servidor**:
   ```javascript
   app.listen(PORT, () => {...});  // Puerto 3000
   ```

#### routes/auth.js - Autenticación

**Registro (`POST /api/auth/register`):**
1. Valida datos (email, contraseña, etc.)
2. Verifica que el email no exista
3. Encripta la contraseña con bcrypt
4. Inserta el usuario en la BD
5. Responde con éxito o error

**Login (`POST /api/auth/login`):**
1. Busca usuario por email
2. Verifica contraseña con bcrypt
3. Genera token JWT
4. Envía token al frontend
5. Frontend guarda token en localStorage

#### middleware/auth.js - Protección de Rutas

Este middleware verifica el token JWT en cada petición protegida:

```javascript
const token = req.headers['authorization'];  // Obtener token
const decoded = jwt.verify(token, secret);   // Verificar
req.user = decoded;                          // Guardar info
next();                                      // Continuar
```

Si el token es inválido, rechaza la petición.

### Frontend

#### main.js - Funciones Comunes

**fetchAPI()** - Función para hacer peticiones:
```javascript
async function fetchAPI(endpoint, method, body) {
    // 1. Configurar petición
    // 2. Agregar token si existe
    // 3. Enviar petición
    // 4. Retornar respuesta
}
```

**showToast()** - Notificaciones:
```javascript
function showToast(message, type) {
    // 1. Mostrar mensaje
    // 2. Aplicar color según tipo
    // 3. Ocultar después de 3s
}
```

#### auth.js - Autenticación

**handleLogin()** - Iniciar sesión:
1. Obtener datos del formulario
2. Enviar a `/api/auth/login`
3. Guardar token en localStorage
4. Redirigir a catálogo

**handleRegister()** - Registrarse:
1. Validar que las contraseñas coincidan
2. Validar longitud mínima
3. Enviar a `/api/auth/register`
4. Mostrar mensaje de éxito
5. Cambiar a pestaña de login

#### recipes.js - Gestión de Recetas

**loadRecipes()** - Cargar catálogo:
1. Hacer petición a `/api/recipes`
2. Guardar recetas en array
3. Mostrar en grid

**applyFilters()** - Filtrar recetas:
1. Obtener valores de filtros
2. Filtrar array de recetas
3. Volver a mostrar

**loadRecipeDetail()** - Detalle:
1. Obtener ID de la URL
2. Pedir receta a `/api/recipes/:id`
3. Mostrar información
4. Cargar ingredientes y pasos

**Calculadora de Porciones:**
```javascript
function adjustServings(change) {
    currentServings += change;  // +1 o -1
    // Recalcular cantidades de ingredientes
    cantidad_nueva = cantidad_original * (currentServings / originalServings);
}
```

**Modo Cocina:**
1. Entrar en pantalla completa
2. Mostrar un paso a la vez
3. Botones para navegar
4. Salir con X

---

## Funcionalidades Detalladas

### 1. Sistema de Autenticación

**¿Cómo funciona JWT?**

1. Usuario hace login con email/contraseña
2. Backend verifica credenciales
3. Backend genera un token único:
   ```
   Token = header.payload.signature
   ```
4. Frontend guarda token en localStorage
5. En cada petición, frontend envía:
   ```
   Authorization: Bearer <token>
   ```
6. Backend verifica el token antes de responder

**Ventajas:**
- No necesita sesiones en el servidor
- Seguro (firma criptográfica)
- Expira automáticamente (7 días)

### 2. Búsqueda y Filtros

**Búsqueda en Tiempo Real:**
- Espera 300ms después de que el usuario deja de escribir (debounce)
- Busca en: nombre, descripción de receta
- Muestra resultados instantáneamente

**Filtros Combinables:**
- Categoría: Tortas, Galletas, etc.
- Dificultad: Fácil, Intermedio, Difícil
- Se pueden combinar múltiples filtros

### 3. Favoritos y Colecciones

**Favoritos:**
- Tabla `favorites` relaciona usuarios con recetas
- Clic en corazón → POST a `/api/users/favorites/:id`
- Ver favoritos → GET a `/api/users/favorites`

**Colecciones:**
- Agrupar recetas por tema
- Ejemplo: "Para cumpleaños", "Sin gluten"
- Cada usuario puede crear hasta 20 colecciones

### 4. Comentarios y Valoraciones

**Comentarios:**
- Requieren autenticación
- Se guardan con usuario y fecha
- Solo el autor o admin puede eliminar

**Valoraciones:**
- 1-5 estrellas
- Se calcula promedio automáticamente
- Un usuario solo puede valorar una vez por receta

### 5. Modo Cocina

**Características:**
- Pantalla completa (Fullscreen API)
- Un paso a la vez
- Texto grande (24px mínimo)
- Botones grandes (80px)
- Indicador de progreso

**Implementación:**
```javascript
function startCookingMode() {
    // 1. Mostrar overlay
    // 2. Entrar en fullscreen
    // 3. Iniciar en paso 1
}
```

---

## Flujo de Datos

### Ejemplo: Ver Detalle de Receta

1. **Usuario hace clic** en tarjeta de receta
2. **Navegador abre** `recipe-detail.html?id=1`
3. **JavaScript lee** parámetro `id` de la URL
4. **Frontend envía** GET a `/api/recipes/1`
5. **Backend consulta** MySQL:
   ```sql
   SELECT * FROM recipes WHERE id = 1
   SELECT * FROM ingredients WHERE receta_id = 1
   SELECT * FROM steps WHERE receta_id = 1
   ```
6. **Backend responde** con JSON:
   ```json
   {
     "success": true,
     "recipe": {
       "id": 1,
       "nombre": "Brownie",
       "ingredients": [...],
       "steps": [...]
     }
   }
   ```
7. **Frontend muestra** datos en HTML

### Ejemplo: Guardar en Favoritos

1. **Usuario hace clic** en corazón
2. **Frontend envía** POST a `/api/users/favorites/1` con token
3. **Middleware verifica** token JWT
4. **Backend inserta** en tabla `favorites`:
   ```sql
   INSERT INTO favorites (usuario_id, receta_id, fecha_guardado)
   VALUES (5, 1, NOW())
   ```
5. **Backend responde** con éxito
6. **Frontend actualiza** UI (corazón relleno)

---

## Personalización

### Cambiar Colores

Editar `frontend/assets/css/styles.css`:

```css
:root {
    --verde-menta: #6BD080;   /* Cambiar a tu color */
    --verde-agua: #A4C3B2;
    --rosa-claro: #EEC6CA;
    --rosa-vivo: #FFB7C3;     /* Color principal */
}
```

Y en los archivos HTML, actualizar la configuración de Tailwind:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'rosa-vivo': '#TU_COLOR',
            }
        }
    }
}
```

### Agregar Nueva Categoría

1. **Actualizar enum en MySQL**:
   ```sql
   ALTER TABLE recipes MODIFY categoria
   ENUM('Tortas', 'Galletas', ..., 'TU_CATEGORIA');
   ```

2. **Agregar en filtros HTML** (`recipes.html`):
   ```html
   <option value="TU_CATEGORIA">Tu Categoría</option>
   ```

3. **Agregar emoji** en `recipes.js`:
   ```javascript
   const emojis = {
       'TU_CATEGORIA': '🎂',
       ...
   };
   ```

### Agregar Nuevo Campo a Recetas

1. **Agregar columna en BD**:
   ```sql
   ALTER TABLE recipes ADD COLUMN nuevo_campo VARCHAR(100);
   ```

2. **Actualizar INSERT en** `routes/recipes.js`:
   ```javascript
   INSERT INTO recipes (..., nuevo_campo) VALUES (..., ?)
   ```

3. **Mostrar en frontend** en `recipe-detail.html`:
   ```html
   <p>${recipe.nuevo_campo}</p>
   ```

---

## Glosario Técnico

**API REST**: Interfaz para comunicación entre frontend y backend usando HTTP

**JWT**: JSON Web Token - sistema de autenticación sin sesiones

**Middleware**: Función que se ejecuta antes de procesar una petición

**CORS**: Cross-Origin Resource Sharing - permite peticiones entre dominios diferentes

**bcrypt**: Librería para encriptar contraseñas de forma segura

**localStorage**: Almacenamiento del navegador para guardar datos

**Promise**: Objeto que representa una operación asíncrona

**async/await**: Sintaxis moderna para manejar promesas

**Arrow function**: `() => {}` - función de JavaScript

**Template literal**: `` `texto ${variable}` `` - strings con variables

**Destructuring**: `const { nombre, email } = objeto`

**Spread operator**: `...array` - expandir array

---

## Consejos de Desarrollo

### Debugging

1. **Console.log** es tu amigo:
   ```javascript
   console.log('Usuario:', user);
   ```

2. **Abrir DevTools** (F12 en el navegador):
   - Console: Ver errores de JavaScript
   - Network: Ver peticiones HTTP
   - Application: Ver localStorage

3. **Revisar errores del backend** en la terminal donde corre Node.js

### Mejoras Futuras

Ideas para expandir el proyecto:

- [ ] Subir fotos de recetas reales
- [ ] Exportar recetas a PDF
- [ ] Compartir recetas por WhatsApp
- [ ] Temporizador integrado
- [ ] Lista de compras generada automáticamente
- [ ] Modo oscuro
- [ ] Multiidioma (español/inglés)
- [ ] Recetas en video
- [ ] Foro de cocina

---

**¡Éxito con tu proyecto! 🍰**
