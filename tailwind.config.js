module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", 
    ],
    extend: {
        colors: {
          purple: {
            100: '#f3e8ff',
            200: '#e9d5ff',
            // ... tus colores personalizados
          }
        }
      },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  };