import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Plans = () => {
  const navigate = useNavigate();
  const { user, upgradeToPremium } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [processing, setProcessing] = useState(false);

  const plans = [
    {
      id: 'gratis',
      nombre: 'Plan Gratis',
      precio: '$0',
      periodo: 'para siempre',
      color: 'from-gray-600 to-gray-800',
      badge: 'Básico',
      caracteristicas: [
        { texto: 'Ver recetas ilimitadas', disponible: true },
        { texto: 'Crear hasta 5 recetas', disponible: true },
        { texto: 'Guardar hasta 3 favoritos', disponible: true },
        { texto: 'Comentar en recetas', disponible: true },
        { texto: 'Modo cocina interactivo', disponible: false },
        { texto: 'Descargar recetas en PDF', disponible: false },
        { texto: 'Sin publicidad', disponible: false },
        { texto: 'Badge premium', disponible: false },
      ],
    },
    {
      id: 'premium',
      nombre: 'Plan Premium',
      precio: '$9.99',
      periodo: 'al mes',
      color: 'from-amber-400 via-yellow-500 to-amber-600',
      badge: 'Popular',
      caracteristicas: [
        { texto: 'Ver recetas ilimitadas', disponible: true },
        { texto: 'Crear recetas ilimitadas', disponible: true },
        { texto: 'Favoritos ilimitados', disponible: true },
        { texto: 'Comentar en recetas', disponible: true },
        { texto: 'Modo cocina interactivo', disponible: true },
        { texto: 'Descargar recetas en PDF', disponible: true },
        { texto: 'Sin publicidad', disponible: true },
        { texto: 'Badge premium dorado', disponible: true },
      ],
    },
  ];

  const handleSelectPlan = (plan) => {
    if (!user) {
      navigate('/register');
      return;
    }

    if (plan.id === 'gratis') {
      navigate('/');
      return;
    }

    if (user.plan === 'premium') {
      alert('Ya tienes el plan Premium activo');
      return;
    }

    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simular procesamiento de pago (2 segundos)
    setTimeout(async () => {
      try {
        await upgradeToPremium();
        setProcessing(false);
        setShowPaymentModal(false);
        alert('¡Pago exitoso! Ahora eres usuario Premium');
        navigate('/');
      } catch (error) {
        setProcessing(false);
        alert('Error al procesar el pago');
      }
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Elige tu Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre todas las funcionalidades de SweetBites con nuestro plan Premium
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                plan.id === 'premium' ? 'border-4 border-amber-400' : 'border border-gray-200'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`absolute top-4 right-4 px-4 py-1 rounded-full text-white text-sm font-bold ${
                    plan.id === 'premium' ? 'bg-amber-500' : 'bg-gray-500'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* Header con gradiente */}
              <div className={`bg-gradient-to-r ${plan.color} text-white p-8`}>
                <h2 className="text-3xl font-bold mb-2">{plan.nombre}</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold">{plan.precio}</span>
                  <span className="text-xl opacity-90">{plan.periodo}</span>
                </div>
              </div>

              {/* Características */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.caracteristicas.map((caracteristica, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {caracteristica.disponible ? (
                        <svg
                          className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      <span
                        className={
                          caracteristica.disponible ? 'text-gray-700' : 'text-gray-400'
                        }
                      >
                        {caracteristica.texto}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    plan.id === 'premium'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white hover:from-amber-500 hover:to-amber-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } ${user && user.plan === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={user && user.plan === plan.id}
                >
                  {user && user.plan === plan.id
                    ? 'Plan Actual'
                    : plan.id === 'premium'
                    ? 'Mejorar a Premium'
                    : 'Plan Gratis'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Garantía */}
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Esta es una demostración académica. No se procesarán pagos reales.
          </p>
        </div>
      </div>

      {/* Modal de Pago Falso */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Procesar Pago</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Advertencia de demo */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800 flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong>Demostración:</strong> Este es un formulario de ejemplo. No se realizarán cargos reales.
                </span>
              </p>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  value={paymentForm.cardNumber}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, cardNumber: formatCardNumber(e.target.value) })
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre en la Tarjeta
                </label>
                <input
                  type="text"
                  value={paymentForm.cardName}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, cardName: e.target.value.toUpperCase() })
                  }
                  placeholder="JUAN PEREZ"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vencimiento
                  </label>
                  <input
                    type="text"
                    value={paymentForm.expiryDate}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        expiryDate: formatExpiryDate(e.target.value),
                      })
                    }
                    placeholder="MM/AA"
                    maxLength="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    value={paymentForm.cvv}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        cvv: e.target.value.replace(/\D/g, '').slice(0, 3),
                      })
                    }
                    placeholder="123"
                    maxLength="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total a pagar:</span>
                  <span className="text-2xl font-bold text-gray-800">$9.99</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-amber-500 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Procesando pago...
                  </span>
                ) : (
                  'Pagar $9.99'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
