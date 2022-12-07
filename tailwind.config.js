module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    mode: 'layers',
    layers: ['base', 'components', 'utilities'],
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
  },
  theme: {
    extend: {
      flex: {
        2: '2 2 0%',
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing',
      },
    },
  },
  variants: {
    margin: ['responsive', 'first'],
    borderRadius: ['responsive', 'first', 'last'],
  },
  plugins: [require('@tailwindcss/forms')],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
