/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
      // 'base': ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
  theme: {
    extend: {
      fontSize: {
        title: `2.6rem;`,
        paragraph: `1.2rem;`,
      },
      extend: {
        colors: {
          primary: {
            500: '#FF6363;',
            800: '#FF1313;',
          }
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        },
      },
    },
  },
  plugins: [],
}
