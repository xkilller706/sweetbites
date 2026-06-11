# 📋 GUÍA: INGREDIENTES CON SECCIONES

## 🎯 OBJETIVO
Permitir que las recetas tengan ingredientes organizados en secciones como:
- **Para la Base**
- **Para el Relleno de Limón**
- **Para el Merengue**

---

## 📊 PASO 1: MODIFICAR BASE DE DATOS (5 minutos)

### 1.1 Ejecutar Script SQL

**Archivo**: `database/add_ingredient_sections.sql` (Ya lo creé)

**Pasos**:
1. Abrir phpMyAdmin: http://localhost/phpmyadmin
2. Seleccionar base de datos: `sweetbites_db`
3. Pestaña "SQL"
4. Copiar contenido de `database/add_ingredient_sections.sql`
5. Pegar y ejecutar
6. Verificar mensaje de éxito ✅

**Esto agrega el campo `seccion` a la tabla `ingredients`**

---

## 🎨 PASO 2: ACTUALIZAR FRONTEND

### 2.1 Modificar el Estado de Ingredientes

**Archivo**: `frontend/src/pages/user/CreateRecipe.jsx`

**CAMBIO 1: Estado inicial de ingredientes (línea ~15)**

```javascript
// ANTES:
const [ingredients, setIngredients] = useState([{ nombre: '', cantidad: '', unidad: 'gramos' }])

// DESPUÉS:
const [ingredients, setIngredients] = useState([{ nombre: '', cantidad: '', unidad: 'gramos', seccion: '' }])
```

**CAMBIO 2: Función addIngredient (línea ~39)**

```javascript
// ANTES:
const addIngredient = () => {
  setIngredients([...ingredients, { nombre: '', cantidad: '', unidad: 'gramos' }])
}

// DESPUÉS:
const addIngredient = () => {
  setIngredients([...ingredients, { nombre: '', cantidad: '', unidad: 'gramos', seccion: '' }])
}
```

**CAMBIO 3: Agregar función para agregar sección completa**

Agregar esta función nueva después de `addIngredient`:

```javascript
// Agregar una nueva sección de ingredientes
const addSection = () => {
  const sectionName = prompt('Nombre de la sección (ej: Para la Base, Para el Relleno):')
  if (sectionName) {
    setIngredients([...ingredients, { nombre: '', cantidad: '', unidad: 'gramos', seccion: sectionName }])
  }
}
```

---

### 2.2 Actualizar el Formulario de Ingredientes (Paso 2)

Busca la sección donde se muestran los ingredientes (aproximadamente línea 260-300) y reemplázala con esto:

```jsx
{/* Step 2: Ingredientes */}
{step === 2 && (
  <Card>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-heading">Paso 2: Ingredientes</h2>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={addSection}>
          + Nueva Sección
        </Button>
        <Button type="button" variant="primary" onClick={addIngredient}>
          + Ingrediente
        </Button>
      </div>
    </div>

    <div className="space-y-6">
      {/* Agrupar ingredientes por sección */}
      {Object.entries(
        ingredients.reduce((acc, ing, index) => {
          const section = ing.seccion || 'Sin Sección'
          if (!acc[section]) acc[section] = []
          acc[section].push({ ...ing, originalIndex: index })
          return acc
        }, {})
      ).map(([sectionName, sectionIngredients]) => (
        <div key={sectionName} className="border border-neutral-gray-200 rounded-lg p-4 bg-neutral-gray-50">
          {/* Encabezado de Sección */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">
              {sectionName === 'Sin Sección' ? '📝 Ingredientes' : `🔸 ${sectionName}`}
            </h3>
            <span className="text-sm text-neutral-gray-500">
              {sectionIngredients.length} ingrediente(s)
            </span>
          </div>

          {/* Lista de ingredientes de esta sección */}
          <div className="space-y-3">
            {sectionIngredients.map((ing) => {
              const index = ing.originalIndex
              return (
                <div key={index} className="flex gap-3 items-start bg-white p-3 rounded-lg">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Nombre del ingrediente"
                      value={ing.nombre}
                      onChange={(e) => updateIngredient(index, 'nombre', e.target.value)}
                      className="input mb-2"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Cantidad"
                        value={ing.cantidad}
                        onChange={(e) => updateIngredient(index, 'cantidad', e.target.value)}
                        className="input"
                        step="0.01"
                      />
                      <select
                        value={ing.unidad}
                        onChange={(e) => updateIngredient(index, 'unidad', e.target.value)}
                        className="input"
                      >
                        <option value="gramos">gramos</option>
                        <option value="kilogramos">kilogramos</option>
                        <option value="ml">ml</option>
                        <option value="litros">litros</option>
                        <option value="cucharadas">cucharadas</option>
                        <option value="cucharaditas">cucharaditas</option>
                        <option value="tazas">tazas</option>
                        <option value="unidades">unidades</option>
                        <option value="pizca">pizca</option>
                        <option value="al gusto">al gusto</option>
                      </select>
                    </div>
                    {/* Campo oculto para la sección (puedes hacerlo editable si quieres) */}
                    <input
                      type="text"
                      placeholder="Sección (opcional)"
                      value={ing.seccion || ''}
                      onChange={(e) => updateIngredient(index, 'seccion', e.target.value)}
                      className="input mt-2 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-error hover:text-error/80 p-2"
                  >
                    🗑️
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>

    {/* Botones de navegación */}
    <div className="flex justify-between mt-6">
      <Button type="button" variant="outline" onClick={() => setStep(1)}>
        ← Anterior
      </Button>
      <Button type="button" variant="primary" onClick={() => setStep(3)}>
        Siguiente →
      </Button>
    </div>
  </Card>
)}
```

---

## 🖥️ PASO 3: ACTUALIZAR VISUALIZACIÓN DE RECETAS

### 3.1 Actualizar RecipeDetail.jsx

Busca la sección donde se muestran los ingredientes (aproximadamente línea 280-320) y reemplázala:

```jsx
{/* Ingredientes */}
<Card className="mb-8">
  <h2 className="text-2xl font-heading text-primary mb-6 flex items-center gap-2">
    📋 Ingredientes
    <span className="text-sm font-normal text-neutral-gray-500">
      ({adjustedPortions} {adjustedPortions === 1 ? 'porción' : 'porciones'})
    </span>
  </h2>

  {/* Agrupar ingredientes por sección */}
  {Object.entries(
    (recipe.ingredients || []).reduce((acc, ing) => {
      const section = ing.seccion || null
      if (!acc[section]) acc[section] = []
      acc[section].push(ing)
      return acc
    }, {})
  ).map(([sectionName, sectionIngredients]) => (
    <div key={sectionName || 'default'} className="mb-6 last:mb-0">
      {/* Mostrar nombre de sección si existe */}
      {sectionName && sectionName !== 'null' && (
        <h3 className="text-lg font-semibold text-neutral-gray-800 mb-3 pb-2 border-b border-neutral-gray-200">
          🔸 {sectionName}
        </h3>
      )}
      
      {/* Lista de ingredientes */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sectionIngredients.map((ingredient, idx) => {
          const adjustedQuantity = adjustQuantity(ingredient.cantidad)
          return (
            <li key={idx} className="flex items-start gap-3 p-3 bg-neutral-gray-50 rounded-lg">
              <span className="text-primary font-bold text-lg">•</span>
              <span className="text-neutral-gray-800">
                <strong className="text-primary">{adjustedQuantity} {ingredient.unidad}</strong> de {ingredient.nombre}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  ))}
</Card>
```

---

## 📱 PASO 4: ACTUALIZAR COMPONENTE DE IMPRESIÓN

**Archivo**: `frontend/src/components/recipes/PrintRecipe.jsx`

Busca la sección de ingredientes (línea ~110) y reemplázala:

```jsx
{/* Ingredientes */}
<div className="mb-8 print-ingredients">
  <h2 className="text-2xl font-heading text-primary mb-4 pb-2 border-b-2 border-primary">
    📋 Ingredientes
  </h2>
  <div className="bg-neutral-gray-50 rounded-lg p-6 print:bg-white print:border print:border-gray-300">
    {/* Agrupar por sección */}
    {Object.entries(
      (recipe.ingredients || []).reduce((acc, ing) => {
        const section = ing.seccion || 'Ingredientes'
        if (!acc[section]) acc[section] = []
        acc[section].push(ing)
        return acc
      }, {})
    ).map(([sectionName, sectionIngredients]) => (
      <div key={sectionName} className="mb-6 last:mb-0">
        {/* Título de sección */}
        {sectionName && sectionName !== 'null' && sectionName !== 'Ingredientes' && (
          <h3 className="text-base font-bold text-neutral-gray-800 mb-3 mt-4 first:mt-0">
            🔸 {sectionName}
          </h3>
        )}
        
        {/* Lista */}
        <ul className="space-y-2">
          {sectionIngredients.map((ing, index) => (
            <li key={index} className="flex items-start ml-4">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0"></span>
              <span className="text-neutral-gray-800">
                <strong>{ing.cantidad} {ing.unidad}</strong> de {ing.nombre}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</div>
```

---

## 🎯 EJEMPLO DE USO

### Crear Receta de "Tarta de Limón con Merengue"

1. **Paso 1**: Información básica
   - Nombre: Tarta de Limón con Merengue
   - Descripción: Deliciosa tarta con base crujiente...
   - Categoría: Tartas
   - Dificultad: Intermedio
   - Tiempo: 90 minutos
   - Porciones: 8

2. **Paso 2**: Ingredientes

   **Opción A: Usar botón "Nueva Sección"**
   - Click en "+ Nueva Sección"
   - Escribir: "Para la Base"
   - Agregar ingredientes:
     - 200 g de harina
     - 100 g de mantequilla
     - ...
   
   - Click en "+ Nueva Sección"
   - Escribir: "Para el Relleno de Limón"
   - Agregar ingredientes:
     - 150 ml de jugo de limón
     - ...
   
   - Click en "+ Nueva Sección"
   - Escribir: "Para el Merengue"
   - Agregar ingredientes:
     - 4 claras de huevo
     - ...

   **Opción B: Escribir manualmente**
   - Agregar ingrediente
   - Completar nombre, cantidad, unidad
   - En el campo "Sección", escribir: "Para la Base"
   - Repetir para todos los ingredientes

3. **Paso 3**: Pasos de preparación
   - Paso 1: Preparar la base...
   - Paso 2: Hacer el relleno...
   - Paso 3: Preparar el merengue...
   - Paso 4: Hornear y servir...

4. **Paso 4**: Revisar y enviar

---

## 📊 CÓMO SE VERÁ

### En el Detalle de la Receta:

```
📋 Ingredientes (8 porciones)

🔸 Para la Base
  • 200 gramos de harina de trigo común
  • 100 gramos de mantequilla fría (en cubitos)
  • 50 gramos de azúcar glass
  • 1 unidad de huevo
  • 1 pizca de sal

🔸 Para el Relleno de Limón
  • 150 ml de jugo de limón
  • 1 unidad de ralladura de 2 limones
  • 150 gramos de azúcar blanca
  • 4 unidades de yemas de huevo
  • 35 gramos de fécula de maíz
  • 150 ml de agua
  • 40 gramos de mantequilla

🔸 Para el Merengue
  • 4 unidades de claras de huevo
  • 240 gramos de azúcar blanca
  • 80 ml de agua (para el almíbar)
```

---

## ✅ VENTAJAS DE ESTE SISTEMA

1. **Organización clara**: Los ingredientes están agrupados por uso
2. **Fácil de seguir**: El usuario sabe qué ingredientes necesita para cada parte
3. **Flexible**: Puede tener secciones o no tenerlas (opcional)
4. **Compatible**: Recetas antiguas sin sección siguen funcionando
5. **Profesional**: Se ve como recetas de sitios profesionales

---

## 🔄 MIGRACIÓN DE RECETAS EXISTENTES

Si ya tienes recetas creadas, NO necesitas hacer nada:
- Las recetas sin sección funcionarán normalmente
- El campo `seccion` es NULL por defecto
- Se agruparán en "Sin Sección" o simplemente se mostrarán sin encabezado

Si quieres agregar secciones a recetas existentes:
1. Ir a phpMyAdmin
2. Editar tabla `ingredients`
3. Actualizar campo `seccion` manualmente
4. O crear interfaz admin para editarlas

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "Unknown column 'seccion'"
→ No ejecutaste el script SQL `add_ingredient_sections.sql`
→ Ejecutalo en phpMyAdmin

### Las secciones no se muestran
→ Verifica que los ingredientes tienen valor en campo `seccion`
→ Usa console.log para debugear:
```javascript
console.log('Ingredientes:', recipe.ingredients)
```

### Todos aparecen en "Sin Sección"
→ El campo `seccion` está vacío (`''`) o NULL
→ Asegúrate de escribir el nombre de la sección al crear ingrediente

---

## 📝 RESUMEN DE ARCHIVOS A MODIFICAR

1. ✅ **Base de datos**: Ejecutar `database/add_ingredient_sections.sql`
2. ✅ **CreateRecipe.jsx**: Actualizar estado y formulario de ingredientes
3. ✅ **RecipeDetail.jsx**: Actualizar visualización con agrupación
4. ✅ **PrintRecipe.jsx**: Actualizar versión imprimible

---

## 🎉 ¡LISTO!

Con estos cambios podrás crear recetas con ingredientes organizados en secciones, como las recetas profesionales.

**Próximo paso**: Ejecutar el SQL y probar creando una receta con secciones.
