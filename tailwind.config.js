const colors = require('tailwindcss/colors')
// Default Tailwind config at: 
// ~ https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js

module.exports = {
  content: [
     "./pages/**/*.{js,jsx,ts,tsx}",
     "./components/**/*.{js,jsx,ts,tsx}",
     "./layouts/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  // presets: [_default],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.red,
        tiber: '#072333',
        keppel: {
          DEFAULT: '#34B09D',
          900: '#40B5A3',
          800: '#4BB9A8',
          700: '#61C2B3',
          600: '#78CABE',
          500: '#8ED3C9',
          400: '#A5DCD3',
          300: '#BBE5DE',
          200: '#D2EDE9',
          100: '#E8F6F4',
        },
        blueRibbon: {
          DEFAULT : '#0070f3',
          900: '#1e85fc',
          800: '#3f97fc',
          700: '#59a6ff',
          600: '#7ab8ff',
          500: '#91c4ff'
        },
        whiteLayer: '#ffffff03',
        pinkydark: '#431e2f',
      },
      height: {
        'min': 'min-content'
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin')
  ],
}
