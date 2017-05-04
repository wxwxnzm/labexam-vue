<template>
  <div id="app">
    <v-header v-show="headerShow"></v-header>
    <transition name='guodu'>
      <router-view class='viewrela'></router-view>
    </transition>
    <goTop></goTop>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import goTop from './components/goTop/goTop.vue';
  export default {
    components: {
      'v-header': header,
      goTop
    },
    computed: {
      needOnline () {
//        const routerNames = ['home', 'login', 'me', 'essay', 'exam', 'learn', 'pratice', 'moni', 'tips', 'rules', 'coursewares', 'flags'];
        const routerNames = ['me', 'exam', 'learn', 'pratice', 'moni'];
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
          this.$router.push('/index');
          this.headerShow = false;
        }
          this.headerShow = (to.name !== 'login');
      }
    },
    created() {
      if (this.$route.name === 'login') {
        this.headerShow = false;
      }
    }
  };
</script>

<style>
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
    /*margin: 55px 100px;*/
  }
  .footer-wrapper>.footer1{
    background: url('../static/img/footbg.jpg');
    height: 160px;
    width: 100%;
    min-width: 960px;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .footer-wrapper>.footer2 {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 960px;
    width: 100%;
    background-color: #30363c;
    height: 90px;
    color: #4d6a8d;
    font-size: 12px;
     flex-direction:column;
  }
  .footer-wrapper>.footer1>ul>li {
    float: left;
    padding: 0 2px;
    color: #ffffff;
  }
  .footer-wrapper>.footer1>ul>li>a {
        font-size: 14px;
      color: #ffffff;
  }
  .viewrela {
    min-width: 1260px;
  }

</style>

