import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import recipeService from '@services/recipeService'
import categoryService from '@services/categoryService'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Card from '@components/common/Card'
import Spinner from '@components/common/Spinner'
import toast from 'react-hot-toast'
import BackButton from '@components/common/BackButton'

const EditRecipe = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  useEffect(() => {
    loadRecipe()
    loadCategories()
  }, [id])

  const loadRecipe = async () => {
    try {
      const response = await recipeService.getById(id)
      if (response.success) {
        const data = response.recipe
        setRecipe(data)

        // Llenar formulario
        setValue('nombre', data.nombre)
        setValue('descripcion', data.descripcion)
        setValue('categoria_id', data.categoria_id)
        setValue('dificultad', data.dificultad)
        setValue('tiempo_preparacion', data.tiempo_preparacion)
        setValue('porciones', data.porciones)

        setIngredients(data.ingredients || [])
        setSteps(data.steps || [])
      } else {
        toast.error('Receta no encontrada')
        navigate('/user/my-recipes')
      }
    } catch (error) {
      toast.error('Error al cargar receta')
      navigate('/user/my-recipes')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll()
      if (response.success) {
        setCategories(response.categories)
      }
    } catch (error) {
      console.error('Error al cargar categorías')
    }
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { nombre: '', cantidad: '', unidad: 'gramos' }])
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

  const onSubmit = async (data) => {
    // Validaciones
    if (ingredients.some(ing => !ing.nombre || !ing.cantidad)) {
      toast.error('Completa todos los ingredientes')
      return
    }

    if (steps.some(s => !s.descripcion)) {
      toast.error('Completa todos los pasos')
      return
    }

    setSaving(true)
    try {
      const recipeData = {
        ...data,
        ingredients,
        steps,
      }

      const response = await recipeService.update(id, recipeData)

      if (response.success) {
        toast.success('Receta actualizada exitosamente')
        navigate('/user/my-recipes')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar receta')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner fullScreen />

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <BackButton />
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-heading text-stone-800 mb-2">Editar Receta</h1>
            <p className="text-stone-600">Modifica la información de tu receta</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">Información Básica</h2>

              <div className="space-y-4">
                <Input
                  label="Nombre de la receta"
                  error={errors.nombre?.message}
                  {...register('nombre', { required: 'El nombre es obligatorio' })}
                />

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    className="input resize-none"
                    rows={3}
                    {...register('descripcion', { required: 'La descripción es obligatoria' })}
                  />
                  {errors.descripcion && (
                    <p className="mt-2 text-sm text-error">{errors.descripcion.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Categoría
                    </label>
                    <select className="input" {...register('categoria_id', { required: true })}>
                      <option value="">Seleccionar</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Dificultad
                    </label>
                    <select className="input" {...register('dificultad')}>
                      <option value="Fácil">Fácil</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Difícil">Difícil</option>
                    </select>
                  </div>

                  <Input
                    label="Tiempo (minutos)"
                    type="number"
                    {...register('tiempo_preparacion', { required: true })}
                  />
                </div>

                <Input
                  label="Porciones"
                  type="number"
                  {...register('porciones', { required: true })}
                />
              </div>
            </Card>

            {/* Ingredientes */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-stone-800">Ingredientes</h2>
                <Button type="button" onClick={addIngredient} size="sm">+ Agregar</Button>
              </div>

              <div className="space-y-3">
                {ingredients.map((ing, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <input
                      className="input flex-1"
                      placeholder="Nombre"
                      value={ing.nombre}
                      onChange={(e) => updateIngredient(index, 'nombre', e.target.value)}
                    />
                    <input
                      className="input w-24"
                      placeholder="Cantidad"
                      value={ing.cantidad}
                      onChange={(e) => updateIngredient(index, 'cantidad', e.target.value)}
                    />
                    <select
                      className="input w-32"
                      value={ing.unidad}
                      onChange={(e) => updateIngredient(index, 'unidad', e.target.value)}
                    >
                      <option value="gramos">gramos</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="tazas">tazas</option>
                      <option value="unidades">unidades</option>
                    </select>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeIngredient(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pasos */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-stone-800">Pasos de Preparación</h2>
                <Button type="button" onClick={addStep} size="sm">+ Agregar Paso</Button>
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <textarea
                      className="input flex-1 resize-none"
                      rows={2}
                      placeholder={`Paso ${index + 1}`}
                      value={step.descripcion}
                      onChange={(e) => updateStep(index, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeStep(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Botones */}
            <div className="flex gap-4">
              <Button type="submit" variant="primary" loading={saving} className="flex-1">
                Guardar Cambios
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/user/my-recipes')}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditRecipe
