import { motion } from 'framer-motion'
import { Mail, MapPin, Globe, Users } from 'lucide-react'

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      value: 'contacto@sweetbites.com',
      link: 'mailto:contacto@sweetbites.com',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Ubicación',
      value: 'SENA - Colombia',
      link: null,
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Sitio Web',
      value: 'sweetbites.com',
      link: 'https://sweetbites.com',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Redes Sociales',
      value: '@SweetBites',
      link: null,
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
              Contáctanos
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              ¿Tienes preguntas, sugerencias o simplemente quieres saludarnos?
              Nos encantaría escucharte
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-neutral-gray-800 md:text-4xl">
                Información de Contacto
              </h2>
              <p className="text-lg text-neutral-gray-600">
                Aquí puedes encontrar diferentes formas de comunicarte con nosotros
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-neutral-gray-200 bg-neutral-beige p-6"
                >
                  <div className="mb-3 flex items-center gap-3 text-primary">
                    {info.icon}
                    <h3 className="text-lg font-semibold text-neutral-gray-800">
                      {info.title}
                    </h3>
                  </div>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-neutral-gray-600 hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-neutral-gray-600">{info.value}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-neutral-beige py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-neutral-gray-800 md:text-4xl">
                Preguntas Frecuentes
              </h2>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-neutral-gray-200 bg-white p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-neutral-gray-800">
                  ¿Cómo puedo publicar mis recetas?
                </h3>
                <p className="text-neutral-gray-600">
                  Regístrate en la plataforma, luego ve al menú de usuario y selecciona "Crear Receta".
                  Todas las recetas pasan por un proceso de moderación antes de ser publicadas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-neutral-gray-200 bg-white p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-neutral-gray-800">
                  ¿Puedo guardar mis recetas favoritas?
                </h3>
                <p className="text-neutral-gray-600">
                  Sí, los usuarios registrados pueden marcar recetas como favoritas y organizarlas
                  en colecciones personalizadas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-neutral-gray-200 bg-white p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-neutral-gray-800">
                  ¿Es gratuito usar SweetBites?
                </h3>
                <p className="text-neutral-gray-600">
                  Sí, SweetBites es completamente gratuito. Puedes registrarte, publicar recetas
                  y disfrutar de todas las funcionalidades sin costo alguno.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-center text-white md:p-12"
          >
            <span className="mb-4 inline-block text-6xl">👨‍🍳</span>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              ¿Listo para comenzar?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Únete a nuestra comunidad y comparte tus creaciones
            </p>
            <a
              href="/auth/register"
              className="inline-block rounded-full bg-white px-8 py-3 font-medium text-primary transition-all hover:bg-white/90 hover:shadow-lg"
            >
              Crear Cuenta Gratis
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
