/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PALETA DULCE Y MINIMALISTA - SweetBites
        primary: {
          DEFAULT: '#E5ADA8',    // Rosa pastel principal
          light: '#F0C5C1',      // Rosa más claro
          dark: '#D89590',       // Rosa más oscuro
        },
        secondary: {
          DEFAULT: '#E5E0D8',    // Beige claro
          light: '#F5F0E8',
          dark: '#D5D0C8',
        },
        accent: {
          caramel: '#D0A77B',    // Caramelo
          chocolate: '#725C3F',   // Chocolate oscuro
          cream: '#EFE8D8',      // Crema
          mint: '#D8D7B2',       // Verde menta suave
        },
        neutral: {
          beige: {
            50: '#F5F0E8',
            100: '#E5E0D8',
          },
          white: '#FFFFFF',
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        },
        success: '#10B981',      // Verde moderno
        warning: '#F59E0B',      // Ámbar
        error: '#EF4444',        // Rojo
        info: '#725C3F',         // Chocolate (reemplaza azul)
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'subtle': '0 8px 30px rgba(0, 0, 0, 0.02)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.04)',
        'premium': '0 20px 40px rgba(0, 0, 0, 0.03)',
      },
      backdropBlur: {
        'glass': '12px',
        'strong': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #E5ADA8 0%, #D0A77B 100%)',
        'gradient-hero': 'linear-gradient(135deg, #EFE8D8 0%, rgba(229, 173, 168, 0.1) 50%, #FFFFFF 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #FFFFFF 0%, #E5E0D8 100%)',
        'gradient-mesh': 'radial-gradient(circle at 50% 50%, rgba(229, 173, 168, 0.15) 0%, transparent 50%)',
        'gradient-chocolate': 'linear-gradient(90deg, #725C3F 0%, #D0A77B 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
