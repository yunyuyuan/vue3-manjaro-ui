<template>
  <div class="gedit flex">
    <v-md-editor v-model="text"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, watchEffect} from 'vue';

export default defineComponent({
  name: "index",
  inject: ['apps'],
  data (){
    return {
      text: ''
    }
  },
  created (){
    watchEffect(()=>{
      if (this.apps) {
        const filepath = this.apps.find(v => v.name === 'gedit').params.filepath.value;
        fetch(`/dolphin-files/${filepath}`).then(res => {
          res.text().then(res => {
            this.text = res;
          })
        })
      }
    })
  },
})
</script>

<style scoped lang="scss">
.gedit{
  width: 100%;
  height: 100%;
  >.v-md-editor{
    width: 100%;
    height: 100%;
    border-radius: 0 !important;
  }
}
</style>