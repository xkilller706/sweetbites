# 🍰 GUÍA DE INSTALACIÓN COMPLETA - SWEETBITES
## Para Personas SIN Experiencia en Programación

**Tiempo estimado:** 1-2 horas  
**Nivel:** Principiante absoluto  
**Sistema:** Windows 10/11

---

## 📋 TABLA DE CONTENIDOS

1. [Descargar el Proyecto](#1-descargar-el-proyecto)
2. [Instalar Node.js](#2-instalar-nodejs)
3. [Instalar XAMPP](#3-instalar-xampp)
4. [Usar XAMPP](#4-usar-xampp)
5. [Importar la Base de Datos](#5-importar-la-base-de-datos)
6. [Instalar VS Code](#6-instalar-vs-code)
7. [Abrir el Proyecto en VS Code](#7-abrir-el-proyecto-en-vs-code)
8. [Instalar Dependencias del Backend](#8-instalar-dependencias-del-backend)
9. [Instalar Dependencias del Frontend](#9-instalar-dependencias-del-frontend)
10. [Abrir 2 Terminales](#10-abrir-2-terminales-en-vs-code)
11. [Ejecutar el Backend](#11-ejecutar-el-backend)
12. [Ejecutar el Frontend](#12-ejecutar-el-frontend)
13. [Abrir la Aplicación](#13-abrir-la-aplicación)
14. [Probar Todo](#14-probar-todas-las-funcionalidades)
15. [Solución de Problemas](#15-solución-de-problemas)

---

## 1. DESCARGAR EL PROYECTO

### Paso 1.1: Descargar el ZIP

1. Haz clic en el enlace que te envié (Google Drive, WeTransfer, etc.)
2. Aparecerá un botón de **"Descargar"** o **"Download"**
3. Haz clic y espera a que descargue
4. El archivo se llamará: **`appnueva.zip`**
5. Por defecto se guarda en tu carpeta **Descargas** o **Downloads**

### Paso 1.2: Crear Carpeta para Proyectos

1. Abre el **Explorador de Archivos** (icono de carpeta en la barra de tareas)
2. Haz clic en **"Este equipo"** o **"This PC"**
3. Haz doble clic en el disco **C:**
4. Click derecho en un espacio vacío
5. Selecciona **"Nuevo" → "Carpeta"**
6. Nómbrala: **`Proyectos`**
7. Presiona **Enter**

**Ahora tienes:** `C:\Proyectos\`

### Paso 1.3: Descomprimir el Proyecto

1. Ve a tu carpeta **Descargas**
2. Busca el archivo **`appnueva.zip`**
3. Click derecho en el archivo ZIP
4. Selecciona **"Extraer todo..."** o **"Extract All..."**
5. Te preguntará dónde extraer
6. Borra lo que dice y escribe: **`C:\Proyectos`**
7. Click en **"Extraer"** o **"Extract"**
8. Espera a que termine
9. Se abrirá automáticamente la carpeta

**Ahora tienes:** `C:\Proyectos\appnueva\`

---

## 2. INSTALAR NODE.JS

**¿Qué es Node.js?** Es el programa que ejecuta JavaScript en tu computadora (necesario para el backend).

### Paso 2.1: Descargar Node.js

1. Abre tu navegador (Chrome, Edge, Firefox)
2. Ve a: **https://nodejs.org/**
3. Verás 2 botones verdes grandes
4. Haz clic en el que dice **"LTS"** (Recommended for Most Users)
   - Versión recomendada: **v20.11.0** o superior
5. Se descargará un archivo `.msi` (aprox. 30 MB)
6. Espera a que termine la descarga

### Paso 2.2: Instalar Node.js

1. Ve a tu carpeta **Descargas**
2. Busca el archivo: **`node-v20.11.0-x64.msi`** (el número puede variar)
3. Haz **doble clic** en el archivo
4. Aparecerá una ventana de instalación
5. Click en **"Next"** (Siguiente)
6. **Acepta los términos** marcando la casilla
7. Click en **"Next"**
8. Deja la carpeta de instalación por defecto: `C:\Program Files\nodejs\`
9. Click en **"Next"**
10. **MUY IMPORTANTE:** Marca la casilla que dice:
    - ☑️ **"Automatically install the necessary tools..."**
    - (Instalar automáticamente las herramientas necesarias)
11. Click en **"Next"**
12. Click en **"Install"**
13. Si aparece un mensaje de seguridad, click en **"Sí"** o **"Yes"**
14. Espera 2-3 minutos a que instale
15. Click en **"Finish"**

### Paso 2.3: Reiniciar la Computadora

**IMPORTANTE:** Debes reiniciar tu computadora para que Node.js funcione.

1. Guarda todo lo que tengas abierto
2. Click en el menú **Inicio** (Windows)
3. Click en **"Reiniciar"**
4. Espera a que reinicie

### Paso 2.4: Verificar la Instalación

Después de reiniciar:

1. Presiona las teclas **Windows + R** al mismo tiempo
2. Escribe: **`cmd`**
3. Presiona **Enter**
4. Se abrirá una ventana negra (la terminal)
5. Escribe exactamente: **`node --version`**
6. Presiona **Enter**

**Debes ver algo como:**
```
v20.11.0
```

7. Ahora escribe: **`npm --version`**
8. Presiona **Enter**

**Debes ver algo como:**
```
10.2.4
```

**Si ves esos números, ¡Node.js está instalado correctamente!** ✅

9. Cierra la ventana negra haciendo clic en la **X**

---

## 3. INSTALAR XAMPP

**¿Qué es XAMPP?** Es un paquete que incluye:
- **MySQL** - Base de datos (donde se guardan las recetas, usuarios, etc.)
- **phpMyAdmin** - Interfaz visual para gestionar la base de datos

### Paso 3.1: Descargar XAMPP

1. Abre tu navegador
2. Ve a: **https://www.apachefriends.org/**
3. Click en el botón **"Download"** (Descargar)
4. Click en **"XAMPP for Windows"**
5. Descarga la versión más reciente (aprox. 150 MB)
6. Espera a que descargue (5-10 minutos dependiendo de tu internet)

### Paso 3.2: Instalar XAMPP

1. Ve a tu carpeta **Descargas**
2. Busca el archivo: **`xampp-windows-x64-8.x.x-installer.exe`**
3. Haz **doble clic**
4. Si aparece un mensaje de seguridad, click en **"Sí"** o **"Yes"**
5. Puede aparecer un mensaje sobre **User Account Control (UAC)**
   - Solo click en **"OK"**
6. Aparecerá la ventana de instalación
7. Click en **"Next"**
8. **MUY IMPORTANTE - Componentes a instalar:**
   - ☑️ **Apache** (marca esta casilla)
   - ☑️ **MySQL** (marca esta casilla)
   - ☑️ **PHP** (marca esta casilla)
   - ☑️ **phpMyAdmin** (marca esta casilla)
   - ☐ Puedes desmarcar los demás si quieres
9. Click en **"Next"**
10. **Carpeta de instalación:** Deja por defecto **`C:\xampp`**
11. Click en **"Next"**
12. Desmarca la casilla **"Learn more about Bitnami"** (si aparece)
13. Click en **"Next"**
14. Click en **"Next"** de nuevo
15. Espera 5-10 minutos a que instale (es grande)
16. Al terminar, desmarca **"Do you want to start the Control Panel now?"**
17. Click en **"Finish"**

**XAMPP está instalado en:** `C:\xampp`

---

## 4. USAR XAMPP - ENCENDER APACHE Y MYSQL

**¿Qué vamos a hacer?** Vamos a "encender" o "iniciar" los servicios de Apache y MySQL para que funcionen.

### Paso 4.1: Ubicar el Ícono de XAMPP

XAMPP se puede abrir de 3 formas:

**OPCIÓN A - Desde el Menú Inicio (Más fácil):**

1. Presiona la tecla **Windows** (tecla con el logo de Windows, abajo a la izquierda del teclado)
2. Se abre el menú de inicio
3. En el cuadro de búsqueda (abajo), escribe: **`xampp`**
4. Mientras escribes, verás aparecer resultados
5. Busca el que dice: **"XAMPP Control Panel"** (con un ícono naranja)
6. Haz **clic** en él

**OPCIÓN B - Desde el Escritorio:**

Si hay un ícono naranja en tu escritorio que dice "XAMPP Control Panel":
1. Haz **doble clic** en él

**OPCIÓN C - Desde la Carpeta de Instalación:**

1. Abre el Explorador de Archivos (📁)
2. Ve a **Este equipo → Disco Local (C:) → xampp**
3. Busca el archivo **"xampp-control.exe"** (ícono naranja)
4. Haz **doble clic** en él

### Paso 4.2: Permitir Acceso en el Firewall (Solo la Primera Vez)

**Si aparece un mensaje del Firewall de Windows:**

La ventana dice algo como:
```
"El Firewall de Windows Defender ha bloqueado algunas características de esta aplicación"
```

**Verás 2 casillas:**
- ☐ Redes privadas (como redes domésticas o del trabajo)
- ☐ Redes públicas (como las de aeropuertos o cafeterías)

**¿Qué hacer?**

1. **Marca AMBAS casillas:**
   - ☑️ **Redes privadas**
   - ☑️ **Redes públicas**

2. Click en el botón **"Permitir acceso"** o **"Allow access"**

**Esto solo pasará la primera vez que abras XAMPP.**

### Paso 4.3: Conocer la Ventana del Panel de Control

Se abrirá una ventana que se llama **"XAMPP Control Panel v3.x.x"**

**Descripción visual de la ventana:**

```
┌─────────────────────────────────────────────────────────────┐
│ XAMPP Control Panel v3.3.0            [_][□][X]              │
├─────────────────────────────────────────────────────────────┤
│  Modules | Network | Services | Logs | Config | Help        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Module    PID(s)   Port(s)    Actions                       │
│  ────────────────────────────────────────────────────────   │
│  Apache                         [Start] [Stop] [Admin] [Config] │
│  MySQL                          [Start] [Stop] [Admin] [Config] │
│  FileZilla                      [Start] [Stop] [Admin] [Config] │
│  Mercury                        [Start] [Stop] [Admin] [Config] │
│  Tomcat                         [Start] [Stop] [Admin] [Config] │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Elementos importantes:**

- **Module:** Nombre del servicio (Apache, MySQL, etc.)
- **PID(s):** ID del proceso (vacío cuando está apagado)
- **Port(s):** Puertos que usa (vacío cuando está apagado)
- **Actions:** Botones para controlar el servicio
  - **[Start]** - Iniciar/Encender
  - **[Stop]** - Detener/Apagar
  - **[Admin]** - Panel de administración
  - **[Config]** - Configuración

**Verás 5 filas (módulos):**
1. **Apache** ← Lo necesitas ✅
2. **MySQL** ← Lo necesitas ✅
3. FileZilla ← NO lo necesitas ❌
4. Mercury ← NO lo necesitas ❌
5. Tomcat ← NO lo necesitas ❌

**Solo vamos a encender Apache y MySQL.**

---

### Paso 4.4: ENCENDER APACHE (Servidor Web)

**¿Qué es Apache?** Es el servidor web que permite que phpMyAdmin funcione.

**Paso a paso CON DETALLES:**

1. **Ubica la fila de Apache:**
   - Es la **PRIMERA fila** de la lista de módulos
   - Dice **"Apache"** al inicio de la fila

2. **Busca el botón "Start":**
   - A la derecha de la fila de Apache
   - Es un botón rectangular
   - Dice **"Start"** (Iniciar)

3. **Haz clic en el botón "Start":**
   - **UN SOLO CLIC** (no doble clic)
   - El botón se pondrá gris por un momento (significa que está cargando)

4. **Espera 2-5 segundos:**
   - NO hagas nada, solo espera
   - Verás texto apareciendo en el panel de abajo (es normal)

5. **Verifica que Apache INICIÓ CORRECTAMENTE:**

   **Si todo salió bien, verás estos cambios:**

   **ANTES (Apache apagado):**
   ```
   Apache                          [Start] [Stop] [Admin] [Config]
   ```

   **DESPUÉS (Apache encendido):**
   ```
   Apache    1234    80, 443      [Stop] [Admin] [Config]
   ↑         ↑       ↑            ↑
   │         │       │            │
   │         │       │            └─ El botón "Start" desaparece
   │         │       │               ahora solo dice "Stop"
   │         │       └────────────── Muestra los puertos (80, 443)
   │         └────────────────────── Muestra el PID (número de proceso)
   └──────────────────────────────── Fondo VERDE CLARO
   ```

   **SEÑALES DE QUE FUNCIONA:**
   - ✅ El fondo de la fila de Apache se pone **VERDE CLARO**
   - ✅ Aparece un número en **PID(s)** (ejemplo: 1234)
   - ✅ Aparece **80, 443** en **Port(s)**
   - ✅ El botón **"Start"** desaparece
   - ✅ Solo queda visible **"Stop"** (Detener)

6. **En el panel de mensajes de abajo verás:**
   ```
   10:30:45  [Apache]   Status change detected: running
   10:30:45  [Apache]   Apache Service detected with wrong path
   10:30:45  [Apache]   Attempting to start Apache app...
   10:30:46  [Apache]   Apache Started
   ```

✅ **¡Apache está ENCENDIDO y FUNCIONANDO!**

---

### Paso 4.5: ENCENDER MYSQL (Base de Datos)

**¿Qué es MySQL?** Es el sistema de base de datos donde se guardarán las recetas, usuarios, comentarios, etc.

**Paso a paso CON DETALLES:**

1. **Ubica la fila de MySQL:**
   - Es la **SEGUNDA fila** de la lista de módulos
   - Está justo debajo de Apache
   - Dice **"MySQL"** al inicio de la fila

2. **Busca el botón "Start":**
   - A la derecha de la fila de MySQL
   - Dice **"Start"** (Iniciar)

3. **Haz clic en el botón "Start":**
   - **UN SOLO CLIC**
   - El botón se pondrá gris por un momento

4. **Espera 2-5 segundos:**
   - NO hagas nada, solo espera
   - Verás texto apareciendo en el panel de abajo

5. **Verifica que MySQL INICIÓ CORRECTAMENTE:**

   **ANTES (MySQL apagado):**
   ```
   MySQL                           [Start] [Stop] [Admin] [Config]
   ```

   **DESPUÉS (MySQL encendido):**
   ```
   MySQL     5678    3306          [Stop] [Admin] [Config]
   ↑         ↑       ↑             ↑
   │         │       │             │
   │         │       │             └─ El botón "Start" desaparece
   │         │       │                ahora solo dice "Stop"
   │         │       └───────────────── Puerto 3306 (puerto de MySQL)
   │         └───────────────────────── PID (número de proceso)
   └─────────────────────────────────── Fondo VERDE CLARO
   ```

   **SEÑALES DE QUE FUNCIONA:**
   - ✅ El fondo de la fila de MySQL se pone **VERDE CLARO**
   - ✅ Aparece un número en **PID(s)** (ejemplo: 5678)
   - ✅ Aparece **3306** en **Port(s)**
   - ✅ El botón **"Start"** desaparece
   - ✅ Solo queda visible **"Stop"**

6. **En el panel de mensajes de abajo verás:**
   ```
   10:31:02  [mysql]   Status change detected: running
   10:31:02  [mysql]   MySQL Service detected with wrong path
   10:31:02  [mysql]   Attempting to start MySQL app...
   10:31:03  [mysql]   MySQL Started
   ```

✅ **¡MySQL está ENCENDIDO y FUNCIONANDO!**

---

### Paso 4.6: Verificación Visual Completa

**Ahora tu Panel de Control debe verse ASÍ:**

```
┌─────────────────────────────────────────────────────────────┐
│ XAMPP Control Panel v3.3.0            [_][□][X]              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Module    PID(s)   Port(s)    Actions                       │
│  ────────────────────────────────────────────────────────   │
│  Apache    1234     80, 443    [Stop] [Admin] [Config] ◄ VERDE
│  MySQL     5678     3306       [Stop] [Admin] [Config] ◄ VERDE
│  FileZilla                     [Start] [Stop] [Admin] [Config]│
│  Mercury                       [Start] [Stop] [Admin] [Config]│
│  Tomcat                        [Start] [Stop] [Admin] [Config]│
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 10:30:46  [Apache]   Apache Started                    │ │
│  │ 10:31:03  [mysql]    MySQL Started                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Resumen visual:**
- ✅ **Apache:** Fondo VERDE + Puerto 80, 443 + Solo botón "Stop" visible
- ✅ **MySQL:** Fondo VERDE + Puerto 3306 + Solo botón "Stop" visible
- ⚪ **FileZilla, Mercury, Tomcat:** Sin cambios (no los necesitas)

---

### Paso 4.7: ¿Cómo Saber que Realmente Funciona?

**Prueba rápida de Apache:**

1. Abre tu navegador (Chrome, Edge, Firefox)
2. En la barra de direcciones, escribe:
   ```
   http://localhost
   ```
3. Presiona **Enter**
4. **Deberías ver:** Una página que dice "Welcome to XAMPP" con el logo naranja
5. Si la ves, **Apache funciona perfectamente** ✅

**Prueba rápida de MySQL:**

1. En el navegador, escribe:
   ```
   http://localhost/phpmyadmin
   ```
2. Presiona **Enter**
3. **Deberías ver:** La interfaz de phpMyAdmin (muchas tablas y opciones)
4. Si la ves, **MySQL funciona perfectamente** ✅

---

### Paso 4.8: IMPORTANTE - Mantener XAMPP Abierto

**MUY IMPORTANTE:**

- ✅ **NO cierres** el Panel de Control de XAMPP
- ✅ **NO hagas clic en "Stop"** de Apache o MySQL
- ✅ **NO hagas clic en "Quit"** en el panel
- ✅ **Deja la ventana abierta** mientras trabajas con SweetBites

**¿Por qué?**
- Si cierras XAMPP, Apache y MySQL se apagarán
- Si se apagan, la base de datos NO funcionará
- SweetBites no podrá conectarse a la base de datos

**Puedes minimizar la ventana:**
- Click en **"_"** (minimizar, esquina superior derecha)
- La ventana se ocultará pero Apache y MySQL seguirán corriendo

---

### Paso 4.9: ⚠️ PROBLEMAS COMUNES AL INICIAR

#### PROBLEMA 1: Apache NO Inicia - Puerto 80 Ocupado

**Error que verás:**
```
Error: Apache shutdown unexpectedly.
Port 80 in use by "Unable to open process" with PID 4
```

**¿Qué significa?**
Otro programa está usando el puerto 80 (generalmente Skype, IIS, o algún antivirus).

**SOLUCIÓN - Cambiar el Puerto de Apache:**

1. En el Panel de XAMPP, click en **"Config"** (botón superior derecho, al lado de "Quit")
2. Se despliega un menú
3. Click en **"Service and Port Settings"**
4. Se abre una nueva ventana
5. Click en la pestaña **"Apache"**
6. Verás:
   - **Service Name:** Apache2.4
   - **Main Port:** 80 ← Cambia este
   - **SSL Port:** 443
7. En **"Main Port"**, borra el **80**
8. Escribe: **8080**
9. Click en **"Save"**
10. Cierra esa ventana
11. Ahora intenta hacer **"Start"** en Apache de nuevo
12. Debería funcionar

**IMPORTANTE:** Si cambiaste el puerto a 8080, ahora debes acceder así:
- Antes: `http://localhost`
- Ahora: `http://localhost:8080`
- phpMyAdmin: `http://localhost:8080/phpmyadmin`

#### PROBLEMA 2: MySQL NO Inicia - Puerto 3306 Ocupado

**Error que verás:**
```
Error: MySQL shutdown unexpectedly.
Port 3306 in use by "mysqld.exe" with PID 1234
```

**¿Qué significa?**
Ya hay otra instancia de MySQL corriendo.

**SOLUCIÓN A - Cerrar el Otro MySQL:**

1. Presiona **CTRL + SHIFT + ESC** (abre el Administrador de Tareas)
2. Click en la pestaña **"Detalles"** o **"Details"**
3. Busca en la lista: **"mysqld.exe"**
4. Click derecho en **mysqld.exe**
5. Click en **"Finalizar tarea"** o **"End task"**
6. Confirma
7. Vuelve a XAMPP
8. Intenta hacer **"Start"** en MySQL de nuevo

**SOLUCIÓN B - Cambiar el Puerto de MySQL:**

1. En XAMPP, click en **"Config"** (junto a MySQL, NO el de arriba)
2. Click en **"my.ini"**
3. Se abre un archivo de texto
4. Presiona **CTRL + F** (buscar)
5. Busca: **port=3306**
6. Encontrarás algo como:
   ```
   port=3306
   ```
7. Cambia **3306** por **3307**
8. Guarda el archivo: **CTRL + S**
9. Cierra el archivo
10. Intenta **"Start"** de nuevo

**IMPORTANTE:** Si cambiaste el puerto, debes actualizar `backend/.env`:
```
DB_PORT=3307
```

#### PROBLEMA 3: Aparece un Error Rojo

**Si ves mensajes en ROJO en el panel de abajo:**

1. Lee el mensaje completo
2. Generalmente dice qué está mal
3. Los más comunes:
   - "Port already in use" → Otro programa usa ese puerto (ver soluciones arriba)
   - "Access denied" → Ejecuta XAMPP como Administrador (click derecho → "Ejecutar como administrador")
   - "vcruntime140.dll missing" → Descarga Visual C++ Redistributable de Microsoft

---

### Paso 4.10: ¿Cómo Apagar XAMPP Cuando Termines?

**Cuando termines de trabajar con SweetBites:**

1. **PRIMERO:** Cierra el backend (Terminal 1):
   - Presiona **CTRL + C** en la terminal del backend

2. **SEGUNDO:** Cierra el frontend (Terminal 2):
   - Presiona **CTRL + C** en la terminal del frontend

3. **TERCERO:** Detén Apache y MySQL:
   - Ve al Panel de XAMPP
   - Click en **"Stop"** junto a **MySQL** (espera a que se ponga gris)
   - Click en **"Stop"** junto a **Apache** (espera a que se ponga gris)

4. **CUARTO:** Cierra XAMPP:
   - Click en **"Quit"** (esquina inferior derecha del panel)
   - O simplemente cierra la ventana con la **X**

**Al día siguiente, para volver a trabajar:**

1. Abre XAMPP Control Panel
2. Click en **"Start"** de Apache
3. Click en **"Start"** de MySQL
4. Abre VS Code
5. Abre 2 terminales
6. `npm start` en backend
7. `npm run dev` en frontend

---

✅ **¡Ahora sí, XAMPP está completamente explicado!**

---

## 5. IMPORTAR LA BASE DE DATOS

### Paso 5.1: Abrir phpMyAdmin

1. Asegúrate de que **Apache** y **MySQL** estén en **VERDE** (corriendo)
2. Abre tu navegador (Chrome, Edge, Firefox)
3. En la barra de direcciones, escribe exactamente:
   ```
   http://localhost/phpmyadmin
   ```
4. Presiona **Enter**
5. Deberías ver una página con muchas opciones y tablas

**Si no carga:** Verifica que Apache esté corriendo en XAMPP.

### Paso 5.2: Entender la Interfaz de phpMyAdmin

Verás:
- **Panel izquierdo:** Lista de bases de datos
- **Panel central:** Pestañas superiores (Examinar, Estructura, SQL, Importar, etc.)
- **Panel superior:** Barra de menú

### Paso 5.3: Importar el Archivo SQL

1. En el menú superior, click en **"Importar"** o **"Import"**
   - Es una de las pestañas principales, a veces es la 6ta opción
2. Verás un formulario grande
3. En la sección **"Archivo a importar"** o **"File to import"**:
   - Click en el botón **"Examinar..."** o **"Choose File"**
4. Se abrirá un explorador de archivos
5. Navega a: **`C:\Proyectos\appnueva\database\`**
6. Busca el archivo: **`schema_completo.sql`** ⭐ **ESTE ES EL IMPORTANTE**
7. Haz clic en el archivo para seleccionarlo
8. Click en **"Abrir"**
9. Verás que el nombre del archivo aparece junto al botón
10. **NO CAMBIES NADA MÁS** (deja todas las opciones por defecto)
11. Baja hasta el final de la página
12. Click en el botón **"Continuar"** o **"Go"** (esquina inferior derecha)
13. Espera 5-10 segundos

**Deberías ver un mensaje verde que dice:**
```
✓ Importación finalizada correctamente.
```

### Paso 5.4: Verificar que se Importó Correctamente

1. En el panel izquierdo, busca y click en **`sweetbites_db`**
   - Puede estar en la lista o necesitas hacer scroll
2. Se expandirá y verás una lista de tablas
3. **Debes ver exactamente 11 tablas:**
   - ✅ categories
   - ✅ collection_recipes
   - ✅ collections
   - ✅ comments
   - ✅ favorites
   - ✅ ingredients
   - ✅ notifications ← **NUEVA**
   - ✅ ratings
   - ✅ recipes
   - ✅ steps
   - ✅ users

4. Click en la tabla **`users`**
5. Click en la pestaña **"Examinar"** o **"Browse"**
6. Deberías ver **4 usuarios:**
   - Administrador (admin@sweetbites.com)
   - Editor Principal (editor@sweetbites.com)
   - María García (maria@sweetbites.com)
   - Juan Pérez (juan@sweetbites.com)

✅ **¡Base de datos importada correctamente!**

**Deja phpMyAdmin abierto en una pestaña del navegador por si necesitas revisarlo.**

---

## 6. INSTALAR VS CODE

**¿Qué es VS Code?** Es el editor de código donde verás y editarás los archivos del proyecto.

### Paso 6.1: Descargar VS Code

1. Abre tu navegador
2. Ve a: **https://code.visualstudio.com/**
3. Click en el botón azul grande **"Download for Windows"**
4. Se descargará un archivo `.exe` (aprox. 80 MB)
5. Espera a que descargue

### Paso 6.2: Instalar VS Code

1. Ve a tu carpeta **Descargas**
2. Busca: **`VSCodeUserSetup-x64-1.xx.x.exe`**
3. Haz **doble clic**
4. **Acepta** los términos
5. Click en **"Next"**
6. Deja la carpeta por defecto
7. Click en **"Next"**
8. **MUY IMPORTANTE - Marca estas casillas:**
   - ☑️ **"Add 'Open with Code' action to Windows Explorer file context menu"**
   - ☑️ **"Add 'Open with Code' action to Windows Explorer directory context menu"**
   - ☑️ **"Add to PATH"** (muy importante)
9. Click en **"Next"**
10. Click en **"Install"**
11. Espera 2-3 minutos
12. Marca **"Launch Visual Studio Code"**
13. Click en **"Finish"**

**VS Code se abrirá automáticamente.**

---

## 7. ABRIR EL PROYECTO EN VS CODE

### Paso 7.1: Abrir la Carpeta del Proyecto

1. En VS Code, ve al menú superior
2. Click en **"File"** (Archivo)
3. Click en **"Open Folder..."** (Abrir carpeta)
4. Navega a: **`C:\Proyectos\`**
5. Click en la carpeta **`appnueva`** (una sola vez para seleccionarla)
6. Click en el botón **"Seleccionar carpeta"** (esquina inferior derecha)
7. Si aparece un mensaje **"Do you trust the authors?"**:
   - Marca la casilla **"Trust the authors of all files in the parent folder"**
   - Click en **"Yes, I trust the authors"**

### Paso 7.2: Ver la Estructura del Proyecto

En el panel izquierdo (llamado **Explorer**), verás:

```
📁 APPNUEVA
  📁 backend
    📁 config
    📁 middleware
    📁 routes
    📁 uploads
    📄 .env
    📄 server.js
    📄 package.json
  📁 frontend
    📁 public
    📁 src
    📄 package.json
  📁 database
    📄 schema_completo.sql
  📄 GUIA_INSTALACION.md
  📄 README.md
```

**Si ves esto, ¡perfecto!** ✅

---

## 8. INSTALAR DEPENDENCIAS DEL BACKEND

**¿Qué son las dependencias?** Son bibliotecas (paquetes de código) que el proyecto necesita para funcionar. Como ingredientes de una receta.

### Paso 8.1: Abrir la Terminal en VS Code

1. En VS Code, mira el menú superior
2. Click en **"Terminal"**
3. Click en **"New Terminal"** (Nueva Terminal)
4. En la parte inferior de VS Code se abrirá un panel
5. Verás algo como:

```
PS C:\Proyectos\appnueva>
```

O:

```
C:\Proyectos\appnueva>
```

**Esta es la terminal.** Aquí escribirás comandos.

### Paso 8.2: Navegar a la Carpeta Backend

En la terminal, escribe exactamente (respeta mayúsculas/minúsculas):

```bash
cd backend
```

Presiona **Enter**

Ahora verás:
```
PS C:\Proyectos\appnueva\backend>
```

**Significa que estás dentro de la carpeta backend.** ✅

### Paso 8.3: Instalar las Dependencias

Escribe exactamente:

```bash
npm install
```

Presiona **Enter**

**¿Qué pasará?**
1. Verás muchas líneas de texto pasando rápido
2. Dirá cosas como "downloading", "installing", "added"
3. **Espera 2-5 minutos** (no cierres nada)
4. Puede parecer que se quedó "congelado" a veces, es normal
5. Al terminar verás algo como:

```
added 150 packages, and audited 151 packages in 2m

10 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

**Si ves "found 0 vulnerabilities" o números similares, ¡está listo!** ✅

### Paso 8.4: Verificar que se Instaló

En el panel izquierdo (Explorer), expande la carpeta **backend**:

1. Click en la flechita ▶ junto a **backend**
2. Deberías ver una nueva carpeta: **`node_modules`**
3. Esta carpeta tiene miles de archivos (no la abras, es enorme)

✅ **Dependencias del backend instaladas correctamente.**

---

## 9. INSTALAR DEPENDENCIAS DEL FRONTEND

### Paso 9.1: Navegar a la Carpeta Frontend

En la **misma terminal** (la que ya está abierta), escribe:

```bash
cd ..
```

Presiona **Enter**

**¿Qué significa `cd ..`?** Significa "sube un nivel" (sal de backend, vuelve a appnueva)

Ahora deberías ver:
```
PS C:\Proyectos\appnueva>
```

Ahora escribe:

```bash
cd frontend
```

Presiona **Enter**

Verás:
```
PS C:\Proyectos\appnueva\frontend>
```

**Estás dentro de frontend.** ✅

### Paso 9.2: Instalar las Dependencias

Escribe exactamente:

```bash
npm install
```

Presiona **Enter**

**¿Qué pasará?**
1. De nuevo verás muchas líneas de texto
2. **Espera 3-7 minutos** (el frontend tiene MÁS dependencias)
3. Puede parecer lento, es normal
4. Al terminar verás algo como:

```
added 500 packages, and audited 501 packages in 5m

120 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Paso 9.3: Verificar que se Instaló

En el panel izquierdo, expande la carpeta **frontend**:

1. Deberías ver una nueva carpeta: **`node_modules`**

✅ **Dependencias del frontend instaladas correctamente.**

**AHORA TIENES:**
- ✅ Node.js instalado
- ✅ XAMPP corriendo (MySQL funcionando)
- ✅ Base de datos importada
- ✅ Proyecto abierto en VS Code
- ✅ Dependencias del backend instaladas
- ✅ Dependencias del frontend instaladas

**¡Estás listo para ejecutar el proyecto!** 🚀

---

## 10. ABRIR 2 TERMINALES EN VS CODE

**¿Por qué 2 terminales?** Porque necesitas:
- **Terminal 1:** Para ejecutar el BACKEND (servidor)
- **Terminal 2:** Para ejecutar el FRONTEND (interfaz visual)

Ambos deben estar corriendo AL MISMO TIEMPO.

### Paso 10.1: Abrir la Segunda Terminal

Ya tienes una terminal abierta (la que usaste para npm install).

Para abrir la segunda:

1. Mira en el panel de terminal (abajo)
2. En la esquina superior derecha del panel de terminal verás varios íconos
3. Busca el ícono de **"+"** (plus) o dice **"New Terminal"**
4. Haz clic en ese **"+"**

**Ahora tienes 2 terminales.**

### Paso 10.2: Ver y Cambiar entre Terminales

En el panel de terminal, verás pestañas:

```
bash (1)    bash (2)
```

O:

```
powershell (1)    powershell (2)
```

- Click en la pestaña **"1"** para ver la primera terminal
- Click en la pestaña **"2"** para ver la segunda terminal

**Prueba cambiando entre ellas para familiarizarte.** ✅

---

## 11. EJECUTAR EL BACKEND

### Paso 11.1: Ir a la Terminal 1

1. Click en la pestaña de la **Terminal 1** (primera terminal)
2. Asegúrate de estar en la carpeta **backend**

Si no estás en backend, escribe:
```bash
cd C:\Proyectos\appnueva\backend
```

Presiona **Enter**

### Paso 11.2: Iniciar el Servidor Backend

Escribe exactamente:

```bash
npm start
```

Presiona **Enter**

**¿Qué verás?**

Después de 2-3 segundos, deberías ver:

```
╔═══════════════════════════════════════╗
║   🍰 SweetBites Backend Server 🍰    ║
╠═══════════════════════════════════════╣
║   Puerto: 3000                        ║
║   Entorno: Desarrollo                 ║
║   URL: http://localhost:3000          ║
╚═══════════════════════════════════════╝
```

✅ **¡Backend funcionando!**

**MUY IMPORTANTE:**
- **NO cierres esta terminal**
- **NO presiones CTRL + C**
- El backend debe seguir corriendo
- Deja esta terminal tal como está

### Paso 11.3: ¿Qué hacer si hay un Error?

**Error común:** `Error: Cannot connect to database`

**Solución:**
1. Ve al Panel de Control de XAMPP
2. Verifica que **MySQL** esté en **VERDE** (Running)
3. Si está rojo, haz click en **"Start"**
4. Vuelve a VS Code
5. Presiona **CTRL + C** en la terminal
6. Escribe `npm start` de nuevo

---

## 12. EJECUTAR EL FRONTEND

### Paso 12.1: Ir a la Terminal 2

1. Click en la pestaña de la **Terminal 2** (segunda terminal)
2. Esta terminal está "libre" (no está ejecutando nada)

### Paso 12.2: Navegar a Frontend

Escribe:

```bash
cd C:\Proyectos\appnueva\frontend
```

Presiona **Enter**

Verás:
```
PS C:\Proyectos\appnueva\frontend>
```

### Paso 12.3: Iniciar el Servidor Frontend

Escribe exactamente:

```bash
npm run dev
```

Presiona **Enter**

**¿Qué verás?**

Después de 5-10 segundos, verás:

```
  VITE v8.0.12  ready in 823 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

✅ **¡Frontend funcionando!**

**MUY IMPORTANTE:**
- **NO cierres esta terminal**
- **NO presiones CTRL + C**
- El frontend debe seguir corriendo
- Deja esta terminal tal como está

### Paso 12.4: ¿Qué hacer si el Puerto está Ocupado?

**Error común:** `Port 5173 is already in use`

**Solución:**
1. Cierra todas las ventanas de VS Code
2. Abre el Administrador de Tareas (CTRL + SHIFT + ESC)
3. Busca procesos **"Node.js"**
4. Click derecho → **"Finalizar tarea"**
5. Abre VS Code de nuevo
6. Intenta `npm run dev` otra vez

---

## 13. ABRIR LA APLICACIÓN

### Paso 13.1: Abrir en el Navegador

**AHORA SÍ, TODO ESTÁ LISTO.**

1. Abre tu navegador (Chrome recomendado)
2. En la barra de direcciones, escribe exactamente:
   ```
   http://localhost:5173
   ```
3. Presiona **Enter**

**¡Deberías ver la página de inicio de SweetBites!** 🎉

- Logo 🍰
- Navbar arriba
- Sección de héroe con animaciones
- Categorías
- Recetas destacadas

### Paso 13.2: ¿Qué hacer si NO carga?

**Pantalla en blanco:**
1. Presiona **F12** (abre la consola)
2. Click en la pestaña **"Console"**
3. ¿Ves errores en rojo?
4. Cópialos y ve a la sección de "Solución de Problemas"

**No se conecta:**
1. Verifica que AMBAS terminales estén corriendo
2. Verifica que veas el mensaje de Vite en la terminal 2
3. Verifica que veas el mensaje del backend en la terminal 1

---

## 14. PROBAR TODAS LAS FUNCIONALIDADES

### Paso 14.1: Iniciar Sesión como Administrador

1. En la esquina superior derecha, click en **"Iniciar Sesión"**
2. Ingresa:
   - **Email:** `admin@sweetbites.com`
   - **Contraseña:** `password123`
3. Click en **"Ingresar"**
4. Deberías ser redirigido al inicio
5. Verás tu nombre en la esquina superior derecha
6. Verás una **campana 🔔** (notificaciones)

✅ **¡Autenticación funcionando!**

### Paso 14.2: Ver el Dashboard de Admin

1. Click en tu nombre (esquina superior derecha)
2. Se abre un menú desplegable
3. Click en **"Panel Admin"**
4. **Deberías ver:**
   - ✅ 4 tarjetas de estadísticas con animaciones
   - ✅ Gráfica de barras de recetas por categoría
   - ✅ Anillo de progreso de tasa de aprobación
   - ✅ Usuarios recientes con avatares
   - ✅ Recetas pendientes
   - ✅ Botones de acciones rápidas

**Si ves todo esto con animaciones suaves, ¡el dashboard funciona perfectamente!** ✅

### Paso 14.3: Ver Notificaciones

1. Click en la **campana 🔔** (arriba a la derecha)
2. Se abre un dropdown
3. Deberías ver notificaciones (depende del usuario)
4. Puedes:
   - Marcar como leídas
   - Eliminar notificaciones
   - Marcar todas como leídas

✅ **¡Sistema de notificaciones funcionando!**

### Paso 14.4: Ver una Receta

1. En el menú superior, click en **"Recetas"**
2. Verás un grid de recetas con fotos
3. Click en cualquier receta
4. **Deberías ver:**
   - Foto grande de la receta
   - Título y descripción
   - Badges de categoría, dificultad, tiempo
   - Ingredientes
   - Pasos de preparación
   - **⭐ Sección de VALORACIÓN** (estrellas)
   - **💬 Sección de COMENTARIOS**

### Paso 14.5: Valorar una Receta

1. Baja hasta la sección **"Valoración"**
2. Verás el promedio actual
3. Abajo dice **"¿Qué te pareció esta receta?"**
4. Click en las **estrellas** (1 a 5)
5. Deberías ver un mensaje: **"Has valorado esta receta con X estrellas"**
6. Recarga la página (F5)
7. El promedio debería haber cambiado

✅ **¡Sistema de ratings funcionando!**

### Paso 14.6: Comentar en una Receta

1. Baja hasta la sección **"Comentarios"**
2. Verás un formulario con un textarea
3. Escribe un comentario, por ejemplo:
   ```
   ¡Esta receta se ve deliciosa! La voy a probar este fin de semana 😋
   ```
4. Click en **"Publicar Comentario"**
5. Deberías ver tu comentario aparecer inmediatamente
6. Aparecerá con:
   - Tu avatar (iniciales)
   - Tu nombre
   - Fecha
   - El comentario
   - Botón de eliminar (🗑️)

✅ **¡Sistema de comentarios funcionando!**

### Paso 14.7: Crear una Receta

1. Click en tu nombre (arriba a la derecha)
2. Click en **"Crear Receta"**
3. Verás un **wizard de 4 pasos:**

**Paso 1: Información Básica**
- Nombre: "Galletas de Chocolate Caseras"
- Descripción: "Deliciosas galletas crujientes"
- **Foto de la Receta:** Click en **"Choose File"**
  - Selecciona una imagen de tu computadora (cualquier JPG/PNG)
  - Verás el **preview** de la imagen
- Categoría: Galletas 🍪
- Dificultad: Fácil
- Tiempo: 30 minutos
- Porciones: 12
- Click en **"Siguiente →"**

**Paso 2: Ingredientes**
- Ingrediente 1: Harina, 200, gramos
- Click en **"+ Agregar Ingrediente"**
- Ingrediente 2: Azúcar, 100, gramos
- Ingrediente 3: Chocolate chips, 150, gramos
- Click en **"Siguiente →"**

**Paso 3: Preparación**
- Paso 1: "Precalentar el horno a 180°C"
- Click en **"+ Agregar Paso"**
- Paso 2: "Mezclar todos los ingredientes"
- Paso 3: "Hornear por 15 minutos"
- Click en **"Siguiente →"**

**Paso 4: Revisión Final**
- Verás un preview de todo
- La imagen que subiste debe aparecer
- Click en **"Enviar Receta"**

Deberías ver: **"Receta enviada exitosamente. Está pendiente de aprobación."**

✅ **¡Creación de recetas con FOTO funcionando!**

### Paso 14.8: Ver Mis Recetas

1. Click en tu nombre
2. Click en **"Mis Recetas"**
3. Verás la receta que acabas de crear
4. Tiene un badge **amarillo** que dice **"Pendiente"**

✅ **¡Sistema de estados funcionando!**

### Paso 14.9: Aprobar una Receta (como Admin)

1. Ve al **Panel Admin**
2. En la sección **"Recetas Pendientes"** verás tu receta
3. Click en **"Revisar"**
4. Te lleva a una página de gestión
5. Busca tu receta
6. Click en los **3 puntos** (⋮) o botón de acciones
7. Click en **"Aprobar"**
8. Mensaje: **"Receta aprobada exitosamente"**

Ahora:
- Ve a **"Recetas"** (menú superior)
- Deberías ver tu receta publicada con tu foto

✅ **¡Sistema de aprobación funcionando!**

### Paso 14.10: Probar Favoritos

1. Ve a **"Recetas"**
2. Pasa el mouse sobre una receta
3. Verás un **corazón** (🤍) en la esquina
4. Click en el corazón
5. Se pone **rojo** (❤️)
6. Mensaje: **"Receta guardada en favoritos"**
7. Click en tu nombre → **"Favoritos"**
8. Deberías ver la receta ahí

✅ **¡Sistema de favoritos funcionando!**

---

## 15. SOLUCIÓN DE PROBLEMAS

### Problema 1: "npm no se reconoce como comando"

**Causa:** Node.js no está instalado o no está en el PATH

**Solución:**
1. Reinstala Node.js (sección 2)
2. **Marca la casilla "Add to PATH"** durante la instalación
3. Reinicia tu computadora
4. Abre una NUEVA terminal
5. Intenta `node --version`

---

### Problema 2: "Cannot connect to database"

**Causa:** MySQL no está corriendo

**Solución:**
1. Abre XAMPP Control Panel
2. Verifica que MySQL esté en **VERDE**
3. Si está rojo, click en **"Start"**
4. Si da error de puerto:
   - Click en **"Config"** (MySQL)
   - Click en **"my.ini"**
   - Busca `port=3306`
   - Cambia a otro puerto si es necesario
   - Guarda
   - Reinicia MySQL

---

### Problema 3: "Table doesn't exist"

**Causa:** La base de datos no se importó correctamente

**Solución:**
1. Ve a phpMyAdmin (http://localhost/phpmyadmin)
2. Click en `sweetbites_db` en el panel izquierdo
3. Pestaña **"Operaciones"**
4. Click en **"Eliminar la base de datos (DROP)"**
5. Confirma
6. Vuelve a importar `schema_completo.sql` (sección 5)

---

### Problema 4: "Port 3000 already in use"

**Causa:** Otro proceso está usando el puerto 3000

**Solución:**
1. Presiona **CTRL + C** en la terminal del backend
2. Abre `backend/.env`
3. Cambia `PORT=3000` a `PORT=3001`
4. Guarda
5. Intenta `npm start` de nuevo

---

### Problema 5: "Module not found"

**Causa:** Las dependencias no se instalaron

**Solución:**
1. Elimina la carpeta `node_modules` (backend o frontend según el error)
2. Elimina el archivo `package-lock.json`
3. Ejecuta `npm install` de nuevo
4. Espera a que termine

---

### Problema 6: Las imágenes subidas no se ven

**Causa:** La carpeta uploads no tiene permisos o no existe

**Solución:**
1. Verifica que exista: `C:\Proyectos\appnueva\backend\uploads\recipes\`
2. Si no existe, créala manualmente
3. Las imágenes se guardan ahí
4. Reinicia el backend

---

### Problema 7: Pantalla blanca en el navegador

**Causa:** El frontend no se conecta al backend

**Solución:**
1. Presiona **F12** en el navegador
2. Ve a la pestaña **"Console"**
3. ¿Ves errores?
4. Si dice "Network Error":
   - Verifica que el backend esté corriendo (Terminal 1)
   - Verifica que veas el mensaje del backend
5. Si dice "404":
   - Verifica que el frontend esté en http://localhost:5173
   - NO en localhost:3000

---

### Problema 8: "Command not found: npm run dev"

**Causa:** No estás en la carpeta correcta

**Solución:**
1. Verifica tu ruta en la terminal
2. Debe decir: `C:\Proyectos\appnueva\frontend>`
3. Si no, escribe:
   ```bash
   cd C:\Proyectos\appnueva\frontend
   ```

---

## 🎉 ¡FELICIDADES!

Si llegaste hasta aquí y todo funciona, **¡TIENES SWEETBITES CORRIENDO AL 100%!** 🚀

### ✅ CHECKLIST FINAL

Marca todo lo que funciona:

- [ ] Node.js instalado (`node --version` funciona)
- [ ] XAMPP instalado y corriendo (MySQL verde)
- [ ] Base de datos importada (11 tablas)
- [ ] VS Code instalado
- [ ] Proyecto abierto en VS Code
- [ ] Dependencias del backend instaladas
- [ ] Dependencias del frontend instaladas
- [ ] Backend corriendo en Terminal 1
- [ ] Frontend corriendo en Terminal 2
- [ ] Página de inicio carga en http://localhost:5173
- [ ] Puedo iniciar sesión
- [ ] Puedo ver el dashboard admin con gráficas
- [ ] Puedo ver notificaciones (🔔)
- [ ] Puedo valorar recetas (⭐)
- [ ] Puedo comentar en recetas (💬)
- [ ] Puedo crear una receta con foto
- [ ] Puedo ver favoritos

### 📞 ¿NECESITAS AYUDA?

Si tienes algún problema:

1. **Primero:** Revisa la sección "Solución de Problemas" de esta guía
2. **Segundo:** Busca el error exacto en Google
3. **Tercero:** Contacta a quien te pasó el proyecto

---

## 🎓 CONCEPTOS QUE APRENDISTE

Felicidades, ahora sabes:

✅ Qué es **Node.js** y para qué sirve  
✅ Qué es **npm** (Node Package Manager)  
✅ Qué es una **base de datos** (MySQL)  
✅ Qué es **phpMyAdmin**  
✅ Cómo importar un archivo **SQL**  
✅ Qué es un **editor de código** (VS Code)  
✅ Cómo usar la **terminal**  
✅ Qué es el **backend** (servidor)  
✅ Qué es el **frontend** (interfaz visual)  
✅ Cómo ejecutar **2 servidores simultáneos**  
✅ Qué son las **dependencias** (`node_modules`)  
✅ Cómo funciona un proyecto **Full Stack**  

---

**¡DISFRUTA SWEETBITES!** 🍰✨

---

*Última actualización: Mayo 2026*  
*Versión de la guía: 2.0 - Completa para principiantes*
