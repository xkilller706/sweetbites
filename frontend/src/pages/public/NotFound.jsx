import { Link } from 'react-router-dom'
import Button from '@components/common/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Mesh Gradient Background - Azul esquina superior derecha */}
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/20 opacity-40 blur-[100px]" />

      {/* Mesh Gradient Background - Beige esquina inferior izquierda */}
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#F5E6D3] opacity-30 blur-[100px]" />

      {/* Contenido con Glassmorphism */}
      <div className="text-center bg-white/60 backdrop-blur-md rounded-3xl p-12 border border-white/40 shadow-glass max-w-2xl mx-auto">
        <h1 className="text-9xl font-light text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-primary mb-4">
          404
        </h1>
        <h2 className="text-4xl font-heading font-semibold text-stone-800 mb-4">
          Página no encontrada
        </h2>
        <p className="text-lg text-stone-600 mb-8 max-w-md mx-auto font-light leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/">
            <Button variant="primary" size="lg">
              Ir al Inicio
            </Button>
          </Link>
          <Link to="/recipes">
            <Button variant="outline" size="lg">
              Ver Recetas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
