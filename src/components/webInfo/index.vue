<template>
	<div class="info">
    <div class="bread">
      <ol class="cd-breadcrumb triangle">
        <li><router-link to="/home"><img style="position: relative;top: -3px;width: 15px;height: 15px" src="../../../static/img/breadHome.svg">首页</router-link></li>
        <li :class="{current: !singleType}"><router-link to="/info/list">{{infoTitle}}</router-link></li>
        <li class="current" v-if="singleType"><router-link to="/info/single">{{singleType}}</router-link></li>
      </ol>
    </div>

		<!--<img class="webInfoinfo" src="/static/img/information_info01.png" alt="">
		<div clawebInfoinfo-wrapper">
			<div clawebInfoinfo-list">
				<div clawebInfoinfo-list-item" v-for='(msubjectndex) in info_list' :class='{active: cur_isubjectndex subjectndex}' @click='changes(msubjectndex)'>{{menu.title}}</div>
			</div>
				<infoMain  :infoTitle='cur_info.cur_menu.title' :infoList = 'listData' :listShow='listShow'></infoMain>
		</div>-->
    <!--<div class="info-wapper">-->
      <!--<infoList :data-source="listData"></infoList>-->
      <!--<infoMain></infoMain>-->
      <router-view></router-view>
    <!--</div>-->
    <!--<div class="info-box"></div>-->
	</div>
</template>

<script type="text/ecmascript-6">
//	import infoMain from 'components/webInfo/infoMain.vue';
//	import infoList from 'components/webInfo/infoList.vue';
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
          listData: {},
          infoList: [
					{name: 'tips', title: '通知公告'},
					{name: 'rules', title: '规章制度'},
					{name: 'coursewares', title: '学习资料'},
					{name: 'flags', title: '安全标志'},
					{name: 'downLoad', title: '下载专区'},
					{name: 'learn', title: '安全知识'}
				  ],
          level: 1
        };
    },
    computed: {
      ...mapGetters({
        curInfo: 'getCurInfo',
        singleType: 'getInfoSingleType'
      }),
      infoTitle() {
          let curTitle = '';
          let curInfo = this.curInfo;
          this.infoList.forEach((item) => {
             if (item.name === curInfo) {
                 curTitle = item.title;
             }
          });
          return curTitle;
      }
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
    },
    components: {
//        infoList,
//        infoMain
    }
	};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .info
    padding: 0 100px
    .bread
      width: 100%
      overflow: auto
      padding-top: 20px
    .info-wapper
      min-height: 800px
    /*i.home_span*/
      /*width 20px*/
      /*height 20px*/
      /*background url("../../../static/img/breadHome.svg")*/
      /*background-size 100%*/
      /*display inline-block*/
    /*&>.img-info*/
      /*width: 100%*/
    /*&>.info-wrapper*/
      /*display: flex*/
      /*align-items: flex-start*/
      /*&>.info-list*/
        /*flex: 1*/
        /*min-width: 180px*/
        /*border: 1px solid #DBDBDB*/
        /*border-color: #a13d62 #c3c3c3 #c3c3c3 #c3c3c3*/
        /*&>.info-list-item*/
          /*line-height: 35px*/
          /*height: 35px*/
          /*border: 1px solid #DBDBDB*/
          /*text-indent: 25px*/
          /*transition: 0.2s*/
          /*&:hover*/
            /*cursor: pointer*/
            /*color: #fff*/
            /*background-color: #a13d62*/
            /*text-indent: 22px*/
          /*&.active*/
            /*text-indent: 40px*/
            /*color: #fff*/
            /*background-color: #a13d62*/
      /*&>.info-main*/
        /*flex: 4*/
        /*border: 1px solid #a13d62*/
        /*min-width: 680px*/
        /*&>.title*/
          /*border-bottom: 1px solid #a13d62*/
          /*border-bottom-width: 2px*/
          /*margin: 0 5px*/
          /*text-indent: 19px*/
          /*font-weight: 700*/
          /*padding: 12px*/
        /*&>.footer*/
          /*width: 100%*/
          /*color: white*/
          /*background-color: #a13d62*/
          /*text-align: center*/
          /*line-height: 25px*/
          /*&>a*/
            /*color: #918695*/
            /*text-decoration: none*/
            /*&:hover,&.active*/
              /*color: white*/
        /*&>.wrapper*/
          /*min-height: 500px*/
          /*padding: 12px*/
          /*&>.list-item*/
            /*width: 100%*/
            /*padding: 10px*/
            /*border-bottom: #a13d62 1px dotted*/
            /*&>.title*/
              /*font-size: 20px*/
              /*cursor: pointer*/
            /*&>.sanjiaoxing*/
              /*width: 0*/
              /*height: 0*/
              /*border-style: solid*/
              /*border-width: 10px 0 10px 10px*/
              /*border-color: #a13d62*/
              /*border-top-color: transparent*/
              /*border-bottom-color: transparent*/
              /*display: inline-block*/
              /*position: relative*/
              /*top: 3px*/
            /*&>.time*/
              /*color: #918695*/
              /*margin-left: 200px*/
</style>

<style>
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
