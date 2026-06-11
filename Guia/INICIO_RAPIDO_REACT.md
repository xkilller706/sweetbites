# 🚀 Inicio Rápido - SweetBites React

## ⚡ 3 Pasos para Ejecutar la App

### 1️⃣ Ejecutar Migraciones SQL (SOLO LA PRIMERA VEZ)

**Abrir phpMyAdmin:** http://localhost/phpmyadmin

**Seleccionar base de datos:** `sweetbites_db`

**Ejecutar en orden:**

```sql
-- PASO 1: Copiar y pegar todo el contenido de:
-- database/migrations/001_add_categories_table.sql
-- Hacer clic en "Continuar"

-- PASO 2: Copiar y pegar todo el contenido de:
-- database/migrations/002_modify_recipes_categoria.sql  
-- Hacer clic en "Continuar"

-- PASO 3 (Opcional): Copiar y pegar:
-- database/migrations/003_add_notifications_table.sql
-- Hacer clic en "Continuar"
```

✅ **Verificación:** Ejecutar `SELECT * FROM categories;` debe mostrar 7 categorías.

---

### 2️⃣ Iniciar Backend

**Abrir Terminal 1:**
```bash
cd "C:\Users\Luis Serna\Desktop\appnueva\backend"
npm run dev
```

✅ **Debe aparecer:**
```
🍰 SweetBites Backend Server 🍰
Puerto: 3000
```

**¡No cerrar esta terminal!**

---

### 3️⃣ Iniciar Frontend

**Abrir Terminal 2:**
```bash
cd "C:\Users\Luis Serna\Desktop\appnueva\frontend"
npm run dev
```

✅ **Debe aparecer:**
```
Local: http://localhost:5173/
```

**Abrir en navegador:** http://localhost:5173

---

## 🎯 Primeros Pasos

### Crear Usuario

1. Ir a http://localhost:5173/auth/register
2. Llenar formulario:
   - Nombre: Tu nombre
   - Email: tucorreo@email.com
   - Contraseña: mínimo 8 caracteres
3. Hacer clic en **"Crear Cuenta"**
4. Iniciar sesión en `/auth/login`

### Convertir Usuario en Admin

1. Ir a http://localhost/phpmyadmin
2. Base de datos `sweetbites_db`
3. Tabla `users`
4. Editar tu usuario
5. Cambiar `rol` de `usuario` a `admin`
6. Guardar
7. Cerrar sesión y volver a iniciar sesión

---

## 📱 Funciones Disponibles

### ✅ Ya Funciona:
- 🏠 Landing page
- 🔐 Login/Registro
- 📋 Catálogo de recetas
- 🔍 Búsqueda y filtros
- 🎨 Diseño verde menta/beige

### 🚧 En Desarrollo:
- Detalle de receta
- Crear receta
- Panel admin
- Favoritos
- Perfil de usuario

---

## ⚠️ Solución de Problemas

### Backend no inicia:
```bash
# Verificar que MySQL esté corriendo en XAMPP
# Verificar que puerto 3000 esté libre
```

### Frontend no carga:
```bash
# Reinstalar dependencias:
cd frontend
npm install
npm run dev
```

### Error de base de datos:
```sql
-- Verificar que exista la base de datos:
SHOW DATABASES LIKE 'sweetbites_db';

-- Verificar que existan las tablas:
SHOW TABLES;

-- Debe aparecer categories
```

---

## 🎨 Colores Disponibles en Tailwind

```jsx
// Verde menta (principal)
<div className="bg-primary text-white">...</div>

// Verde agua (secundario)  
<div className="bg-secondary text-white">...</div>

// Beige cálido (fondo)
<div className="bg-neutral-beige">...</div>

// Acentos pastel
<div className="bg-accent-blue">...</div>      // Azul
<div className="bg-accent-lavender">...</div>   // Lavanda
<div className="bg-accent-yellow">...</div>     // Amarillo
```

---

## 📦 Componentes Disponibles

```jsx
import Button from '@components/common/Button'
import Card from '@components/common/Card'
import Input from '@components/common/Input'
import Badge from '@components/common/Badge'
import Modal from '@components/common/Modal'
import Spinner from '@components/common/Spinner'

// Uso:
<Button variant="primary">Click me</Button>
<Badge variant="success">Aprobada</Badge>
<Card hover>Contenido...</Card>
```

---

## 🔥 Comandos Útiles

```bash
# Ver estado de tareas
/task list

# Limpiar cache
rm -rf node_modules
npm install

# Build de producción
npm run build
```

---

**¡Listo! Ya puedes empezar a usar SweetBites 🍰**
