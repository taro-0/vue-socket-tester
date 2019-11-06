<script>
export default {
  name: 'PrismicImage',
  props: {
    field: {
      default: null,
      required: true,
      validator: prop => typeof prop === 'object' || prop === null
    },
    source: {
      default: false,
      required: false,
      type: Boolean
    }
  },
  render(h) {
    if (this.field === null || this.field === undefined) return null
    if (this.source) return <source srcset={this.field.url} />
    return <img src={this.field.url} alt={this.field.alt || ''} copyright={this.field.copyright || ''} />
  }
}
</script>
