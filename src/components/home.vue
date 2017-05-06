<template>
	<div id='main'>
		<img class="swun" src="../../static/img/Home.jpg">
    <div class="info-wrapper">
      <div class="info-item">
        <div class="box tips-box">
          <h4>系统公告</h4>
          <ul class="box-main">
            <li class="box-item" v-for='tip in tips'>
              <i class="date-ball"></i>
              <i class="date-line"></i>
              <div class="date">{{tip.time}}</div>
              <router-link to="tips">{{tip.title}}</router-link>
            </li>
            <li class="box-item"><i class="date-ball"></i><i class="date-line"></i><a href="">date+title</a></li>
            <li class="box-item"><i class="date-ball"></i><i class="date-line"></i><a href="">date+title</a></li>
            <li class="box-item"><i class="date-ball"></i><i class="date-line"></i><a href="">date+title</a></li>
            <li class="box-item"><i class="date-ball"></i><i class="date-line"></i><a href="">date+title</a></li>
          </ul>
          <el-button class="read-more" @click="toTips">阅读更多</el-button>
        </div>
        <img src="../../static/img/Content1.jpg" alt="">
      </div>
      <div class="info-item">
        <img src="../../static/img/Content2.jpg" alt="">
        <div class="box coursewares-box">
          <h4>课件资料</h4>
          <ul class="box-main">
            <!-- <li class="box-item" v-for='courseware in coursewares'>
              <i class="date-ball"></i>
              <i class="date-line"></i>
              <div class="date">{{courseware.time}}</div>
              <router-link to="tips">{{courseware.title}}</router-link>
            </li> -->
            <li class="box-item"><i class="date-ball"></i><i class="date-line"></i><a href="">date+title</a></li>

          </ul>
          <el-button class="read-more" @click="toCousewares">阅读更多</el-button>
        </div>
      </div>
      <div class="info-item">
        <div class="box roles-box">
          <h4>规章制度</h4>
          <ul class="box-main">
<!--             <li class="box-item" v-for='rule in rules'>
              <i class="date-ball"></i>
              <i class="date-line"></i>
              <div class="date">{{rule.time}}</div>
              <router-link to="tips">{{rule.title}}</router-link>
            </li> -->
            <li class="box-item"><i class="date-ball"></i><i class="date-line"></i><a href="">date+title</a></li>

          </ul>
          <el-button class="read-more" @click="toRules">阅读更多</el-button>
        </div>
        <img src="../../static/img/Content3.jpg" alt="">
      </div>
    </div>
    <div class="link-to">
      <div class="link-wrapper">
        <a href="www.swun.edu.cn">
          <img src="../../static/img/link1.jpg" alt="">
          <span>西南民族大学</span>
        </a>
        <a href="">
          <img src="../../static/img/link2.jpg" alt="">
          <span>资产与实验管理处</span>
        </a>
        <a href="">
          <img src="../../static/img/link3.jpg" alt="">
          <span>西南民族大学保卫处</span>
        </a>
        <a href="">
          <img src="../../static/img/link4.jpg" alt="">
          <span>国家安全生产总局</span>
        </a>
      </div>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
//	import echarts from 'echarts';
  import {mapActions} from 'vuex';

	export default {
		props: ['online'],
		data() {
			return {
				tips: [],
				coursewares: [],
				rules: []
			};
		},
		created() {
			this.getInfo();
		},
		methods: {
			getInfo() {
				this.$http.get('api/alltips').then((response) => {
					this.tips = response.data;
				}, (err) => {
				    console.log(err);
        });
				this.$http.get('api/allcousewares').then((response) => {
					this.coursewares = response.data;
				}, (err) => {
          console.log(err);
        });
				this.$http.get('api/allrules').then((response) => {
					this.rules = response.data;
				}, (err) => {
          console.log(err);
        });
			},
			getApi(url) {
				this.$http.get('api/' + 'all' + url).then((response) => {
						this.listData = response.body;
				}).catch((error) => {
          this.$message.error(error);
        });
			},
      toTips() {
			    this.setCurInfo('tips');
			    console.log('gg');
			    this.$router.push('/info');
      },
      toCousewares() {
        this.setCurInfo('cousewares');
        this.$router.push('/info');
      },
      toRules() {
        this.setCurInfo('rules');
        this.$router.push('/info');
      },
      ...mapActions([
        'setCurInfo'
      ])
    },
		computed: {
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #main
      width: 100%
      height: 100%
      padding: 0
      margin: 0 auto
      &>.swun
        width: 100%
      &>.info-wrapper
        margin-top: 65px
        min-height: 880px
        &>.info-item
          float: left
          height: 0
          padding-bottom: 64%
          width: 33.3%
          img
            width: 100%
          .box
            height: 480px
            padding: 40px
            text-align: center
            color: #ffffff
            &>.box-main
              max-height: 300px
              overflow: auto
              &>.box-item
                position relative
                height 87px
                text-align left
                padding-left 50px
                &>.date-ball
                  position absolute
                  height: 20px
                  width: 20px
                  top: 0px
                  left: 0px
                  background-color: #ffffff
                  border-radius: 50%
                &>.date-line
                  position absolute
                  width: 2px
                  height: 67px
                  top: 20px
                  left 9px
                  background-color #ffffff
                &>.date
                  height 20px
                &:last-child
                  height 40px
                  &>.date-line
                    display none
            & a
              color: #ffffff
              font-size: 18px
            &>.read-more
              margin 0 auto
              width 180px
              height: 60px
              border-radius: 35px
              color: #000000
          .tips-box
            background-color: #70E6C6
            & .read-more:hover
              border-color: #70E6C6
              color: #70E6C6
          .roles-box
            background-color: #05b2fe
            & .read-more:hover
              border-color: #05B2FE
              color: #05B2FE
          .coursewares-box
            background-color: #007ee5
            & .read-more:hover
              border-color: #007EE5
              color: #007EE5
      &>.link-to
        height 230px
        &>.link-wrapper
          min-width: 1000px
          display: flex
          justify-content: center
          align-items: center
          &>a
            padding: 30px
</style>
