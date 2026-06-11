# 📸 Cómo Agregar Tus Propias Imágenes a SweetBites

## 🎯 Opciones para Agregar Imágenes

### OPCIÓN 1: Imágenes Locales (Recomendado para ti)

#### Paso 1: Preparar tus imágenes
1. Busca fotos de postres en Google, Pinterest o tómalas tú misma
2. Renómbralas con nombres simples:
   - `brownie.jpg`
   - `cheesecake.jpg`
   - `galletas.jpg`
   - etc.

#### Paso 2: Guardar las imágenes
1. Ir a la carpeta: `backend/uploads/recipes/`
2. Copiar tus fotos ahí

#### Paso 3: Actualizar la base de datos
1. Abrir phpMyAdmin: http://localhost/phpmyadmin
2. Seleccionar base de datos: `sweetbites_db`
3. Clic en tabla: `recipes`
4. Editar cada receta y cambiar `foto_principal`:

**Ejemplo:**
```
Receta ID 1 (Brownie):
foto_principal = "brownie.jpg"

Receta ID 2 (Cheesecake):
foto_principal = "cheesecake.jpg"
```

#### Paso 4: ¡Listo!
Recargar la página y verás tus imágenes 🎉

---

### OPCIÓN 2: URLs de Internet (Más Rápido)

Si tienes URLs de imágenes en internet:

#### Paso 1: Copiar URL de la imagen
Ejemplo: `https://ejemplo.com/mi-foto-postre.jpg`

#### Paso 2: Actualizar en phpMyAdmin
```sql
UPDATE recipes 
SET foto_principal = 'https://ejemplo.com/mi-foto-postre.jpg' 
WHERE id = 1;
```

---

### OPCIÓN 3: Usar Unsplash (Ya está configurado)

**Ya está funcionando automáticamente!** 🎉

Si no pones imágenes propias, la app usa automáticamente fotos profesionales de Unsplash según la categoría:
- Tortas → Fotos de tortas
- Galletas → Fotos de galletas
- Chocolates → Fotos de chocolates
- etc.

**No tienes que hacer nada**, simplemente funciona.

---

## 🖼️ Consejos para Mejores Fotos

### Tamaño Recomendado:
- **Ancho**: 800px
- **Alto**: 600px
- **Formato**: JPG o PNG
- **Peso**: Máximo 500KB

### Herramientas para Redimensionar (Gratis):
- **En línea**: https://www.iloveimg.com/es/redimensionar-imagen
- **Windows**: Paint (incluido en Windows)
- **Photopea**: https://www.photopea.com/ (Photoshop gratis online)

### Cómo Redimensionar en Paint:
1. Abrir imagen en Paint
2. Clic en "Cambiar tamaño"
3. Poner 800 píxeles de ancho
4. Guardar como JPG

---

## 📁 Estructura de Carpetas para Imágenes

```
appnueva/
└── backend/
    └── uploads/
        ├── recipes/          ← TUS FOTOS DE RECETAS AQUÍ
        │   ├── brownie.jpg
        │   ├── cheesecake.jpg
        │   ├── galletas.jpg
        │   └── ...
        │
        └── profiles/         ← Fotos de perfil (futuro)
```

---

## 🎨 Nombres Sugeridos para tus Fotos

**Para las 6 recetas de ejemplo:**
```
brownie.jpg          (Receta ID: 1)
cheesecake.jpg       (Receta ID: 2)
galletas.jpg         (Receta ID: 3)
torta-chocolate.jpg  (Receta ID: 4)
helado.jpg           (Receta ID: 5)
cupcakes.jpg         (Receta ID: 6)
```

---

## 🔧 Solución de Problemas

### ❌ "La imagen no aparece"

**Posible causa 1:** Nombre incorrecto en la BD
- Verificar que `foto_principal` en phpMyAdmin coincida exactamente con el nombre del archivo

**Posible causa 2:** Archivo en carpeta incorrecta
- Asegurarse que está en `backend/uploads/recipes/`

**Posible causa 3:** Formato no soportado
- Usar solo JPG o PNG

### ❌ "La imagen se ve pixelada"

**Solución:** Usar imagen de mejor calidad
- Mínimo 800x600 píxeles

### ❌ "La imagen pesa mucho y carga lento"

**Solución:** Comprimir la imagen
- Usar: https://tinyjpg.com/
- Reducir tamaño a menos de 500KB

---

## 🌐 Sitios para Descargar Fotos GRATIS de Postres

### Fotos de Alta Calidad (Sin derechos de autor):

1. **Unsplash** (El mejor)
   - https://unsplash.com/s/photos/dessert
   - https://unsplash.com/s/photos/cake
   - https://unsplash.com/s/photos/cookies

2. **Pexels**
   - https://www.pexels.com/search/dessert/

3. **Pixabay**
   - https://pixabay.com/es/images/search/postres/

### Cómo Descargar:
1. Buscar "dessert", "cake", "cookies", etc.
2. Elegir foto que te guste
3. Clic en "Download" → Tamaño "Medium"
4. Renombrar y guardar en `backend/uploads/recipes/`

---

## 🚀 Tutorial Rápido Completo

### En 5 minutos:

```bash
1. Descargar 6 fotos de Unsplash
2. Renombrar:
   - brownie.jpg
   - cheesecake.jpg
   - galletas.jpg
   - torta-chocolate.jpg
   - helado.jpg
   - cupcakes.jpg

3. Copiar a: backend/uploads/recipes/

4. Abrir phpMyAdmin → recipes → Editar cada receta:
   ID 1: foto_principal = "brownie.jpg"
   ID 2: foto_principal = "cheesecake.jpg"
   ID 3: foto_principal = "galletas.jpg"
   ID 4: foto_principal = "torta-chocolate.jpg"
   ID 5: foto_principal = "helado.jpg"
   ID 6: foto_principal = "cupcakes.jpg"

5. ¡Listo! Recargar navegador
```

---

## 💡 BONUS: Crear Tus Propias Recetas con Fotos

Cuando crees una receta nueva desde el panel admin:

1. Subir foto a `backend/uploads/recipes/mi-nueva-receta.jpg`
2. Al crear la receta en phpMyAdmin, poner:
   ```
   foto_principal = "mi-nueva-receta.jpg"
   ```

---

## ✅ Checklist

- [ ] Tengo 6 fotos de postres descargadas
- [ ] Las renombré correctamente
- [ ] Las copié a `backend/uploads/recipes/`
- [ ] Actualicé la BD en phpMyAdmin
- [ ] Recargué el navegador
- [ ] ¡MIS FOTOS APARECEN! 🎉

---

## 📞 ¿Problemas?

Si algo no funciona:
1. Verificar que las fotos estén en la carpeta correcta
2. Verificar que los nombres coincidan EXACTAMENTE
3. Recargar el navegador (Ctrl + F5)
4. Verificar la consola del navegador (F12)

---

**¡Ahora tu SweetBites se verá HERMOSO con tus propias fotos! 📸🍰**
