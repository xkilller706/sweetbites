# 🍰 Guía Completa de Deploy - SweetBites en VPS Contabo

## 📋 Información del Servidor

| Detalle | Valor |
|---------|-------|
| **Proveedor** | Contabo VPS |
| **IP** | `185.245.182.220` |
| **Usuario SSH** | `root` |
| **Password** | `MsuvT6cpONg6O9o6dMj` |
| **Dominio** | `sweetbites.proyectoscampus.top` |
| **Ruta de proyectos** | `/var/www` |

---

## 🎯 Objetivo

Desplegar la aplicación **SweetBites** en el mismo servidor VPS donde ya está **MotoExpert**, usando un subdominio diferente pero compartiendo infraestructura.

---

## ✅ Pre-requisitos (Ya instalados en el VPS)

- ✅ Docker
- ✅ Docker Compose
- ✅ Nginx
- ✅ Certbot (Let's Encrypt)
- ✅ Git

---

## 📦 Archivos Preparados

En tu carpeta local `appnueva (1)/appnueva/` encontrarás:

1. **`.env.vps`** → Variables de entorno para el servidor
2. **`nginx-vps.conf`** → Configuración de Nginx
3. **`deploy-vps.sh`** → Script automatizado de despliegue
4. **`GUIA_DEPLOY_SWEETBITES.md`** → Este documento

---

## 🚀 Proceso de Despliegue Paso a Paso

### 📍 **PASO 1: Configurar DNS en Hostinger**

1. Ir a https://hpanel.hostinger.com
2. Login con tus credenciales
3. Ir a **Dominios** → `proyectoscampus.top`
4. Click en **DNS / Nameservers**
5. Click en **Agregar registro**
6. Configurar:
   - **Tipo**: A
   - **Nombre**: `sweetbites`
   - **Apunta a**: `185.245.182.220`
   - **TTL**: `14400`
7. Click en **Guardar**

**Tiempo de propagación**: 5-30 minutos

---

### 📍 **PASO 2: Conectar al VPS por SSH**

Desde Git Bash (Windows) o Terminal (Mac/Linux):

```bash
ssh root@185.245.182.220
```

**Contraseña**: `MsuvT6cpONg6O9o6dMj`

**Deberías ver**: Bienvenida ASCII de Contabo

```
  ____            _        _           
 / ___|___  _ __ | |_ __ _| |__   ___  
| |   / _ \| '_ \| __/ _` | '_ \ / _ \ 
| |__| (_) | | | | || (_| | |_) | (_) |
 \____\___/|_| |_|\__\__,_|_.__/ \___/ 

root@vmi3344029:~#
```

---

### 📍 **PASO 3: Clonar el Repositorio**

```bash
# Ir a la carpeta de proyectos
cd /var/www

# Clonar el proyecto
git clone https://github.com/sharonllanos-hub/sweetbites.git

# Entrar a la carpeta
cd sweetbites

# Verificar que los archivos estén ahí
ls -la
```

**Deberías ver**:
- `backend/`
- `frontend/`
- `database/`
- `docker-compose.yml`
- `.gitignore`

---

### 📍 **PASO 4: Crear Archivo .env**

```bash
# Crear archivo .env
nano .env
```

**Copiar y pegar el siguiente contenido**:

```env
# Base de Datos
DB_ROOT_PASSWORD=cKwSFbfB71O8QLKR+/YHraBiV4HaDOCF2gp3xaQTAJA=
DB_NAME=sweetbites_db
DB_USER=sweetbites_user
DB_PASSWORD=zckMDAFuR58LBrPfaI+5MnDl9r94XuC+oED+93sc95k=

# JWT Secret
JWT_SECRET=c3Vmt9SGRIaBpnb1yKsVoDZHYhSePOcdPnG5icMugmnwt4e5DsJS2I6kHj0/oGMO

# Puerto del Backend
PORT=3000
```

**Guardar**:
- Presiona `Ctrl + O` → Enter → `Ctrl + X`

---

### 📍 **PASO 5: Levantar los Contenedores Docker**

```bash
# Construir y levantar contenedores en segundo plano
docker compose up -d --build
```

**Esto tomará 3-5 minutos**. Verás algo como:

```
[+] Building 145.2s (34/34) FINISHED
[+] Running 4/4
 ✔ Network sweetbites_sweetbites-network  Created
 ✔ Container sweetbites-db                Started
 ✔ Container sweetbites-backend           Started
 ✔ Container sweetbites-frontend          Started
```

**Verificar que estén corriendo**:

```bash
docker ps
```

**Deberías ver 3 contenedores**:

| CONTAINER ID | IMAGE | PORTS | NAMES |
|--------------|-------|-------|-------|
| xxx | sweetbites-frontend | 0.0.0.0:80->80/tcp | sweetbites-frontend |
| xxx | sweetbites-backend | 0.0.0.0:3000->3000/tcp | sweetbites-backend |
| xxx | mysql:8.0 | 0.0.0.0:3306->3306/tcp | sweetbites-db |

---

### 📍 **PASO 6: Configurar Nginx**

#### 6.1 Crear archivo de configuración

```bash
nano /etc/nginx/sites-available/sweetbites.proyectoscampus.top
```

#### 6.2 Copiar la siguiente configuración

```nginx
# HTTP - Redirección a HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name sweetbites.proyectoscampus.top;
    return 301 https://$server_name$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name sweetbites.proyectoscampus.top;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/sweetbites.proyectoscampus.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sweetbites.proyectoscampus.top/privkey.pem;

    # Protocolos SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256;

    # Proxy hacia contenedor frontend (puerto 80)
    location / {
        proxy_pass http://127.0.0.1:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Logs
    access_log /var/log/nginx/sweetbites_access.log;
    error_log /var/log/nginx/sweetbites_error.log;

    # Tamaño máximo de subida
    client_max_body_size 10M;
}
```

**Guardar**: `Ctrl + O` → Enter → `Ctrl + X`

#### 6.3 Habilitar el sitio

```bash
# Crear enlace simbólico
ln -s /etc/nginx/sites-available/sweetbites.proyectoscampus.top /etc/nginx/sites-enabled/

# Verificar sintaxis
nginx -t
```

**Deberías ver**:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

#### 6.4 Recargar Nginx

```bash
systemctl reload nginx
```

---

### 📍 **PASO 7: Generar Certificado SSL (HTTPS)**

```bash
certbot --nginx -d sweetbites.proyectoscampus.top
```

**Responder las preguntas**:

1. **Email**: Tu email (ej: `tuemail@gmail.com`)
2. **Términos de servicio**: `A` (Aceptar)
3. **Redirigir HTTP → HTTPS**: `2` (Sí)

**Certbot automáticamente**:
- ✅ Genera los certificados
- ✅ Actualiza la configuración de Nginx
- ✅ Recarga Nginx

**Verás**:
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/sweetbites.proyectoscampus.top/fullchain.pem
Key is saved at: /etc/letsencrypt/live/sweetbites.proyectoscampus.top/privkey.pem
```

---

### 📍 **PASO 8: Verificación Final**

#### 8.1 Verificar contenedores

```bash
docker ps
docker logs sweetbites-backend --tail 50
docker logs sweetbites-frontend --tail 50
```

#### 8.2 Probar conectividad local

```bash
curl -I http://127.0.0.1:80
```

Debe responder con HTTP 200

#### 8.3 Probar desde el navegador

Abre en tu navegador:

1. **HTTP** (debe redirigir): `http://sweetbites.proyectoscampus.top`
2. **HTTPS** (debe cargar): `https://sweetbites.proyectoscampus.top`

**Debes ver**:
- ✅ Página de inicio de SweetBites
- ✅ Candado verde (SSL activo)
- ✅ Sin errores de consola

#### 8.4 Probar funcionalidades

- ✅ Registro de usuario
- ✅ Login
- ✅ Crear receta
- ✅ Subir imagen
- ✅ Sistema de planes (gratis/premium)

---

## 🔧 Comandos Útiles

### Ver logs en tiempo real

```bash
# Backend
docker logs sweetbites-backend -f

# Frontend
docker logs sweetbites-frontend -f

# Base de datos
docker logs sweetbites-db -f
```

### Reiniciar servicios

```bash
# Reiniciar todos
docker compose restart

# Reiniciar solo backend
docker compose restart backend

# Reiniciar solo frontend
docker compose restart frontend
```

### Actualizar código

```bash
cd /var/www/sweetbites
git pull origin main
docker compose up -d --build
```

### Ver estado de Nginx

```bash
systemctl status nginx
tail -f /var/log/nginx/sweetbites_access.log
tail -f /var/log/nginx/sweetbites_error.log
```

---

## ⚠️ Solución de Problemas

### Problema: Contenedores no inician

```bash
# Ver logs detallados
docker compose logs

# Reiniciar desde cero
docker compose down
docker compose up -d --build
```

### Problema: Nginx error 502 Bad Gateway

```bash
# Verificar que contenedores estén corriendo
docker ps

# Verificar puerto 80
curl -I http://127.0.0.1:80

# Ver logs de frontend
docker logs sweetbites-frontend
```

### Problema: Error de permisos

```bash
# Dar permisos al directorio uploads
docker exec sweetbites-backend chmod -R 777 /app/uploads
```

### Problema: Base de datos no conecta

```bash
# Verificar logs de BD
docker logs sweetbites-db

# Verificar variables de entorno
docker exec sweetbites-backend env | grep DB_
```

---

## 📊 Diferencias con MotoExpert

| Aspecto | MotoExpert | SweetBites |
|---------|-----------|------------|
| **Subdominio** | motoexpert.proyectoscampus.top | sweetbites.proyectoscampus.top |
| **Puerto** | 8000 | 80 |
| **Arquitectura** | Monolítica | Multi-contenedor (3) |
| **Base de datos** | Externa | MySQL en Docker |
| **Nginx interno** | No | Sí (en frontend) |

---

## ✅ Checklist de Deploy

- [ ] DNS configurado en Hostinger
- [ ] Conectado al VPS por SSH
- [ ] Repositorio clonado en `/var/www/sweetbites`
- [ ] Archivo `.env` creado
- [ ] Contenedores levantados (`docker ps` muestra 3)
- [ ] Configuración Nginx creada
- [ ] Enlace simbólico habilitado
- [ ] Sintaxis Nginx verificada (`nginx -t`)
- [ ] Nginx recargado
- [ ] Certificado SSL generado
- [ ] Sitio accesible vía HTTPS
- [ ] Login funciona
- [ ] Subida de imágenes funciona
- [ ] Sistema de planes funciona

---

## 🎉 ¡Deploy Completado!

Tu aplicación **SweetBites** ya está en producción en:

**🌐 https://sweetbites.proyectoscampus.top**

---

## 📞 Soporte

Si tienes problemas, revisa:
1. Logs de Docker: `docker logs sweetbites-backend -f`
2. Logs de Nginx: `tail -f /var/log/nginx/sweetbites_error.log`
3. Estado de contenedores: `docker ps`

---

**Última actualización**: Junio 2026  
**Versión**: 1.0
