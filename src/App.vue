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
    margin: 55px 100px;
  }
  .jiao {
    background-color: rgba(0, 0, 0, 0.96);
    text-align: center;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.79);
  }
  .jiao>p {
    line-height: 20px;
  }
</style>

