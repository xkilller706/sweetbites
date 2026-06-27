# 🚀 Guía para Subir SweetBites a tu Nuevo GitHub

## 📋 Pasos para Migrar a tu Cuenta de GitHub

### OPCIÓN 1: Cambiar el Repositorio Remoto (Recomendado)

Esta opción mantiene TODO el historial de commits.

---

#### **PASO 1: Crear Repositorio Nuevo en GitHub**

1. Ve a https://github.com
2. Login con **TU** cuenta (no la de sharonllanos-hub)
3. Click en el botón **"+"** arriba a la derecha
4. Click en **"New repository"**
5. Configura:
   - **Repository name**: `sweetbites` (o el nombre que quieras)
   - **Description**: `Aplicación web de recetas de postres - SweetBites`
   - **Visibility**: ✅ Public (o Private si prefieres)
   - **⚠️ NO marques**: "Add a README file"
   - **⚠️ NO marques**: "Add .gitignore"
   - **⚠️ NO marques**: "Choose a license"
6. Click en **"Create repository"**

**GitHub te mostrará una URL como:**
```
https://github.com/TU-USUARIO/sweetbites.git
```

**⚠️ COPIA ESA URL** - la necesitarás en el siguiente paso.

---

#### **PASO 2: Hacer Commit de los Cambios Actuales**

Abre **Git Bash** en tu carpeta del proyecto:

```bash
# Ir a la carpeta del proyecto
cd "C:\Users\Luis Serna\Downloads\appnueva (1)\appnueva"

# Ver qué archivos han cambiado
git status

# Agregar TODOS los cambios
git add .

# Crear commit con mensaje descriptivo
git commit -m "feat: Sistema de planes gratis/premium completo + configuración deploy VPS"
```

---

#### **PASO 3: Cambiar el Repositorio Remoto**

```bash
# Ver repositorio actual
git remote -v

# Eliminar el repositorio de sharonllanos-hub
git remote remove origin

# Agregar TU repositorio nuevo (REEMPLAZA CON TU URL)
git remote add origin https://github.com/TU-USUARIO/sweetbites.git

# Verificar que cambió correctamente
git remote -v
```

**Ejemplo real** (reemplaza `TU-USUARIO` con tu usuario de GitHub):
```bash
git remote add origin https://github.com/luisserna123/sweetbites.git
```

---

#### **PASO 4: Subir el Código a tu GitHub**

```bash
# Subir todos los commits a tu repositorio
git push -u origin main
```

**Si GitHub te pide autenticación:**

1. **Username**: Tu usuario de GitHub
2. **Password**: ⚠️ NO uses tu contraseña normal, usa un **Personal Access Token**

**Cómo crear un Personal Access Token:**
1. Ve a https://github.com/settings/tokens
2. Click en **"Generate new token"** → **"Generate new token (classic)"**
3. Configura:
   - **Note**: "SweetBites Deploy"
   - **Expiration**: 90 days (o lo que prefieras)
   - **Scopes**: Marca ✅ **repo** (todos los checkboxes de repo)
4. Click en **"Generate token"**
5. **⚠️ COPIA EL TOKEN** (solo se muestra una vez)
6. Úsalo como password cuando Git Bash te lo pida

---

#### **PASO 5: Verificar que se Subió Correctamente**

1. Ve a tu repositorio en GitHub: `https://github.com/TU-USUARIO/sweetbites`
2. Deberías ver:
   - ✅ Todos los archivos
   - ✅ Todo el historial de commits
   - ✅ Branch `main`

---

### OPCIÓN 2: Repositorio Nuevo desde Cero (Sin historial)

Si prefieres empezar sin el historial de commits de sharonllanos-hub:

#### **PASO 1: Crear Repositorio en GitHub**

(Igual que Opción 1 - PASO 1)

#### **PASO 2: Eliminar Git Actual**

```bash
cd "C:\Users\Luis Serna\Downloads\appnueva (1)\appnueva"

# Eliminar carpeta .git
rm -rf .git

# Inicializar git nuevo
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit - SweetBites con sistema de planes y config deploy"
```

#### **PASO 3: Conectar con tu Repositorio**

```bash
# Cambiar nombre de rama a main
git branch -M main

# Conectar con tu repositorio (REEMPLAZA CON TU URL)
git remote add origin https://github.com/TU-USUARIO/sweetbites.git

# Subir
git push -u origin main
```

---

## 🔐 Autenticación con GitHub

### Método 1: Personal Access Token (Recomendado)

Ya explicado arriba. El token se usa como password.

### Método 2: SSH (Más seguro, una sola vez)

Si prefieres no escribir password cada vez:

```bash
# Generar llave SSH
ssh-keygen -t ed25519 -C "tuemail@gmail.com"
# Presiona Enter 3 veces (sin password)

# Copiar la llave pública
cat ~/.ssh/id_ed25519.pub
```

Luego:
1. Ve a https://github.com/settings/keys
2. Click en **"New SSH key"**
3. Title: "Mi Laptop"
4. Key: Pega la llave que copiaste
5. Click en **"Add SSH key"**

**Cambiar URL a SSH:**
```bash
git remote set-url origin git@github.com:TU-USUARIO/sweetbites.git
```

---

## 📝 Actualizar Documentación

Después de subir a tu GitHub, actualiza estos archivos:

### 1. CONTEXTO_COMPLETO_SWEETBITES.md

Busca la línea:
```markdown
**GitHub**: `https://github.com/sharonllanos-hub/sweetbites.git`
```

Cámbiala por:
```markdown
**GitHub**: `https://github.com/TU-USUARIO/sweetbites.git`
```

### 2. GUIA_DEPLOY_SWEETBITES.md

Busca todas las referencias al repo viejo y cámbialas:

```bash
# ANTES
git clone https://github.com/sharonllanos-hub/sweetbites.git

# DESPUÉS
git clone https://github.com/TU-USUARIO/sweetbites.git
```

### 3. Hacer commit de estos cambios

```bash
git add CONTEXTO_COMPLETO_SWEETBITES.md GUIA_DEPLOY_SWEETBITES.md
git commit -m "docs: Actualizar URLs de GitHub a mi cuenta"
git push
```

---

## ✅ Checklist

- [ ] Repositorio creado en GitHub
- [ ] URL del repositorio copiada
- [ ] Cambios locales commiteados
- [ ] Remote cambiado a mi repositorio
- [ ] Código subido con `git push`
- [ ] Verificado en GitHub que todo está
- [ ] Documentación actualizada con nueva URL
- [ ] Cambios de documentación commiteados y subidos

---

## 🎯 Comandos Resumidos (Copy & Paste)

```bash
# 1. Ir a la carpeta
cd "C:\Users\Luis Serna\Downloads\appnueva (1)\appnueva"

# 2. Commit de cambios actuales
git add .
git commit -m "feat: Sistema de planes gratis/premium + config deploy VPS"

# 3. Cambiar remote (REEMPLAZA TU-USUARIO)
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/sweetbites.git

# 4. Subir
git push -u origin main

# 5. Actualizar docs (después de editar archivos)
git add CONTEXTO_COMPLETO_SWEETBITES.md GUIA_DEPLOY_SWEETBITES.md
git commit -m "docs: Actualizar URLs de GitHub"
git push
```

---

## ⚠️ Notas Importantes

1. **No pierdas el Personal Access Token** - guárdalo en un lugar seguro
2. **El repo viejo seguirá existiendo** - pero ya no lo usarás
3. **En el VPS** - cuando clones, usa TU URL nueva
4. **Privacidad** - Si pones el repo privado, asegúrate de poder clonarlo en el VPS (necesitarás autenticación)

---

## 🔄 Para Clonar en el VPS (Después del cambio)

Cuando hagas el deploy, en el VPS usa:

```bash
cd /var/www
git clone https://github.com/TU-USUARIO/sweetbites.git
```

Si tu repo es **privado**, necesitarás autenticación. En el VPS:

```bash
# Generar SSH en el VPS
ssh-keygen -t ed25519 -C "vps-contabo"

# Ver la llave pública
cat ~/.ssh/id_ed25519.pub

# Copiar esa llave y agregarla a GitHub Settings > SSH keys
```

---

## 📞 ¿Problemas?

### Error: "fatal: remote origin already exists"

```bash
git remote remove origin
# Luego intenta de nuevo
git remote add origin https://github.com/TU-USUARIO/sweetbites.git
```

### Error: "failed to push some refs"

```bash
# Forzar push (solo la primera vez)
git push -u origin main --force
```

### Error: Authentication failed

- Verifica que estés usando el **Personal Access Token** como password
- NO uses tu contraseña normal de GitHub

---

**¡Listo!** Con esto tendrás SweetBites en TU cuenta de GitHub. 🎉
