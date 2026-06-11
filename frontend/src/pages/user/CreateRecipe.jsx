import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import recipeService from '@services/recipeService'
import categoryService from '@services/categoryService'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Card from '@components/common/Card'
import toast from 'react-hot-toast'

const CreateRecipe = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([{ nombre: '', cantidad: '', unidad: 'gramos', seccion: '' }])
  const [steps, setSteps] = useState([{ numero_paso: 1, descripcion: '' }])
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll()
      if (response.success) {
        setCategories(response.categories)
      }
    } catch (error) {
      toast.error('Error al cargar categorías')
    }
  }

  const addIngredient = (sectionName = '') => {
    setIngredients([...ingredients, { nombre: '', cantidad: '', unidad: 'gramos', seccion: sectionName }])
  }

  const addSection = () => {
    const sectionName = prompt('Nombre de la sección (ej: Para la Base, Para el Relleno):')
    if (sectionName && sectionName.trim()) {
      setIngredients([...ingredients, { nombre: '', cantidad: '', unidad: 'gramos', seccion: sectionName.trim() }])
      toast.success(`Sección "${sectionName}" agregada`)
    }
  }

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const updateIngredient = (index, field, value) => {
    const updated = [...ingredients]
    updated[index][field] = value
    setIngredients(updated)
  }

  const addStep = () => {
    setSteps([...steps, { numero_paso: steps.length + 1, descripcion: '' }])
  }

  const removeStep = (index) => {
    const updated = steps.filter((_, i) => i !== index)
    updated.forEach((s, i) => s.numero_paso = i + 1)
    setSteps(updated)
  }

  const updateStep = (index, value) => {
    const updated = [...steps]
    updated[index].descripcion = value
    setSteps(updated)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten imágenes')
      return
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe pesar menos de 5MB')
      return
    }

    setImageFile(file)

    // Crear preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    try {
      setUploadingImage(true)
      const formData = new FormData()
      formData.append('imagen', imageFile)

      const response = await recipeService.uploadImage(formData)

      if (response.success) {
        toast.success('Imagen subida correctamente')
        return response.imageUrl
      }
    } catch (error) {
      console.error('Error al subir imagen:', error)
      toast.error('Error al subir la imagen')
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const onSubmit = async (data) => {
    if (step < 4) {
      setStep(step + 1)
      return
    }

    // Validaciones finales
    if (ingredients.some(ing => !ing.nombre || !ing.cantidad)) {
      toast.error('Completa todos los ingredientes')
      setStep(2)
      return
    }

    if (steps.some(s => !s.descripcion)) {
      toast.error('Completa todos los pasos')
      setStep(3)
      return
    }

    setLoading(true)
    try {
      // Subir imagen primero (si hay)
      let imageUrl = null
      if (imageFile) {
        imageUrl = await uploadImage()
      }

      const recipeData = {
        ...data,
        categoria_id: parseInt(data.categoria_id),
        tiempo_preparacion: parseInt(data.tiempo_preparacion),
        porciones: parseInt(data.porciones),
        foto_principal: imageUrl, // Agregar URL de la imagen
        ingredients: ingredients.map(ing => ({
          ...ing,
          cantidad: parseFloat(ing.cantidad)
        })),
        steps: steps
      }

      const response = await recipeService.create(recipeData)
      if (response.success) {
        toast.success(response.message)
        navigate('/user/my-recipes')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear receta')
    } finally {
      setLoading(false)
    }
  }

  const formData = watch()

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-heading text-primary mb-2 text-center">Crear Nueva Receta</h1>
        <p className="text-neutral-gray-600 mb-8 text-center">
          Comparte tu receta con la comunidad
        </p>

        {/* Stepper */}
        <div className="flex justify-between mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                s === step ? 'bg-primary text-white' : s < step ? 'bg-success text-white' : 'bg-neutral-gray-300 text-neutral-gray-600'
              }`}>
                {s < step ? '✓' : s}
              </div>
              {s < 4 && <div className={`flex-1 h-1 ${s < step ? 'bg-success' : 'bg-neutral-gray-300'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Información Básica */}
          {step === 1 && (
            <Card>
              <h2 className="text-2xl font-heading mb-6">Paso 1: Información Básica</h2>
              <div className="space-y-4">
                <Input
                  label="Nombre de la Receta"
                  placeholder="Ej: Brownie de Chocolate"
                  error={errors.nombre?.message}
                  {...register('nombre', { required: 'El nombre es obligatorio' })}
                />

                <div>
                  <label className="block text-sm font-medium text-neutral-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    className="input min-h-[100px]"
                    placeholder="Describe tu receta..."
                    {...register('descripcion', { required: 'La descripción es obligatoria' })}
                  />
                  {errors.descripcion && <p className="mt-2 text-sm text-error">{errors.descripcion.message}</p>}
                </div>

                {/* Input de Imagen */}
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-700 mb-2">
                    Foto de la Receta (Opcional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="block w-full text-sm text-neutral-gray-600
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary/90
                      cursor-pointer"
                  />
                  <p className="mt-1 text-xs text-neutral-gray-500">
                    PNG, JPG, WEBP o GIF (máx. 5MB)
                  </p>

                  {/* Preview de la imagen */}
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-neutral-gray-700 mb-2">Vista previa:</p>
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-neutral-gray-200">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null)
                            setImagePreview(null)
                          }}
                          className="absolute top-2 right-2 bg-error text-white rounded-full p-2 hover:bg-error/90"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-gray-700 mb-2">Categoría</label>
                    <select className="input" {...register('categoria_id', { required: 'Selecciona una categoría' })}>
                      <option value="">Seleccionar...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.icono} {cat.nombre}</option>
                      ))}
                    </select>
                    {errors.categoria_id && <p className="mt-2 text-sm text-error">{errors.categoria_id.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-gray-700 mb-2">Dificultad</label>
                    <select className="input" {...register('dificultad', { required: 'Selecciona la dificultad' })}>
                      <option value="">Seleccionar...</option>
                      <option value="Fácil">Fácil</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Difícil">Difícil</option>
                    </select>
                    {errors.dificultad && <p className="mt-2 text-sm text-error">{errors.dificultad.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Tiempo de Preparación (minutos)"
                    type="number"
                    placeholder="45"
                    error={errors.tiempo_preparacion?.message}
                    {...register('tiempo_preparacion', {
                      required: 'El tiempo es obligatorio',
                      min: { value: 1, message: 'Mínimo 1 minuto' }
                    })}
                  />

                  <Input
                    label="Porciones"
                    type="number"
                    placeholder="8"
                    error={errors.porciones?.message}
                    {...register('porciones', {
                      required: 'Las porciones son obligatorias',
                      min: { value: 1, message: 'Mínimo 1 porción' }
                    })}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Ingredientes */}
          {step === 2 && (
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-heading">Paso 2: Ingredientes</h2>
                <Button type="button" variant="primary" onClick={addSection} size="sm">
                  + Nueva Sección
                </Button>
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
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-neutral-gray-500">
                          {sectionIngredients.length} ingrediente(s)
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addIngredient(sectionName === 'Sin Sección' ? '' : sectionName)}
                          title={`Agregar ingrediente a ${sectionName}`}
                        >
                          + Ingrediente
                        </Button>
                      </div>
                    </div>

                    {/* Lista de ingredientes de esta sección */}
                    <div className="space-y-3">
                      {sectionIngredients.map((ing) => {
                        const index = ing.originalIndex
                        return (
                          <div key={index} className="flex gap-3 items-start bg-white p-3 rounded-lg">
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                placeholder="Nombre del ingrediente"
                                value={ing.nombre}
                                onChange={(e) => updateIngredient(index, 'nombre', e.target.value)}
                                className="input"
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
                              <input
                                type="text"
                                placeholder="Sección (ej: Para la Base)"
                                value={ing.seccion || ''}
                                onChange={(e) => updateIngredient(index, 'seccion', e.target.value)}
                                className="input text-sm"
                                title="Puedes cambiar la sección escribiendo aquí"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeIngredient(index)}
                              className="text-error hover:text-error/80 p-2 flex-shrink-0"
                              title="Eliminar ingrediente"
                            >
                              <span className="text-xl">🗑️</span>
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

          {/* Step 3: Pasos */}
          {step === 3 && (
            <Card>
              <h2 className="text-2xl font-heading mb-6">Paso 3: Preparación</h2>
              <div className="space-y-4 mb-6">
                {steps.map((s, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {s.numero_paso}
                    </div>
                    <div className="flex-1">
                      <textarea
                        className="input min-h-[80px]"
                        placeholder={`Describe el paso ${s.numero_paso}...`}
                        value={s.descripcion}
                        onChange={(e) => updateStep(index, e.target.value)}
                      />
                    </div>
                    {steps.length > 1 && (
                      <Button type="button" variant="danger" size="sm" onClick={() => removeStep(index)}>
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={addStep}>
                + Agregar Paso
              </Button>
            </Card>
          )}

          {/* Step 4: Preview */}
          {step === 4 && (
            <Card>
              <h2 className="text-2xl font-heading mb-6">Paso 4: Revisión Final</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{formData.nombre}</h3>
                  <p className="text-neutral-gray-600 mb-4">{formData.descripcion}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge badge-primary">{categories.find(c => c.id == formData.categoria_id)?.nombre}</span>
                    <span className="badge badge-secondary">{formData.dificultad}</span>
                    <span className="badge badge-info">⏱️ {formData.tiempo_preparacion} min</span>
                    <span className="badge badge-warning">{formData.porciones} porciones</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Ingredientes ({ingredients.length})</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {ingredients.map((ing, i) => (
                      <li key={i}>{ing.cantidad} {ing.unidad} de {ing.nombre}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Preparación ({steps.length} pasos)</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {steps.map((s, i) => (
                      <li key={i}>{s.descripcion}</li>
                    ))}
                  </ol>
                </div>

                <div className="bg-info/10 border border-info/30 p-4 rounded-lg">
                  <p className="text-sm text-neutral-gray-700">
                    ℹ️ Tu receta será enviada a revisión y quedará pendiente hasta que un administrador la apruebe.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                ← Anterior
              </Button>
            )}
            <div className="ml-auto">
              {step < 4 ? (
                <Button type="submit" variant="primary">
                  Siguiente →
                </Button>
              ) : (
                <Button type="submit" variant="primary" loading={loading}>
                  Enviar Receta
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateRecipe
