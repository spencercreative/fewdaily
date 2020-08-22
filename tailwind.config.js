const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './components/*.js',
    './layouts/*.js',
    './lib/*.js',
    './pages/*.js',
    './pages/**/*.js',
    './styles/*.css',
  ],
  theme: {
    fontFamily: {
      sans: ['Mulish', ...defaultTheme.fontFamily.sans]
    },
    colors: {
        transparent: "transparent",
        black: "#000",
        blue: '#C6E9FB',
        orange: '#FCD5B1',
        green: '#B9EEC3',
        red: '#FFC2C3',
        yellow: '#FFF2C2',
        purple: '#E0D1EF',
        gray: '#DEE1E3',
        slate: '#282828',
        white: '#FFFFFF'
    },
    extend: {
      fontSize: {
        '3xs': '.5rem',
        '2xs': '.625rem'
      },
      inset: {
        'full': '100%'
      },
      margin: {
        '-wrap': '-5.62vw',
        wrap: '5.62vw',
      },
      padding: {
        wrap: '5.62vw',
      },
      opacity: {
        '10': '0.1',
        '20': '0.2',
        '95': '0.95',
      },
      minHeight: {
        'screen-25': '25vh',
        'screen-50': '50vh',
        'screen-75': '75vh',
      },
      screens: {
        'print': {'raw': 'print'},
      },
      strokeWidth: {
        '1-1/2': '1.5'
      }
    },
  },
  variants: {},
  plugins: [],
}