/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: '#FDFBF7', // Off-white, ciepła złamana biel
          card: '#FFFFFF',
        },
        brand: {
          green: '#1A362D', // Deep forest green
          'green-light': '#2A5245',
          wood: '#8B5A2B', // Warm wood
          'wood-light': '#A67345',
          graphite: '#2D2D2D', // Dark graphite
          brown: 'var(--color-brand-brown)',
          'brown-dark': 'var(--color-brand-brown-dark)',
        },
        accent: {
          gold: '#C4A47C', // Luksusowy złoty/mosiężny akcent
        },
        foreground: {
          heading: '#1A362D',
          body: '#4A4A4A',
          muted: '#737373',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Montserrat"', 'sans-serif'],
        ui: ['"Montserrat"', 'sans-serif'],
        hane: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.25rem',
        'lg': '0.5rem',
        'pill': '9999px',
      },
      transitionTimingFunction: {
        'app': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.03)',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '8': '8px',
      }
    },
  },
  plugins: [],
};
