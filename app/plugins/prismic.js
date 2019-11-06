// For more information visit https://prismic.io/docs/javascript/getting-started/integrating-with-an-existing-javascript-project

import * as Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
const Elements = PrismicDOM.RichText.Elements

class CMS {
  static instance

  constructor(endpoint) {
    if (this.instance) {
      return this.instance
    }

    this.prismicEndpoint = endpoint
    this.instance = this
  }

  getApi() {
    return Prismic.getApi(this.prismicEndpoint)
  }

  /**
   * @param {Array} predicates Array with the following structure
   * predicates: [
   *  { type: 'at', path: 'document.type', value: 'home' },
   *  ...
   * ]
   * @param {Object} params Prismic params, E.g. { pageSize: 25, page: 3 }
   */
  async fetch(predicates, params) {
    const pr = predicates.map(el => Prismic.Predicates[el.type](el.path, el.value))
    const api = await this.getApi()
    return api.query(pr, params)
  }

  /**
   * @param {String} type Document type
   * @param {Object} params Prismic params, E.g. { pageSize: 25, page: 3 }
   * @param {String} predicates Type of predicate
   */
  async fetchByType(type, params = {}, predicates = 'at') {
    const api = await this.getApi()
    return api.query(
      Prismic.Predicates[predicates]('document.type', type),
      params
    )
  }

  /**
   * @param {String} type Document type
   * @param {String} id Document id
   */
  async fetchByID(type, id) {
    const api = await this.getApi()
    return api.getByID(type, id)
  }

  /**
   * @param {String} type Document type
   * @param {String} uid Document UID
   * @param {Object} params Prismic params, E.g. { lang: 'en-US' }
   */
  async fetchByUID(type, uid, params) {
    const api = await this.getApi()
    return api.getByUID(type, uid, params)
  }
}

export default ({ app }, inject) => {
  function linkResolver(doc) {
    // Return the path depending on Prismic Document's type
    // If it is a Single Custom Type with the API ID of "home"
    if (doc.type === 'home') {
      return app.localePath({ name: 'index' })
      // If you are not using nuxt-i18n you need to return
      // like this return { name: 'index' }
    }

    // Default to the 404
    return app.localePath({ name: '404' })
  }

  function htmlSerializer(type, element, content) {
    // Generate links to Prismic Documents as <nuxt-link> components
    // Present by default, it is recommended to keep this
    if (type === Elements.hyperlink) {
      const url = PrismicDOM.Link.url(element.data, linkResolver)

      if (element.data.link_type === 'Document') {
        return `<nuxt-link class="Nuxt" to="${url}">${content}</nuxt-link>`
      } else {
        const target = element.data.target ? `target="'${element.data.target}'" rel="noopener"` : ''
        return `<a href="${url}" ${target}>${content}</a>`
      }
    }

    // If the image is also a link to a Prismic Document, it will return a <nuxt-link> component
    // Present by default, it is recommended to keep this
    if (type === Elements.image) {
      let result = `<img src="${element.url}" alt="${element.alt || ''}" copyright="${element.copyright || ''}">`

      if (element.linkTo) {
        const url = PrismicDOM.Link.url(element.linkTo, linkResolver)

        if (element.linkTo.link_type === 'Document') {
          result = `<nuxt-link class="Nuxt" to="${url}">${result}</nuxt-link>`
        } else {
          const target = element.linkTo.target ? `target="${element.linkTo.target}" rel="noopener"` : ''
          result = `<a href="${url}" ${target}>${result}</a>`
        }
      }

      const wrapperClassList = [element.label || '', 'block-img']
      result = `<p class="${wrapperClassList.join(' ')}">${result}</p>`
      return result
    }

    // Return null to stick with the default behavior for everything else
    return null
  }

  const endpoint = process.env.PRISMIC_ENDPOINT
  if (endpoint && endpoint.length > 0) {
    inject('prismic', {
      api: new CMS(process.env.PRISMIC_ENDPOINT),
      htmlSerializer,
      linkResolver
    })

    // After the injection you can fetch global content
    // like footer content or navbar content
  }
}
