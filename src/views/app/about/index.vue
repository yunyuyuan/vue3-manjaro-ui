<template>
  <div class="about">
    <p>For learning Vue3 and Vite,I wrote this project.</p>
    <div>
      <b>Author:</b>
      <img src="https://blog.halberd.cn/image/i.png" alt="avatar"/>
      <a target="_blank" href="https://github.com/yunyuyuan">yunyuyuan</a>
    </div>
    <div>
      <b>Contributors:</b>
      <span>Need your code!</span>
    </div>
    <hr/>
    <strong>Go to <a target="_blank" href="https://github.com/yunyuyuan/vue3-manjaro-ui#readme">github</a> to get more information!</strong>
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
    font-size: 1rem;
    margin: .8rem;
    display: block;
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
    color: #ff7533;
  }
}
</style>