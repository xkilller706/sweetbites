# 🎨 PROMPT ULTRA DETALLADO PARA V0 - SWEETBITES

## 📋 INSTRUCCIONES PARA USAR ESTE PROMPT

1. **Ve a:** https://v0.dev
2. **Copia y pega** este prompt completo en el chat de V0
3. **V0 generará** el código de los componentes visuales
4. **Puedes pedirle ajustes** específicos después

---

# PROMPT PARA V0:

Necesito que crees una aplicación web completa de recetas de repostería llamada **SweetBites**. Es una plataforma elegante y profesional donde usuarios comparten recetas gratis (NO es e-commerce). 

## 🎨 IDENTIDAD VISUAL Y DISEÑO

### Paleta de Colores (CRÍTICO - SEGUIR EXACTAMENTE):

**Colores Principales:**
- **Verde Menta:** `#6BD080` - Color principal de la marca, usar en:
  - Botones primarios
  - Headers
  - Enlaces activos
  - Iconos destacados
  - Badges de estado "aprobada"

- **Verde Agua:** `#A4C3B2` - Color secundario, usar en:
  - Botones secundarios
  - Fondos de tarjetas alternativas
  - Bordes suaves
  - Elementos de apoyo

- **Beige Cálido:** `#DED6D1` - Fondo neutro, usar en:
  - Fondos de secciones
  - Cards sin hover
  - Áreas de contenido secundario

**Colores de Acento (Pastel):**
- **Azul Pastel:** `#B5C7E8` - Para información/badges informativos
- **Lavanda Pastel:** `#D4A5D4` - Para elementos decorativos
- **Amarillo Pastel:** `#F5DBA5` - Para advertencias/pendientes
- **Rosa Pastel Suave:** `#F5B5C7` - Acento decorativo suave

**Colores Funcionales:**
- **Success (Verde):** `#10B981` - Aprobado, completado
- **Warning (Amarillo):** `#F59E0B` - Pendiente, en revisión
- **Error (Rojo):** `#EF4444` - Rechazado, eliminado
- **Info (Azul):** `#3B82F6` - Información general

**Neutros:**
- Blanco: `#FFFFFF`
- Gris claro: `#F3F4F6`
- Gris medio: `#9CA3AF`
- Gris oscuro: `#374151`
- Negro: `#1F2937`

**❌ IMPORTANTE: NO USAR ROSA VIVO `#FFB7C3` - Está prohibido.**

---

### Tipografía:

**Fuentes:**
- **Encabezados:** "Poppins" (bold, semibold) - Moderna y amigable
- **Cuerpo:** "Inter" (regular, medium) - Limpia y legible

**Tamaños:**
- H1: 3rem (48px) - Hero titles
- H2: 2.25rem (36px) - Section titles
- H3: 1.5rem (24px) - Card titles
- Body: 1rem (16px) - Texto normal
- Small: 0.875rem (14px) - Metadatos

---

### Estilo Visual:

**Características:**
- **Moderno y limpio** - Espacios generosos, sin saturación
- **Bordes redondeados** - Border radius: 12px para cards, 8px para botones
- **Sombras suaves** - Elevación sutil en hover
- **Gradientes suaves** - Verde menta a verde agua en heroes
- **Iconos:** Emojis grandes y coloridos (🎂 🍪 🍨 🍫)
- **Imágenes:** Corners redondeados, aspect ratio 16:9 o 1:1

**Efectos:**
- **Hover en cards:** Elevación + escala sutil (transform: scale(1.02))
- **Hover en botones:** Oscurecimiento del color base
- **Transiciones:** 200ms ease-in-out
- **Animaciones:** Fade-in al cargar, slide-in para modales

---

## 📱 PÁGINAS Y COMPONENTES A CREAR

### 1️⃣ LANDING PAGE (Home)

**Layout:**
```
[Navbar transparente sobre hero]
[Hero Section - Fullscreen con gradiente]
[Features Section - 3 columnas]
[Categorías Section - Grid 4 columnas]
[CTA Section]
[Footer]
```

**Hero Section:**
- **Fondo:** Gradiente diagonal de verde menta (#6BD080) a verde agua (#A4C3B2)
- **Decoración:** Emojis flotantes grandes: 🍰 🎂 🍪 (con animación sutil de float)
- **Título:** "Comparte tus Mejores Recetas de Repostería" (Poppins bold, 4rem, blanco)
- **Subtítulo:** "Únete a la comunidad de reposteros más dulce" (Inter, 1.5rem, blanco opaco 90%)
- **Botones:**
  - Primario: "Explorar Recetas" (verde más oscuro, grande, con ícono 🔍)
  - Secundario: "Crear Cuenta" (outline blanco, con ícono ✨)
- **Altura:** 100vh (viewport height completo)

**Features Section:**
- **Título:** "¿Por qué SweetBites?" (centrado, verde menta)
- **3 Cards con íconos grandes:**
  1. **Recetas Detalladas**
     - Ícono: 📖 (grande, 4rem)
     - Título: "Instrucciones Paso a Paso"
     - Descripción: "Cada receta con ingredientes precisos y pasos numerados"
  
  2. **Calificaciones Honestas**
     - Ícono: ⭐ (grande, 4rem)
     - Título: "Valoraciones Reales"
     - Descripción: "Descubre qué opinan otros reposteros"
  
  3. **Guarda tus Favoritos**
     - Ícono: ❤️ (grande, 4rem)
     - Título: "Colecciones Personalizadas"
     - Descripción: "Organiza recetas en tus propias colecciones"

- **Estilo de cards:**
  - Fondo blanco
  - Padding generoso (2rem)
  - Border radius 16px
  - Sombra suave
  - Hover: elevación + escala 1.05

**Categorías Section:**
- **Título:** "Explora por Categoría" (centrado)
- **Grid:** 4 columnas responsive (2 en tablet, 1 en móvil)
- **Categorías:**
  
  1. **Tortas** - Fondo: `#6BD080`, Ícono: 🎂
  2. **Galletas** - Fondo: `#A4C3B2`, Ícono: 🍪
  3. **Chocolates** - Fondo: `#D4A5D4`, Ícono: 🍫
  4. **Postres Fríos** - Fondo: `#B5C7E8`, Ícono: 🍨

- **Cada card de categoría:**
  - Tamaño: 250x250px
  - Gradiente sutil del color base
  - Ícono emoji centrado (6rem)
  - Nombre de categoría (Poppins semibold, 1.5rem, blanco)
  - Hover: escala 1.1 con rotación leve (2deg)

**CTA Section:**
- Fondo: Verde menta claro (#6BD080 con opacidad 10%)
- Centrado verticalmente
- Título: "¿Listo para compartir tu receta?"
- Subtítulo: "Únete a cientos de reposteros"
- Botón grande: "Crear Cuenta Gratis"

---

### 2️⃣ CATÁLOGO DE RECETAS (Recipes)

**Layout:**
```
[Navbar]
[Search Bar + Filtros]
[Grid de RecipeCards - 3 columnas]
[Paginación]
```

**Search Bar:**
- Input grande con ícono de lupa 🔍
- Placeholder: "Buscar brownies, cheesecake, galletas..."
- Width: 100% en móvil, 60% en desktop
- Border radius: 12px
- Focus: borde verde menta

**Filtros:**
- **Categoría:** Dropdown con íconos emoji
  - Opciones: Todas 🍰 | Tortas 🎂 | Galletas 🍪 | Chocolates 🍫 | Postres Fríos 🍨
  
- **Dificultad:** Pills seleccionables
  - Fácil (verde) | Intermedio (amarillo) | Difícil (naranja)

- **Diseño de filtros:**
  - Horizontal en desktop
  - Acordeón en móvil
  - Fondo blanco con bordes suaves

**RecipeCard Component:**
```
┌─────────────────────────┐
│                         │
│    [Imagen 16:9]        │
│                         │
├─────────────────────────┤
│ ❤️ 24    ⏱️ 45min      │
├─────────────────────────┤
│  Brownie de Chocolate   │ ← Título (Poppins semibold)
│  Delicioso brownie...   │ ← Descripción (2 líneas max)
│                         │
│ [Chocolates] [Fácil]    │ ← Badges
│                         │
│ ⭐⭐⭐⭐⭐ 4.8 (24)      │ ← Rating
└─────────────────────────┘
```

**Especificaciones RecipeCard:**
- Width: 100% del contenedor (Grid automático)
- Imagen: Aspect ratio 16:9, object-fit cover
- Hover: Elevación de sombra + imagen escala 1.05 (overflow hidden)
- Badges: Verde menta para categoría, gris para dificultad
- Rating: Estrellas doradas con número

**Grid:**
- Desktop: 3 columnas
- Tablet: 2 columnas
- Móvil: 1 columna
- Gap: 2rem

**Empty State (si no hay recetas):**
- Emoji grande: 😕 (8rem)
- Título: "No encontramos recetas"
- Subtítulo: "Intenta con otros filtros"
- Botón: "Limpiar filtros"

---

### 3️⃣ DETALLE DE RECETA (RecipeDetail)

**Layout:**
```
[Breadcrumb: Inicio / Recetas / Brownie de Chocolate]
[Hero Image - 60% ancho]  [Info Card - 40% ancho]
[Calculadora de Porciones]
[Ingredientes - Lista con checks]
[Pasos - Numerados grandes]
[Sección de Comentarios]
[Botón Flotante: Modo Cocina]
```

**Hero Image:**
- Width: 60% (100% en móvil)
- Height: 500px
- Border radius: 24px
- Object fit: cover
- Placeholder: Imagen de Unsplash de postre

**Info Card (sidebar):**
```
┌─────────────────────────┐
│ Brownie de Chocolate    │ ← H1
│ Delicioso brownie...    │ ← Descripción
│                         │
│ [Chocolates] [Fácil]    │ ← Badges
│ ⏱️ 45 min              │
│                         │
│ ⭐⭐⭐⭐⭐ 4.8          │
│ (24 valoraciones)       │
│                         │
│ ┌─────────────────────┐ │
│ │ Porciones: [- 8 +]  │ │ ← Calculadora
│ └─────────────────────┘ │
│                         │
│ [🍳 Modo Cocina]        │ ← Botón
│ [❤️ Guardar]            │ ← Botón outline
└─────────────────────────┘
```

**Calculadora de Porciones:**
- Fondo: Verde menta 10%
- Botones grandes: - y +
- Número central grande (2rem)
- Al cambiar: ingredientes se actualizan automáticamente

**Sección Ingredientes:**
- **Título:** "Ingredientes" (Poppins semibold, 2rem)
- **Subtítulo:** "Para 8 porciones" (dinámico)
- **Lista:**
  - Checkbox verde ✓ (interactivo)
  - Cantidad en bold: "200 g"
  - Ingrediente: "de chocolate oscuro"
  - Layout: 2 columnas en desktop

**Sección Pasos:**
- **Título:** "Preparación" (Poppins semibold, 2rem)
- **Pasos numerados:**
```
┌───────────────────────────────┐
│ 🔵 1  Derretir el chocolate   │
│       con la mantequilla a    │
│       baño maría...           │
├───────────────────────────────┤
│ 🔵 2  Batir los huevos con    │
│       el azúcar hasta...      │
└───────────────────────────────┘
```
- Número en círculo grande verde menta
- Texto con padding generoso
- Fondo blanco alternado con gris muy claro

**Modo Cocina (Modal Fullscreen):**
- **Fondo:** Negro con opacidad 95%
- **Header:**
  - Logo pequeño izquierda
  - "Modo Cocina - Brownie de Chocolate" (centro, blanco)
  - Botón X grande (derecha)

- **Contenido centrado:**
```
┌─────────────────────────────────┐
│                                 │
│         🔵 3 / 7               │ ← Paso actual
│                                 │
│    Mezclar todo y hornear a    │ ← Texto GRANDE
│    180°C durante 25 minutos    │    (2.5rem, blanco)
│                                 │
│  [← Anterior]  [Siguiente →]   │ ← Botones grandes
│                                 │
└─────────────────────────────────┘
```

---

### 4️⃣ CREAR RECETA - WIZARD (CreateRecipe)

**Stepper Visual (arriba):**
```
(1)────────(2)────────(3)────────(4)
Info      Ingred.    Pasos     Preview

Completados: ✅ verde
Actual: 🔵 verde menta grande
Pendientes: ⚪ gris
```

**PASO 1 - Info Básica:**
```
┌─────────────────────────────────┐
│ Paso 1: Información Básica      │
├─────────────────────────────────┤
│                                 │
│ Nombre de la Receta *           │
│ [___________________________]   │
│                                 │
│ Descripción *                   │
│ [___________________________]   │
│ [___________________________]   │
│ [___________________________]   │
│                                 │
│ Categoría *      Dificultad *   │
│ [Dropdown 🎂]    [Dropdown]     │
│                                 │
│ Tiempo (min) *   Porciones *    │
│ [_________]      [_________]    │
│                                 │
│              [Siguiente →]       │
└─────────────────────────────────┘
```

**PASO 2 - Ingredientes:**
```
┌─────────────────────────────────┐
│ Paso 2: Ingredientes            │
├─────────────────────────────────┤
│                                 │
│ Ingrediente 1:                  │
│ [Nombre______] [Cant.] [Unidad] [✕]
│                                 │
│ Ingrediente 2:                  │
│ [Nombre______] [Cant.] [Unidad] [✕]
│                                 │
│ [+ Agregar Ingrediente]         │
│                                 │
│ [← Anterior]    [Siguiente →]   │
└─────────────────────────────────┘
```
- Botón "+ Agregar" en verde menta outline
- Botón "✕" rojo para eliminar (solo si hay >1)
- Grid: 3 columnas (50% nombre, 25% cantidad, 25% unidad)

**PASO 3 - Pasos:**
```
┌─────────────────────────────────┐
│ Paso 3: Preparación             │
├─────────────────────────────────┤
│                                 │
│ 🔵 1 [____________________]     │
│      [____________________]     │
│                            [✕]  │
│                                 │
│ 🔵 2 [____________________]     │
│      [____________________]     │
│                            [✕]  │
│                                 │
│ [+ Agregar Paso]                │
│                                 │
│ [← Anterior]    [Siguiente →]   │
└─────────────────────────────────┘
```
- Círculo numerado grande (verde menta)
- Textarea multilinea
- Renumeración automática al eliminar

**PASO 4 - Preview:**
```
┌─────────────────────────────────┐
│ Paso 4: Revisión Final          │
├─────────────────────────────────┤
│                                 │
│ ✅ Brownie de Chocolate         │
│    Delicioso brownie casero     │
│                                 │
│    [Chocolates] [Fácil]         │
│    ⏱️ 45 min  👥 8 porciones   │
│                                 │
│ ✅ Ingredientes (4)             │
│    • 200 g de chocolate         │
│    • 100 g de mantequilla       │
│    ...                          │
│                                 │
│ ✅ Preparación (3 pasos)        │
│    1. Derretir el chocolate...  │
│    2. Batir los huevos...       │
│    ...                          │
│                                 │
│ ℹ️  Tu receta será enviada a   │
│    revisión y quedará pendiente │
│    hasta que un admin apruebe.  │
│                                 │
│ [← Anterior]  [Enviar Receta]   │
└─────────────────────────────────┘
```
- Preview completo en cards
- Alert informativo en azul pastel
- Botón "Enviar" en verde menta, grande

---

### 5️⃣ MIS RECETAS (MyRecipes)

**Header:**
```
┌─────────────────────────────────────────┐
│ Mis Recetas               [+ Nueva]     │
│ Gestiona tus recetas enviadas           │
└─────────────────────────────────────────┘
```

**Tabs de Filtro:**
```
[Todas (3)] [Pendientes (1)] [Publicadas (1)] [Rechazadas (1)]
```
- Pills grandes
- Activo: verde menta con texto blanco
- Inactivo: gris claro con texto gris

**Lista de Recetas:**
```
┌───────────────────────────────────────────┐
│ [IMG]  Brownie de Chocolate         [⏳ Pendiente]
│ 150px  Delicioso brownie casero...
│        [Chocolates] [Fácil]
│        ⏱️ 45 min  👥 8  📅 Hace 2 días
│
│        En revisión por administrador 🟡
│        
│        [Ver Detalles]
├───────────────────────────────────────────┤
│ [IMG]  Cheesecake                   [✅ Publicada]
│ 150px  Suave y cremoso...
│        ...
│        [Ver Publicada]
├───────────────────────────────────────────┤
│ [IMG]  Galletas                     [❌ Rechazada]
│ 150px  ...
│        
│        ⚠️ Motivo del rechazo:
│        La receta no especifica temperatura
│        de horneado. Por favor agrega...
│        
│        [Crear Nueva Versión]
└───────────────────────────────────────────┘
```

**Badges de Estado:**
- Pendiente: Fondo amarillo, icono ⏳
- Publicada: Fondo verde, icono ✅
- Rechazada: Fondo rojo claro, icono ❌

**Motivo de Rechazo (si aplica):**
- Fondo rojo muy claro (#FEE2E2)
- Borde rojo claro
- Texto en gris oscuro
- Icono ⚠️

---

### 6️⃣ PERFIL DE USUARIO (Profile)

**Layout Sidebar:**
```
[Avatar]     [Información Personal]
[Stats]      [Formulario Editable]
             [Cambiar Contraseña]
```

**Sidebar (30%):**
```
┌─────────────────┐
│                 │
│      [LS]       │ ← Avatar con iniciales
│                 │    (Gradiente verde)
│                 │
│  Luis Serna     │
│  [Admin]        │ ← Badge de rol
│                 │
│  Miembro desde  │
│  Mayo 2026      │
│                 │
├─────────────────┤
│  Estadísticas   │
│                 │
│  Recetas: 3     │
│  Favoritos: 12  │
│  Comentarios: 8 │
└─────────────────┘
```

**Avatar:**
- Círculo grande (150px)
- Gradiente verde menta a verde agua
- Iniciales en blanco (3rem, bold)

**Badge de Rol:**
- Admin: Rojo
- Editor: Azul
- Usuario: Verde menta

**Main Content (70%):**
```
┌─────────────────────────────────┐
│ Información Personal  [✏️ Editar]│
├─────────────────────────────────┤
│                                 │
│ Nombre Completo                 │
│ Luis Serna                      │
│                                 │
│ Correo Electrónico              │
│ luis@email.com                  │
│                                 │
│ Teléfono                        │
│ 300 123 4567                    │
│                                 │
│ Rol                             │
│ Administrador                   │
└─────────────────────────────────┘
```

**Modo Edición (al hacer clic en Editar):**
- Inputs editables
- Botones: "Guardar Cambios" (verde) y "Cancelar" (outline)

---

### 7️⃣ FAVORITOS (Favorites)

**Tabs:**
```
[❤️ Favoritos (12)]  [📁 Colecciones (3)]
```

**Vista Favoritos:**
- Grid igual que catálogo
- RecipeCards con botón "Remover de favoritos"

**Vista Colecciones:**
```
┌─────────────────────┐
│ 📁                  │
│ Para Navidad        │
│ 8 recetas          │
│                     │
│ [Ver Colección]     │
└─────────────────────┘
```

---

### 8️⃣ ADMIN - DASHBOARD

**Layout:**
```
┌────────────────────────────────────────┐
│ Panel de Administración                │
│ Gestiona la plataforma SweetBites      │
└────────────────────────────────────────┘

[📊 Stats Cards - 4 columnas]

┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ 156 │ │  89 │ │  12 │ │ 234 │
│Usuarios│Recetas│Pendientes│Comentarios
└─────┘ └─────┘ └─────┘ └─────┘

[Acciones Rápidas - 4 botones]

[Usuarios Recientes]    [Recetas Pendientes]
```

**Stats Card Component:**
```
┌─────────────────────┐
│ [Ícono] 156         │ ← Número grande
│ grande              │
│         Total       │ ← Label
│         Usuarios    │
└─────────────────────┘
```
- Hover: Clickeable, redirige a sección
- Colores por tipo:
  - Usuarios: Verde menta
  - Recetas: Verde agua
  - Pendientes: Amarillo (importante)
  - Comentarios: Azul

---

### 9️⃣ ADMIN - GESTIÓN DE USUARIOS

**Search Bar + Tabla:**
```
┌─────────────────────────────────────────┐
│ [Buscar usuario...]                 🔍  │
└─────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Usuario    │ Email        │ Rol │ Acciones
├────────────────────────────────────────┤
│ [LS] Luis  │ luis@...     │[Dropdown]│[Eliminar]
│ Serna      │              │ Admin    │
├────────────────────────────────────────┤
│ [MG] María │ maria@...    │[Dropdown]│[Eliminar]
│ García     │              │ Usuario  │
└────────────────────────────────────────┘
```

**Tabla Responsiva:**
- Desktop: Tabla completa
- Móvil: Cards apiladas

**Dropdown de Rol:**
- Inline en la tabla
- Opciones: Usuario | Editor | Admin
- Cambia inmediatamente al seleccionar

**Botón Eliminar:**
- Rojo outline
- Confirma con modal antes de eliminar

---

### 🔟 ADMIN - APROBAR RECETAS

**Lista de Pendientes:**
```
┌──────────────────────────────────────────┐
│ [IMG]  Brownie de Chocolate         [⏳]│
│ 200px  Por: María García               │
│        [Chocolates] [Fácil] ⏱️ 45min  │
│                                         │
│        [Ver Detalles ▼] [✓Aprobar] [✗Rechazar]
└──────────────────────────────────────────┘
```

**Al hacer clic en "Ver Detalles":**
- Expande para mostrar ingredientes y pasos completos
- Animación smooth de expansión

**Botón Aprobar:**
- Verde grande
- Icono ✓
- Confirma: "¿Aprobar esta receta?"

**Botón Rechazar:**
- Rojo outline
- Abre modal para escribir motivo

**Modal de Rechazo:**
```
┌─────────────────────────────────────┐
│ Rechazar Receta                  [✕]│
├─────────────────────────────────────┤
│                                     │
│ Vas a rechazar:                     │
│ "Brownie de Chocolate"              │
│                                     │
│ Motivo del rechazo: *               │
│ [_______________________________]   │
│ [_______________________________]   │
│ [_______________________________]   │
│                                     │
│ El usuario verá este mensaje.       │
│ Sé específico para que pueda       │
│ mejorar su receta.                  │
│                                     │
│     [Cancelar] [Rechazar Receta]    │
└─────────────────────────────────────┘
```

---

### 1️⃣1️⃣ ADMIN - GESTIONAR CATEGORÍAS

**Grid + Botón Crear:**
```
┌─────────────────────────────────────┐
│ Gestión de Categorías   [+ Nueva]   │
└─────────────────────────────────────┘

┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ 🎂   │ │ 🍪   │ │ 🍫   │ │ 🍨   │
│Tortas│ │Galletas│Chocolates│Postres
│      │ │      │ │      │ │Fríos │
│[Editar]│[Editar]│[Editar]│[Editar]
│[Eliminar]│      │      │      │
└──────┘ └──────┘ └──────┘ └──────┘
```

**Modal Crear/Editar:**
```
┌─────────────────────────────────────┐
│ Nueva Categoría                  [✕]│
├─────────────────────────────────────┤
│                                     │
│ Nombre: *                           │
│ [________________________]          │
│                                     │
│ Descripción: (Opcional)             │
│ [________________________]          │
│ [________________________]          │
│                                     │
│ Ícono:                              │
│ [🎂] [🍪] [🍨] [🍫] [🥧] [🧁]      │ ← Selector
│ [🍰] [🍩] [🎂] [🥮] [🍮] [🧇]      │
│                                     │
│ O personalizado: [___]              │
│                                     │
│ Color:                              │
│ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤                    │ ← Presets
│ [Color Picker]                      │
│                                     │
│ Vista Previa:                       │
│ ┌────────┐                          │
│ │  🎂    │                          │
│ │ Tortas │                          │
│ └────────┘                          │
│                                     │
│       [Cancelar] [Crear Categoría]  │
└─────────────────────────────────────┘
```

**Color Picker:**
- Muestra los 7 colores preset
- Selector de color custom
- Preview en tiempo real

---

### 1️⃣2️⃣ COMPONENTES REUTILIZABLES

**Button Component:**
```jsx
<Button variant="primary" size="lg" loading={false}>
  Texto del Botón
</Button>
```

Variantes:
- `primary`: Fondo verde menta, texto blanco
- `secondary`: Fondo verde agua, texto blanco
- `outline`: Borde verde menta, fondo transparente
- `ghost`: Sin fondo ni borde, solo texto verde menta
- `danger`: Fondo rojo, texto blanco

Tamaños:
- `sm`: Padding pequeño, texto 0.875rem
- `md`: Padding medio (default)
- `lg`: Padding grande, texto 1.125rem

Estados:
- `loading`: Muestra spinner, deshabilitado
- `disabled`: Opacidad 50%, cursor not-allowed

**Input Component:**
```jsx
<Input 
  label="Nombre" 
  placeholder="Tu nombre" 
  error="Este campo es obligatorio"
/>
```
- Label arriba
- Error en rojo abajo
- Focus: borde verde menta

**Card Component:**
```jsx
<Card hover={true}>
  Contenido
</Card>
```
- Padding: 1.5rem
- Border radius: 12px
- Sombra suave
- Hover opcional: elevación

**Badge Component:**
```jsx
<Badge variant="success">Aprobada</Badge>
```

Variantes:
- `primary`: Verde menta
- `secondary`: Verde agua
- `success`: Verde oscuro
- `warning`: Amarillo
- `error`: Rojo
- `info`: Azul

**Modal Component:**
```jsx
<Modal isOpen={true} onClose={() => {}}>
  Contenido del modal
</Modal>
```
- Overlay oscuro (black 50%)
- Animación fade + scale
- Cierre con ✕ o click fuera
- Responsive (fullscreen en móvil)

**Spinner Component:**
```jsx
<Spinner size="lg" />
```
- SVG animado
- Color verde menta
- Tamaños: sm, md, lg

**EmptyState Component:**
```jsx
<EmptyState 
  emoji="😕" 
  title="No hay recetas" 
  message="Intenta con otros filtros"
/>
```
- Emoji grande (6rem)
- Título centrado
- Mensaje opcional
- Botón de acción opcional

---

### 1️⃣3️⃣ NAVBAR (Layout)

**Desktop:**
```
┌─────────────────────────────────────────────┐
│ 🍰 SweetBites  [Inicio][Recetas] [Login] 👤│
└─────────────────────────────────────────────┘
```

**Si está logueado:**
```
┌─────────────────────────────────────────────┐
│ 🍰 SweetBites  [Inicio][Recetas][Favoritos]│
│                              [Avatar ▼]     │
└─────────────────────────────────────────────┘
```

**Dropdown del Avatar:**
```
┌─────────────────┐
│ 👤 Mi Perfil    │
│ 📖 Mis Recetas  │
│ ➕ Crear Receta │
│ ────────────    │
│ 🚪 Cerrar Sesión│
└─────────────────┘
```

**Si es Admin, agregar:**
```
│ ⚙️ Panel Admin  │
```

**Móvil:**
- Hamburger menu (☰)
- Logo centrado
- Avatar derecha

---

### 1️⃣4️⃣ FOOTER

```
┌─────────────────────────────────────────┐
│ 🍰 SweetBites                           │
│ La comunidad de repostería más dulce    │
│                                         │
│ Inicio  Recetas  Contacto  Acerca      │
│                                         │
│ © 2026 SweetBites - SENA               │
│ Desarrollado con 💚                     │
└─────────────────────────────────────────┘
```

- Fondo: Beige claro (#DED6D1)
- Texto: Gris oscuro
- Links: Verde menta al hover

---

## 🎯 STACK TECNOLÓGICO

**Usa:**
- **React** con TypeScript
- **Tailwind CSS** para estilos
- **shadcn/ui** para componentes base
- **Lucide React** para íconos (además de emojis)
- **Framer Motion** para animaciones
- **React Hook Form** para formularios
- **Zod** para validaciones

---

## 📐 RESPONSIVE DESIGN

**Breakpoints:**
- Mobile: < 768px (1 columna)
- Tablet: 768px - 1024px (2 columnas)
- Desktop: > 1024px (3-4 columnas)

**Ajustes móvil:**
- Navbar: Hamburger menu
- Hero: Texto más pequeño
- Grid: 1 columna
- Botones: Full width
- Formularios: Campos apilados

---

## ✨ ANIMACIONES Y MICROINTERACCIONES

**Al cargar página:**
- Fade in: opacidad 0 → 1 en 300ms
- Slide up: translateY(20px) → 0

**Hover en cards:**
- Escala: 1 → 1.02
- Sombra: suave → pronunciada
- Transición: 200ms ease

**Click en botones:**
- Escala: 1 → 0.98 (active state)

**Modal:**
- Overlay: fade in
- Modal: scale(0.95) → scale(1)

**Stepper:**
- Completado: checkmark animado con scale bounce

---

## 🎨 REFERENCIAS VISUALES

**Inspiración de diseño:**
- Airbnb (tarjetas limpias)
- Notion (wizard multi-step)
- Stripe (dashboard de admin)
- Pinterest (grid de imágenes)

**Estilo:**
- Minimalista pero cálido
- Mucho espacio en blanco
- Emojis grandes como decoración
- Gradientes suaves
- Sombras sutiles

---

## ⚙️ CONSIDERACIONES TÉCNICAS

**Accesibilidad:**
- Contraste mínimo WCAG AA
- Labels en todos los inputs
- Navegación por teclado
- ARIA labels en botones de ícono

**Performance:**
- Lazy loading de imágenes
- Skeleton loaders mientras carga
- Optimización de imágenes (WebP)

**SEO:**
- Títulos semánticos (h1, h2, h3)
- Meta descriptions
- Alt text en imágenes

---

## 🚀 PRIORIDAD DE IMPLEMENTACIÓN

**Fase 1 - Esencial:**
1. Landing Page (Home)
2. Navbar + Footer
3. Catálogo de Recetas
4. RecipeCard Component
5. Detalle de Receta

**Fase 2 - Usuario:**
6. Login/Register
7. Crear Receta (Wizard)
8. Mis Recetas
9. Perfil

**Fase 3 - Admin:**
10. Dashboard Admin
11. Aprobar Recetas
12. Gestionar Usuarios
13. Gestionar Categorías

---

## 📝 NOTAS FINALES

- **NO usar rosa vivo** (#FFB7C3)
- **Emojis grandes** en categorías y secciones
- **Espaciado generoso** - No apretado
- **Hover states** en todo lo interactivo
- **Loading states** en botones de acción
- **Empty states** amigables con emojis
- **Confirmaciones** antes de acciones destructivas
- **Toasts** para feedback de acciones (success/error)

---

**IMPORTANTE:** Este diseño debe verse **profesional, moderno y cálido**. La paleta verde menta con beige debe transmitir frescura y elegancia. Los emojis grandes dan personalidad sin ser infantiles. El espaciado generoso hace que se vea premium.

**¿Listo para empezar? ¡Crea primero el Landing Page (Home) con el hero, features y categorías!** 🍰
