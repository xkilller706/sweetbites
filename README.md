# 🍰 SweetBites - Plataforma de Recetas de Postres

![Estado](https://img.shields.io/badge/Estado-Completo-success)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)
![Licencia](https://img.shields.io/badge/Licencia-MIT-green)

## 📋 Descripción

SweetBites es una plataforma web completa para compartir y descubrir recetas de postres. Permite a los usuarios crear, publicar y organizar recetas, mientras que los administradores moderan el contenido y gestionan la comunidad.

## ✨ Características Principales

- 🔐 **Autenticación JWT** con sistema de roles (Usuario, Editor, Admin)
- 📝 **Wizard de 4 pasos** para crear recetas de forma guiada
- ❤️ **Favoritos y Colecciones** personalizadas
- ⭐ **Sistema de valoraciones** y comentarios
- 👨‍💼 **Panel de Administración** completo con estadísticas
- 🎨 **Diseño Premium** con animaciones y glassmorphism
- 📱 **Responsive** - funciona en móvil, tablet y desktop
- 🔒 **Sistema de aprobación** de recetas antes de publicación

## 🚀 Tecnologías

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- React Hook Form

### Backend
- Node.js
- Express
- MySQL
- JWT (jsonwebtoken)
- Bcrypt
- Multer (upload de imágenes)

## 📁 Estructura del Proyecto

```
SweetBites/
├── frontend/           # Aplicación React
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas (public, user, admin, auth)
│   │   ├── services/     # Servicios API
│   │   ├── context/      # Context API
│   │   └── utils/        # Utilidades
│   └── package.json
│
├── backend/            # API REST con Express
│   ├── routes/          # Endpoints organizados por módulo
│   ├── middleware/      # Auth, validación
│   ├── config/          # Configuración (DB, multer)
│   └── package.json
│
├── database/           # Scripts SQL
│   ├── schema_completo.sql
│   ├── migrations/
│   └── README_MIGRACIONES.md
│
└── Guia/              # Documentación completa
    ├── GUIA_INSTALACION_COMPLETA_PASO_A_PASO.md
    ├── PROYECTO_100_COMPLETO.md
    └── ...
```

## 🛠️ Instalación

### Requisitos Previos
- Node.js 16+
- MySQL 8.0+
- XAMPP (o similar para MySQL)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repo>
cd appnueva
```

2. **Configurar la base de datos**
```bash
# Iniciar MySQL (XAMPP)
# Ejecutar el script de schema
mysql -u root < database/schema_completo.sql
```

3. **Configurar Backend**
```bash
cd backend
npm install

# Crear archivo .env
echo "JWT_SECRET=tu_secreto_super_seguro_aqui_123" > .env
echo "DB_HOST=localhost" >> .env
echo "DB_USER=root" >> .env
echo "DB_PASSWORD=" >> .env
echo "DB_NAME=sweetbites_db" >> .env
echo "PORT=3000" >> .env

# Iniciar servidor
npm start
```

4. **Configurar Frontend**
```bash
cd frontend
npm install

# Crear archivo .env
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Iniciar aplicación
npm run dev
```

5. **Acceder a la aplicación**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 👥 Usuarios de Prueba

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@sweetbites.com | (ver BD) | Admin |
| editor@sweetbites.com | (ver BD) | Editor |

Para crear un nuevo usuario administrador:
```bash
mysql -u root sweetbites_db < database/create_admin_user.sql
```

## 📚 Documentación

La documentación completa está en la carpeta `/Guia/`:

- `GUIA_INSTALACION_COMPLETA_PASO_A_PASO.md` - Instalación detallada
- `PROYECTO_100_COMPLETO.md` - Alcance y funcionalidades
- `GUIA_PRUEBAS_COMPLETA.md` - Manual de pruebas
- `QUE_HACE_CADA_COSA.md` - Explicación de componentes
- `EVALUACION_CRITERIOS.md` - Evaluación técnica del proyecto

## 🎯 Funcionalidades por Rol

### Usuario
- ✅ Registrarse y autenticarse
- ✅ Crear recetas (quedan pendientes de aprobación)
- ✅ Editar/eliminar sus propias recetas
- ✅ Guardar recetas en favoritos
- ✅ Crear colecciones personalizadas
- ✅ Valorar y comentar recetas
- ✅ Ver perfil y estadísticas

### Editor
- ✅ Todo lo de Usuario
- ✅ Crear recetas publicadas directamente

### Administrador
- ✅ Todo lo de Editor
- ✅ Dashboard con estadísticas
- ✅ Gestionar usuarios (cambiar roles, eliminar)
- ✅ Aprobar/rechazar recetas pendientes
- ✅ Gestionar categorías (CRUD)
- ✅ Moderar comentarios

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Validación de datos en frontend y backend
- ✅ Protección contra SQL injection (prepared statements)
- ✅ Middleware de autenticación y autorización
- ✅ Variables de entorno para credenciales

## 📊 Base de Datos

12 tablas principales:
- `users` - Usuarios del sistema
- `categories` - Categorías de recetas
- `recipes` - Recetas publicadas
- `ingredients` - Ingredientes por receta
- `steps` - Pasos de preparación
- `favorites` - Recetas favoritas
- `collections` - Colecciones personalizadas
- `ratings` - Valoraciones
- `comments` - Comentarios
- `notifications` - Sistema de notificaciones
- Y más...

Ver `database/schema_completo.sql` para el esquema completo.

## 🧪 Pruebas

### Endpoints Backend
```bash
# Verificar servidor
curl http://localhost:3000/api/recipes

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test1234!"}'
```

Ver `Guia/GUIA_PRUEBAS_COMPLETA.md` para pruebas manuales detalladas.

## 🐛 Solución de Problemas

### Backend no inicia
- Verificar que MySQL esté corriendo
- Revisar credenciales en `.env`
- Verificar que la base de datos exista

### Frontend no conecta con backend
- Verificar que VITE_API_URL esté correctamente configurado
- Revisar CORS en backend (debería permitir localhost:5173)

### Recetas destacadas no aparecen
```sql
-- Marcar algunas recetas como destacadas
UPDATE recipes SET destacada = TRUE WHERE id IN (1,2,3) LIMIT 3;
```

## 📝 Próximas Mejoras

- [ ] Sistema de recuperación de contraseña
- [ ] Tests unitarios e integración
- [ ] Rate limiting en API
- [ ] Refresh tokens
- [ ] Caché con Redis
- [ ] Despliegue en producción

## 👨‍💻 Autor

Proyecto desarrollado como parte de un curso de desarrollo web full-stack.

## 📄 Licencia

MIT License - Proyecto educativo

---

**Nota:** Para más detalles técnicos, consultar `EVALUACION_CRITERIOS.md`
