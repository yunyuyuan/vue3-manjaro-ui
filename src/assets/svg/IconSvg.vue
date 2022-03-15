<template>
  <svg aria-hidden="true">
    <use :href="getName"></use>
  </svg>
</template>

<script lang="ts">
import {defineComponent} from "vue";
const svgParser = new DOMParser();

export default defineComponent({
  name: "IconSvg",
  props: {
    name: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    }
  },
  data (){
    return {
      getName: ''
    }
  },
  watch: {
    '$props.name': {
      immediate: true,
      async handler (){
        const getId = `icon-${this.name}`
        const name = `#${getId}`
        const res = await import(`../svg/${this.name}.svg`);
        let container = document.querySelector('#_SVG_SPRITE_CONTAINER_');
        if (!container || !container.querySelector(name)) {
          if (!container) {
            container = document.createElement('div');
            container.id = '_SVG_SPRITE_CONTAINER_'
            container.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            container.setAttribute('style', 'position: absolute; width: 0; height: 0;overflow: hidden')
            document.body.insertBefore(container, document.body.children[0]);
          }
          if (!container.querySelector(name)) {
            const svgElement = svgParser.parseFromString(res.default, "image/svg+xml").querySelector('svg');
            if (svgElement) {
              for (const key of ['width', 'height', 'x', 'y']) {
                svgElement.removeAttribute(key)
              }
              svgElement.id = getId
              container.appendChild(svgElement as SVGSVGElement)
            }
          }
        }
        this.getName =  name;
      }
    }
  },
})
</script>
