import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-gray-800 text-white py-12 mt-20">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-4xl"></span>
              <h3 className="text-2xl font-heading text-primary">SweetBites</h3>
            </div>
            <p className="text-neutral-gray-400 mb-4">
              La mejor plataforma de recetas de postres. Comparte, descubre y disfruta de deliciosas creaciones.
            </p>
            <p className="text-sm text-neutral-gray-500">
              Proyecto SENA 2026
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-lg font-heading mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-gray-400 hover:text-primary transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-neutral-gray-400 hover:text-primary transition">
                  Recetas
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="text-neutral-gray-400 hover:text-primary transition">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-neutral-gray-400 hover:text-primary transition">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h4 className="text-lg font-heading mb-4">Información</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-gray-400 hover:text-primary transition">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-gray-400 hover:text-primary transition">
                  Contacto
                </Link>
              </li>
              <li>
                <span className="text-neutral-gray-500 text-sm">
                  Node.js + React + MySQL
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-gray-700 mt-8 pt-8 text-center">
          <p className="text-neutral-gray-500 text-sm">
            © {currentYear} SweetBites. Hecho con amor y mucho azúcar.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
