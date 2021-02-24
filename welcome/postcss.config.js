// When vue-cli supports Tailwind 8, update following the tutorial:
// https://tailwindcss.com/docs/installation#post-css-7-compatibility-build
module.exports = {
  "plugins": [
    require('tailwindcss')('tailwind.config.js'),
    require('autoprefixer')(),
  ]
}
