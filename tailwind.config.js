module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': 'var(--primary)',

      'red': 'var(--red)',
      'red-opaque': 'var(--red-opaque)',

      'white': 'var(--white)',
      'white-opaque': 'var(--white-opaque)',
      'gray0.5': 'var(--gray05)',
      'gray1': 'var(--gray1)',
      'gray2': 'var(--gray2)',
      'gray3': 'var(--gray3)',
      'gray3-opaque': 'var(--gray3-opaque)',
      'black': 'var(--black)',
      'black-opaque': 'var(--black-opaque)',

      'transparent': 'rgba(255, 255, 255, 0)',
    },
    fontFamily: {
      merriweather: ['var(--font-merriweather)'],
      inter: ['var(--font-inter)']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
