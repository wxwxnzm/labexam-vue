<template>
    <div class="single" >
      <div class="single-box">
        <div class="types">iuhbonotyi</div>
        <ul class="main">
          <li>
            <router-link to="/info/main" class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></router-link>
          </li>
          <li>
            <router-link to="/info/main" class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></router-link>
          </li>
          <li>
            <router-link to="/info/main" class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></router-link>
          </li>
          <li>
            <router-link to="/info/main" class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></router-link>
          </li>
          <li>
            <router-link to="/info/main" class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></router-link>
          </li>
          <li>
            <router-link to="/info/main" class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></router-link>
          </li>
          <li>
            <router-link to="/info/main" class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></router-link>
          </li>
          <li>
            <router-link to="/info/main" class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></router-link>
          </li>

        </ul>
      </div>
      <div class="single-box">
        <div class="types">iuhbonotyi</div>
        <ul class="main">
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>
          <li>
            <a class="title" href="">gafafafafaffaf<span class="time">2017-02-12</span></a>
          </li>

        </ul>
      </div>



      <div class="single-box" v-for='item in singleData'>
        <div class="types">{{item.title}}</div>
        <ul class="main">
          <li v-for="item in singleItem">
            <router-link to="/info/main">{{item.title}}<span class="time">{{item.time}}</span></router-link>
          </li>
        </ul>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        singleData: []
      };
    },
    props: {
      dataSource: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    computed: {
      ...mapGetters({
        singleType: 'getInfoSingleType'
      })
    },
    methods: {
      doMore() {
      },
      getMore() {
//            this.$http.get()
      }
    }
//    beforeRouteEnter(to, from, next) {
//      next(vm => {
//        if (!vm.singleTyle) {
//          vm.$router.push(from.path);
//        }
//      });
//    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .single
    width: 100%
    overflow: auto
    padding: 40px
    .single-box
      width: 100%
      min-height: 300px
      padding: 20px 80px
      background-color: #FCFDFD
      border: 1px solid #D8DDE9
      border-radius: 3px
      margin-bottom: 20px
      .types
        font-size: 26px
        color: #797979
        padding-bottom: 10px
      .main
        width: 100%
        list-style-type: disc
        padding: 10px 30px
        li
          list-style: inherit
          padding: 5px
          a
            color: #C1C9DD
            font-size: 22px
            span.time
              float: right
              margin-right: 100px
</style>
