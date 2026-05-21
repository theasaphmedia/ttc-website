import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'egyptian-blue': '#153093',
        'argentinian-blue': '#4ea8f9',
        'carrot-orange': '#f7931e',
        jade: '#22b573',
        'off-white': '#f8f9ff',
        dark: '#0d1117',
        'text-body': '#2d2d2d',
        'text-muted': '#6b7280',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'sans-serif'],
        accent: ['var(--font-mr-dafoe)', 'cursive'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #153093 0%, #0d1e5c 60%, #0d1117 100%)',
        'blue-gradient': 'linear-gradient(135deg, #153093 0%, #1a3db0 100%)',
        'orange-gradient': 'linear-gradient(135deg, #f7931e 0%, #f5a623 100%)',
        'brand-gradient': 'linear-gradient(135deg, #153093 0%, #4ea8f9 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-in-right': 'slideInRight 0.6s ease forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(21, 48, 147, 0.08)',
        'card-hover': '0 8px 40px rgba(21, 48, 147, 0.16)',
        'orange': '0 4px 20px rgba(247, 147, 30, 0.3)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
