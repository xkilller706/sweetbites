import { useRef, useState } from 'react'
import { useAuth } from '@context/AuthContext'
import Button from '@components/common/Button'
import UpgradePremiumModal from '@components/modals/UpgradePremiumModal'
import { Printer, Download } from 'lucide-react'
import { UPLOAD_URL } from '@utils/constants'
import toast from 'react-hot-toast'

const PrintRecipe = ({ recipe }) => {
  const printRef = useRef()
  const { user } = useAuth()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handlePrint = () => {
    if (user?.plan !== 'premium') {
      toast.error('Imprimir recetas es exclusivo de Premium')
      setShowUpgradeModal(true)
      return
    }
    window.print()
  }

  const handleExportPDF = () => {
    if (user?.plan !== 'premium') {
      toast.error('Descargar PDF es exclusivo de Premium')
      setShowUpgradeModal(true)
      return
    }
    // Usar window.print() con configuración de PDF
    // El usuario puede seleccionar "Guardar como PDF" en el diálogo de impresión
    window.print()
  }

  if (!recipe) return null

  return (
    <div>
      {/* Botones de acción (solo visibles en pantalla, no en impresión) */}
      <div className="print:hidden flex gap-3 mb-6">
        <Button onClick={handlePrint} variant="primary">
          <Printer className="w-4 h-4 mr-2" />
          Imprimir Receta
        </Button>
        <Button onClick={handleExportPDF} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar como PDF
        </Button>
      </div>

      {/* Contenido optimizado para impresión */}
      <div ref={printRef} className="print-content">
        {/* Estilos específicos para impresión */}
        <style jsx global>{`
          @media print {
            /* Ocultar elementos no necesarios */
            header, nav, footer, .no-print, button {
              display: none !important;
            }

            /* Ajustar página */
            @page {
              margin: 1.5cm;
              size: A4;
            }

            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            /* Evitar saltos de página en elementos */
            .print-content {
              page-break-inside: avoid;
            }

            .print-content h1, .print-content h2, .print-content h3 {
              page-break-after: avoid;
            }

            .print-content img {
              max-width: 100%;
              page-break-inside: avoid;
            }

            /* Ingredientes y pasos en columnas */
            .print-ingredients, .print-steps {
              break-inside: avoid;
            }
          }

          @media screen {
            .print-only {
              display: none;
            }
          }
        `}</style>

        {/* Encabezado */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-heading text-primary mb-2">{recipe.nombre}</h1>
            {recipe.categoria && (
              <p className="text-lg text-neutral-gray-600">{recipe.categoria}</p>
            )}
          </div>

          {/* Información básica */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-neutral-gray-50 rounded-lg print:bg-gray-100">
            <div className="text-center">
              <p className="text-sm text-neutral-gray-500 mb-1">Dificultad</p>
              <p className="font-semibold text-neutral-gray-800">{recipe.dificultad}</p>
            </div>
            <div className="text-center border-x border-neutral-gray-200 print:border-gray-300">
              <p className="text-sm text-neutral-gray-500 mb-1">Tiempo</p>
              <p className="font-semibold text-neutral-gray-800">{recipe.tiempo_preparacion} min</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-gray-500 mb-1">Porciones</p>
              <p className="font-semibold text-neutral-gray-800">{recipe.porciones}</p>
            </div>
          </div>

          {/* Descripción */}
          {recipe.descripcion && (
            <div className="mb-6">
              <p className="text-neutral-gray-700 leading-relaxed">{recipe.descripcion}</p>
            </div>
          )}

          {/* Imagen */}
          {recipe.foto_principal && (
            <div className="mb-6 print:mb-8">
              <img
                src={recipe.foto_principal.startsWith('http') ? recipe.foto_principal : `${UPLOAD_URL}${recipe.foto_principal.replace('/uploads', '')}`}
                alt={recipe.nombre}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-md print:max-w-full"
              />
            </div>
          )}
        </div>

        {/* Ingredientes */}
        <div className="mb-8 print-ingredients">
          <h2 className="text-2xl font-heading text-primary mb-4 pb-2 border-b-2 border-primary">
            📋 Ingredientes
          </h2>
          <div className="bg-neutral-gray-50 rounded-lg p-6 print:bg-white print:border print:border-gray-300">
            {/* Agrupar por sección */}
            {Object.entries(
              (recipe.ingredients || []).reduce((acc, ing) => {
                const section = ing.seccion || 'Ingredientes'
                if (!acc[section]) acc[section] = []
                acc[section].push(ing)
                return acc
              }, {})
            ).map(([sectionName, sectionIngredients]) => (
              <div key={sectionName} className="mb-6 last:mb-0">
                {/* Título de sección */}
                {sectionName && sectionName !== 'null' && sectionName !== 'Ingredientes' && (
                  <h3 className="text-base font-bold text-neutral-gray-800 mb-3 mt-4 first:mt-0">
                    🔸 {sectionName}
                  </h3>
                )}

                {/* Lista */}
                <ul className="space-y-2">
                  {sectionIngredients.map((ing, index) => (
                    <li key={index} className="flex items-start ml-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0 print:bg-gray-600"></span>
                      <span className="text-neutral-gray-800">
                        <strong>{ing.cantidad} {ing.unidad}</strong> de {ing.nombre}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pasos de preparación */}
        <div className="mb-8 print-steps">
          <h2 className="text-2xl font-heading text-primary mb-4 pb-2 border-b-2 border-primary">
            👨‍🍳 Preparación
          </h2>
          <div className="space-y-6">
            {recipe.steps?.map((step, index) => (
              <div key={index} className="flex gap-4 print:break-inside-avoid">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-lg flex items-center justify-center print:bg-gray-600">
                    {step.numero_paso}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-neutral-gray-800 leading-relaxed">{step.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie de página solo para impresión */}
        <div className="print-only mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          <p> Receta de SweetBites - {new Date().toLocaleDateString('es-ES')}</p>
          {recipe.autor && (
            <p className="mt-1">Creada por: {recipe.autor}</p>
          )}
        </div>
      </div>

      {/* Modal de Upgrade Premium */}
      <UpgradePremiumModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  )
}

export default PrintRecipe
