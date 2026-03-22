/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        foxly: {
          bg:     '#06101f',
          bg2:    '#0a1628',
          gold:   '#f9c846',
          gold2:  '#e8960f',
          mint:   '#3dd9c8',
          lav:    '#9b7ff4',
          coral:  '#ff6b6b',
          green:  '#22c55e',
          es:     '#fb923c',
          fr:     '#c084fc',
          de:     '#60a5fa',
          jp:     '#f472b6',
          ar:     '#fbbf24',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249,200,70,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(249,200,70,0.7)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0) rotate(-4deg)' },
          '50%': { transform: 'translateY(-14px) rotate(4deg)' },
        },
      },
    },
  },
  plugins: [],
};
