<template>
  <component :is="richTextComponent" />
</template>
<script>
import prismicDOM from 'prismic-dom'
export default {
  name: 'PrismicRichText',
  props: {
    field: {
      default: null,
      required: true,
      validator: prop => typeof prop === 'object' || prop === null
    }
  },
  computed: {
    richTextComponent() {
      if (!this.field) return null

      return {
        template: `<div>${prismicDOM.RichText.asHtml(this.field, this.$prismic.linkResolver, this.$prismic.htmlSerializer)}</div>`
      }
    }
  }
}
</script>
