/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  theme: {
    extend: {
      colors: {
        'oliva-balsi':       '#8DAA8A',
        'oliva-balsi-hover': '#7A9977',
        'teal-balsi':        '#2C4C5E',
        'teal-balsi-dark':   '#1e3547',
        'accent-copper':     '#B78D6D',
        'base-dark':         '#212121',
        'base-light':        '#FFFFFF',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
