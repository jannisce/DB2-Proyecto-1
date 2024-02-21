/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bittersweet: {
          DEFAULT: '#ee6055',
          100: '#3a0906',
          200: '#75130c',
          300: '#af1c11',
          400: '#e82719',
          500: '#ee6055',
          600: '#f17e76',
          700: '#f59e98',
          800: '#f8beba',
          900: '#fcdfdd'
        },
        black: {
          DEFAULT: '#000000',
          100: '#000000',
          200: '#000000',
          300: '#000000',
          400: '#000000',
          500: '#000000',
          600: '#333333',
          700: '#666666',
          800: '#999999',
          900: '#cccccc'
        },
        tropical_indigo: {
          DEFAULT: '#8b80f9',
          100: '#090348',
          200: '#120790',
          300: '#1b0ad8',
          400: '#4838f6',
          500: '#8b80f9',
          600: '#a29afa',
          700: '#b9b3fb',
          800: '#d0ccfd',
          900: '#e8e6fe'
        },
        white: {
          DEFAULT: '#ffffff',
          100: '#333333',
          200: '#666666',
          300: '#999999',
          400: '#cccccc',
          500: '#ffffff',
          600: '#ffffff',
          700: '#ffffff',
          800: '#ffffff',
          900: '#ffffff'
        },
        lavender_blush: {
          DEFAULT: '#fcefef',
          100: '#521010',
          200: '#a51f1f',
          300: '#dc4949',
          400: '#ec9c9c',
          500: '#fcefef',
          600: '#fcf1f1',
          700: '#fdf5f5',
          800: '#fef8f8',
          900: '#fefcfc'
        },
        mint: { DEFAULT: '#00bd9d', 100: '#00261f', 200: '#004b3f', 300: '#00715e', 400: '#00977e', 500: '#00bd9d', 600: '#00fdd3', 700: '#3effdf', 800: '#7effea', 900: '#bffff4' },
      }
    }
  },
  plugins: [],
}
