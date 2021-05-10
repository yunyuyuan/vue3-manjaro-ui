<template>
  <suspense>
    <the-svg :="$attrs" :name="name"/>
  </suspense>
</template>

<script lang="ts">
import TheSvg from './_svg.vue'

export default {
  props: {
    name: {
      type: String,
    },
  },
  components: {TheSvg}
}
</script>