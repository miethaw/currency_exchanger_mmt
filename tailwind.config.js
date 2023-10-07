/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111931',
        secondry: '#1E293B',
        textPrimary: '#37B9F3',
        textSecondry: '#8C9AAE',
        textWhite: '#fff',
      },
      dropShadow: {
        'xl': '0 35px 35px rgba(22, 223, 145, 0.8)',
        
      }
    },
  },
  plugins: [],
}

