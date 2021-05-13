<template>
  <div class="about">
    <p>For learning Vue3 and Vite,I wrote this project.</p>
    <div>
      <b>Author:</b>
      <img src="https://blog.halberd.cn/image/i.png" alt="avatar"/>
      <a target="_blank" href="https://github.com/yunyuyuan">yunyuyuan</a>
    </div>
    <strong>This project is powered by:</strong>
    <ul>
      <li>Manjaro Linux</li>
      <li>Vue</li>
      <li>@kangc/v-md-editor</li>
      <li>dayjs</li>
      <li>iframe: <a target="_blank" href="https://github1s.com">github1s</a></li>
      <li>iframe: <a target="_blank" href="https://3dimg.com/editor/">3dimg</a></li>
      <li>iframe: <a target="_blank" href="https://github.com/sl1673495/vue-netease-music">vue-netease-music</a></li>
      <li>And more...</li>
    </ul>
    <a target="_blank" href="https://github.com/yunyuyuan/vue3-manjaro-ui">click to github repo</a>
    <a href="mailto:yun-yu-yuan@qq.com">Email to me</a>
  </div>
</template>

<script lang="ts">
export default {
  name: "index"
}
</script>

<style scoped lang="scss">
.about{
  width: 100%;
  height: 100%;
  background: white;
  overflow: auto;
  >p{
    font-size: 1rem;
    padding: .5rem;
  }
  >div{
    display: flex;
    align-items: center;
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid gray;
    b{
      margin-right: 2rem;
    }
    img{
      width: 3rem;
      height: 3rem;
    }
    a{
      margin-left: 1rem;
    }
  }
  >strong{
    font-size: 1.1rem;
    margin: .8rem;
  }
  >ul{
    margin-left: 3rem;
    li{
      margin: .5rem;
    }
  }
  a{
    color: #004bff;
  }
  >a{
    margin: 1rem;
  }
}
</style>