# 📖 MANUAL COMPLETO DE IMPLEMENTACIÓN - MEJORAS FINALES SWEETBITES

## 🎯 OBJETIVO
Implementar todas las mejoras finales para tu proyecto SENA: sistema de planes Premium, nueva paleta de colores, modo cocina mejorado, perfil de usuario, y diseño minimalista.

---

## ⏱️ TIEMPO ESTIMADO
- **Total**: 2-3 horas
- **Fase 1 (Base de datos)**: 15 minutos
- **Fase 2 (Backend)**: 30 minutos
- **Fase 3 (Eliminar emojis)**: 30 minutos
- **Fase 4 (Agregar botones)**: 20 minutos
- **Fase 5 (Modo cocina)**: 20 minutos
- **Fase 6 (Favoritos y recetas)**: 15 minutos
- **Fase 7 (Perfil)**: 20 minutos
- **Fase 8 (Favicon)**: 10 minutos

---

# FASE 1: BASE DE DATOS (15 minutos)

## ✅ Paso 1.1: Ejecutar Migración SQL

1. Abre tu navegador
2. Ve a: `http://localhost/phpmyadmin`
3. En el panel izquierdo, haz clic en `sweetbites` (tu base de datos)
4. Haz clic en la pestaña **"SQL"** arriba
5. Abre el archivo: `C:\xampp\htdocs\ProSweetBites\appnueva\database\migrations\004_add_premium_features.sql`
6. Copia **TODO** el contenido del archivo
7. Pégalo en el editor SQL de phpMyAdmin
8. Haz clic en el botón **"Continuar"** o **"Go"**
9. Deberías ver: "Migración 004 completada exitosamente"

**✅ VERIFICAR**: Ve a la pestaña "Estructura" y verifica que la tabla `users` tenga los campos:
- `plan`
- `bio`
- `fecha_premium`

**✅ VERIFICAR**: La tabla `recipes` debe tener:
- `es_premium`

---

# FASE 2: BACKEND (30 minutos)

## ✅ Paso 2.1: Crear Carpeta para Fotos de Perfil

1. Abre tu explorador de archivos
2. Navega a: `C:\xampp\htdocs\ProSweetBites\appnueva\backend\uploads\`
3. Crea una carpeta nueva llamada `profiles`
4. Ruta final: `C:\xampp\htdocs\ProSweetBites\appnueva\backend\uploads\profiles\`

**✅ VERIFICAR**: La carpeta existe y está vacía

---

## ✅ Paso 2.2: Crear Middleware checkPremium

1. Abre VS Code
2. Navega a la carpeta: `backend/middleware/`
3. Crea un archivo nuevo: `checkPremium.js`
4. Copia y pega este código:

```javascript
// Middleware para verificar si el usuario tiene plan Premium
const checkPremium = (req, res, next) => {
  if (!req.user || req.user.plan !== 'premium') {
    return res.status(403).json({
      success: false,
      message: 'Esta función requiere plan Premium',
      requiresPremium: true
    });
  }
  next();
};

module.exports = { checkPremium };
```

5. **Guarda el archivo** (Ctrl + S)

**✅ VERIFICAR**: El archivo existe en `backend/middleware/checkPremium.js`

---

## ✅ Paso 2.3: Agregar Endpoints al Backend

1. Abre el archivo: `backend/routes/users.js`
2. **AL INICIO DEL ARCHIVO**, después de los `require` existentes, agrega:

```javascript
const multer = require('multer');
const path = require('path');
```

3. Ahora ve **AL FINAL DEL ARCHIVO**, ANTES de la línea `module.exports = router;`
4. Copia y pega ESTE CÓDIGO COMPLETO:

```javascript
// ============================================
// ENDPOINTS PARA FUNCIONALIDADES PREMIUM
// ============================================

// POST /api/users/upgrade-premium - Simular upgrade a premium (GRATIS - proyecto académico)
router.post('/upgrade-premium', verifyToken, async (req, res) => {
  try {
    await db.execute(
      'UPDATE users SET plan = ?, fecha_premium = NOW() WHERE id = ?',
      ['premium', req.user.id]
    );

    res.json({
      success: true,
      message: 'Plan actualizado a Premium exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar plan'
    });
  }
});

// POST /api/users/profile/photo - Upload foto de perfil
const uploadProfile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/profiles/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + req.user.id;
      const ext = path.extname(file.originalname);
      cb(null, `profile-${uniqueSuffix}${ext}`);
    }
  }),
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
    }
  }
}).single('photo');

router.post('/profile/photo', verifyToken, (req, res) => {
  uploadProfile(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Error al subir imagen'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se subió ninguna imagen'
      });
    }

    const photoUrl = `/uploads/profiles/${req.file.filename}`;

    try {
      await db.execute(
        'UPDATE users SET foto_perfil = ? WHERE id = ?',
        [photoUrl, req.user.id]
      );

      res.json({
        success: true,
        message: 'Foto de perfil actualizada',
        photoUrl: photoUrl
      });
    } catch (error) {
      console.error('Error al actualizar foto en BD:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar foto de perfil'
      });
    }
  });
});

// PUT /api/users/profile/bio - Actualizar biografía
router.put('/profile/bio', verifyToken, async (req, res) => {
  try {
    const { bio } = req.body;

    if (!bio || bio.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'La biografía no puede estar vacía'
      });
    }

    await db.execute(
      'UPDATE users SET bio = ? WHERE id = ?',
      [bio, req.user.id]
    );

    res.json({
      success: true,
      message: 'Biografía actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar bio:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar biografía'
    });
  }
});

// GET /api/users/profile - Obtener perfil completo (actualizado)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, nombre, email, telefono, rol, foto_perfil, bio, plan, fecha_registro FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      user: users[0]
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil'
    });
  }
});
```

5. **Guarda el archivo** (Ctrl + S)

**✅ VERIFICAR**: 
- Los `require` están al inicio
- Los endpoints están ANTES de `module.exports = router;`
- No hay errores de sintaxis (líneas rojas)

---

## ✅ Paso 2.4: Reiniciar Servidor Backend

1. Ve a la terminal donde corre el backend
2. Presiona `Ctrl + C` para detenerlo
3. Ejecuta: `npm run dev`
4. Deberías ver el mensaje de servidor iniciado sin errores

**✅ VERIFICAR**: No hay errores en la consola

---

# FASE 3: ELIMINAR EMOJIS (30 minutos)

Vamos a eliminar TODOS los emojis para hacer el diseño minimalista.

## ✅ Paso 3.1: Login.jsx

1. Abre: `frontend/src/pages/auth/Login.jsx`
2. Busca (alrededor de línea 44-46):

```jsx
<h1 className="text-5xl mb-2">🍰</h1>
```

3. **ELIMINA** esa línea completa
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.2: Register.jsx

1. Abre: `frontend/src/pages/auth/Register.jsx`
2. Busca (alrededor de línea 47):

```jsx
<h1 className="text-5xl mb-2">🍰</h1>
```

3. **ELIMINA** esa línea completa
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.3: Home.jsx

1. Abre: `frontend/src/pages/public/Home.jsx`
2. Busca TODOS los emojis en el archivo (usa Ctrl + F y busca emojis visuales)
3. **ELIMINA** cada emoji que encuentres
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.4: About.jsx

1. Abre: `frontend/src/pages/public/About.jsx`
2. Busca y elimina todos los emojis
3. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.5: Contact.jsx

1. Abre: `frontend/src/pages/public/Contact.jsx`
2. Busca y elimina todos los emojis
3. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.6: Footer.jsx

1. Abre: `frontend/src/components/layout/Footer.jsx`
2. Busca y elimina todos los emojis
3. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.7: Dashboard.jsx (Admin)

1. Abre: `frontend/src/pages/admin/Dashboard.jsx`
2. Busca y elimina todos los emojis
3. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.8: Categories.jsx (Admin)

1. Abre: `frontend/src/pages/admin/Categories.jsx`
2. Busca y elimina todos los emojis
3. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.9: RecipeManagement.jsx (Admin)

1. Abre: `frontend/src/pages/admin/RecipeManagement.jsx`
2. Busca y elimina todos los emojis
3. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.10: RecipeApproval.jsx (Admin)

1. Abre: `frontend/src/pages/admin/RecipeApproval.jsx`
2. Busca y elimina todos los emojis
3. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.11: MyRecipes.jsx

1. Abre: `frontend/src/pages/user/MyRecipes.jsx`
2. Busca y elimina todos los emojis
3. **Guarda** (Ctrl + S)

---

## ✅ Paso 3.12: RecipeCard.jsx

1. Abre: `frontend/src/components/recipes/RecipeCard.jsx`
2. Busca y elimina todos los emojis
3. **Guarda** (Ctrl + S)

---

**✅ VERIFICAR**: 
- Abre cada página en el navegador
- No debe haber emojis visibles en ninguna parte

---

# FASE 4: AGREGAR BOTONES "VOLVER" (20 minutos)

## ✅ Paso 4.1: RecipeDetail.jsx

1. Abre: `frontend/src/pages/public/RecipeDetail.jsx`
2. **AL INICIO**, después de los imports existentes, agrega:

```javascript
import BackButton from '@components/common/BackButton'
```

3. Busca el `return (` principal del componente
4. Justo después de `<div className=...` al inicio del contenido, agrega:

```jsx
<BackButton />
```

5. **Guarda** (Ctrl + S)

---

## ✅ Paso 4.2: Profile.jsx

1. Abre: `frontend/src/pages/user/Profile.jsx`
2. Agrega el import:

```javascript
import BackButton from '@components/common/BackButton'
```

3. Agrega el botón al inicio del contenido:

```jsx
<BackButton />
```

4. **Guarda** (Ctrl + S)

---

## ✅ Paso 4.3: CreateRecipe_WIZARD.jsx

1. Abre: `frontend/src/pages/user/CreateRecipe_WIZARD.jsx`
2. Agrega el import al inicio
3. Agrega `<BackButton />` al inicio del contenido
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 4.4: EditRecipe.jsx

1. Abre: `frontend/src/pages/user/EditRecipe.jsx`
2. Agrega el import
3. Agrega el botón
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 4.5: MyRecipes.jsx

1. Abre: `frontend/src/pages/user/MyRecipes.jsx`
2. Agrega el import
3. Agrega el botón
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 4.6: Favorites.jsx

1. Abre: `frontend/src/pages/user/Favorites.jsx`
2. Agrega el import
3. Agrega el botón
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 4.7: CollectionDetail.jsx

1. Abre: `frontend/src/pages/user/CollectionDetail.jsx`
2. Agrega el import
3. Agrega el botón
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 4.8: Categories.jsx (Admin)

1. Abre: `frontend/src/pages/admin/Categories.jsx`
2. Agrega el import
3. Agrega el botón
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 4.9: RecipeManagement.jsx (Admin)

1. Abre: `frontend/src/pages/admin/RecipeManagement.jsx`
2. Agrega el import
3. Agrega el botón
4. **Guarda** (Ctrl + S)

---

## ✅ Paso 4.10: RecipeApproval.jsx (Admin)

1. Abre: `frontend/src/pages/admin/RecipeApproval.jsx`
2. Agrega el import
3. Agrega el botón
4. **Guarda** (Ctrl + S)

---

**✅ VERIFICAR**: 
- Navega a cada página
- Verifica que aparece el botón "Volver"
- Haz clic y verifica que regresa a la página anterior

---

# FASE 5: MODO COCINA MEJORADO (20 minutos)

## ✅ Paso 5.1: Actualizar RecipeDetail.jsx

1. Abre: `frontend/src/pages/user/RecipeDetail.jsx`
2. Busca donde se define el estado `cookingMode` (alrededor de línea 26)
3. **Agrega** este estado adicional:

```javascript
const [showUpgradeModal, setShowUpgradeModal] = useState(false)
```

4. Al inicio del archivo, después de los imports, agrega:

```javascript
import UpgradePremiumModal from '@components/modals/UpgradePremiumModal'
```

5. Busca la función o el lugar donde se activa el modo cocina
6. Busca algo como `setCookingMode(true)` o un botón que diga "Modo Cocina"
7. Reemplaza esa función con:

```javascript
const handleStartCooking = () => {
  if (!user || user.plan !== 'premium') {
    toast.error('El modo cocina es exclusivo para usuarios Premium');
    setShowUpgradeModal(true);
    return;
  }
  setCookingMode(true);
  setActiveStep(1);
};
```

8. Busca donde se renderiza el modo cocina (algo como `{cookingMode && ...}`)
9. **REEMPLAZA** todo ese bloque con este código:

```jsx
{cookingMode && (
  <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-accent-chocolate">
          Modo Cocina
        </h2>
        <button
          onClick={() => setCookingMode(false)}
          className="text-neutral-gray-600 hover:text-accent-chocolate transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Barra de progreso chocolate */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2 text-neutral-gray-600">
          <span className="font-medium">
            Paso {activeStep} de {recipe.steps?.length || 0}
          </span>
          <span className="font-medium">
            {Math.round((activeStep / (recipe.steps?.length || 1)) * 100)}%
          </span>
        </div>
        
        {/* Barra con efecto chocolate */}
        <div className="relative h-4 bg-secondary rounded-full overflow-hidden shadow-inner">
          <div
            className="absolute h-full bg-gradient-to-r from-accent-chocolate to-accent-caramel transition-all duration-500 ease-out"
            style={{ width: `${(activeStep / (recipe.steps?.length || 1)) * 100}%` }}
          >
            {/* Efecto shimmer chocolate */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Paso actual */}
      <Card className="mb-6 p-6 bg-accent-cream/30 border-accent-chocolate/20">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent-chocolate text-white flex items-center justify-center font-bold">
            {activeStep}
          </div>
          <h3 className="text-xl font-semibold text-accent-chocolate">
            Paso {activeStep}
          </h3>
        </div>
        <p className="text-lg leading-relaxed text-neutral-gray-800">
          {recipe.steps?.[activeStep - 1]?.descripcion}
        </p>
      </Card>

      {/* Botones de navegación */}
      <div className="flex gap-4">
        <Button
          onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
          disabled={activeStep === 1}
          variant="secondary"
          className="flex-1"
        >
          Anterior
        </Button>
        <Button
          onClick={() => setActiveStep(prev => Math.min((recipe.steps?.length || 1), prev + 1))}
          disabled={activeStep === (recipe.steps?.length || 1)}
          className="flex-1 bg-gradient-chocolate text-white"
        >
          {activeStep === (recipe.steps?.length || 1) ? 'Finalizar' : 'Siguiente'}
        </Button>
      </div>
    </div>
  </div>
)}
```

10. **AL FINAL del componente**, antes del último `</div>`, agrega el modal:

```jsx
{/* Modal de upgrade premium */}
<UpgradePremiumModal
  isOpen={showUpgradeModal}
  onClose={() => setShowUpgradeModal(false)}
/>
```

11. **Guarda** (Ctrl + S)

---

**✅ VERIFICAR**: 
- Usuario gratis intenta usar modo cocina → se bloquea y muestra modal
- Usuario premium puede usar modo cocina
- La barra de progreso es color chocolate

---

# FASE 6: SISTEMA DE FAVORITOS Y RECETAS (15 minutos)

## ✅ Paso 6.1: Limitar Favoritos para Usuarios Gratis

1. Abre: `frontend/src/pages/user/Favorites.jsx`
2. Al inicio, agrega los imports:

```javascript
import { useState } from 'react' // Si no está ya
import UpgradePremiumModal from '@components/modals/UpgradePremiumModal'
```

3. Agrega el estado del modal:

```javascript
const [showUpgradeModal, setShowUpgradeModal] = useState(false)
```

4. Busca la función donde se agregan favoritos (puede ser `handleAddFavorite` o `addFavorite`)
5. **AL INICIO** de esa función, agrega:

```javascript
// Verificar límite para usuarios gratis
if (user?.plan === 'gratis' && favorites.length >= 3) {
  toast.error('Los usuarios gratis pueden guardar máximo 3 recetas favoritas');
  toast.info('Actualiza a Premium para favoritos ilimitados');
  setShowUpgradeModal(true);
  return;
}
```

6. Al final del componente, antes del último `</div>`, agrega:

```jsx
<UpgradePremiumModal
  isOpen={showUpgradeModal}
  onClose={() => setShowUpgradeModal(false)}
/>
```

7. **Guarda** (Ctrl + S)

---

## ✅ Paso 6.2: Mostrar Badge "Premium" en RecipeCard

1. Abre: `frontend/src/components/recipes/RecipeCard.jsx`
2. Busca donde se muestran los badges o etiquetas de la receta
3. Agrega este código (ajusta la ubicación según tu diseño):

```jsx
{recipe.es_premium && (
  <Badge className="bg-accent-chocolate text-white">
    Premium
  </Badge>
)}
```

4. **Guarda** (Ctrl + S)

---

**✅ VERIFICAR**: 
- Usuario gratis ve mensaje al intentar agregar 4to favorito
- Se muestra modal de upgrade
- Recetas premium tienen badge "Premium"

---

# FASE 7: PERFIL DE USUARIO (20 minutos)

## ✅ Paso 7.1: Actualizar Profile.jsx

1. Abre: `frontend/src/pages/user/Profile.jsx`
2. Busca los imports y **agrega**:

```javascript
import { Camera, Award } from 'lucide-react' // Si lucide-react no está, usa otros íconos
import UpgradePremiumModal from '@components/modals/UpgradePremiumModal'
```

3. Busca donde se definen los estados y **agrega**:

```javascript
const [uploadingPhoto, setUploadingPhoto] = useState(false)
const [showUpgradeModal, setShowUpgradeModal] = useState(false)
```

4. Busca el formulario del perfil
5. **ANTES** del formulario, agrega esta sección de foto de perfil:

```jsx
{/* Foto de perfil */}
<div className="flex flex-col items-center mb-8">
  <div className="relative">
    <div className="w-32 h-32 rounded-full overflow-hidden bg-secondary flex items-center justify-center text-4xl font-bold text-primary">
      {user?.foto_perfil ? (
        <img
          src={`http://localhost:3000${user.foto_perfil}`}
          alt={user.nombre}
          className="w-full h-full object-cover"
        />
      ) : (
        getInitials(user?.nombre || 'Usuario')
      )}
    </div>
    
    <label
      htmlFor="photo-upload"
      className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark transition shadow-lg"
    >
      <Camera size={20} />
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoChange}
        disabled={uploadingPhoto}
      />
    </label>
  </div>
  
  {uploadingPhoto && (
    <p className="text-sm text-neutral-gray-600 mt-2">Subiendo foto...</p>
  )}
</div>

{/* Badge de plan */}
<div className="text-center mb-6">
  {user?.plan === 'premium' ? (
    <div className="inline-flex items-center gap-2 bg-gradient-chocolate text-white px-4 py-2 rounded-full">
      <Award size={20} />
      <span className="font-semibold">Usuario Premium</span>
    </div>
  ) : (
    <div>
      <div className="inline-flex items-center gap-2 bg-secondary text-neutral-gray-700 px-4 py-2 rounded-full mb-2">
        <span className="font-semibold">Plan Gratis</span>
      </div>
      <button
        onClick={() => setShowUpgradeModal(true)}
        className="block w-full text-center text-sm text-primary hover:text-primary-dark font-semibold"
      >
        Actualizar a Premium
      </button>
    </div>
  )}
</div>
```

6. Dentro del formulario, **después** del campo de teléfono, agrega:

```jsx
{/* Campo de biografía */}
<div>
  <label className="block text-sm font-medium text-neutral-gray-700 mb-2">
    Biografía
  </label>
  <textarea
    {...register('bio')}
    rows={4}
    maxLength={500}
    placeholder="Cuéntanos sobre ti y tu pasión por la repostería..."
    className="w-full px-4 py-2 border border-neutral-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  />
  <p className="text-xs text-neutral-gray-500 mt-1">
    {watch('bio')?.length || 0}/500 caracteres
  </p>
</div>
```

7. Ahora, **antes del componente Profile**, agrega esta función (fuera del componente):

```javascript
const handlePhotoChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  // Validar tamaño (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    toast.error('La imagen debe ser menor a 5MB')
    return
  }

  const formData = new FormData()
  formData.append('photo', file)

  setUploadingPhoto(true)
  try {
    const response = await userService.uploadProfilePhoto(formData)
    if (response.success) {
      toast.success('Foto actualizada correctamente')
      // Actualizar el usuario en el contexto
      setUser({ ...user, foto_perfil: response.photoUrl })
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error al subir foto')
  } finally {
    setUploadingPhoto(false)
  }
}
```

8. **DENTRO del componente Profile**, agrega esta función:

```javascript
const handlePhotoUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    toast.error('La imagen debe ser menor a 5MB')
    return
  }

  const formData = new FormData()
  formData.append('photo', file)

  setUploadingPhoto(true)
  try {
    const response = await userService.uploadProfilePhoto(formData)
    if (response.success) {
      toast.success('Foto actualizada')
      await updateProfile({ foto_perfil: response.photoUrl })
    }
  } catch (error) {
    toast.error('Error al subir foto')
  } finally {
    setUploadingPhoto(false)
  }
}
```

9. Cambia el `onChange` del input de foto para usar la nueva función:

```jsx
onChange={handlePhotoUpload}
```

10. Al final del componente, agrega el modal:

```jsx
<UpgradePremiumModal
  isOpen={showUpgradeModal}
  onClose={() => setShowUpgradeModal(false)}
/>
```

11. Actualiza los `defaultValues` del formulario para incluir `bio`:

```javascript
defaultValues: {
  nombre: user?.nombre || '',
  email: user?.email || '',
  telefono: user?.telefono || '',
  bio: user?.bio || ''
}
```

12. **Guarda** (Ctrl + S)

---

**✅ VERIFICAR**: 
- Se ve la foto de perfil (o iniciales si no hay)
- Botón de cámara permite subir foto
- Campo de biografía funciona
- Muestra badge de plan (Gratis o Premium)
- Botón "Actualizar a Premium" funciona

---

# FASE 8: FAVICON (10 minutos)

## ✅ Paso 8.1: Crear Favicon Simple

1. Abre tu navegador
2. Ve a: https://www.favicon.cc/ o https://favicon.io/
3. Crea un ícono simple de pastel/cupcake usando el color rosa `#E5ADA8`
4. Descarga el favicon como `favicon.png`
5. Guárdalo en: `C:\xampp\htdocs\ProSweetBites\appnueva\frontend\public\`

---

## ✅ Paso 8.2: Actualizar index.html

1. Abre: `frontend/index.html`
2. Busca la línea del favicon (alrededor de línea 5):

```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```

3. **Reemplázala** con:

```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

4. Busca la línea del `<title>`:

```html
<title>Vite + React</title>
```

5. **Reemplázala** con:

```html
<title>SweetBites - Recetas de Postres</title>
```

6. **Guarda** (Ctrl + S)

---

**✅ VERIFICAR**: 
- Recarga la página (Ctrl + Shift + R)
- El favicon cambió en la pestaña del navegador
- El título dice "SweetBites - Recetas de Postres"

---

# 🎯 PRUEBAS FINALES

## ✅ Checklist de Funcionalidades

Prueba cada una de estas funcionalidades:

### Autenticación y Perfiles
- [ ] Registrar nuevo usuario → se crea con plan "gratis"
- [ ] Iniciar sesión → funciona correctamente
- [ ] Subir foto de perfil → se actualiza
- [ ] Editar biografía → se guarda
- [ ] Ver badge de plan (Gratis/Premium)

### Sistema Premium
- [ ] Usuario gratis intenta agregar 4to favorito → bloqueado
- [ ] Usuario gratis intenta modo cocina → bloqueado
- [ ] Click en "Actualizar a Premium" → abre modal
- [ ] Llenar formulario de pago falso → plan cambia a premium
- [ ] Usuario premium puede usar modo cocina → funciona
- [ ] Usuario premium puede agregar más de 3 favoritos → funciona

### Modo Cocina
- [ ] Usuario premium activa modo cocina → se abre pantalla completa
- [ ] Barra de progreso es color chocolate → sí
- [ ] Barra tiene efecto shimmer → sí
- [ ] Botones Anterior/Siguiente funcionan
- [ ] Progreso se actualiza correctamente

### Diseño Visual
- [ ] Colores nuevos se ven en toda la app → rosa, beige, chocolate
- [ ] NO hay emojis visibles → ninguno
- [ ] Botones "Volver" funcionan en todas las páginas
- [ ] Favicon actualizado
- [ ] Título de pestaña correcto

### Recetas
- [ ] Imágenes de recetas se muestran → sí
- [ ] Recetas premium tienen badge "Premium" → sí
- [ ] Usuario gratis NO ve recetas premium en lista

---

# 🚀 INICIAR SERVIDORES PARA PRUEBAS

## Backend
```bash
cd C:\xampp\htdocs\ProSweetBites\appnueva\backend
npm run dev
```

## Frontend
```bash
cd C:\xampp\htdocs\ProSweetBites\appnueva\frontend
npm run dev
```

---

# 🐛 SOLUCIÓN DE PROBLEMAS

## Problema: "Cannot find module 'multer'"
**Solución**: 
```bash
cd backend
npm install multer
```

## Problema: Foto de perfil no se muestra
**Verificar**:
1. La carpeta `backend/uploads/profiles/` existe
2. El servidor backend sirve archivos estáticos (línea 15 de server.js)
3. La ruta en la BD empieza con `/uploads/profiles/`

## Problema: Modal de upgrade no aparece
**Verificar**:
1. El import de `UpgradePremiumModal` está correcto
2. El estado `showUpgradeModal` está definido
3. El modal está renderizado al final del componente

## Problema: Colores no cambiaron
**Solución**:
1. Detén el servidor frontend (Ctrl + C)
2. Ejecuta: `npm run dev`
3. Recarga con Ctrl + Shift + R (hard reload)

## Problema: Migración SQL no se ejecuta
**Verificar**:
1. Estás en la base de datos correcta (sweetbites)
2. Copiaste TODO el contenido del archivo SQL
3. No hay errores de sintaxis en el SQL

---

# ✅ CHECKLIST FINAL DE ARCHIVOS

Verifica que estos archivos existen:

Backend:
- [ ] `database/migrations/004_add_premium_features.sql`
- [ ] `backend/middleware/checkPremium.js`
- [ ] `backend/uploads/profiles/` (carpeta)
- [ ] `backend/routes/users.js` (actualizado)

Frontend:
- [ ] `frontend/src/components/common/BackButton.jsx`
- [ ] `frontend/src/components/modals/UpgradePremiumModal.jsx`
- [ ] `frontend/src/services/userService.js` (actualizado)
- [ ] `frontend/tailwind.config.js` (actualizado)
- [ ] `frontend/public/favicon.png`
- [ ] `frontend/index.html` (actualizado)

---

# 🎉 ¡FELICIDADES!

Si completaste todos los pasos, tu aplicación ahora tiene:

✅ Sistema de planes Premium/Gratis funcional
✅ Diseño dulce y minimalista con nueva paleta
✅ Modo cocina mejorado con barra chocolate
✅ Perfiles de usuario completos (foto + bio)
✅ Navegación mejorada con botones "Volver"
✅ Simulación de pago académica
✅ Restricciones de funcionalidades por plan

**¡Tu proyecto SENA está listo para presentar!** 🚀

---

## 📧 Soporte

Si algo no funciona:
1. Revisa la sección "Solución de Problemas"
2. Verifica que completaste todos los pasos en orden
3. Revisa la consola del navegador (F12) y la terminal del backend para errores
4. Asegúrate de que ejecutaste la migración SQL

**¡Mucho éxito en tu presentación!** 🎓
