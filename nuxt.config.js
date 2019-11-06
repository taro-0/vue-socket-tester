const i18n = require('./i18n')

module.exports = {
  srcDir: 'app/',
  mode: 'universal',
  env: {
    PRISMIC_ENDPOINT: 'https://def-nuxt-template.cdn.prismic.io/api/v2'
  },

  /*
  ** Headers of the page
  */
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    title: process.env.npm_package_name || ''
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/i18n', ssr: true },
    { src: '@/plugins/prismic', ssr: true },
    { src: '@/plugins/prismic-components', ssr: true }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    ['nuxt-i18n', i18n]
  ],
  /*

  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  /*
  ** Style resources module configuration
  */
  styleResources: {
    scss: [
      '@/assets/styles/main.scss'
    ]
  },

  /*
  ** Webfontloader configuration
  */
  webfontloader: {
    google: {
      families: ['Montserrat:400'] // Loads Lato font with weights 400 and 700
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      /*
      * This alias is necesary to work with Prismic-vue
      * because prismic-vue requires template compiler
      */
      config.resolve.alias.vue = 'vue/dist/vue.common'
    }
  }
}
