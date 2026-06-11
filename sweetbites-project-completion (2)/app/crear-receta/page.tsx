'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  Users,
  ChefHat,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { categories, mockUsers } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const currentUser = mockUsers[0]

const recipeSchema = z.object({
  title: z.string().min(3, 'El titulo debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripcion debe tener al menos 10 caracteres'),
  categoryId: z.string().min(1, 'Selecciona una categoria'),
  difficulty: z.enum(['facil', 'intermedio', 'dificil']),
  time: z.number().min(1, 'El tiempo debe ser mayor a 0'),
  servings: z.number().min(1, 'Las porciones deben ser mayor a 0'),
  ingredients: z.array(z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    quantity: z.number().min(0.1, 'La cantidad debe ser mayor a 0'),
    unit: z.string().min(1, 'La unidad es requerida'),
  })).min(1, 'Agrega al menos un ingrediente'),
  steps: z.array(z.object({
    description: z.string().min(5, 'El paso debe tener al menos 5 caracteres'),
  })).min(1, 'Agrega al menos un paso'),
})

type RecipeForm = z.infer<typeof recipeSchema>

const steps = ['Informacion', 'Ingredientes', 'Preparacion', 'Revisar']

const difficulties = [
  { value: 'facil', label: 'Facil', color: 'bg-green-100 text-green-700' },
  { value: 'intermedio', label: 'Intermedio', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'dificil', label: 'Dificil', color: 'bg-orange-100 text-orange-700' },
]

export default function CreateRecipePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RecipeForm>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      difficulty: 'facil',
      time: 30,
      servings: 8,
      ingredients: [{ name: '', quantity: 0, unit: 'g' }],
      steps: [{ description: '' }],
    },
  })

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  })

  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
    control,
    name: 'steps',
  })

  const watchedValues = watch()

  const validateStep = async () => {
    switch (currentStep) {
      case 0:
        return await trigger(['title', 'description', 'categoryId', 'difficulty', 'time', 'servings'])
      case 1:
        return await trigger('ingredients')
      case 2:
        return await trigger('steps')
      default:
        return true
    }
  }

  const nextStep = async () => {
    const isValid = await validateStep()
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: RecipeForm) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    router.push('/mis-recetas?created=true')
  }

  const selectedCategory = categories.find(c => c.id === watchedValues.categoryId)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={currentUser} />
      
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Crear Receta</h1>
            <p className="text-muted-foreground">Comparte tu deliciosa creacion con la comunidad</p>
          </div>

          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                        index < currentStep
                          ? 'bg-primary text-primary-foreground'
                          : index === currentStep
                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                    </div>
                    <span className={cn(
                      'mt-2 text-xs font-medium',
                      index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'mx-2 h-1 w-12 rounded-full sm:w-24',
                        index < currentStep ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              {/* Step 1: Basic Info */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">Informacion Basica</h2>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Nombre de la receta *</Label>
                    <Input
                      id="title"
                      placeholder="Ej: Brownie de Chocolate"
                      {...register('title')}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripcion *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe tu receta..."
                      rows={3}
                      {...register('description')}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Categoria *</Label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <label key={cat.id} className="cursor-pointer">
                            <input
                              type="radio"
                              value={cat.id}
                              {...register('categoryId')}
                              className="peer sr-only"
                            />
                            <span
                              className={cn(
                                'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2',
                                watchedValues.categoryId === cat.id
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              )}
                            >
                              <span>{cat.icon}</span>
                              {cat.name}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.categoryId && (
                        <p className="text-sm text-destructive">{errors.categoryId.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Dificultad *</Label>
                      <div className="flex flex-wrap gap-2">
                        {difficulties.map((diff) => (
                          <label key={diff.value} className="cursor-pointer">
                            <input
                              type="radio"
                              value={diff.value}
                              {...register('difficulty')}
                              className="peer sr-only"
                            />
                            <span
                              className={cn(
                                'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2',
                                diff.color
                              )}
                            >
                              <ChefHat className="h-3 w-3" />
                              {diff.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="time">Tiempo (minutos) *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="time"
                          type="number"
                          min={1}
                          className="pl-10"
                          {...register('time', { valueAsNumber: true })}
                        />
                      </div>
                      {errors.time && (
                        <p className="text-sm text-destructive">{errors.time.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="servings">Porciones *</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="servings"
                          type="number"
                          min={1}
                          className="pl-10"
                          {...register('servings', { valueAsNumber: true })}
                        />
                      </div>
                      {errors.servings && (
                        <p className="text-sm text-destructive">{errors.servings.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Ingredients */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">Ingredientes</h2>
                    <p className="text-sm text-muted-foreground">
                      Agrega todos los ingredientes necesarios para tu receta
                    </p>
                  </div>

                  <div className="space-y-4">
                    {ingredientFields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-3">
                        <div className="grid flex-1 gap-3 sm:grid-cols-3">
                          <Input
                            placeholder="Ingrediente"
                            {...register(`ingredients.${index}.name`)}
                          />
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="Cantidad"
                            {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
                          />
                          <Input
                            placeholder="Unidad (g, ml, unidades)"
                            {...register(`ingredients.${index}.unit`)}
                          />
                        </div>
                        {ingredientFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeIngredient(index)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {errors.ingredients && (
                      <p className="text-sm text-destructive">
                        {errors.ingredients.message || 'Completa todos los ingredientes'}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendIngredient({ name: '', quantity: 0, unit: 'g' })}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Ingrediente
                  </Button>
                </motion.div>
              )}

              {/* Step 3: Steps */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">Preparacion</h2>
                    <p className="text-sm text-muted-foreground">
                      Describe los pasos para preparar tu receta
                    </p>
                  </div>

                  <div className="space-y-4">
                    {stepFields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <Textarea
                          placeholder={`Paso ${index + 1}...`}
                          rows={2}
                          className="flex-1"
                          {...register(`steps.${index}.description`)}
                        />
                        {stepFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStep(index)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {errors.steps && (
                      <p className="text-sm text-destructive">
                        {errors.steps.message || 'Completa todos los pasos'}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendStep({ description: '' })}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Paso
                  </Button>
                </motion.div>
              )}

              {/* Step 4: Preview */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">Revision Final</h2>
                    <p className="text-sm text-muted-foreground">
                      Revisa tu receta antes de enviarla
                    </p>
                  </div>

                  {/* Preview Card */}
                  <div className="space-y-4 rounded-xl bg-muted/50 p-4">
                    <div className="flex items-start gap-2">
                      <Check className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">{watchedValues.title || 'Sin titulo'}</h3>
                        <p className="text-sm text-muted-foreground">{watchedValues.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedCategory && (
                        <Badge
                          style={{ backgroundColor: `${selectedCategory.color}20`, color: selectedCategory.color }}
                        >
                          {selectedCategory.icon} {selectedCategory.name}
                        </Badge>
                      )}
                      <Badge className={difficulties.find(d => d.value === watchedValues.difficulty)?.color}>
                        <ChefHat className="mr-1 h-3 w-3" />
                        {difficulties.find(d => d.value === watchedValues.difficulty)?.label}
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        {watchedValues.time} min
                      </Badge>
                      <Badge variant="outline">
                        <Users className="mr-1 h-3 w-3" />
                        {watchedValues.servings} porciones
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-xl bg-muted/50 p-4">
                    <div className="flex items-start gap-2">
                      <Check className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">
                          Ingredientes ({watchedValues.ingredients.filter(i => i.name).length})
                        </h3>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          {watchedValues.ingredients.filter(i => i.name).map((ing, index) => (
                            <li key={index}>
                              {ing.quantity} {ing.unit} de {ing.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-xl bg-muted/50 p-4">
                    <div className="flex items-start gap-2">
                      <Check className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">
                          Preparacion ({watchedValues.steps.filter(s => s.description).length} pasos)
                        </h3>
                        <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                          {watchedValues.steps.filter(s => s.description).map((step, index) => (
                            <li key={index} className="flex gap-2">
                              <span className="font-medium">{index + 1}.</span>
                              {step.description}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Info Alert */}
                  <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-blue-800">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">Tu receta sera enviada a revision</p>
                      <p className="mt-1 text-blue-700">
                        Un administrador revisara tu receta antes de publicarla. Te notificaremos cuando este disponible.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep} className="bg-primary text-primary-foreground">
                    Siguiente
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="bg-primary text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Receta'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
