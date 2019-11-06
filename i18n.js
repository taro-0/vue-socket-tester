module.exports = {
  // For more information visit https://nuxt-community.github.io/nuxt-i18n/options-reference.html
  defaultLocale: 'en-us', // Default language code
  lazy: true,
  langDir: './languages/',
  locales: [
    {
      base: 'en', // Base language, this is not necesary
      code: 'en-us', // Language code, you can change it if you need E.g. en
      iso: 'en-US',
      file: 'en-us.js'
      // You can add other configurations, like map zoom, coordinates
    }
  ],
  vuex: false
}
