export const state = () => ({
  locale: {}
})

export const mutations = {
  setLocale(state, locale) {
    state.locale = locale
  }
}

export const actions = {
  changeLocale({ commit }, locale) {
    commit('setLocale', locale)
  }
}
