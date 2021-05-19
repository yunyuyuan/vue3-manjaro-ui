<template>
  <div :class="{active: show}" class="calendar" tabindex="1" @focusout="$emit('focusout')">
    <div id="calendar"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Calendar from "color-calendar";
import "color-calendar/dist/css/theme-glass.css";

export default defineComponent({
  name: "calendar",
  props: {
    show: Boolean
  },
  emits: ['focusout'],
  watch: {
    show (){
      if (this.show) {
        this.$el.focus();
      }
    }
  },
  mounted() {
    new Calendar({
      id: "#calendar",
      theme: "glass"
    });
  }
})
</script>

<style scoped lang="scss">
.calendar{
  width: 20rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateY(4rem);
  transition: transform .12s ease-in;
  outline: none;
  z-index: 0;
  &.active{
    transform: translateY(-100%);
  }
}
</style>