import { motion } from 'framer-motion'
import { Users, Heart, Target, Award } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: 'Nuestra Pasión',
      description: 'Creemos que la repostería es una forma de arte que une a las personas y crea momentos especiales.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Comunidad',
      description: 'Conectamos a reposteros de todos los niveles para compartir conocimientos y experiencias.',
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Nuestra Misión',
      description: 'Hacer que la repostería sea accesible para todos, desde principiantes hasta profesionales.',
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: 'Calidad',
      description: 'Cada receta es cuidadosamente verificada para garantizar los mejores resultados.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-6 inline-block text-6xl"></span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Sobre SweetBites
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Una plataforma creada con amor para los amantes de la repostería
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-6 text-center text-3xl font-bold text-neutral-gray-800 md:text-4xl">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-lg text-neutral-gray-600">
              <p>
                SweetBites nació de la pasión por la repostería y el deseo de crear una comunidad donde
                los amantes de los postres pudieran compartir sus creaciones favoritas.
              </p>
              <p>
                Como proyecto del SENA 2026, hemos desarrollado esta plataforma utilizando las tecnologías
                más modernas: React, Node.js y MySQL, para ofrecer una experiencia fluida y agradable.
              </p>
              <p>
                Nuestra meta es que cada persona, sin importar su nivel de experiencia, pueda encontrar
                inspiración, aprender nuevas técnicas y compartir sus propias recetas con la comunidad.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-neutral-beige py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-gray-800 md:text-4xl">
              Lo que nos Define
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-neutral-gray-200 bg-white p-6 text-center"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-neutral-gray-800">
                  {feature.title}
                </h3>
                <p className="text-neutral-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-neutral-gray-800 md:text-4xl">
              Tecnología
            </h2>
            <p className="mb-8 text-lg text-neutral-gray-600">
              Desarrollado con las mejores herramientas modernas
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['React 19', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS', 'Vite'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
