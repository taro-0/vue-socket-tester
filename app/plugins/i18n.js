export default function ({ app, store }) {
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    store.dispatch('i18n/changeLocale', app.i18n.locales.find(locale => locale.code === newLocale))
  }

  store.dispatch('i18n/changeLocale', app.i18n.locales.find(locale => locale.code === app.i18n.locale))
}
