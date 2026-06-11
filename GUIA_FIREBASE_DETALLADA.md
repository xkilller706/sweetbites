# 🔥 GUÍA ULTRA DETALLADA - Configuración de Firebase para SweetBites

## 📌 ANTES DE EMPEZAR

**Necesitarás:**
- ✅ Una cuenta de Google (Gmail)
- ✅ Acceso a tu correo electrónico
- ✅ 15-20 minutos de tiempo
- ✅ Un editor de código (VS Code, Notepad++, o el que uses)

**Lo que vamos a hacer:**
1. Crear un proyecto en Firebase
2. Habilitar autenticación con email (sin contraseña)
3. Obtener 2 archivos de configuración
4. Copiar esos archivos a tu código

---

# PARTE 1: CREAR PROYECTO EN FIREBASE CONSOLE

## Paso 1.1: Abrir Firebase Console

1. Abre tu navegador (Chrome, Edge, Firefox)
2. Ve a esta URL: **https://console.firebase.google.com/**
3. Te pedirá iniciar sesión con tu cuenta de Google
4. Inicia sesión con tu Gmail

**Deberías ver** una pantalla con tus proyectos de Firebase (si es primera vez, estará vacía)

---

## Paso 1.2: Crear un Nuevo Proyecto

1. Busca un botón grande que dice **"Agregar proyecto"** o **"Add project"** o **"Create a project"**
   - Está en el centro de la pantalla si no tienes proyectos
   - O arriba a la derecha si ya tienes otros proyectos

2. **CLICK** en ese botón

3. Te aparecerá un formulario con 3 pasos:

---

### **PASO 1 de 3: Nombre del proyecto**

En el campo de texto que dice "Nombre del proyecto" o "Project name":

```
Escribe: sweetbites
```

**Debajo del campo** verás que Firebase genera un ID único como:
```
sweetbites-a1b2c
```

**Ese ID es IMPORTANTE**, cópialo en un bloc de notas temporal.

Click en el botón azul **"Continuar"** o **"Continue"**

---

### **PASO 2 de 3: Google Analytics**

Te preguntará si quieres habilitar Google Analytics.

**DESACTIVA** el toggle/switch (debe quedar en GRIS, no azul)

- Verás un switch/toggle que dice "Enable Google Analytics for this project"
- Click en el switch para DESACTIVARLO (debe quedar gris/apagado)

Click en **"Crear proyecto"** o **"Create project"**

---

### **PASO 3 de 3: Esperar**

Firebase creará tu proyecto (tarda 10-30 segundos).

Verás una barra de progreso o un spinner.

Cuando termine, verás:
```
✓ Tu nuevo proyecto está listo
```

Click en **"Continuar"** o **"Continue"**

---

## Paso 1.3: Confirmar que Estás en el Proyecto

Deberías ver el **Dashboard** de Firebase.

**Arriba a la izquierda** debería decir el nombre de tu proyecto: **"sweetbites"**

Si ves eso, ¡perfecto! Proyecto creado ✅

---

# PARTE 2: HABILITAR AUTENTICACIÓN CON EMAIL LINK

## Paso 2.1: Ir a Authentication

En el **menú lateral izquierdo**, busca una sección que dice:

```
🔐 Authentication
```

o

```
Compilación > Authentication
```

**CLICK** en "Authentication"

---

## Paso 2.2: Activar Authentication

Si es la primera vez, verás un botón grande que dice:

```
[Get started] o [Comenzar]
```

**CLICK** en ese botón.

Firebase te mostrará la pantalla de Authentication.

---

## Paso 2.3: Ir a Sign-in Method

Arriba verás varias pestañas:
- Users
- **Sign-in method** ← Esta es la que necesitas
- Templates
- Usage
- Settings

**CLICK** en la pestaña **"Sign-in method"**

---

## Paso 2.4: Habilitar Email/Password Provider

Verás una lista de "Sign-in providers" (proveedores de inicio de sesión):

- Email/Password
- Phone
- Google
- Facebook
- Twitter
- GitHub
- etc.

Busca la fila que dice:
```
📧 Email/Password | Disabled (o Deshabilitado)
```

**CLICK** en esa fila (en cualquier parte de la línea)

---

## Paso 2.5: Configurar Email Link (MUY IMPORTANTE)

Se abrirá un **modal/popup** con opciones de configuración.

Verás **DOS** opciones (dos switches/toggles):

### ❌ OPCIÓN 1 (NO la actives):
```
Email/Password
Enable email/password sign-in
```
**DÉJALA DESACTIVADA** (switch en gris)

### ✅ OPCIÓN 2 (SÍ actívala):
```
Email link (passwordless sign-in)
Enable email link sign-in
```
**ACTIVA ESTA** (click en el switch, debe quedar AZUL)

---

**Tu configuración debe quedar así:**

```
☐ Email/Password                    (SIN marcar, gris)
☑ Email link (passwordless sign-in) (MARCADO, azul)
```

Click en el botón **"Save"** o **"Guardar"** (abajo a la derecha del modal)

---

## Paso 2.6: Confirmar que Quedó Habilitado

Deberías volver a la lista de providers.

La fila de "Email/Password" ahora debe decir:
```
📧 Email/Password | Enabled (o Habilitado)
```

Si ves eso, ¡perfecto! Authentication configurado ✅

---

# PARTE 3: OBTENER CREDENCIALES PARA EL FRONTEND

## Paso 3.1: Ir a Project Settings

Arriba a la izquierda, al lado del nombre "sweetbites", verás un **ícono de engranaje** ⚙️

**CLICK** en el engranaje ⚙️

En el menú que se abre, click en **"Project settings"** o **"Configuración del proyecto"**

---

## Paso 3.2: Registrar una App Web

En la pantalla de Project Settings, verás arriba:

```
General | Service accounts | Usage and billing | ...
```

Asegúrate de estar en la pestaña **"General"**

---

Baja un poco en la página hasta ver una sección que dice:

```
Your apps
There are no apps in your project
```

O si está en español:
```
Tus apps
No hay apps en tu proyecto
```

Verás varios íconos (botones grandes):
- 📱 iOS (manzana)
- 🤖 Android (robot verde)
- **</> Web** ← Este es el que necesitas
- ⚙️ Unity

**CLICK** en el ícono **</> (Web)**

---

## Paso 3.3: Configurar la Web App

Se abrirá un formulario que dice "Add Firebase to your web app"

### Campo 1: App nickname
```
Escribe: SweetBites Web
```

### Campo 2: Firebase Hosting
```
❌ NO marques esta casilla
```
(Debe quedar SIN marcar)

Click en el botón azul **"Register app"** o **"Registrar app"**

---

## Paso 3.4: COPIAR las Credenciales (SUPER IMPORTANTE)

Firebase te mostrará un código JavaScript.

Verás algo como esto:

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/..."></script>

<script>
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "sweetbites-a1b2c.firebaseapp.com",
    projectId: "sweetbites-a1b2c",
    storageBucket: "sweetbites-a1b2c.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
```

---

### 🎯 LO QUE NECESITAS COPIAR:

**SOLO** copia la parte del objeto `firebaseConfig`, que es esto:

```javascript
{
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "sweetbites-a1b2c.firebaseapp.com",
  projectId: "sweetbites-a1b2c",
  storageBucket: "sweetbites-a1b2c.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
}
```

**IMPORTANTE:**
- Selecciona TODO el objeto (desde `{` hasta `}`)
- **CTRL + C** para copiar
- Pégalo en un bloc de notas temporal (lo usaremos en el Paso 4)

---

Click en **"Continue to console"** o **"Continuar a la consola"**

---

# PARTE 4: OBTENER SERVICE ACCOUNT KEY PARA EL BACKEND

## Paso 4.1: Ir a Service Accounts

Deberías estar de nuevo en **Project Settings**.

Si no, click en el engranaje ⚙️ arriba → "Project settings"

---

Arriba verás varias pestañas:

```
General | Service accounts | Usage and billing | Integrations | ...
```

**CLICK** en la pestaña **"Service accounts"**

---

## Paso 4.2: Generar la Clave Privada

En la pantalla de Service accounts, verás:

### Sección 1: Firebase Admin SDK

Verás un código de ejemplo en varios lenguajes (Node.js, Python, Java, Go).

Asegúrate de que esté seleccionado **"Node.js"** en el selector de lenguaje.

---

### Sección 2: Botón de Generación

Más abajo, verás un texto que dice:

```
Generate a private key to use with a service account
```

Y un botón que dice:

```
[Generate new private key]
```
o en español:
```
[Generar nueva clave privada]
```

**CLICK** en ese botón.

---

## Paso 4.3: Confirmar la Descarga

Aparecerá un **popup de advertencia** que dice:

```
⚠️ Generate new private key?

This will download a JSON file containing a private key for a service account.
Keep this file confidential...
```

**CLICK** en el botón **"Generate key"** o **"Generar clave"**

---

## Paso 4.4: Guardar el Archivo JSON

Se descargará un archivo con un nombre como:

```
sweetbites-a1b2c-firebase-adminsdk-xyz12-abc123def4.json
```

**IMPORTANTE:**
1. Guárdalo en un lugar seguro (ej: tu carpeta de Descargas)
2. **NO** lo compartas con nadie
3. **NO** lo subas a GitHub (es como una contraseña)
4. Recuerda dónde lo guardaste (lo necesitaremos en el Paso 5)

---

# PARTE 5: AUTORIZAR DOMINIOS (IMPORTANTE)

## Paso 5.1: Volver a Authentication

En el menú lateral izquierdo, **CLICK** en **"Authentication"**

---

## Paso 5.2: Ir a Settings

Arriba verás las pestañas:
- Users
- Sign-in method
- Templates
- Usage
- **Settings** ← Click aquí

**CLICK** en **"Settings"**

---

## Paso 5.3: Verificar Dominios Autorizados

Baja en la página hasta ver una sección que dice:

```
Authorized domains
```

Deberías ver una lista con:

```
✓ localhost
✓ sweetbites-a1b2c.firebaseapp.com
```

**Si ves `localhost` en la lista**, ¡perfecto! Ya está autorizado ✅

**Si NO ves `localhost`**:
1. Click en **"Add domain"**
2. Escribe: `localhost`
3. Click en **"Add"**

---

# PARTE 6: CONFIGURAR TU CÓDIGO

Ahora vamos a pegar las credenciales en tu código.

## Paso 6.1: Abrir el Proyecto en tu Editor

1. Abre **VS Code** (o tu editor de código)
2. Abre la carpeta de tu proyecto:
   ```
   C:\xampp\htdocs\ProSweetBites\appnueva
   ```

---

## Paso 6.2: Configurar Frontend

### A. Abrir el archivo de configuración

Navega a:
```
frontend/src/config/firebase.js
```

Abre ese archivo.

---

### B. Verás este código:

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Reemplazar con las credenciales reales de Firebase Console
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar Auth
export const auth = getAuth(app)

export default app
```

---

### C. Reemplazar las credenciales

Recuerda el objeto `firebaseConfig` que copiaste en el **Paso 3.4**?

Sácalo de tu bloc de notas.

Reemplaza **TODO** el objeto `firebaseConfig` (desde `{` hasta `}`) con tus valores reales.

---

### D. Ejemplo de cómo debería quedar:

**ANTES:**
```javascript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
}
```

**DESPUÉS:**
```javascript
const firebaseConfig = {
  apiKey: 'AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'sweetbites-a1b2c.firebaseapp.com',
  projectId: 'sweetbites-a1b2c',
  storageBucket: 'sweetbites-a1b2c.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef123456',
}
```

**GUARDA EL ARCHIVO** (Ctrl + S)

✅ Frontend configurado!

---

## Paso 6.3: Configurar Backend

### A. Abrir el archivo JSON descargado

1. Ve a tu carpeta de Descargas
2. Busca el archivo JSON que descargaste (Paso 4.4):
   ```
   sweetbites-a1b2c-firebase-adminsdk-xyz12-abc123def4.json
   ```
3. **Click derecho** → **Abrir con** → **VS Code** (o tu editor)

---

### B. Verás algo como esto:

```json
{
  "type": "service_account",
  "project_id": "sweetbites-a1b2c",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQ...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xyz12@sweetbites-a1b2c.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xyz12%40sweetbites-a1b2c.iam.gserviceaccount.com"
}
```

**SELECCIONA TODO** (Ctrl + A) y **COPIA** (Ctrl + C)

---

### C. Abrir archivo de configuración del backend

En tu proyecto, navega a:
```
backend/config/firebase.js
```

Abre ese archivo.

---

### D. Verás este código:

```javascript
const admin = require('firebase-admin');

// TODO: Reemplazar con el Service Account Key real de Firebase
const serviceAccount = {
  "type": "service_account",
  "project_id": "YOUR_PROJECT_ID",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "YOUR_PRIVATE_KEY",
  "client_email": "YOUR_CLIENT_EMAIL",
  "client_id": "YOUR_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "YOUR_CERT_URL"
};

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
```

---

### E. Reemplazar el serviceAccount

**SELECCIONA** todo el objeto `serviceAccount` (desde `{` hasta `};`)

**BORRA** ese objeto.

**PEGA** (Ctrl + V) el contenido del JSON que copiaste.

Agrega el `;` al final.

---

### F. Cómo debería quedar:

```javascript
const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "sweetbites-a1b2c",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQ...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xyz12@sweetbites-a1b2c.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xyz12%40sweetbites-a1b2c.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
```

**GUARDA EL ARCHIVO** (Ctrl + S)

✅ Backend configurado!

---

# PARTE 7: PROBAR QUE FUNCIONA

## Paso 7.1: Iniciar el Backend

1. Abre una terminal en tu proyecto
2. Navega al backend:
   ```bash
   cd C:\xampp\htdocs\ProSweetBites\appnueva\backend
   ```

3. Inicia el servidor:
   ```bash
   npm start
   ```

Deberías ver:
```
╔═══════════════════════════════════════╗
║   🍰 SweetBites Backend Server 🍰    ║
╠═══════════════════════════════════════╣
║   Puerto: 3000                        ║
║   Entorno: Desarrollo                 ║
║   URL: http://localhost:3000          ║
╚═══════════════════════════════════════╝
```

**SI VES ERRORES:**
- Revisa que copiaste bien el `serviceAccount` en `backend/config/firebase.js`
- Asegúrate de que el `private_key` tiene los `\n` (saltos de línea)

---

## Paso 7.2: Iniciar el Frontend

1. Abre **OTRA** terminal (deja la del backend corriendo)
2. Navega al frontend:
   ```bash
   cd C:\xampp\htdocs\ProSweetBites\appnueva\frontend
   ```

3. Inicia el frontend:
   ```bash
   npm run dev
   ```

Deberías ver:
```
  VITE v8.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Paso 7.3: Probar el Registro

1. Abre tu navegador
2. Ve a: **http://localhost:5173/auth/register**

3. Verás el formulario de registro (SIN campo de contraseña)

4. Llena el formulario:
   - Nombre: `Tu Nombre`
   - Email: `tu-email-real@gmail.com` (USA UN EMAIL REAL que puedas revisar)
   - Teléfono: `123456789` (opcional)

5. Click en **"Crear Cuenta"**

---

## Paso 7.4: Verificar el Email

Si todo salió bien:

1. Verás un mensaje verde: **"¡Cuenta creada! Revisa tu correo para iniciar sesión."**

2. Ve a tu correo (el que pusiste en el formulario)

3. Busca un email de:
   ```
   noreply@sweetbites-xxxxx.firebaseapp.com
   ```

4. **Puede tardar unos segundos** (hasta 1-2 minutos)

5. **Revisa tu carpeta de SPAM** si no lo ves en la bandeja principal

---

## Paso 7.5: Click en el Magic Link

1. Abre el email que recibiste

2. Verás un botón grande o un link que dice algo como:
   ```
   Sign in to SweetBites Web
   ```

3. **CLICK** en ese botón/link

4. Se abrirá tu navegador en:
   ```
   http://localhost:5173/auth/verify-email?apiKey=...&oobCode=...
   ```

5. Verás un spinner que dice "Verificando tu enlace..."

6. Si todo funciona, serás redirigido a:
   ```
   http://localhost:5173/recipes
   ```

7. Arriba en el Navbar deberías ver tu nombre

---

# 🎉 ¡FELICIDADES! FUNCIONA

Si llegaste hasta aquí y pudiste iniciar sesión, **¡lo lograste!**

---

# ❌ SOLUCIÓN DE PROBLEMAS

## Problema 1: No llega el correo

**Soluciones:**
1. Espera 2-3 minutos
2. Revisa SPAM/Correo no deseado
3. Verifica que activaste "Email link" en Firebase Console (Parte 2, Paso 2.5)
4. Abre la consola del navegador (F12) y busca errores en rojo

---

## Problema 2: Error "auth/unauthorized-domain"

**Solución:**
1. Ve a Firebase Console
2. Authentication → Settings → Authorized domains
3. Verifica que `localhost` esté en la lista
4. Si no está, agrégalo

---

## Problema 3: Error al verificar el link

**Solución:**
1. Abre la consola del navegador (F12) → pestaña "Console"
2. Copia el error y pégamelo aquí
3. Abre la terminal del backend y busca errores en rojo
4. Verifica que el `serviceAccount` en `backend/config/firebase.js` esté bien copiado

---

## Problema 4: Error 500 en el backend

**Causa común:** El `private_key` mal formateado

**Solución:**
1. Abre `backend/config/firebase.js`
2. Busca la línea `"private_key"`
3. Debe tener `\n` (saltos de línea), ejemplo:
   ```javascript
   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIB...\n-----END PRIVATE KEY-----\n"
   ```
4. Si no tiene los `\n`, vuelve a copiar desde el JSON original

---

# 📞 ¿NECESITAS AYUDA?

Si algo no funciona, dime:

1. **¿En qué paso te quedaste?**
2. **¿Qué error ves?**
   - Copia el error de la consola del navegador (F12)
   - Copia el error de la terminal del backend
   - Copia el error de la terminal del frontend
3. **¿Llegó el correo?** Sí / No
4. **¿Qué pasa cuando haces click en el link del email?**

¡Pégame los errores y te ayudo! 🚀
