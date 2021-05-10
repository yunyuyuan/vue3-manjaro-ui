<template>
  <svg aria-hidden="true">
    <use :href="getName"></use>
  </svg>
</template>

<script lang="ts">
import {computed} from "vue";
const svgParser = new DOMParser();

export default {
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
  async setup(props) {
    const getId = computed(() => {
      return `icon-${props.name}`
    })
    const name = `#${getId.value}`
    const res = await import(`../svg/${props.name}.svg`);
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
        for (const key of ['width', 'height', 'x', 'y']){
          svgElement.removeAttribute(key)
        }
        svgElement.id = getId.value
        container.appendChild(svgElement)
      }
    }
    return {getId, getName: name}
  },
}
</script>

<style scoped lang="scss">

</style>