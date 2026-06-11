# 🔥 Instrucciones para Completar la Configuración de Firebase

## ✅ Lo que YA está hecho (código implementado)

- ✅ Dependencias instaladas (`firebase` y `firebase-admin`)
- ✅ Login.jsx modificado (sin contraseña, solo email)
- ✅ Register.jsx modificado (sin contraseña)
- ✅ VerifyEmail.jsx creado (procesa magic links)
- ✅ authService.js actualizado con Firebase
- ✅ AuthContext.jsx actualizado
- ✅ Backend middleware actualizado para verificar tokens Firebase
- ✅ Backend routes/auth.js con endpoint `/firebase-signin`

## ⚠️ Lo que NECESITAS hacer (configurar Firebase Console)

### Paso 1: Crear Proyecto en Firebase Console

1. Ve a: https://console.firebase.google.com/
2. Click en **"Agregar proyecto"** / **"Add project"**
3. Nombre del proyecto: `sweetbites` (o el que prefieras)
4. **Desactiva** Google Analytics (no lo necesitas por ahora)
5. Click **"Crear proyecto"**

---

### Paso 2: Habilitar Email Link Authentication

1. En el menú lateral, click en **"Authentication"**
2. Click en **"Comenzar"** / **"Get started"**
3. Ve a la pestaña **"Sign-in method"**
4. Click en **"Correo electrónico/contraseña"** / **"Email/Password"**
5. **IMPORTANTE**: 
   - ✅ Activa **SOLO** la opción: **"Vínculo de correo electrónico (inicio de sesión sin contraseña)"** / **"Email link (passwordless sign-in)"**
   - ❌ **NO** actives la opción de "Correo electrónico/contraseña" (con contraseña)
6. Click **"Guardar"**

---

### Paso 3: Registrar App Web

1. En la página principal del proyecto (ícono de inicio), click en el ícono **`</>`** (Web)
2. Nombre de la app: **`SweetBites Web`**
3. **NO** marques "Firebase Hosting"
4. Click **"Registrar app"**
5. **COPIA** el código de configuración que aparece:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "sweetbites-xxxxx.firebaseapp.com",
  projectId: "sweetbites-xxxxx",
  storageBucket: "sweetbites-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

6. **GUÁRDALO** (lo necesitarás en el siguiente paso)

---

### Paso 4: Obtener Service Account Key (para Backend)

1. Click en el ícono de **engranaje** ⚙️ (arriba izquierda) → **"Configuración del proyecto"** / **"Project settings"**
2. Ve a la pestaña **"Cuentas de servicio"** / **"Service accounts"**
3. Click en **"Generar nueva clave privada"** / **"Generate new private key"**
4. Click **"Generar clave"** (se descargará un archivo `.json`)
5. **GUARDA** ese archivo JSON de forma segura

---

### Paso 5: Configurar Dominios Autorizados

1. En **Authentication** → **Settings**
2. Ve a **"Authorized domains"**
3. Asegúrate de que estén autorizados:
   - `localhost` (debería estar por defecto)
   - Si tienes un dominio de producción, agrégalo aquí

---

## 🔧 Paso 6: Actualizar Archivos de Configuración

### A. Frontend - `frontend/src/config/firebase.js`

Abre el archivo y reemplaza las credenciales:

```javascript
const firebaseConfig = {
  apiKey: 'TU_API_KEY_AQUI',              // Del paso 3
  authDomain: 'TU_AUTH_DOMAIN_AQUI',      // Del paso 3
  projectId: 'TU_PROJECT_ID_AQUI',        // Del paso 3
  storageBucket: 'TU_STORAGE_BUCKET',     // Del paso 3
  messagingSenderId: 'TU_SENDER_ID',      // Del paso 3
  appId: 'TU_APP_ID',                     // Del paso 3
}
```

### B. Backend - `backend/config/firebase.js`

Abre el archivo `.json` descargado en el Paso 4 y copia TODO su contenido.

Luego abre `backend/config/firebase.js` y reemplaza el objeto `serviceAccount`:

```javascript
const serviceAccount = {
  // PEGA AQUÍ TODO EL CONTENIDO DEL ARCHIVO JSON DESCARGADO
  "type": "service_account",
  "project_id": "sweetbites-xxxxx",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@sweetbites-xxxxx.iam.gserviceaccount.com",
  // ... resto del contenido
};
```

**IMPORTANTE**: La clave `private_key` tiene saltos de línea `\n`. Asegúrate de copiarla exactamente como viene en el JSON.

---

## 🧪 Paso 7: Probar la Implementación

1. **Inicia el backend**:
   ```bash
   cd backend
   npm start
   ```

2. **Inicia el frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Prueba el flujo**:
   - Ve a `http://localhost:5173/auth/register`
   - Ingresa tu nombre y un email válido (que puedas revisar)
   - Click en "Crear Cuenta"
   - Deberías ver un mensaje de éxito
   - Revisa tu correo (puede tardar unos segundos)
   - Haz click en el enlace del email
   - Deberías ser redirigido a `/auth/verify-email` y luego a `/recipes`

---

## 🐛 Troubleshooting

### Error: "Firebase: Error (auth/unauthorized-domain)"

**Solución**: En Firebase Console → Authentication → Settings → Authorized domains, agrega `localhost`.

### No llega el correo

**Causas posibles**:
1. Revisa la carpeta de spam
2. Verifica que habilitaste "Email link" en Authentication (Paso 2)
3. Revisa la consola del navegador para ver errores

### Error: "Token inválido" en el backend

**Causas posibles**:
1. Verifica que copiaste correctamente el Service Account Key
2. Asegúrate de que `private_key` tiene los saltos de línea `\n`
3. Verifica que el proyecto en Firebase Admin coincide con el del frontend

---

## 📧 Ejemplo de Email que Recibirás

Firebase enviará un email que se ve así:

```
De: noreply@sweetbites-xxxxx.firebaseapp.com
Asunto: Inicia sesión en SweetBites Web

Haz clic en el siguiente enlace para iniciar sesión:

[Botón grande: "Iniciar sesión en SweetBites Web"]

Si no solicitaste este enlace, puedes ignorar este mensaje.
```

El link se verá algo como:
```
http://localhost:5173/auth/verify-email?apiKey=...&oobCode=...&mode=signIn
```

---

## ⚡ Próximos Pasos (después de que funcione)

1. **Personalizar el template del email** (Firebase no permite mucha personalización en el plan gratuito)
2. **Migrar usuarios existentes** si los tienes
3. **Agregar pantalla de "completar perfil"** después del primer login
4. **Configurar dominio de producción** cuando despliegues

---

## 🆘 Si necesitas ayuda

Cuando hayas completado los pasos 1-6, dime:
- ✅ "Listo, configuré Firebase" - para que te ayude a probar
- ❌ "Tengo un error en [paso X]" - para ayudarte a resolverlo

Pégame aquí los errores que veas en:
- Consola del navegador (F12)
- Terminal del backend
- Terminal del frontend
