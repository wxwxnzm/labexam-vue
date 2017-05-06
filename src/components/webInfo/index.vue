<template>
	<div class="info">
    <ol class="cd-breadcrumb triangle">
      <li><router-link to="/home"><img style="position: relative;top: -3px;width: 15px;height: 15px" src="../../../static/img/breadHome.svg">首页</router-link></li>
      <li class="current"><router-link :to="curInfo"></router-link></li>
      <li><a href="#0">Web</a></li>
      <li class="current"><em>技术热点</em></li>
    </ol>
		<!--<img class="webInfoinfo" src="/static/img/information_info01.png" alt="">
		<div clawebInfoinfo-wrapper">
			<div clawebInfoinfo-list">
				<div clawebInfoinfo-list-item" v-for='(msubjectndex) in info_list' :class='{active: cur_isubjectndex subjectndex}' @click='changes(msubjectndex)'>{{menu.title}}</div>
			</div>
				<infoMain  :infoTitle='cur_info.cur_menu.title' :infoList = 'listData' :listShow='listShow'></infoMain>
		</div>-->
	</div>
</template>

<script type="text/ecmascript-6">
	import infoMain from 'components/webInfo/infoMain.vue';
	import {mapActions, mapGetters} from 'vuex';
	export default {
//		data() {
//			return {
//				info_list: [
//					{name: 'tips', title: '通知公告'},
//					{name: 'rules', title: '规章制度'},
//					{name: 'coursewares', title: '学习资料'},
//					{name: 'flags', title: '安全标志'}
//				],
//				cur_info: {subjects.vue: 0, cur_menu: {title: ''}},
//				tips_data: [],
//				rules_data: [],
//		        flags_data: [],
//		        coursewares_data: [],
//		        listData: [],
//		        listShow: true
//			};
//		},
//		watch: {
//			'$route'() {
//				this.changeRoute();
//			}
//		},
//		created() {
//			this.changeRoute();
//		},
//		methods: {
//			changes(menu, subjects.vue) {
//				this.cur_info.subjects.vue = subjects.vue;
//				this.cur_info.cur_menu = menu;
//				this.$router.push(menu.name);
//				this.listShow = !this.listShow;
//			},
//			changeRoute() {
//				// 获取路由信息并存储之
//				var routeName = this.$route.name;
//				var zhongjian = this.info_list.filter(function(item) {
//					return item.name === routeName;
//				});
//				this.cur_info.cur_menu = zhongjian[0];
//				this.cur_info.subjects.vue = this.info_list.indexOf(zhongjian[0]);
//
//				// 获取api
//				if (!this.info_list[this.cur_info.subjects.vue].data) {
//					this.getApi(routeName);
//				}
//				else {
//					this.listData = this.info_list[this.cur_info.subjects.vue].data;
//				}
//			},
//			getApi(url) {
//				// console.log(url);
//				this.$http.get('api/' + 'all' + url).then((response) => {
//						this.listData = response.body;
//						this.info_list[this.cur_info.subjects.vue].data = this.listData;
//				});
//			}
//		},
//		components: {
//			infoMain
//		}
    data() {
        return {
            listData: {}
        };
    },
    computed: {
      ...mapGetters({
        curInfo: 'getCurInfo'
      })
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            console.log('zz');
            vm.getApi(vm.curInfo);
        });
    },
    methods: {
      getApi(url) {
				 console.log(url);
				this.$http.get('api/' + 'all' + url).then((response) => {
						this.listData = response.data;
//						this.info_list[this.cur_info.subjects.vue].data = this.listData;
				});
			},
      ...mapActions([
          'setCurInfo'
      ])
    }
	};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .info
    margin: 55px 0px
    i.home_span
      width 20px
      height 20px
      background url("../../../static/img/breadHome.svg")
      background-size 100%
      display inline-block
    &>.img-info
      width: 100%
    &>.info-wrapper
      display: flex
      align-items: flex-start
      &>.info-list
        flex: 1
        min-width: 180px
        border: 1px solid #DBDBDB
        border-color: #a13d62 #c3c3c3 #c3c3c3 #c3c3c3
        &>.info-list-item
          line-height: 35px
          height: 35px
          border: 1px solid #DBDBDB
          text-indent: 25px
          transition: 0.2s
          &:hover
            cursor: pointer
            color: #fff
            background-color: #a13d62
            text-indent: 22px
          &.active
            text-indent: 40px
            color: #fff
            background-color: #a13d62
      &>.info-main
        flex: 4
        border: 1px solid #a13d62
        min-width: 680px
        &>.title
          border-bottom: 1px solid #a13d62
          border-bottom-width: 2px
          margin: 0 5px
          text-indent: 19px
          font-weight: 700
          padding: 12px
        &>.footer
          width: 100%
          color: white
          background-color: #a13d62
          text-align: center
          line-height: 25px
          &>a
            color: #918695
            text-decoration: none
            &:hover,&.active
              color: white
        &>.wrapper
          min-height: 500px
          padding: 12px
          &>.list-item
            width: 100%
            padding: 10px
            border-bottom: #a13d62 1px dotted
            &>.title
              font-size: 20px
              cursor: pointer
            &>.sanjiaoxing
              width: 0
              height: 0
              border-style: solid
              border-width: 10px 0 10px 10px
              border-color: #a13d62
              border-top-color: transparent
              border-bottom-color: transparent
              display: inline-block
              position: relative
              top: 3px
            &>.time
              color: #918695
              margin-left: 200px

</style>
