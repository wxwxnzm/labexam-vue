<template>
  <div id="app">
    <v-header v-show="headerShow"></v-header>
    <transition name='guodu'>
      <router-view class='viewrela' :class="{appView: headerShow}"></router-view>
    </transition>
    <goTop></goTop>
    <footer class="footer-wrapper">
      <div class="footer1">
        <ul>
          <li ><a href="http://www.gov.cn/" >中国政府网</a></li>
          <li> | </li>
          <li><a href="http://www.seac.gov.cn/" >国家民族事务委员会</a></li>
          <li> | </li>
          <li><a href="http://www.moe.gov.cn/" >教育部</a></li>
          <li> | </li>
          <li><a href="http://www.sc.gov.cn/" >四川省人民政府</a></li>
          <li> | </li>
          <li><a href="http://www.chengdu.gov.cn/" >成都市人民政府</a></li>
          <li> | </li>
          <li><a href="http://www.scedu.net/" >四川省教育厅</a></li>
        </ul>
      </div>
      <div class="footer2">
        <p>武侯校区地址：四川省成都市一环路南四段16号(610041)    航空港校区地址：双流区航空港开发区大件路文星段168号(610225)</p>
        <p>西南民族大学版权所有      蜀ICP备11019012号</p>
      </div>
    </footer>
  </div>
</template>

<script>
  import header from './components/component/header.vue';
  import goTop from './components/component/goTop.vue';
  import store from 'src/vuex/store.js';

  export default {
    components: {
      'v-header': header,
      goTop
    },
    computed: {
      needOnline () {
//        const routerNames = ['home', 'login', 'me', 'essay', 'exam', 'learn', 'pratice', 'moni', 'tips', 'rules', 'coursewares', 'flags'];
        const routerNames = ['me', 'doTopic', 'result'];
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
    },
    store
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
    padding-bottom:250px;
    box-sizing: border-box;
  }
  .footer-wrapper{
    height: 250px;
    position: absolute;
    left:0;
    bottom:0;
    width: 100%;
    background: #000;
    color:#fff;
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
    /*margin: 55px 100px;*/
  }
  .appView {
    margin: 55px 100px;
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
  /*三角形面包屑*/
  .cd-breadcrumb.triangle li {
    position: relative;
    padding: 0;
    margin: 4px 4px 4px 0;
  }
  .cd-breadcrumb.triangle li:last-of-type {
    margin-right: 0;
  }
  .cd-breadcrumb.triangle li > * {
    position: relative;
    padding: 15px 15px 15px 25px;
    color: #2c3f4c;
    background-color: #edeff0;
    /* the border color is used to style its ::after pseudo-element */
    border-color: #edeff0;
  }
  .cd-breadcrumb.triangle li.current > * {
    /* selected step */
    color: #ffffff;
    background-color: #007EE5;
    border-color: #007EE5;
  }
  .cd-breadcrumb.triangle li:first-of-type > * {
    padding-left: 1.6em;
    border-radius: .25em 0 0 .25em;
  }
  .cd-breadcrumb.triangle li:last-of-type > * {
    padding-right: 1.6em;
    border-radius: 0 .25em .25em 0;
  }
  .no-touch .cd-breadcrumb.triangle a:hover {
    /* steps already visited */
    color: #ffffff;
    background-color: #2c3f4c;
    border-color: #2c3f4c;
  }
  .cd-breadcrumb.triangle li::after, .cd-breadcrumb.triangle li > *::after {
    /*
    	li > *::after is the colored triangle after each item
    	li::after is the white separator between two items
    */
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    content: '';
    height: 0;
    width: 0;
    /* 48px is the height of the <a> element */
    border: 24px solid transparent;
    border-right-width: 0;
    border-left-width: 20px;
  }
  .cd-breadcrumb.triangle li::after {
    /* this is the white separator between two items */
    z-index: 1;
    -webkit-transform: translateX(4px);
    -moz-transform: translateX(4px);
    -ms-transform: translateX(4px);
    -o-transform: translateX(4px);
    transform: translateX(4px);
    border-left-color: #ffffff;
    /* reset style */
    margin: 0;
  }
  .cd-breadcrumb.triangle li > *::after {
    /* this is the colored triangle after each element */
    z-index: 2;
    border-left-color: inherit;
  }
  .cd-breadcrumb.triangle li:last-of-type::after, .cd-breadcrumb.triangle li:last-of-type > *::after {
    /* hide the triangle after the last step */
    display: none;
  }
  .cd-breadcrumb.triangle.custom-separator li::after {
    /* reset style */
    background-image: none;
  }
  .cd-breadcrumb.triangle.custom-icons li::after, .cd-breadcrumb.triangle.custom-icons li > *::after {
    /* 50px is the height of the <a> element */
    border-top-width: 25px;
    border-bottom-width: 25px;
  }
  .cd-breadcrumb li, .cd-multi-steps li {
    display: inline-block;
    float: left;
    margin: 0.5em 0;
  }
  .cd-breadcrumb li::after, .cd-multi-steps li::after {
    /* this is the separator between items */
    display: inline-block;
    content: '\00bb';
    margin: 0 .6em;
    color: #959fa5;
  }
  .cd-breadcrumb li:last-of-type::after, .cd-multi-steps li:last-of-type::after {
    /* hide separator after the last item */
    display: none;
  }
  .cd-breadcrumb li > *, .cd-multi-steps li > * {
    /* single step */
    display: inline-block;
    color: #2c3f4c;
  }
  .cd-breadcrumb li.current > *, .cd-multi-steps li.current > * {
    /* selected step */
    color: #007EE5;
  }
  .no-touch .cd-breadcrumb a:hover, .no-touch .cd-multi-steps a:hover {
    /* steps already visited */
    color: #007EE5;
  }
</style>

