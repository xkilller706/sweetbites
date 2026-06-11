'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, Edit2, Save, X, BookOpen, Heart, MessageSquare } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { mockUsers } from '@/lib/mock-data'

// Mock current user - in a real app this would come from auth context
const currentUser = mockUsers[0]

const roleColors = {
  admin: 'bg-red-100 text-red-700',
  editor: 'bg-blue-100 text-blue-700',
  usuario: 'bg-primary/10 text-primary',
}

const roleLabels = {
  admin: 'Administrador',
  editor: 'Editor',
  usuario: 'Usuario',
}

const stats = [
  { label: 'Recetas', value: 12, icon: BookOpen },
  { label: 'Favoritos', value: 45, icon: Heart },
  { label: 'Comentarios', value: 28, icon: MessageSquare },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || '',
  })

  const handleSave = () => {
    // In a real app, this would call an API
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || '',
    })
    setIsEditing(false)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={currentUser} />
      
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>
            <p className="text-muted-foreground">Gestiona tu informacion personal</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Sidebar - Avatar & Stats */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                {/* Avatar */}
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-4xl font-bold text-white">
                  {getInitials(currentUser.name)}
                </div>

                <h2 className="mb-1 text-xl font-semibold text-foreground">{currentUser.name}</h2>
                <Badge className={roleColors[currentUser.role]}>
                  {roleLabels[currentUser.role]}
                </Badge>

                <div className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Miembro desde{' '}
                    {new Date(currentUser.createdAt).toLocaleDateString('es-ES', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Stats */}
                <div className="mt-6 border-t border-border pt-6">
                  <h3 className="mb-4 font-medium text-foreground">Estadisticas</h3>
                  <div className="space-y-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-2"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <stat.icon className="h-4 w-4" />
                          <span className="text-sm">{stat.label}</span>
                        </div>
                        <span className="font-semibold text-foreground">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content - Profile Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">Informacion Personal</h2>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    {isEditing ? (
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    ) : (
                      <p className="rounded-lg bg-muted/50 px-4 py-3 text-foreground">
                        {currentUser.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electronico</Label>
                    {isEditing ? (
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    ) : (
                      <p className="rounded-lg bg-muted/50 px-4 py-3 text-foreground">
                        {currentUser.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono</Label>
                    {isEditing ? (
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10"
                          placeholder="300 123 4567"
                        />
                      </div>
                    ) : (
                      <p className="rounded-lg bg-muted/50 px-4 py-3 text-foreground">
                        {currentUser.phone || 'No especificado'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Rol</Label>
                    <p className="rounded-lg bg-muted/50 px-4 py-3 text-foreground">
                      {roleLabels[currentUser.role]}
                    </p>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        <X className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
