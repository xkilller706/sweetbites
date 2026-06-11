'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
  email: z.string().email('Ingresa un email valido'),
  password: z.string().min(8, 'La contrasena debe tener al menos 8 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    setError(null)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock login success
    setIsLoading(false)
    router.push('/recetas')
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center justify-center gap-2">
            <span className="text-4xl">🍰</span>
            <span className="text-2xl font-bold text-foreground">SweetBites</span>
          </Link>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-2xl font-bold text-foreground">Bienvenido de vuelta</h1>
              <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electronico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contrasena</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-border" />
                  <span className="text-sm text-muted-foreground">Recordarme</span>
                </label>
                <Link href="/recuperar" className="text-sm text-primary hover:underline">
                  Olvidaste tu contrasena?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesion...
                  </>
                ) : (
                  'Iniciar Sesion'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                No tienes una cuenta?{' '}
                <Link href="/registro" className="font-medium text-primary hover:underline">
                  Registrate
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Image/Illustration */}
      <div className="hidden flex-1 bg-gradient-to-br from-primary via-primary/90 to-secondary lg:flex">
        <div className="flex flex-1 flex-col items-center justify-center p-12 text-white">
          {/* Floating Emojis */}
          <div className="relative mb-8">
            <span className="animate-float text-8xl">🧁</span>
            <span className="animate-float-delayed absolute -left-16 top-0 text-6xl">🍪</span>
            <span className="animate-float-delayed-2 absolute -right-16 top-0 text-6xl">🍫</span>
          </div>
          <h2 className="mb-4 text-center text-3xl font-bold">
            La comunidad de reposteria mas dulce
          </h2>
          <p className="max-w-md text-center text-lg text-white/80">
            Miles de recetas esperan por ti. Descubre, comparte y guarda tus favoritas.
          </p>
        </div>
      </div>
    </div>
  )
}
