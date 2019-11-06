<script>
export default {
  name: 'PrismicLink',
  props: {
    field: {
      default: null,
      required: true,
      validator: prop => typeof prop === 'object' || prop === null
    }
  },
  render(h) {
    if (!this.field) return null
    if (this.field.link_type === 'Document') {
      let url = this.$prismic.linkResolver(this.field)
      if (url === undefined) url = { name: 'index' }
      return (
        <nuxt-link to={url}>{this.$slots.default}</nuxt-link>
      )
    }

    return <a href={this.field.url} target={this.field.target}>{this.$slots.default}</a>
  }
}
</script>
