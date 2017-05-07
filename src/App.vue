<template>
  <div id="app">
    <v-header v-show="headerShow"></v-header>
    <transition name='guodu'>
      <router-view class='viewrela' :class="{appView: headerShow}"></router-view>
    </transition>
    <goTop></goTop>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from './components/component/header.vue';
  import footer from './components/component/footer.vue';
  import goTop from './components/component/goTop.vue';

  export default {
    components: {
      'v-header': header,
      'v-footer': footer,
      goTop
    },
    computed: {
      needOnline () {
//        const routerNames = ['me', 'doTopic', 'result'];
        const routerNames = [];
        let tag = false;
        var _self = this;
        routerNames.forEach((name, index) => {
          if (_self.$route.name === name) {
            tag = true;
          }
        });
        return tag;
      }
      },
    data() {
      return {
        headerShow: true
      };
    },
    watch: {
      '$route'(to, form) {
        // 判断用户是否登录过,
        if (this.needOnline) {
          this.$message({
            type: 'warning',
            message: '请登录'
          });
          this.$router.push('/login');
          this.headerShow = false;
        }
          this.headerShow = (to.name !== 'login');
      }
    },
    created() {
      this.headerShow = (this.$route.name !== 'login');
    }
  };
</script>

<style>
  html,body{
    margin:0;
    height: 100%;
  }
  #app{
    position: relative;
    min-height: 100%;
    padding-bottom:160px;
    box-sizing: border-box;
  }
  a {
    cursor: pointer;
  }
  .guodu-enter-active {
    animation: haoka 0.5s;
  }
  .guodu-leave-active {
    animation: haoku 0.5s;
  }
  @keyframes haoku
  {
  0%   {top:0;}
  25%  {top:200px;}
  30%  {top:190px;}
  70%  {top:190px;}
  75%  {top:200px;opacity: 1}
  100% {top:-1000px;opacity: 0}
  }
  @keyframes haoka
  {
  0%   {top:-1000;}
  75%  {opacity: 0;}
  100% {top:0px;opacity: 1}
  }
  .viewrela {
    position: relative;
    min-width: 1260px;
    z-index: 50;
    /*margin: 55px 100px;*/
  }
  .appView {
    margin: 65px 140px;
  }


</style>

