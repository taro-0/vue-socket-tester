# Nuxt.js template
Nuxt.js template project with default configuration to work with, created following the official installation [guide](https://nuxtjs.org/guide/installation).

This template implements the following:
 - [@nuxtjs/style-resources](https://www.npmjs.com/package/@nuxtjs/style-resources)
 - [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/options-reference.html)
 - Prismic.io CMS

## SASS resources
To work with SASS resources I use [@nuxtjs/style-resources](https://www.npmjs.com/package/@nuxtjs/style-resources) module.

By default I import all the global styles, included the SASS and/or css variables, in the [index.scss](app/assets/styles/index.scss) file.  Therefore I use this file to setup the global CSS and the @nuxtjs/styles-resources inside the nuxt.config.js file.
``` javascript
/*
** Global CSS
*/
css: [
  '~/assets/styles/index.scss'
],

/*
** Nuxt.js modules
*/
modules: [
  '@nuxtjs/style-resources'
],

/*
** Style resources module configuration
*/
styleResources: {
  scss: [
    '@/assets/styles/index.scss'
  ]
}
```
If you want to use other configurations, you can visit the [repository](https://github.com/nuxt-community/style-resources-module#readme).

If you don't need or don't want to use this module, all you have to do is remove the module and the configuration from the **nuxt.config.js**, and remove the package from the **package.json** file.

### Grid
There is a [_grid.scss](app/assets/styles/_grid.scss) file that I work with, this is a simple grid implementation created with flex-box, you can delete it if you want.

### Grid configuration
**Default breakpoints**
 - $sm-screen: 480px; 
 - $md-screen: 768px; 
 - $lg-screen: 1264px; 
 - $xl-screen: 1916px;

**Default grid settings**
 - $container-max-width: 1360px;
 - $container-width: 95%;
 - $gap-xs: 1.2rem;
 - $gap-sm: 1.6rem;
 - $gap-md: 2.0rem;
 - $gap-lg: 2.4rem;
 - $gap-xl: 2.8rem;

## nuxt-i18n
All the configuration needed to work with this module is inside the [i18n.js](i18n.js) file.

By default I've created a [plugin](app/plugins/i18n.js) that works together with a [store](app/store/i18n.js) to load information about the current language. If you don't need to access to this information you can delete them and remove the plugin from the [nuxt.config.js](nuxt.config.js) file.

If you don't need or don't want to use i18n, you need to delete the [i18n.js](i18n.js) file as well as the [languages directory](app/languages), remove the module and the i18n.js import from the module section inside the [nuxt.config.js](nuxt.config.js) file, remove the package from the package.json file and finally remove the plugin and the store like I mentioned previously.

### Configuration
If you want to change the configuration, you can visit the [options reference](https://nuxt-community.github.io/nuxt-i18n/options-reference.html).

### Adding a new language
You need to add a new object in the locales array with al least the following structure:
``` javascript
// i18n.js
{
  code: 'es',
  iso: 'es-ES',
  file: 'es-ES.js' // File with translations
}
```
``` javascript
// es-ES.js
export  default {
  hello: '¡Hola! o/'
}
```
> You can add other keys and values that you need to work with.
> The translations file need to be located inside the [languages directory](app/languages).

All the information of the locale will be accessible from the [i18n store](app/store/i18n.js).

## Prismic
I've created three files, based on the approach of the official [prismic vue](https://github.com/prismicio/prismic-vue) implementation.

To work with prismic there are a couple of packages you need.
 - prismic-dom
 - prismic-javascript

And there is a PRISMIC_ENDPOINT in [nuxt.config.js](nuxt.config.js). You need to change this endpoint by your own api endpoint.

These three files are registered globally with the [prismic-components.js](app/plugins/prismic-components.js) plugin.

Also you need to pay special attention to the linkResolver function inside the [prismic.js](app/plugin/prismic.js) plugin. If you create a new page you will need to add a condition inside this function.

To use the components you just need to pass the **field** prop:
``` html
<PrismicLink :field="myLink" />
<PrismicImage :field="myImage" />
<PrismicRichText :field="myRichText" />
```

