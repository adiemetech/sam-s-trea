/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sams: {
          red:'#e63946', gold:'#f1c40f', dark:'#050505', darkAlt:'#0a0a0a',
          senegal:'#065a4c', liverpool:'#c8102e',
          barcaBlue:'#004d98', barcaRed:'#a50044', whatsapp:'#25D366',
        },
      },
      fontFamily: {
        sans: ['Inter','system-ui','-apple-system','sans-serif'],
      },
      transitionTimingFunction: {
        'sams-in-out':'cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [],
};
