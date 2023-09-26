/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gray: colors.slate,
        white: colors.white,

       'MyBlue': '#ea00d9',
       'MyYellow': '#ffd646',
        'MyRed': '#0abdc6',

    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        typing: {
          "0%": {
            opacity: "0%"
          },
          "100%": {
            opacity: "100%"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        typing: "typing 0.5s ease-in-out infinite alternate ",
      },
      screens: {
        '3xl': '2000px',
        'myimg': '1300px' ,
        'navcenter': {'min': '768px', 'max': '1300px'},
      },
      height:{
        'mportrait' : '512px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}