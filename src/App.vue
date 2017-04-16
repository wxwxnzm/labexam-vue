<template>
  <div id="app">
    <v-header :online='online' ref='headerAni'></v-header>
    <transition name='guodu'>
    <!-- <keep-alive> -->
      <router-view class='viewrela' :online='online'></router-view>
    <!-- </keep-alive> -->
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
    data() {
      return {
        online: window.localStorage.getItem('online') === 'true'
      };
    },
    watch: {
      online: {
        handler: function (online) {
          window.localStorage.setItem('online', online);
        },
        deep: true
      },
      dataStop: {
        handler: function(dataStop) {
          console.log('我变了' + dataStop);
        },
        deep: true
      }
    },
    created() {
      this.$on('successAni', function() {
        this.online = true;
      });
      this.$on('offline', function() {
        this.online = false;
      });
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

</style>

