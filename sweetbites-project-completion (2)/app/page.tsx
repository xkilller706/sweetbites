'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Sparkles, BookOpen, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { RecipeCard } from '@/components/recipes/recipe-card'
import { CategoryCard } from '@/components/recipes/category-card'
import { categories, mockRecipes } from '@/lib/mock-data'

const features = [
  {
    icon: '📖',
    title: 'Instrucciones Paso a Paso',
    description: 'Cada receta con ingredientes precisos y pasos numerados faciles de seguir.',
  },
  {
    icon: '⭐',
    title: 'Valoraciones Reales',
    description: 'Descubre que opinan otros reposteros sobre cada receta.',
  },
  {
    icon: '❤️',
    title: 'Colecciones Personalizadas',
    description: 'Organiza tus recetas favoritas en colecciones propias.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-24 lg:py-32">
          {/* Floating Emojis */}
          <div className="absolute inset-0 overflow-hidden">
            <span className="animate-float absolute left-[10%] top-[20%] text-6xl opacity-30 lg:text-8xl">🍰</span>
            <span className="animate-float-delayed absolute right-[15%] top-[30%] text-5xl opacity-30 lg:text-7xl">🎂</span>
            <span className="animate-float-delayed-2 absolute bottom-[20%] left-[20%] text-5xl opacity-30 lg:text-7xl">🍪</span>
            <span className="animate-float absolute bottom-[30%] right-[10%] text-6xl opacity-30 lg:text-8xl">🍫</span>
          </div>

          <div className="container relative mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl text-balance">
                Comparte tus Mejores Recetas de Reposteria
              </h1>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                Unete a la comunidad de reposteros mas dulce. Descubre, guarda y comparte recetas deliciosas.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/recetas">
                  <Button size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                    <Search className="h-5 w-5" />
                    Explorar Recetas
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-2 border-white text-white hover:bg-white/10"
                  >
                    <Sparkles className="h-5 w-5" />
                    Crear Cuenta
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Por que <span className="text-primary">SweetBites</span>?
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Todo lo que necesitas para convertirte en un experto repostero
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <span className="mb-4 inline-block text-5xl">{feature.icon}</span>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Explora por Categoria
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Encuentra la receta perfecta para cada ocasion
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              {categories.map((category) => (
                <motion.div key={category.id} variants={itemVariants}>
                  <CategoryCard category={category} size="lg" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Recipes Section */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 flex items-center justify-between"
            >
              <div>
                <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                  Recetas Destacadas
                </h2>
                <p className="text-muted-foreground">
                  Las favoritas de nuestra comunidad
                </p>
              </div>
              <Link href="/recetas">
                <Button variant="outline" className="hidden sm:flex">
                  Ver todas
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {mockRecipes.slice(0, 6).map((recipe) => (
                <motion.div key={recipe.id} variants={itemVariants}>
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/recetas">
                <Button variant="outline">Ver todas las recetas</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <span className="mb-4 inline-block text-6xl">👨‍🍳</span>
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Listo para compartir tu receta?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Unete a cientos de reposteros que ya comparten sus creaciones con la comunidad
              </p>
              <Link href="/registro">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Sparkles className="h-5 w-5" />
                  Crear Cuenta Gratis
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
