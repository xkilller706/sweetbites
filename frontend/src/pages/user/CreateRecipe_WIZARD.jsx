import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
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
import recipeService from '@services/recipeService'
import categoryService from '@services/categoryService'
import Input from '@components/common/Input'
import Textarea from '@components/common/Textarea'
import Button from '@components/common/Button'
import Badge from '@components/common/Badge'
import { toast } from 'react-hot-toast'
import { cn } from '@utils/cn'
import BackButton from '@components/common/BackButton'

const recipeSchema = z.object({
  nombre: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  categoria_id: z.string().min(1, 'Selecciona una categoría'),
  dificultad: z.enum(['Fácil', 'Intermedio', 'Difícil']),
  tiempo_preparacion: z.number().min(1, 'El tiempo debe ser mayor a 0'),
  porciones: z.number().min(1, 'Las porciones deben ser mayor a 0'),
  foto_principal: z.string().optional(),
  ingredients: z.array(z.object({
    nombre: z.string().min(1, 'El nombre es requerido'),
    cantidad: z.string().min(1, 'La cantidad es requerida'),
    unidad: z.string().min(1, 'La unidad es requerida'),
  })).min(1, 'Agrega al menos un ingrediente'),
  steps: z.array(z.object({
    descripcion: z.string().min(5, 'El paso debe tener al menos 5 caracteres'),
  })).min(1, 'Agrega al menos un paso'),
})

const WIZARD_EOF
echo "Creando parte 2..."
cat >> "C:\Users\Luis Serna\Desktop\appnueva\frontend\src\pages\user\CreateRecipe_WIZARD.jsx" << 'WIZARD_EOF2'

const steps = ['Información', 'Ingredientes', 'Preparación', 'Revisar']

const difficulties = [
  { value: 'Fácil', label: 'Fácil', color: 'bg-green-100 text-green-700' },
  { value: 'Intermedio', label: 'Intermedio', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'Difícil', label: 'Difícil', color: 'bg-orange-100 text-orange-700' },
]

const CreateRecipe = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState([])

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      categoria_id: '',
      dificultad: 'Fácil',
      tiempo_preparacion: 30,
      porciones: 8,
      foto_principal: '',
      ingredients: [{ nombre: '', cantidad: '', unidad: 'g' }],
      steps: [{ descripcion: '' }],
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

WIZARD_EOF2
