# 🍰 GUÍA ULTRA DETALLADA PARA EJECUTAR SWEETBITES (PARA PRINCIPIANTES)

## 📋 PASO 0: DESCARGAR LO QUE NECESITAS

### ¿Qué necesitas tener instalado?

✅ **Ya tienes:**
- VS Code (editor de código)
- XAMPP (servidor local)

❓ **¿Tienes Node.js instalado?**

Vamos a verificar:

1. **Presiona las teclas:** `Windows + R` (se abre una ventana pequeña)
2. **Escribe:** `cmd` 
3. **Presiona:** Enter
4. **En la ventana negra que se abre, escribe:** `node --version`
5. **Presiona:** Enter

**¿Qué pasó?**

- ✅ **Si ves algo como:** `v18.17.0` o `v20.11.0` → ¡Perfecto! Ya tienes Node.js
- ❌ **Si dice:** "node no se reconoce como un comando..." → Necesitas instalar Node.js

---

### SI NO TIENES NODE.JS - DESCÁRGALO AQUÍ:

1. **Abre tu navegador** (Chrome, Edge, Firefox)
2. **Ve a:** https://nodejs.org/
3. **Verás 2 botones grandes:**
   - Uno dice "LTS" (Recomendado)
   - Otro dice "Current"
4. **HAZ CLIC EN:** "LTS" (el verde)
5. **Se descargará un archivo** (ejemplo: `node-v20.11.0-x64.msi`)
6. **Cuando termine la descarga:**
   - Abre el archivo descargado
   - Haz clic en "Next" → "Next" → "Next" → "Install"
   - Espera 2-3 minutos
   - Haz clic en "Finish"
7. **Cierra la ventana CMD** (si la tenías abierta) y **ábrela de nuevo**
8. **Escribe:** `node --version` (ahora sí debería funcionar)

---

## 📋 PASO 1: ABRIR Y CONFIGURAR XAMPP

### 1.1 Abrir XAMPP Control Panel

1. **Presiona la tecla Windows** (la de la banderita)
2. **Escribe:** "XAMPP"
3. **Haz clic en:** "XAMPP Control Panel"
4. **Se abrirá una ventana con botones verdes**

### 1.2 Iniciar Apache y MySQL

En la ventana de XAMPP Control Panel:

1. **Busca la línea que dice "Apache"**
2. **Haz clic en el botón "Start"** (al lado de Apache)
   - El fondo se pondrá **verde claro**
   - Dirá "Running" (corriendo)

3. **Busca la línea que dice "MySQL"**
4. **Haz clic en el botón "Start"** (al lado de MySQL)
   - El fondo se pondrá **verde claro**
   - Dirá "Running" (corriendo)

**¿Qué pasa si sale un error?**
- Si dice "Port 80 is already in use" (Puerto 80 ya está en uso):
  - Cierra Skype o cualquier programa que use internet
  - O cambia el puerto en XAMPP (pero eso es más complicado)

**💡 IMPORTANTE:** Deja esta ventana abierta. XAMPP debe estar corriendo todo el tiempo.

---

## 📋 PASO 2: CREAR LA BASE DE DATOS

### 2.1 Abrir phpMyAdmin

1. **Abre tu navegador** (Chrome, Edge, Firefox)
2. **En la barra de direcciones escribe:** `http://localhost/phpmyadmin`
3. **Presiona:** Enter
4. **Se abrirá phpMyAdmin** (una página con tablas y menús)

### 2.2 Crear la base de datos "sweetbites_db"

1. **En phpMyAdmin, del lado izquierdo verás una lista de bases de datos**
2. **Arriba a la izquierda, haz clic en:** "Nuevo" o "New" (ícono de base de datos con un +)
3. **Aparecerá un campo que dice:** "Nombre de la base de datos"
4. **Escribe exactamente:** `sweetbites_db` (sin espacios, todo junto)
5. **En el menú desplegable de al lado dice:** "Cotejamiento" → Déjalo como está
6. **Haz clic en:** "Crear"

**✅ Listo:** Ahora verás "sweetbites_db" en la lista de la izquierda.

---

## 📋 PASO 3: EJECUTAR LAS MIGRACIONES SQL

### 3.1 Abrir el archivo de migración 001

1. **En tu computadora, abre:** `C:\Users\Luis Serna\Desktop\appnueva\database\migrations`
2. **Verás 3 archivos .sql:**
   - `001_add_categories_table.sql`
   - `002_modify_recipes_categoria.sql`
   - `003_add_notifications_table.sql`

3. **Haz clic derecho en:** `001_add_categories_table.sql`
4. **Selecciona:** "Abrir con" → "Bloc de notas" (o Notepad)
5. **Se abrirá el archivo con código SQL**
6. **Presiona:** `Ctrl + A` (selecciona todo el texto)
7. **Presiona:** `Ctrl + C` (copia todo)

### 3.2 Pegar y ejecutar en phpMyAdmin

1. **Vuelve a phpMyAdmin** (en el navegador)
2. **Asegúrate de que en la lista izquierda esté seleccionada:** "sweetbites_db" (debe estar en azul/resaltada)
   - Si no está seleccionada, haz clic en "sweetbites_db"
3. **Arriba, haz clic en la pestaña:** "SQL" (entre las pestañas superiores)
4. **Verás un cuadro grande vacío**
5. **Haz clic dentro del cuadro**
6. **Presiona:** `Ctrl + V` (pega el código SQL que copiaste)
7. **Abajo a la derecha, haz clic en:** "Continuar" o "Go"

**✅ Debería decir:** "X filas insertadas" o "Query OK"

### 3.3 Repetir para la migración 002

1. **Abre:** `002_modify_recipes_categoria.sql` con Bloc de notas
2. **Presiona:** `Ctrl + A` → `Ctrl + C`
3. **Vuelve a phpMyAdmin**
4. **Borra el código anterior del cuadro SQL**
5. **Pega el nuevo código:** `Ctrl + V`
6. **Haz clic en:** "Continuar"

### 3.4 Repetir para la migración 003

1. **Abre:** `003_add_notifications_table.sql` con Bloc de notas
2. **Presiona:** `Ctrl + A` → `Ctrl + C`
3. **Vuelve a phpMyAdmin**
4. **Borra el código anterior del cuadro SQL**
5. **Pega el nuevo código:** `Ctrl + V`
6. **Haz clic en:** "Continuar"

### 3.5 Verificar que funcionó

1. **En phpMyAdmin, lado izquierdo, haz clic en:** "sweetbites_db"
2. **Verás una lista de tablas:**
   - categories ✅
   - recipes ✅
   - users ✅
   - ingredients ✅
   - steps ✅
   - favorites ✅
   - comments ✅
   - notifications ✅

**✅ Si ves esas tablas, PERFECTO. Las migraciones funcionaron.**

---

## 📋 PASO 4: ABRIR EL PROYECTO EN VS CODE

### 4.1 Abrir VS Code

1. **Presiona la tecla Windows**
2. **Escribe:** "Visual Studio Code" o "VS Code"
3. **Haz clic en:** Visual Studio Code
4. **Se abrirá VS Code** (editor con fondo oscuro o claro)

### 4.2 Abrir la carpeta del proyecto

1. **En VS Code, arriba a la izquierda, haz clic en:** "File" (Archivo)
2. **Haz clic en:** "Open Folder" (Abrir carpeta)
3. **Navega a:** `C:\Users\Luis Serna\Desktop\appnueva`
4. **Haz clic en la carpeta "appnueva"** (para seleccionarla)
5. **Abajo a la derecha, haz clic en:** "Seleccionar carpeta"

**✅ Ahora verás la estructura del proyecto en el panel izquierdo:**
- 📁 backend
- 📁 database
- 📁 frontend
- 📄 ESTADO_ACTUAL.md
- etc.

---

## 📋 PASO 5: ABRIR LA TERMINAL EN VS CODE

### 5.1 Abrir Terminal

1. **En VS Code, arriba en el menú, haz clic en:** "Terminal"
2. **Haz clic en:** "New Terminal" (Nueva Terminal)
3. **Abajo se abrirá un panel negro o azul** con texto

**Verás algo como:**
```
PS C:\Users\Luis Serna\Desktop\appnueva>
```

**💡 Esto es la terminal. Aquí escribirás comandos.**

---

## 📋 PASO 6: INSTALAR DEPENDENCIAS DEL BACKEND

### 6.1 Ir a la carpeta backend

En la terminal que acabas de abrir:

1. **Escribe:** `cd backend`
2. **Presiona:** Enter

**Ahora verás:**
```
PS C:\Users\Luis Serna\Desktop\appnueva\backend>
```

### 6.2 Instalar las dependencias

1. **Escribe:** `npm install`
2. **Presiona:** Enter
3. **ESPERA:** Verás que aparecen muchas líneas de texto
   - Esto puede tardar **1-3 minutos**
   - Es normal ver muchas líneas
   - Es normal que diga "deprecated" en algunos lugares (no te preocupes)

**✅ Cuando termine, verás:**
```
added XXX packages in XXs
```

**❌ Si sale un error:**
- Asegúrate de haber instalado Node.js (Paso 0)
- Cierra VS Code y ábrelo de nuevo
- Intenta de nuevo

---

## 📋 PASO 7: INICIAR EL BACKEND

### 7.1 Arrancar el servidor backend

**Asegúrate de estar en la carpeta backend** (debe decir `\backend>` en la terminal)

1. **Escribe:** `npm run dev`
2. **Presiona:** Enter
3. **ESPERA unos segundos**

**✅ Debería aparecer algo como:**
```
╔═══════════════════════════════════════╗
║   🍰 SweetBites Backend Server 🍰    ║
║   Puerto: 3000                        ║
║   Entorno: development                ║
╚═══════════════════════════════════════╝
```

**🎉 ¡EL BACKEND ESTÁ CORRIENDO!**

**💡 IMPORTANTE:** 
- **NO CIERRES ESTA TERMINAL**
- **NO PRESIONES NADA MÁS EN ESTA TERMINAL**
- Déjala así, corriendo

---

## 📋 PASO 8: ABRIR UNA SEGUNDA TERMINAL PARA EL FRONTEND

### 8.1 Crear nueva terminal

1. **En VS Code, arriba a la derecha de la terminal (donde dice "bash" o "powershell")**
2. **Verás un ícono de "+"** (más)
3. **Haz clic en el "+"**
4. **Se abrirá una SEGUNDA terminal** (debajo o al lado de la primera)

**Ahora tienes 2 terminales:**
- Terminal 1: Ejecutando el backend (NO TOCAR)
- Terminal 2: Nueva, para el frontend

### 8.2 Ir a la carpeta frontend

**En la SEGUNDA terminal** (la nueva):

1. **Escribe:** `cd frontend`
2. **Presiona:** Enter

**Verás:**
```
PS C:\Users\Luis Serna\Desktop\appnueva\frontend>
```

---

## 📋 PASO 9: INSTALAR DEPENDENCIAS DEL FRONTEND

### 9.1 Instalar dependencias

**En la segunda terminal (frontend):**

1. **Escribe:** `npm install`
2. **Presiona:** Enter
3. **ESPERA:** Esto también tarda **1-3 minutos**

**✅ Cuando termine, verás:**
```
added XXX packages in XXs
```

---

## 📋 PASO 10: INICIAR EL FRONTEND

### 10.1 Arrancar Vite (frontend)

**En la segunda terminal (frontend):**

1. **Escribe:** `npm run dev`
2. **Presiona:** Enter
3. **ESPERA unos segundos**

**✅ Debería aparecer:**
```
  VITE v5.2.12  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**🎉 ¡EL FRONTEND ESTÁ CORRIENDO!**

---

## 📋 PASO 11: ABRIR LA APLICACIÓN EN EL NAVEGADOR

### 11.1 Abrir la app

1. **Abre tu navegador** (Chrome, Edge, Firefox)
2. **En la barra de direcciones escribe:** `http://localhost:5173`
3. **Presiona:** Enter

**🎉 ¡DEBERÍAS VER LA PÁGINA DE SWEETBITES!**

**Verás:**
- Un hero grande con degradado verde menta
- Texto "Comparte tus Mejores Recetas de Repostería"
- Botones
- Categorías con íconos

---

## 📋 PASO 12: CREAR TU PRIMER USUARIO

### 12.1 Ir a Registrarse

1. **En la página que se abrió, arriba a la derecha, haz clic en:** "Iniciar Sesión"
2. **Abajo verás:** "¿No tienes cuenta? Regístrate"
3. **Haz clic en:** "Regístrate"

### 12.2 Llenar el formulario

**Llena los campos:**
- **Nombre Completo:** Tu nombre (ejemplo: Luis Serna)
- **Correo Electrónico:** tunombre@email.com (puede ser inventado)
- **Teléfono:** (Opcional) 3001234567
- **Contraseña:** mínimo 8 caracteres (ejemplo: password123)
- **Confirmar Contraseña:** la misma contraseña

**Haz clic en:** "Crear Cuenta"

**✅ Debería decir:** "Registro exitoso" (o similar)

### 12.3 Iniciar Sesión

1. **Serás redirigido a Login**
2. **Ingresa:**
   - Email: el que pusiste (ejemplo: tunombre@email.com)
   - Contraseña: la que pusiste
3. **Haz clic en:** "Iniciar Sesión"

**✅ Deberías entrar a la aplicación** (verás el catálogo de recetas)

---

## 📋 PASO 13: CONVERTIRTE EN ADMINISTRADOR

**Ahora mismo eres usuario normal. Para ser admin:**

### 13.1 Ir a phpMyAdmin

1. **Abre una nueva pestaña en el navegador**
2. **Escribe:** `http://localhost/phpmyadmin`
3. **Presiona:** Enter

### 13.2 Ir a la tabla users

1. **Lado izquierdo, haz clic en:** "sweetbites_db"
2. **Verás la lista de tablas**
3. **Haz clic en:** "users"
4. **Verás una tabla con tu usuario** (la fila con tu email)

### 13.3 Editar tu usuario

1. **En la fila de tu usuario, a la izquierda verás unos íconos**
2. **Haz clic en el ícono de lápiz** (editar) - Es el primero
3. **Se abrirá un formulario**
4. **Busca el campo que dice:** "rol"
5. **Verás que dice:** "usuario"
6. **Haz clic en el menú desplegable**
7. **Selecciona:** "admin"
8. **Abajo a la derecha, haz clic en:** "Continuar" o "Go"

**✅ Ahora eres administrador**

### 13.4 Cerrar sesión y volver a entrar

1. **Vuelve a la pestaña de SweetBites** (http://localhost:5173)
2. **Arriba a la derecha, haz clic en tu nombre**
3. **Haz clic en:** "Cerrar Sesión"
4. **Vuelve a iniciar sesión** con tu email y contraseña

**✅ Ahora verás opciones de Admin en el menú**

---

## 📋 PASO 14: PROBAR LA APLICACIÓN

### 14.1 Como Usuario - Crear una Receta

1. **Arriba a la derecha, haz clic en tu nombre**
2. **Haz clic en:** "Crear Receta"
3. **Verás un wizard de 4 pasos:**

**PASO 1 - Información Básica:**
- Nombre: "Brownie de Chocolate"
- Descripción: "Delicioso brownie casero"
- Categoría: Selecciona "Chocolates"
- Dificultad: "Fácil"
- Tiempo: 45 minutos
- Porciones: 8
- Haz clic en "Siguiente"

**PASO 2 - Ingredientes:**
- Haz clic en "+ Agregar Ingrediente" varias veces
- Llena algunos ingredientes:
  - 200 gramos de chocolate
  - 100 gramos de mantequilla
  - 3 unidad de huevos
- Haz clic en "Siguiente"

**PASO 3 - Pasos:**
- Describe los pasos:
  - Paso 1: "Derretir el chocolate con la mantequilla"
  - Paso 2: "Batir los huevos"
  - Paso 3: "Mezclar todo y hornear"
- Haz clic en "Siguiente"

**PASO 4 - Preview:**
- Revisa toda la información
- Haz clic en "Enviar Receta"

**✅ Te dirá:** "Receta enviada" y quedará **PENDIENTE**

### 14.2 Como Admin - Aprobar la Receta

1. **Arriba a la derecha, haz clic en tu nombre**
2. **Haz clic en:** "Panel Admin"
3. **Verás el dashboard con estadísticas**
4. **Debería decir:** "1 Receta Pendiente"
5. **Haz clic en:** "Aprobar Recetas" (el botón amarillo)
6. **Verás tu receta de Brownie**
7. **Haz clic en:** "Ver Detalles" (para ver ingredientes y pasos)
8. **Haz clic en:** "✓ Aprobar"

**✅ La receta ahora está PUBLICADA**

### 14.3 Ver la Receta Publicada

1. **Arriba en el menú, haz clic en:** "Recetas"
2. **Verás el catálogo de recetas**
3. **Deberías ver tu Brownie de Chocolate**
4. **Haz clic en la tarjeta del Brownie**
5. **Verás el detalle completo:**
   - Ingredientes
   - Pasos numerados
   - Calculadora de porciones (prueba cambiar de 8 a 12 porciones)
   - Botón "Modo Cocina"

---

## 📋 PASO 15: PROBAR OTRAS FUNCIONALIDADES

### Panel de Admin

**Haz clic en tu nombre → Panel Admin**

Prueba:
- **Dashboard:** Ver estadísticas
- **Gestionar Usuarios:** Cambiar roles de usuarios
- **Gestionar Categorías:** Crear nueva categoría con color e ícono
- **Moderar Comentarios:** Ver comentarios (si hay)

### Perfil de Usuario

**Haz clic en tu nombre → Mi Perfil**

Prueba:
- Ver tu perfil
- Hacer clic en "Editar"
- Cambiar tu nombre o teléfono
- Guardar cambios

### Mis Recetas

**Haz clic en tu nombre → Mis Recetas**

Verás:
- Tu receta de Brownie con badge "Publicada"
- Puedes crear más recetas

---

## 🎉 ¡FELICIDADES! LA APP ESTÁ FUNCIONANDO

### ✅ Resumen de lo que hiciste:

1. ✅ Instalaste Node.js
2. ✅ Abriste XAMPP y arrancaste Apache y MySQL
3. ✅ Creaste la base de datos "sweetbites_db"
4. ✅ Ejecutaste las 3 migraciones SQL
5. ✅ Abriste el proyecto en VS Code
6. ✅ Instalaste dependencias del backend (`npm install`)
7. ✅ Iniciaste el backend (`npm run dev`)
8. ✅ Instalaste dependencias del frontend (`npm install`)
9. ✅ Iniciaste el frontend (`npm run dev`)
10. ✅ Abriste la app en el navegador (http://localhost:5173)
11. ✅ Creaste un usuario
12. ✅ Te convertiste en admin
13. ✅ Creaste y aprobaste una receta

---

## 📝 CADA VEZ QUE QUIERAS USAR LA APP:

### Pasos rápidos (después de la primera vez):

1. **Abrir XAMPP** → Start Apache y MySQL
2. **Abrir VS Code** → Abrir carpeta "appnueva"
3. **Abrir Terminal** → `cd backend` → `npm run dev`
4. **Abrir Segunda Terminal** → `cd frontend` → `npm run dev`
5. **Abrir navegador** → http://localhost:5173

---

## ❓ PROBLEMAS COMUNES

### "npm no se reconoce como comando"
→ Instala Node.js (Paso 0)

### "Puerto 3000 ya está en uso"
→ Cierra cualquier programa que use el puerto 3000
→ O reinicia tu computadora

### "Error connecting to database"
→ Asegúrate de que XAMPP esté corriendo (Apache y MySQL en verde)

### La página no carga (http://localhost:5173)
→ Verifica que el frontend esté corriendo (debe decir "Local: http://localhost:5173/")

### No puedo iniciar sesión
→ Verifica que hayas creado el usuario en /auth/register
→ Verifica que el backend esté corriendo (puerto 3000)

---

## 💾 PARA DETENER LA APP:

1. **En las terminales de VS Code:**
   - Presiona `Ctrl + C` en cada terminal
   - Dirá "Terminate batch job? (S/N)" → Escribe `S` → Enter

2. **En XAMPP:**
   - Haz clic en "Stop" en Apache
   - Haz clic en "Stop" en MySQL

---

## 📸 CAPTURAS DE REFERENCIA

### Cómo debería verse XAMPP cuando está corriendo:
```
Apache:  [Running]  [verde claro]  [Stop]  [Admin]
MySQL:   [Running]  [verde claro]  [Stop]  [Admin]
```

### Cómo debería verse la terminal del backend:
```
╔═══════════════════════════════════════╗
║   🍰 SweetBites Backend Server 🍰    ║
║   Puerto: 3000                        ║
╚═══════════════════════════════════════╝
```

### Cómo debería verse la terminal del frontend:
```
VITE v5.2.12  ready in 523 ms
➜  Local:   http://localhost:5173/
```

---

## 🎓 GLOSARIO DE TÉRMINOS

- **Backend:** La parte del servidor que maneja la lógica y la base de datos
- **Frontend:** La parte visual que ves en el navegador
- **Terminal:** Ventana donde escribes comandos
- **npm:** Gestor de paquetes de Node.js (instala dependencias)
- **npm install:** Comando que instala las dependencias del proyecto
- **npm run dev:** Comando que inicia el servidor en modo desarrollo
- **localhost:** Tu computadora actuando como servidor
- **Puerto 3000:** Puerta por donde se comunica el backend
- **Puerto 5173:** Puerta por donde se comunica el frontend
- **XAMPP:** Programa que simula un servidor web en tu PC
- **phpMyAdmin:** Herramienta visual para gestionar bases de datos MySQL
- **Migración:** Script SQL que crea/modifica tablas en la base de datos

---

## 📞 CONTACTO Y AYUDA

Si tienes problemas:

1. **Verifica que XAMPP esté corriendo** (Apache y MySQL en verde)
2. **Verifica que ambas terminales estén corriendo** (backend y frontend)
3. **Revisa que no haya mensajes de error en las terminales**
4. **Asegúrate de haber ejecutado las 3 migraciones SQL**

---

**🎉 ¡YA SABES CÓMO USAR SWEETBITES!**

**Desarrollado con 💚 para SENA 2026**
