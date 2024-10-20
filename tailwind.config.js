/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', // Mencari semua file HTML di root
    './js/**/*.js', // Mencari file JS di folder js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
