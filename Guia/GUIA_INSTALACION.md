# 🍰 GUÍA DE INSTALACIÓN - SWEETBITES

**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Para:** Personas sin experiencia técnica  

Esta guía te llevará paso a paso para instalar y ejecutar SweetBites en tu computadora local.

---

## 📋 TABLA DE CONTENIDOS

1. [Requisitos del Sistema](#requisitos-del-sistema)
2. [Instalación de Software](#instalación-de-software)
3. [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
4. [Instalación del Proyecto](#instalación-del-proyecto)
5. [Configuración de Archivos](#configuración-de-archivos)
6. [Ejecución del Proyecto](#ejecución-del-proyecto)
7. [Acceso al Sistema](#acceso-al-sistema)
8. [Solución de Problemas](#solución-de-problemas)

---

## 🖥️ REQUISITOS DEL SISTEMA

### Sistema Operativo
- ✅ Windows 10 o superior
- ✅ macOS 10.15 o superior
- ✅ Linux (Ubuntu 20.04 o superior)

### Hardware Mínimo
- **RAM:** 4 GB mínimo (8 GB recomendado)
- **Espacio en disco:** 2 GB libres
- **Procesador:** Intel Core i3 o equivalente

---

## 📦 INSTALACIÓN DE SOFTWARE

### 1. Instalar Node.js (v20.x o superior)

**¿Qué es Node.js?** Es el motor que ejecuta el código JavaScript del proyecto.

#### Windows / macOS:

1. Ve a: https://nodejs.org/
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador descargado
4. Haz clic en "Next" en todas las pantallas
5. Marca la casilla "Automatically install necessary tools" si aparece
6. Haz clic en "Install" y espera a que termine

#### Verificar instalación:

Abre una terminal (en Windows: busca "cmd" o "PowerShell"):

```bash
node --version
```

Deberías ver algo como: `v20.11.0` o superior

```bash
npm --version
```

Deberías ver algo como: `10.2.4` o superior

---

### 2. Instalar XAMPP (para MySQL y phpMyAdmin)

**¿Qué es XAMPP?** Es un paquete que incluye MySQL (base de datos) y phpMyAdmin (interfaz web para gestionar la base de datos).

#### Descargar e Instalar:

1. Ve a: https://www.apachefriends.org/
2. Descarga XAMPP para tu sistema operativo
3. Ejecuta el instalador
4. **IMPORTANTE:** Durante la instalación, asegúrate de marcar:
   - ✅ Apache
   - ✅ MySQL
   - ✅ phpMyAdmin
5. Instala en la ruta por defecto: `C:\xampp` (Windows) o `/Applications/XAMPP` (macOS)
6. Completa la instalación

#### Iniciar XAMPP:

1. Abre el **Panel de Control de XAMPP**
2. Haz clic en **"Start"** junto a **Apache**
3. Haz clic en **"Start"** junto a **MySQL**
4. Ambos deben mostrar un fondo verde cuando estén corriendo

**Nota:** Si Apache no inicia, es probable que el puerto 80 esté ocupado. Puedes cambiar el puerto o cerrar el programa que lo esté usando (generalmente Skype o IIS).

---

### 3. Instalar Visual Studio Code (Opcional pero recomendado)

**¿Qué es VS Code?** Es el editor de código que te permite ver y editar los archivos del proyecto.

1. Ve a: https://code.visualstudio.com/
2. Descarga VS Code para tu sistema
3. Instala con las opciones por defecto
4. **IMPORTANTE:** Durante la instalación, marca:
   - ✅ "Add to PATH"
   - ✅ "Add 'Open with Code' action to context menu"

---

## 🗄️ CONFIGURACIÓN DE LA BASE DE DATOS

### Paso 1: Acceder a phpMyAdmin

1. Abre tu navegador (Chrome, Firefox, Edge, etc.)
2. Ve a: http://localhost/phpmyadmin
3. Deberías ver la interfaz de phpMyAdmin

### Paso 2: Importar la Base de Datos

#### Opción A: Importar SQL Completo (RECOMENDADO)

1. En phpMyAdmin, haz clic en **"Importar"** en el menú superior
2. Haz clic en **"Examinar"** o **"Choose File"**
3. Navega a la carpeta del proyecto descomprimido
4. Ve a la carpeta: `database`
5. Selecciona el archivo: **`schema_completo.sql`**
6. Haz clic en **"Continuar"** o **"Go"** en la parte inferior
7. Espera a que termine la importación
8. Deberías ver el mensaje: **"Importación finalizada correctamente"**

#### Verificar la Importación:

1. En el panel izquierdo de phpMyAdmin, haz clic en la base de datos **`sweetbites_db`**
2. Deberías ver las siguientes tablas:
   - ✅ users
   - ✅ categories
   - ✅ recipes
   - ✅ ingredients
   - ✅ steps
   - ✅ favorites
   - ✅ collections
   - ✅ collection_recipes
   - ✅ ratings
   - ✅ comments

3. Haz clic en la tabla **`users`** y luego en **"Examinar"**
4. Deberías ver 4 usuarios creados:
   - admin@sweetbites.com
   - editor@sweetbites.com
   - maria@sweetbites.com
   - juan@sweetbites.com

**Contraseña para todos:** `password123`

---

## 📁 INSTALACIÓN DEL PROYECTO

### Paso 1: Descomprimir el Proyecto

1. Descomprime el archivo `appnueva.zip` que te compartieron
2. Colócalo en una ubicación fácil de encontrar, por ejemplo:
   - Windows: `C:\Proyectos\appnueva`
   - macOS: `/Users/TuNombre/Proyectos/appnueva`

### Paso 2: Instalar Dependencias del Backend

1. Abre una terminal o CMD
2. Navega a la carpeta del backend:

```bash
cd C:\Proyectos\appnueva\backend
```

*Ajusta la ruta según donde hayas descomprimido el proyecto*

3. Instala las dependencias:

```bash
npm install
```

Este proceso puede tomar 2-5 minutos. Verás muchas líneas de texto, es normal.

4. Verifica que se haya creado la carpeta `node_modules` dentro de `backend`

### Paso 3: Instalar Dependencias del Frontend

1. En la misma terminal (o abre una nueva), navega a la carpeta del frontend:

```bash
cd C:\Proyectos\appnueva\frontend
```

2. Instala las dependencias:

```bash
npm install
```

Este proceso puede tomar 3-7 minutos.

3. Verifica que se haya creado la carpeta `node_modules` dentro de `frontend`

---

## ⚙️ CONFIGURACIÓN DE ARCHIVOS

### Configurar el Backend

1. Navega a la carpeta `backend`
2. Verifica que exista el archivo **`.env`**
3. Ábrelo con un editor de texto (VS Code, Notepad, etc.)
4. Asegúrate de que tenga este contenido:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=sweetbites_db

# Configuración de JWT
JWT_SECRET=sweetbites_secreto_super_seguro_2024

# Puerto del Servidor
PORT=3000
```

5. **IMPORTANTE:** Si tu instalación de XAMPP tiene contraseña para MySQL:
   - Cambia `DB_PASSWORD=` por `DB_PASSWORD=tu_contraseña`
   - Por defecto, XAMPP no tiene contraseña, así que déjalo vacío

6. Guarda el archivo

### Verificar Carpeta de Uploads

1. Navega a la carpeta `backend`
2. Verifica que exista la carpeta **`uploads`**
3. Dentro de `uploads`, verifica que exista la carpeta **`recipes`**

Si no existen, créalas manualmente:

```
backend/
  └── uploads/
      ├── recipes/
      └── profiles/
```

---

## 🚀 EJECUCIÓN DEL PROYECTO

### Paso 1: Iniciar el Backend

1. Abre una terminal/CMD
2. Navega a la carpeta del backend:

```bash
cd C:\Proyectos\appnueva\backend
```

3. Inicia el servidor:

```bash
npm start
```

4. Deberías ver este mensaje:

```
╔═══════════════════════════════════════╗
║   🍰 SweetBites Backend Server 🍰    ║
╠═══════════════════════════════════════╣
║   Puerto: 3000                        ║
║   Entorno: Desarrollo                 ║
║   URL: http://localhost:3000          ║
╚═══════════════════════════════════════╝
```

**NO CIERRES ESTA TERMINAL** - El backend debe seguir corriendo.

### Paso 2: Iniciar el Frontend

1. Abre **OTRA** terminal/CMD (nueva ventana)
2. Navega a la carpeta del frontend:

```bash
cd C:\Proyectos\appnueva\frontend
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Deberías ver algo como:

```
  VITE v8.0.12  ready in 823 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**NO CIERRES ESTA TERMINAL** - El frontend debe seguir corriendo.

---

## 🌐 ACCESO AL SISTEMA

### Abrir la Aplicación

1. Abre tu navegador (Chrome recomendado)
2. Ve a: **http://localhost:5173**
3. Deberías ver la página de inicio de SweetBites con animaciones suaves

### Usuarios de Prueba

Puedes iniciar sesión con cualquiera de estos usuarios:

#### Administrador (puede hacer todo)
- **Email:** admin@sweetbites.com
- **Contraseña:** password123
- **Privilegios:** Aprobar/rechazar recetas, gestionar usuarios, ver dashboard completo

#### Editor (puede aprobar recetas)
- **Email:** editor@sweetbites.com
- **Contraseña:** password123
- **Privilegios:** Aprobar/rechazar recetas, crear recetas sin aprobación

#### Usuario Normal - María
- **Email:** maria@sweetbites.com
- **Contraseña:** password123
- **Datos:** Tiene 1 notificación sin leer sobre una receta aprobada

#### Usuario Normal - Juan
- **Email:** juan@sweetbites.com
- **Contraseña:** password123
- **Datos:** Tiene 1 notificación sin leer sobre un nuevo comentario

### Funcionalidades a Probar

#### Como Usuario Normal:
1. ✅ Ver recetas en la página principal con animaciones
2. ✅ Buscar recetas
3. ✅ Filtrar por categoría y dificultad
4. ✅ Ver detalles de una receta
5. ✅ **NUEVO** Valorar recetas con sistema de estrellas (1-5)
6. ✅ **NUEVO** Comentar en recetas
7. ✅ **NUEVO** Ver notificaciones en tiempo real (campana 🔔)
8. ✅ Agregar recetas a favoritos (❤️)
9. ✅ Crear colecciones
10. ✅ Agregar recetas a colecciones
11. ✅ Crear una nueva receta (quedará pendiente de aprobación)
12. ✅ Subir foto de receta al crearla (hasta 5MB)
13. ✅ Ver mis recetas creadas con estados (pendiente/publicada/rechazada)
14. ✅ **NUEVO** Eliminar mis propios comentarios

#### Como Administrador:
1. ✅ Todo lo de usuario normal
2. ✅ Acceder al panel de administración
3. ✅ **NUEVO** Ver dashboard con gráficas animadas y estadísticas visuales
4. ✅ **NUEVO** Gráfica de barras de recetas por categoría
5. ✅ **NUEVO** Anillo de progreso de tasa de aprobación
6. ✅ **NUEVO** Tarjetas de estadísticas con animaciones
7. ✅ Aprobar/Rechazar recetas pendientes
8. ✅ Gestionar usuarios
9. ✅ Cambiar roles de usuarios
10. ✅ Eliminar recetas
11. ✅ **NUEVO** Moderar comentarios (eliminar cualquier comentario)

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Problema 1: "npm no se reconoce como un comando"

**Causa:** Node.js no está instalado o no está en el PATH.

**Solución:**
1. Reinstala Node.js desde https://nodejs.org/
2. Durante la instalación, marca "Add to PATH"
3. Reinicia tu terminal/CMD
4. Verifica con: `node --version`

---

### Problema 2: "Error: Cannot find module..."

**Causa:** Las dependencias no se instalaron correctamente.

**Solución:**
1. Elimina la carpeta `node_modules`
2. Elimina el archivo `package-lock.json`
3. Ejecuta de nuevo: `npm install`

---

### Problema 3: "EADDRINUSE: address already in use"

**Causa:** El puerto 3000 o 5173 ya está siendo usado.

**Solución para el puerto 3000 (backend):**
1. Abre el archivo `backend/.env`
2. Cambia `PORT=3000` por `PORT=3001`
3. Reinicia el backend

**Solución para el puerto 5173 (frontend):**
1. Cierra todas las terminales
2. Busca procesos de Node.js en el Administrador de Tareas
3. Finaliza los procesos de Node.js
4. Vuelve a ejecutar `npm run dev`

---

### Problema 4: "Access denied for user 'root'@'localhost'"

**Causa:** La contraseña de MySQL no coincide con la del archivo `.env`

**Solución:**
1. Abre phpMyAdmin: http://localhost/phpmyadmin
2. Ve a "Cuentas de usuario"
3. Verifica si el usuario `root` tiene contraseña
4. Si tiene contraseña, actualiza `DB_PASSWORD` en el archivo `backend/.env`
5. Si no tiene contraseña, déjalo vacío: `DB_PASSWORD=`

---

### Problema 5: "Cannot connect to database"

**Causa:** MySQL no está corriendo.

**Solución:**
1. Abre el Panel de Control de XAMPP
2. Haz clic en "Start" junto a MySQL
3. Espera a que el fondo se ponga verde
4. Reinicia el backend

---

### Problema 6: "Table doesn't exist" o "Unknown column"

**Causa:** La base de datos no se importó correctamente.

**Solución:**
1. Abre phpMyAdmin: http://localhost/phpmyadmin
2. Haz clic en la base de datos `sweetbites_db` en el panel izquierdo
3. Haz clic en "Operaciones" en el menú superior
4. Haz clic en "Eliminar la base de datos (DROP)"
5. Confirma la eliminación
6. Vuelve a importar el archivo `database/schema_completo.sql`

---

### Problema 7: No se puede subir imagen de receta

**Causa:** La carpeta `uploads` no existe o no tiene permisos.

**Solución:**
1. Navega a `backend/uploads/recipes`
2. Si no existe, créala manualmente
3. En Linux/macOS, asegúrate de dar permisos de escritura:
   ```bash
   chmod -R 755 backend/uploads
   ```

---

### Problema 8: "404 Not Found" al intentar ver una receta

**Causa:** El backend no está corriendo o la URL es incorrecta.

**Solución:**
1. Verifica que el backend esté corriendo en http://localhost:3000
2. Abre http://localhost:3000 en tu navegador - deberías ver un mensaje JSON
3. Si no ves nada, reinicia el backend

---

### Problema 9: Las imágenes de recetas no se ven

**Causa:** Las recetas de ejemplo usan URLs de Unsplash que pueden estar bloqueadas.

**Solución:**
1. Esto es normal para las recetas de ejemplo
2. Las recetas que TÚ crees con imagen subida SÍ se verán correctamente
3. Si quieres que las recetas de ejemplo tengan imagen, créalas de nuevo desde la interfaz

---

### Problema 10: "ERR_CONNECTION_REFUSED" en el navegador

**Causa:** El frontend no está corriendo o la URL es incorrecta.

**Solución:**
1. Verifica que ejecutaste `npm run dev` en la carpeta `frontend`
2. Verifica la URL en la terminal - puede ser http://localhost:5173 o http://localhost:5174
3. Usa la URL exacta que muestra la terminal

---

## 📞 CONTACTO Y AYUDA

Si después de seguir esta guía aún tienes problemas:

1. **Revisa los mensajes de error** - Cópialos completos
2. **Verifica que XAMPP esté corriendo** - Apache y MySQL en verde
3. **Verifica que ambas terminales estén abiertas** - Backend y frontend
4. **Revisa la consola del navegador** - Presiona F12 y ve a la pestaña "Console"

---

## ✅ CHECKLIST FINAL

Antes de reportar un problema, verifica esta lista:

- [ ] Node.js instalado y funcionando (`node --version`)
- [ ] XAMPP instalado con MySQL y Apache corriendo
- [ ] Base de datos importada en phpMyAdmin
- [ ] Archivo `backend/.env` configurado correctamente
- [ ] Carpeta `backend/node_modules` existe
- [ ] Carpeta `frontend/node_modules` existe
- [ ] Carpeta `backend/uploads/recipes` existe
- [ ] Backend corriendo en terminal 1 (puerto 3000)
- [ ] Frontend corriendo en terminal 2 (puerto 5173)
- [ ] Navegador abierto en http://localhost:5173

---

## 🎉 ¡LISTO!

Si completaste todos los pasos, SweetBites debería estar funcionando correctamente en tu computadora.

**Disfruta explorando el proyecto y creando deliciosas recetas** 🍰

---

**Última actualización:** Mayo 2026  
**Versión de la guía:** 1.0
