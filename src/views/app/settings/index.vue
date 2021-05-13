<template>
  <div class="settings flex">
    <div class="head flex">
      <div class="flex">
        <input class="common" placeholder="Search..."/>
      </div>
      <span>{{activeTab}}</span>
    </div>
    <div class="body flex">
      <div class="menu">
        <div @click="activeTab='Kernel'" :class="{active: activeTab==='Kernel'}"><svg-icon name="settings"/><span>Kernel</span></div>
        <div @click="activeTab='Keyboard Settings'" :class="{active: activeTab==='Keyboard Settings'}"><svg-icon name="settings-keyboard"/><span>Keyboard Settings</span></div>
        <div @click="activeTab='Locale'" :class="{active: activeTab==='Locale'}"><svg-icon name="locale"/><span>Locale</span></div>
        <div @click="activeTab='Time and Date'" :class="{active: activeTab==='Time and Date'}"><svg-icon name="settings-time"/><span>Time and Date</span></div>
        <div @click="activeTab='User Accounts'" :class="{active: activeTab==='User Accounts'}"><svg-icon name="settings-user"/><span>User Accounts</span></div>
      </div>
      <div class="detail">
        <div v-if="activeTab==='Kernel'" class="kernel flex">
          <div class="flex">
            <svg-icon name="manjaro"/>
            <span class="flex">
              <b>Manjaro Linux</b>
              <a href="https://manjaro.org" target="_blank">https://manjaro.org/</a>
            </span>
          </div>
          <span>
            <a>KDE Plasma Version:</a>
            <span>5.21.4</span>
          </span>
          <span>
            <a>KDE Frameworks Version:</a>
            <span>5.81.0</span>
          </span>
          <span>
            <a>Qt Version:</a>
            <span>5.15.2</span>
          </span>
          <span>
            <a>Kernel Version:</a>
            <span>5.10.34-1-MANJARO</span>
          </span>
          <span>
            <a>OS Type:</a>
            <span>64-bit</span>
          </span>
          <span>
            <a>Graphics Platform:</a>
            <span>X11</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "index",
  data (){
    return {
      activeTab: 'Kernel',
    }
  }
}
</script>

<style scoped lang="scss">
.settings{
  width: 100%;
  height: 100%;
  color: white;
  flex-direction: column;
  >.head{
    background: #31363b;
    border-bottom: 1px solid gray;
    width: 100%;
    >div{
      padding:  .5rem 0;
      width: 30%;
      >input{
        width: 80%;
      }
      border-right: 1px solid gray;
    }
    >span{
      width: calc(70% - 1rem);
      padding-left: 1rem;
      font-size: 1.25rem;
    }
  }
  >.body {
    width: 100%;
    flex-grow: 1;
    > .menu {
      width: 30%;
      height: 100%;
      border-right: 1px solid gray;
      > div {
        padding: .4rem 0;
        border-bottom: 1px solid rgba(94, 77, 77, 0.3);
        display: flex;
        align-items: center;
        &.active{
          background: #44bbff88;
        }
        &:not(.active):hover{
          background: #7dcfff33;
        }
        :deep(>svg) {
          margin: 0 .4rem;
          width: 1.5rem;
          height: 1.5rem;
        }

        > span {
          font-size: .8rem;
        }
      }
    }
    >.detail{
      width: 70%;
      height: 100%;
      >.kernel{
        width: 100%;
        flex-direction: column;
        >div{
          justify-content: center;
          margin: 2rem 0;
          :deep(>svg){
            width: 7rem;
            height: 7rem;
          }
          >span{
            margin-left: 1rem;
            flex-direction: column;
            >b{
              font-size: 1.5rem;
            }
            >a{
              margin-top: .5rem;
              color: #2980b9;
              font-size: .9rem;
            }
          }
        }
        >span{
          width: 20rem;
          font-size: .84rem;
          margin-bottom: .6rem;
          display: flex;
          align-items: center;
          >a{
            width: 10rem;
            text-align: right;
            white-space: nowrap;
          }
          >span{
            margin-left: .5rem;
          }
        }
      }
    }
  }
}
</style>