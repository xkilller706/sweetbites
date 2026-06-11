# 🍰 SweetBites - Plataforma de Recetas Premium

**Aplicación web completa de recetas de postres - Proyecto SENA 2026**

[![Node.js](https://img.shields.io/badge/Node.js-v24.13.0-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## 📋 ¿Qué es SweetBites?

SweetBites es una plataforma web moderna y completa para descubrir, crear y compartir recetas de postres. Con un diseño premium, animaciones suaves y funcionalidades avanzadas de gestión.

### ✨ Características Principales

**Para Usuarios:**
- ✅ Explorar catálogo de recetas con filtros avanzados
- ✅ Crear recetas con wizard de 4 pasos + subida de imágenes
- ✅ Sistema de favoritos y colecciones personalizadas
- ✅ Valorar recetas con estrellas (1-5) ⭐
- ✅ Comentar en recetas y ver comentarios 💬
- ✅ Notificaciones en tiempo real 🔔
- ✅ Calculadora automática de porciones
- ✅ Modo Cocina para seguir paso a paso
- ✅ Perfil personalizado

**Para Administradores:**
- ✅ Dashboard con gráficas animadas (barras, anillos de progreso)
- ✅ Estadísticas visuales en tiempo real con animaciones
- ✅ Gestión completa de usuarios (roles, eliminar)
- ✅ Aprobar/rechazar recetas enviadas
- ✅ Moderación de comentarios (eliminar)
- ✅ Sistema de categorías con iconos

**Diseño Premium:**
- ✅ Animaciones con Framer Motion
- ✅ Skeleton loaders
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Gradientes y efectos hover
- ✅ Componentes UI reutilizables

---

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** v24.13.0
- **Express.js** - Framework web minimalista
- **MySQL** - Base de datos relacional
- **JWT** - Autenticación con tokens
- **bcryptjs** - Hash seguro de contraseñas
- **cors** - Manejo de CORS

### Frontend
- **React** 19 - Biblioteca UI declarativa
- **Vite** - Build tool ultra-rápido
- **React Router DOM** v7 - Enrutamiento
- **Tailwind CSS** v3.4.0 - Framework CSS utility-first
- **Framer Motion** - Animaciones suaves
- **Lucide React** - Iconos modernos
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de schemas
- **Axios** - Cliente HTTP
- **react-hot-toast** - Notificaciones elegantes

### DevOps
- **XAMPP** - Entorno de desarrollo local
- **phpMyAdmin** - Gestión visual de MySQL
- **VS Code** - Editor de código recomendado

---

## 📥 Instalación Rápida

### Requisitos Previos

1. **Node.js** v20.0.0 o superior
   - Descargar: https://nodejs.org/
   - Verificar: `node --version`

2. **XAMPP** (MySQL)
   - Descargar: https://www.apachefriends.org/
   - Iniciar MySQL en XAMPP Control Panel

### Paso 1: Clonar o Descargar el Proyecto

```bash
# Si tienes Git
git clone <url-del-repositorio>
cd appnueva

# O simplemente descomprimir el ZIP y extraer
```

### Paso 2: Configurar Base de Datos

⭐ **IMPORTANTE:** Usa el archivo SQL completo actualizado

1. Abrir phpMyAdmin: http://localhost/phpmyadmin
2. Haz clic en "Importar" en el menú superior
3. Selecciona el archivo: **`database/schema_completo.sql`**
4. Haz clic en "Continuar" y espera a que termine

Esto creará:
- ✅ La base de datos `sweetbites_db`
- ✅ Todas las tablas (incluyendo `collection_recipes`)
- ✅ 7 categorías de recetas
- ✅ 4 usuarios de prueba
- ✅ 6 recetas de ejemplo con ingredientes y pasos

### Paso 3: Backend

```bash
cd backend
npm install
npm start
```

Debe aparecer:
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

**¡Importante!** Dejar esta terminal abierta.

### Paso 4: Frontend

```bash
# Abrir NUEVA terminal
cd frontend
npm install
npm run dev
```

Debe aparecer:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Paso 5: Abrir la Aplicación

Ir a: **http://localhost:5173**

---

## 👤 Usuarios de Prueba

Si importaste `database/schema_completo.sql`, tienes estos usuarios:

| Rol | Email | Password |
|-----|-------|----------|
| Admin | admin@sweetbites.com | password123 |
| Editor | editor@sweetbites.com | password123 |
| Usuario | maria@sweetbites.com | password123 |
| Usuario | juan@sweetbites.com | password123 |

**O crea tu propia cuenta** desde el botón "Registrarse".

---

## 📁 Estructura del Proyecto

```
appnueva/
├── backend/                    # Servidor Node.js + Express
│   ├── config/                 # Configuración (DB)
│   ├── middleware/             # Auth middleware
│   ├── routes/                 # Endpoints API (8 archivos)
│   ├── .env                    # Variables de entorno
│   ├── index.js                # Entry point
│   └── package.json
│
├── frontend/                   # Cliente React + Vite
│   ├── public/                 # Archivos estáticos
│   ├── src/
│   │   ├── components/         # Componentes React (20+)
│   │   │   ├── auth/           # AdminRoute, ProtectedRoute
│   │   │   ├── common/         # Button, Input, Card, Badge, etc.
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── recipes/        # RecipeCard
│   │   │   └── ui/             # Table, Dialog, Tabs, Select, Skeleton
│   │   ├── context/            # AuthContext
│   │   ├── pages/              # Páginas (18 archivos)
│   │   │   ├── admin/          # Dashboard, Users, RecipeApproval, etc.
│   │   │   ├── auth/           # Login, Register
│   │   │   ├── public/         # Home, Recipes, RecipeDetail, About, Contact
│   │   │   └── user/           # Profile, Favorites, CreateRecipe, MyRecipes
│   │   ├── services/           # API services (6 archivos)
│   │   ├── utils/              # Helpers, cn utility
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── router.jsx          # Configuración de rutas
│   │   └── index.css
│   ├── .env                    # Variables frontend
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── database/                   # Archivos SQL
│   ├── schema.sql              # Esquema completo
│   ├── migrations/             # Migraciones
│   ├── seed_recetas_ejemplo.sql
│   └── create_admin_user.sql
│
├── README.md                   # Este archivo
└── PROYECTO_100_COMPLETO.md    # Documentación detallada
```

---

## 🚀 Funcionalidades Implementadas

### 🔐 Autenticación
- Registro con validación completa
- Login con JWT
- Rutas protegidas (usuario y admin)
- Sesión persistente

### 🍰 Recetas

**Crear Receta (Wizard de 4 Pasos):**
1. Información básica (nombre, categoría, dificultad, tiempo, porciones)
2. Ingredientes dinámicos (agregar/eliminar)
3. Pasos de preparación numerados
4. Preview y confirmación

**Ver Recetas:**
- Grid responsive con RecipeCards premium
- Filtros por categoría
- Sistema de favoritos integrado
- Detalle completo con ajuste de porciones

**Mis Recetas:**
- Filtros por estado (Todas/Pendientes/Publicadas/Rechazadas)
- Ver motivo de rechazo
- Badges de estado

### ❤️ Favoritos y Colecciones
- Agregar/quitar favoritos con botón corazón
- Crear colecciones personalizadas
- Organizar recetas en colecciones
- Ver recetas de una colección

### 👨‍💼 Panel Admin

**Dashboard:**
- Stats cards animadas (usuarios, recetas, pendientes, comentarios)
- Usuarios recientes con avatares
- Recetas pendientes con preview
- Quick actions

**Gestión:**
- Usuarios (cambiar rol, eliminar)
- Recetas (aprobar, rechazar, eliminar)
- Comentarios (moderar, eliminar)

---

## 🎨 Diseño y UX

### Componentes UI Premium
- **Table** - Tablas con hover effects
- **Dialog** - Modales animados con backdrop blur
- **Tabs** - Sistema de pestañas con Context API
- **Select** - Dropdowns estilizados
- **Skeleton** - Loading placeholders con pulse

### Animaciones
- Fade in/out con Framer Motion
- Stagger effects en listas
- Hover effects en cards (`hover:y: -4`)
- Spring animations en modales

### Responsive
- Mobile-first design
- Breakpoints: sm, md, lg, xl
- Grid adaptativo
- Menú hamburguesa en móvil

---

## 📡 API Endpoints

### Autenticación
```
POST /api/auth/register    - Registrar usuario
POST /api/auth/login       - Login
GET  /api/auth/verify      - Verificar token
```

### Recetas
```
GET    /api/recipes
GET    /api/recipes/my-recipes
GET    /api/recipes/:id
POST   /api/recipes
PUT    /api/recipes/:id
DELETE /api/recipes/:id
```

### Usuarios
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/favorites
POST   /api/users/favorites/:recipeId
DELETE /api/users/favorites/:recipeId
GET    /api/users/collections
POST   /api/users/collections
GET    /api/users/collections/:id
DELETE /api/users/collections/:id
POST   /api/users/collections/:id/recipes/:recipeId
DELETE /api/users/collections/:id/recipes/:recipeId
```

### Admin (Requiere rol: admin)
```
GET    /api/admin/stats
GET    /api/admin/recent-users
GET    /api/admin/pending-recipes-summary
GET    /api/admin/users
PUT    /api/admin/users/:id/role
DELETE /api/admin/users/:id
GET    /api/admin/recipes
GET    /api/admin/recipes/pending
PUT    /api/admin/recipes/:id/approve
PUT    /api/admin/recipes/:id/reject
DELETE /api/admin/recipes/:id
GET    /api/admin/comments
DELETE /api/admin/comments/:id
```

**Total: 40+ endpoints**

Ver documentación completa en: `PROYECTO_100_COMPLETO.md`

---

## 🔧 Scripts Disponibles

### Backend
```bash
npm start       # Iniciar servidor (producción)
npm run dev     # Iniciar con nodemon (desarrollo)
```

### Frontend
```bash
npm run dev     # Servidor de desarrollo (http://localhost:5173)
npm run build   # Build para producción
npm run preview # Preview del build
```

---

## 🐛 Solución de Problemas

### Backend no se conecta a MySQL
1. Verificar que MySQL esté corriendo en XAMPP (botón verde)
2. Verificar que exista la base de datos `sweetbites_db`
3. Revisar credenciales en `backend/.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=sweetbites_db
   ```

### Frontend muestra pantalla en blanco
1. Abrir consola del navegador (F12)
2. Ver errores en la pestaña "Console"
3. Verificar que el backend esté corriendo
4. Verificar que `frontend/.env` tenga:
   ```
   VITE_API_URL=http://localhost:3000
   ```

### npm install falla
1. Verificar Node.js: `node --version` (debe ser v24+)
2. Eliminar carpeta `node_modules`
3. Eliminar archivo `package-lock.json`
4. Ejecutar `npm install` de nuevo

### Puerto 3000 ya está en uso
1. Detener otros procesos en puerto 3000
2. O cambiar puerto en `backend/index.js`:
   ```javascript
   const PORT = process.env.PORT || 3001
   ```

---

## 📸 Capturas

Ver documentación completa con capturas en: `PROYECTO_100_COMPLETO.md`

---

## ✅ Checklist de Funcionalidades

### Core
- [x] Sistema de autenticación JWT
- [x] Registro de usuarios
- [x] Login con redirección por rol
- [x] Rutas protegidas
- [x] CRUD completo de recetas
- [x] Wizard de 4 pasos
- [x] Sistema de favoritos
- [x] Sistema de colecciones
- [x] Ratings y comentarios

### Admin
- [x] Dashboard con estadísticas
- [x] Gestión de usuarios
- [x] Aprobar/rechazar recetas
- [x] Moderación de comentarios

### UI/UX
- [x] Diseño responsive
- [x] Animaciones premium
- [x] Skeleton loaders
- [x] Toast notifications
- [x] Modales de confirmación
- [x] EmptyStates
- [x] Hover effects

---

## 📝 Variables de Entorno

### backend/.env
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=sweetbites_db
JWT_SECRET=tu_clave_secreta_super_segura_123
NODE_ENV=development
```

### frontend/.env
```env
VITE_API_URL=http://localhost:3000
```

---

## 🤝 Contribuir

Este es un proyecto académico del SENA. Cualquier mejora o sugerencia es bienvenida.

---

## 📄 Licencia

MIT License - Ver archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Luis Serna**  
Proyecto Final - SENA 2026  
Stack: MERN (MySQL + Express + React + Node.js)

---

## 🎯 Estado del Proyecto

**✅ 100% COMPLETO Y FUNCIONAL**

- ✅ Backend robusto (40+ endpoints)
- ✅ Frontend premium (18 páginas)
- ✅ Admin dashboard completo
- ✅ Diseño responsive
- ✅ Animaciones suaves
- ✅ Código limpio y documentado

**¡Listo para producción!** 🚀

---

## 📚 Recursos Adicionales

- **Documentación completa:** `PROYECTO_100_COMPLETO.md`
- **Tutorial de instalación:** `TUTORIAL_INSTALACION_COMPLETA.md`
- **Guía de implementación:** `ESTADO_PROYECTO_FINAL.md`

---

**¿Preguntas? Revisa la documentación o abre un issue.** 🍰

---

*Desarrollado con ❤️ para el SENA - Mayo 2026*
