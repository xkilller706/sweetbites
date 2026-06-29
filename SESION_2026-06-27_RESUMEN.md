# Sesión de Debugging SweetBites - 27 de Junio 2026

## 📋 RESUMEN EJECUTIVO

**Proyecto:** SweetBites - Plataforma de recetas de postres  
**Dominio:** https://sweetbites.proyectoscampus.top  
**VPS:** Contabo (IP: 185.245.182.220)  
**Arquitectura:** Docker Compose (3 contenedores: frontend Nginx + backend Node.js + MySQL)

### ✅ ESTADO ACTUAL (al finalizar sesión)

| Funcionalidad | Estado | Comentarios |
|--------------|--------|-------------|
| Crear recetas | ✅ FUNCIONA | Error de dificultad SQL corregido |
| Subir imágenes de recetas | ✅ FUNCIONA | Nginx proxy arreglado con `^~` |
| Ver imágenes de recetas | ✅ FUNCIONA | Proxy `/uploads/` funcionando |
| Admin panel - Usuarios | ✅ FUNCIONA | SQL LIMIT/OFFSET corregido |
| Admin panel - Recetas | ✅ FUNCIONA | SQL LIMIT/OFFSET corregido |
| Colecciones SQL | ✅ FUNCIONA | GROUP BY corregido |
| Encoding UTF-8 | ✅ ARREGLADO | Scripts SQL ejecutados |
| SQL Mode | ✅ ARREGLADO | ONLY_FULL_GROUP_BY removido |
| Upgrade a Premium | ⚠️ NO PROBADO | Endpoint existe pero no verificado |
| Foto de perfil | ⚠️ POSIBLE PROBLEMA | Podría estar devolviendo `localhost:3000` |
| Agregar receta a colección | ❌ ERROR 400 | Necesita debugging en vivo |

---

## 🐛 ERRORES CORREGIDOS EN ESTA SESIÓN

### 1. ✅ Error SQL: Admin endpoints 500 (LIMIT/OFFSET)

**Problema:**
```
Incorrect arguments to mysqld_stmt_execute
Error en: backend/routes/admin.js
```

**Causa:** MySQL no acepta placeholders `?` para LIMIT y OFFSET en prepared statements.

**Solución aplicada:**
```javascript
// ANTES (fallaba):
query += ' ORDER BY fecha_registro DESC LIMIT ? OFFSET ?';
params.push(Number(limit), Number(offset));

// DESPUÉS (funciona):
const limitNum = parseInt(limit) || 20;
const offsetNum = parseInt(offset) || 0;
query += ` ORDER BY fecha_registro DESC LIMIT ${limitNum} OFFSET ${offsetNum}`;
// Ya NO se hace push de estos valores
```

**Archivo modificado:** `backend/routes/admin.js` (líneas 143-145, 304-306)  
**Commit:** `425aa52` - "fix: Corregir errores de producción críticos"

---

### 2. ✅ Error SQL: Crear receta 500 (Dificultad truncada)

**Problema:**
```
Data truncated for column 'dificultad' at row 1
Error en: backend/routes/recipes.js:519
```

**Causa:** El frontend envía `'facil'`, `'intermedio'`, `'dificil'` pero la DB espera ENUM `'Fácil'`, `'Intermedio'`, `'Difícil'` (con tilde y mayúscula).

**Solución aplicada:**
```javascript
// MAPEO agregado en backend/routes/recipes.js:505
const dificultadMap = {
    'facil': 'Fácil',
    'intermedio': 'Intermedio',
    'dificil': 'Difícil',
    // Por si acaso ya viene bien formateado
    'Fácil': 'Fácil',
    'Intermedio': 'Intermedio',
    'Difícil': 'Difícil'
};
const dificultadFinal = dificultadMap[dificultad] || 'Intermedio';
```

**Archivo modificado:** `backend/routes/recipes.js` (líneas 493-519)  
**Commit:** `425aa52` - "fix: Corregir errores de producción críticos"

---

### 3. ✅ Error SQL: Colecciones 500 (GROUP BY incompleto)

**Problema:**
```
Expression #1 of ORDER BY clause is not in GROUP BY clause
sql_mode=only_full_group_by incompatible
Error en: backend/routes/users.js:179
```

**Causa:** MySQL 8.0 con `ONLY_FULL_GROUP_BY` activo requiere que todas las columnas en ORDER BY estén en GROUP BY.

**Solución aplicada:**
```sql
-- ANTES (fallaba):
GROUP BY r.id, c.id
ORDER BY cr.fecha_agregado DESC

-- DESPUÉS (funciona):
GROUP BY r.id, c.id, cr.fecha_agregado
ORDER BY cr.fecha_agregado DESC
```

**Archivo modificado:** `backend/routes/users.js` (línea 193)  
**Commit:** `425aa52` - "fix: Corregir errores de producción críticos"

**Además se ejecutó en VPS:**
```bash
docker exec -i sweetbites-db mysql ... < database/fix-sql-mode.sql
```
Esto removió globalmente `ONLY_FULL_GROUP_BY` del `sql_mode`.

---

### 4. ✅ Error: Imágenes 404 (Nginx no hace proxy)

**Problema:**
```
GET /uploads/recipes/image.png 404
Nginx log: open() "/usr/share/nginx/html/uploads/..." failed (2: No such file or directory)
```

**Causa:** El bloque regex `location ~* \.(png|jpg|...)$` tiene **mayor prioridad** que `location /uploads/` en Nginx. Nginx intenta servir desde filesystem local en lugar de hacer proxy al backend.

**Solución aplicada:**
```nginx
# ANTES (fallaba):
location /uploads/ {
    proxy_pass http://backend:3000/uploads/;
    ...
}

# DESPUÉS (funciona):
location ^~ /uploads/ {  # ← ^~ = máxima prioridad, detiene búsqueda de regex
    proxy_pass http://backend:3000/uploads/;
    ...
}
```

**Explicación del `^~`:**  
El modificador `^~` le dice a Nginx: "Si esta ruta coincide, NO evaluar expresiones regulares". Esto garantiza que `/uploads/*` siempre haga proxy al backend.

**Archivo modificado:** `frontend/nginx.conf` (línea 32)  
**Commit:** `fcbcc51` - "fix: Agregar prioridad ^~ a location /uploads/ en Nginx"

---

### 5. ✅ Encoding UTF-8 (caracteres raros)

**Problema:**
Texto mostraba: "Ã­" en lugar de "í", "Ã¡" en lugar de "á"

**Solución aplicada:**
Script SQL para cambiar collation a `utf8mb4_unicode_ci`:

```sql
ALTER DATABASE sweetbites_db CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
ALTER TABLE recipes CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- (y todas las demás tablas)
```

**Archivo creado:** `database/fix-encoding.sql`  
**Ejecutado en VPS:**
```bash
docker exec -i sweetbites-db mysql -u root -p'...' sweetbites_db < database/fix-encoding.sql
```

---

## 📝 COMMITS REALIZADOS

### Local → GitHub

| Commit Hash | Mensaje | Archivos Modificados |
|-------------|---------|---------------------|
| `425aa52` | fix: Corregir errores de producción críticos | `backend/routes/recipes.js`, `backend/routes/users.js`, `database/fix-encoding.sql`, `database/fix-sql-mode.sql` |
| `fcbcc51` | fix: Agregar prioridad ^~ a location /uploads/ en Nginx | `frontend/nginx.conf` |

### Estado en VPS

```bash
git log --oneline -5
# fcbcc51 (HEAD -> main, origin/main) fix: Agregar prioridad ^~ a location /uploads/ en Nginx
# 425aa52 fix: Corregir errores de producción críticos
# 9eb06b4 fix: Cambiar LIMIT/OFFSET de placeholders a interpolación directa
# edf8b37 fix: Corregir errores SQL admin, proxy uploads Nginx y simplificar planes
# 68f9872 fix: Quitar selección de planes del registro, todos empiezan con plan gratis
```

**Confirmado:** VPS tiene todos los commits actualizados ✅

---

## 🔧 COMANDOS EJECUTADOS EN VPS

### Pull de cambios
```bash
cd /var/www/sweetbites
git pull origin main
```

### Rebuild de contenedores
```bash
# Frontend (para aplicar cambio de nginx.conf)
docker compose up -d --build --force-recreate frontend

# Backend (para aplicar fix de dificultad y SQL)
docker compose up -d --build --force-recreate backend
```

### Fix de base de datos
```bash
# Fix encoding UTF-8
docker exec -i sweetbites-db mysql -u root -p'cKwSFbfB71O8QLKR+/YHraBiV4HaDOCF2gp3xaQTAJA=' sweetbites_db < database/fix-encoding.sql

# Fix SQL mode
docker exec -i sweetbites-db mysql -u root -p'cKwSFbfB71O8QLKR+/YHraBiV4HaDOCF2gp3xaQTAJA=' sweetbites_db < database/fix-sql-mode.sql
```

### Permisos de uploads (ya ejecutado)
```bash
docker exec sweetbites-backend mkdir -p /app/uploads/recipes /app/uploads/profiles
docker exec sweetbites-backend chmod -R 777 /app/uploads
```

### Verificación de imágenes
```bash
docker exec sweetbites-backend ls -la /app/uploads/profiles/
docker exec sweetbites-backend ls -la /app/uploads/recipes/
```

**Resultado:** Todas las imágenes SÍ existen físicamente en el backend ✅

---

## ❌ PROBLEMAS PENDIENTES (Para mañana)

### 1. 🔴 Error al agregar receta a colección

**Síntomas:**
```javascript
POST https://sweetbites.proyectoscampus.top/api/users/collections/2/recipes/10 400 (Bad Request)
Error al agregar a colecciones: AxiosError: Request failed with status code 400
```

**Log de Nginx:**
```
POST /api/users/collections/2/recipes/10 HTTP/1.0" 400 67
```

**Causa:** Desconocida. El backend devuelve 400 (Bad Request) pero no se ven logs de error en `docker logs sweetbites-backend`.

**Próximo paso:**
1. En VPS ejecutar: `docker logs sweetbites-backend -f` (dejar corriendo)
2. Intentar agregar receta a colección desde el navegador
3. Ver el error exacto que aparece en el log del backend

**Archivo sospechoso:** `backend/routes/users.js` (endpoint POST `/api/users/collections/:id/recipes/:recipeId`)

---

### 2. ⚠️ Foto de perfil podría mostrar `localhost:3000`

**Síntomas reportados:**
```
Mixed Content: requesting 'http://localhost:3000/uploads/profiles/profile-xyz.png'
GET http://localhost:3000/uploads/profiles/... net::ERR_CONNECTION_REFUSED
```

**Estado:** NO confirmado en la última prueba. Podría estar resuelto con el fix de Nginx `^~`.

**Próximo paso:**
1. Refrescar navegador con Ctrl+Shift+R
2. Ir a `/user/profile`
3. Verificar si la foto de perfil carga correctamente
4. Si sale `localhost:3000`, ver logs del backend al subir foto nueva:
   ```bash
   docker logs sweetbites-backend -f
   ```
   Y detectar qué endpoint está devolviendo URLs mal formadas.

**Archivo sospechoso:** `backend/routes/users.js` (endpoint POST `/api/users/profile/photo`)

---

### 3. ⚠️ Upgrade a Premium no probado

**Síntomas reportados anteriormente:**
```
Error al procesar el pago
```

**Estado:** NO vuelto a probar después de los fixes.

**Próximo paso:**
1. Login como usuario regular
2. Ir a `/plans`
3. Intentar upgrade a Premium
4. Ver si funciona o muestra error
5. Si falla, ver logs: `docker logs sweetbites-backend -f`

**Archivo sospechoso:** `backend/routes/users.js` (endpoint POST `/api/users/upgrade-premium`)

---

## 📚 INFORMACIÓN TÉCNICA CLAVE

### Arquitectura Docker

```
Internet (HTTPS 443)
    ↓
Nginx VPS (Proxy reverso + SSL terminación)
    ↓ proxy_pass http://127.0.0.1:80
Contenedor Frontend (Nginx interno puerto 80)
    ├─ Archivos estáticos React (build de Vite)
    ├─ Proxy /api → http://backend:3000
    └─ Proxy /uploads/ → http://backend:3000/uploads/  ← FIX APLICADO
                ↓
         Contenedor Backend (Express puerto 3000)
                ↓
         Contenedor MySQL (puerto 3306)
```

### Contenedores activos

```bash
docker ps
# sweetbites-frontend (puerto 80)
# sweetbites-backend (puerto 3000)
# sweetbites-db (puerto 3306)
```

### Network Docker
- Nombre: `sweetbites-network` (tipo bridge)
- Los contenedores se comunican entre sí por nombre: `backend:3000`, `database:3306`

### Credenciales MySQL (Producción)

```env
DB_HOST=database
DB_USER=sweetbites_user
DB_PASSWORD=zckMDAFuR58LBrPfaI+5MnDl9r94XuC+oED+93sc95k=
DB_NAME=sweetbites_db
DB_ROOT_PASSWORD=cKwSFbfB71O8QLKR+/YHraBiV4HaDOCF2gp3xaQTAJA=
```

### Variables de entorno importantes

**Backend (.env):**
```env
DB_HOST=database
DB_USER=sweetbites_user
DB_PASSWORD=zckMDAFuR58LBrPfaI+5MnDl9r94XuC+oED+93sc95k=
DB_NAME=sweetbites_db
JWT_SECRET=c3Vmt9SGRIaBpnb1yKsVoDZHYhSePOcdPnG5icMugmnwt4e5DsJS2I6kHj0/oGMO
PORT=3000
```

**Frontend (.env.production):**
```env
VITE_API_URL=/api
VITE_APP_NAME=SweetBites
VITE_UPLOAD_URL=/uploads
```

### Rutas críticas de Nginx (frontend/nginx.conf)

```nginx
# Archivos estáticos React
location / {
    try_files $uri $uri/ /index.html;
}

# API del backend
location /api {
    proxy_pass http://backend:3000;
    ...
}

# Uploads del backend (FIX APLICADO)
location ^~ /uploads/ {
    proxy_pass http://backend:3000/uploads/;
    ...
}

# Cache de assets estáticos
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**Orden de prioridad en Nginx:**
1. `location ^~` (prefix con stop) ← **MÁXIMA PRIORIDAD**
2. `location =` (exact match)
3. `location ~*` (regex case-insensitive)
4. `location ~` (regex case-sensitive)
5. `location /` (prefix match) ← menor prioridad

---

## 🎯 PRÓXIMOS PASOS PARA MAÑANA

### 1. Verificar estado actual

```bash
# En VPS
cd /var/www/sweetbites
git log --oneline -3
docker ps
docker logs sweetbites-backend --tail 20
docker logs sweetbites-frontend --tail 20
```

### 2. Debugging de "Agregar a colección"

```bash
# En VPS, dejar corriendo en una terminal
docker logs sweetbites-backend -f
```

**En navegador:**
1. Login como usuario
2. Ir a una receta (ejemplo: /recipes/10)
3. Click en "Agregar a colección"
4. Seleccionar una colección
5. Ver error completo en terminal VPS

**Posibles causas:**
- Validación de entrada fallando
- Foreign key constraint
- Duplicado (receta ya existe en colección)

**Archivo a revisar:** `backend/routes/users.js` endpoint:
```javascript
router.post('/collections/:id/recipes/:recipeId', verifyToken, async (req, res) => {
    // ...
});
```

### 3. Verificar foto de perfil

**En navegador (Ctrl+Shift+R para limpiar caché):**
1. Login
2. Ir a `/user/profile`
3. Inspeccionar elemento de la foto de perfil
4. Ver si el `src` de la imagen es:
   - ✅ `/uploads/profiles/profile-xyz.png` (correcto)
   - ❌ `http://localhost:3000/uploads/profiles/...` (incorrecto)

**Si sale localhost:3000:**
```bash
# En VPS
docker logs sweetbites-backend -f
```

**En navegador:**
1. Subir foto de perfil NUEVA
2. Ver logs del backend
3. Buscar línea donde se devuelve la URL de la foto
4. Identificar qué está agregando `localhost:3000`

**Archivo sospechoso:** `backend/routes/users.js` línea ~473:
```javascript
const photoUrl = `/uploads/profiles/${req.file.filename}`;
res.json({ 
    success: true, 
    photoUrl  // ← Ver si aquí se está modificando
});
```

### 4. Probar upgrade a Premium

**En navegador:**
1. Login como usuario regular (no admin)
2. Ir a `/plans`
3. Click en "Mejorar a Premium"
4. Llenar formulario falso
5. Click en "Pagar"
6. Ver si funciona o da error

**Si falla:**
```bash
docker logs sweetbites-backend -f
```

### 5. Comandos útiles para debugging

```bash
# Ver logs en vivo del backend
docker logs sweetbites-backend -f

# Ver logs en vivo del frontend (Nginx)
docker logs sweetbites-frontend -f

# Ver últimas 50 líneas del backend
docker logs sweetbites-backend --tail 50

# Ver logs de MySQL
docker logs sweetbites-db --tail 50

# Verificar que imágenes existen
docker exec sweetbites-backend ls -la /app/uploads/profiles/
docker exec sweetbites-backend ls -la /app/uploads/recipes/

# Entrar a MySQL
docker exec -it sweetbites-db mysql -u root -p'cKwSFbfB71O8QLKR+/YHraBiV4HaDOCF2gp3xaQTAJA=' sweetbites_db

# Ver contenido de nginx.conf del frontend
docker exec sweetbites-frontend cat /etc/nginx/conf.d/default.conf

# Rebuild de contenedores (después de cambios)
docker compose up -d --build --force-recreate backend
docker compose up -d --build --force-recreate frontend

# Pull de cambios desde GitHub
cd /var/www/sweetbites
git pull origin main
```

---

## 📂 ESTRUCTURA DE ARCHIVOS IMPORTANTES

```
/var/www/sweetbites/  (VPS)
├── backend/
│   ├── routes/
│   │   ├── admin.js        ← Fix SQL LIMIT/OFFSET
│   │   ├── recipes.js      ← Fix dificultad ENUM
│   │   └── users.js        ← Fix colecciones GROUP BY + posible problema foto perfil
│   ├── uploads/
│   │   ├── profiles/       ← Fotos de perfil (dentro del contenedor /app/uploads/profiles/)
│   │   └── recipes/        ← Fotos de recetas (dentro del contenedor /app/uploads/recipes/)
│   └── server.js
├── frontend/
│   ├── nginx.conf          ← Fix proxy ^~ /uploads/
│   └── src/
│       ├── pages/
│       │   ├── public/Plans.jsx
│       │   └── auth/Register.jsx
│       └── components/
├── database/
│   ├── schema.sql
│   ├── fix-encoding.sql    ← Script ejecutado en VPS ✅
│   └── fix-sql-mode.sql    ← Script ejecutado en VPS ✅
├── docker-compose.yml
└── .env
```

---

## 🔍 DIAGNÓSTICO TÉCNICO COMPLETO

### ¿Por qué fallaba el proxy de Nginx?

**Problema:** Nginx evaluaba bloques en este orden:
1. `location ~* \.(png|jpg|...)$` (regex) ← **ALTA PRIORIDAD**
2. `location /uploads/` (prefix) ← baja prioridad

Cuando pedías `/uploads/recipes/image.png`:
- Nginx veía que termina en `.png` → Matchea el regex
- Intentaba servir desde `/usr/share/nginx/html/uploads/recipes/image.png`
- El archivo NO existe ahí (está en backend:3000) → 404
- **NUNCA** llegaba a evaluar `location /uploads/`

**Solución:** Agregar `^~` a `location ^~ /uploads/` le da **MÁXIMA PRIORIDAD** y le dice a Nginx "si matchea esto, NO evaluar regex". Ahora:
- Nginx ve `/uploads/recipes/image.png`
- Matchea `location ^~ /uploads/` → PARA DE BUSCAR
- Hace proxy a `http://backend:3000/uploads/recipes/image.png` → ✅

### ¿Por qué fallaba el ENUM de dificultad?

MySQL tiene la tabla así:
```sql
CREATE TABLE recipes (
    ...
    dificultad ENUM('Fácil', 'Intermedio', 'Difícil') DEFAULT 'Intermedio',
    ...
);
```

El frontend enviaba:
```javascript
dificultad: 'facil'  // SIN tilde, minúscula
```

MySQL intentaba insertar `'facil'` en un ENUM que solo acepta `'Fácil'` → Error de truncamiento.

**Solución:** Mapear en backend antes de insertar:
```javascript
const dificultadMap = {
    'facil': 'Fácil',
    'intermedio': 'Intermedio',
    'dificil': 'Difícil'
};
const dificultadFinal = dificultadMap[dificultad] || 'Intermedio';
```

### ¿Por qué fallaba LIMIT/OFFSET con placeholders?

MySQL **NO PERMITE** placeholders `?` en cláusulas LIMIT/OFFSET cuando se usa `db.execute()` (prepared statements).

Esto **NO funciona**:
```javascript
await db.execute('SELECT * FROM users LIMIT ? OFFSET ?', [10, 20]);
// Error: Incorrect arguments to mysqld_stmt_execute
```

Esto **SÍ funciona**:
```javascript
const limit = 10;
const offset = 20;
await db.execute(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`);
```

**¿Por qué es seguro?** Porque parseamos con `parseInt()` que solo devuelve números enteros, imposibles de usar para SQL injection.

---

## 💡 LECCIONES APRENDIDAS

1. **Nginx tiene orden de prioridad de bloques:** `^~ > = > ~* > ~ > /`
2. **MySQL no acepta placeholders en LIMIT/OFFSET:** Usar interpolación con `parseInt()`
3. **ENUM de MySQL es case-sensitive:** `'Fácil' !== 'facil'`
4. **ONLY_FULL_GROUP_BY:** Todas las columnas en ORDER BY deben estar en GROUP BY
5. **Docker multi-container:** Frontend y backend deben reconstruirse independientemente
6. **Logs en vivo son esenciales:** `docker logs -f` para debugging real-time

---

## 📞 CONTACTO Y CREDENCIALES

### VPS
- **IP:** 185.245.182.220
- **Usuario:** root
- **Password:** MsuvT6cpONg6O9o6dMj

### Dominio
- **URL:** https://sweetbites.proyectoscampus.top
- **DNS:** Hostinger

### GitHub
- **Repo:** https://github.com/xkilller706/sweetbites.git
- **Branch:** main

### Admin de prueba (crear con script)
```bash
docker exec -it sweetbites-backend node crear-admin.js
```
- Email: admin@sweetbites.com
- Password: Admin123@

---

## ✅ CHECKLIST FINAL PARA MAÑANA

- [ ] Verificar estado de contenedores (`docker ps`)
- [ ] Ver logs limpios sin errores (`docker logs sweetbites-backend --tail 50`)
- [ ] Probar crear receta nueva ✅
- [ ] Probar ver imágenes de recetas ✅
- [ ] Probar foto de perfil (verificar que NO salga localhost:3000)
- [ ] **DEBUG:** Agregar receta a colección (ver error en logs)
- [ ] Probar upgrade a Premium
- [ ] Probar admin panel de usuarios ✅
- [ ] Probar admin panel de recetas ✅

---

**Documento generado:** 27/06/2026 a las 06:30 UTC  
**Última actualización VPS:** 27/06/2026 - Commit `fcbcc51`  
**Estado general:** 🟢 Mayoría de funcionalidades operativas, 2-3 problemas menores pendientes

---

## 🚀 FLUJO DE TRABAJO PARA APLICAR CAMBIOS

Cuando mañana hagas cambios en el código:

### 1. Hacer cambios en local
```bash
# Editar archivos necesarios
# backend/routes/users.js, etc.
```

### 2. Commit y push
```bash
git add .
git commit -m "fix: Descripción del fix"
git push origin main
```

### 3. En VPS: Pull y rebuild
```bash
cd /var/www/sweetbites
git pull origin main

# Si modificaste backend:
docker compose up -d --build --force-recreate backend

# Si modificaste frontend:
docker compose up -d --build --force-recreate frontend

# Ver logs para confirmar que todo OK
docker logs sweetbites-backend --tail 20
```

### 4. Probar en navegador
- Ctrl+Shift+R para limpiar caché
- Probar funcionalidad modificada
- Ver consola del navegador para errores

---

**FIN DEL DOCUMENTO**
