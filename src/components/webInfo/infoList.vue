<template>
  <div class="infoList">
    <div class="all" v-if="allShow">
      <div class="list-box">
        <img src="../../../static/img/info1.png" alt="">
        <div class="font-script">
          <div class="title">title</div>
          <i class="more" @click="doMore">+更多</i>
          <ul class="item">
            <li><router-link to="/info/main">gggg</router-link></li>
            <li><a href="">gafag</a></li>
            <li><a href="">ggggfafa</a></li>
          </ul>
        </div>
      </div>
      <div class="list-box">
        <img src="../../../static/img/info1.png" alt="">
        <div class="font-script">
          <div class="title">title2</div>
          <i class="more">+更多</i>
          <ul class="item">
            <li><a href="">gggg</a></li>
            <li><a href="">gafag</a></li>
            <li><a href="">ggggfafa</a></li>
          </ul>
        </div>
      </div>
      <div class="list-box" v-for="item in dataSource">
        <img src="../../../static/img/info1.png" alt="">
        <div class="font-script">
          <div class="title">{{item.title}}</div>
          <i class="more" @click="doMore(item.title)">+更多</i>
          <ul class="item">
            <li><a href="">gggg</a></li>
            <li><a href="">gafag</a></li>
            <li><a href="">ggggfafa</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapActions} from 'vuex';
  export default {
    data() {
        return {
            singleData: [],
            allShow: true
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
    methods: {
      doMore(title) {
        var _title = title ? '化学安全' : '物理安全';
        this.setInfoSingleType(_title);
        this.$router.push('/info/single');
      },
      getMore() {
//            this.$http.get()
      },
      ...mapActions([
        'setInfoSingleType'
      ])
    },
    created() {
      this.setInfoSingleType('');
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .all
    width: 100%;
    overflow: auto
    .list-box
      float: left;
      width: 48%;
      height: 230px;
      margin: 50px 20px 50px 0
      padding: 0
      background-color: #FCFDFD;
      border: 1px solid #D8DDE9;
      border-radius: 3px
      img
        float: left;
        width: 40%
        height: 100%
      .font-script
        width: 60%
        height: 100%
        position: relative
        float: left;
        padding: 10px 5px 10px 30px
        color: #C1C9DD
        .title
          font-size: 26px
          color: #797979
        i.more
          width: 40px
          position: absolute
          right: 5%
          top: 5%
          border 1px solid #fff
          border-radius: 3px
          &:hover
            border: 1px solid #D8DDE9
            cursor: pointer
        ul.item
          width: 100%
          list-style-type: disc
          padding: 10px 30px
          li
            list-style: inherit
            padding: 5px
            a
              color: #C1C9DD
              font-size: 22px
</style>
