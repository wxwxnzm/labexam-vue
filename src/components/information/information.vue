<template>
	<div class="info">
		<img class="img-info" src="/static/img/information_info01.png" alt="">
		<div class="info-wrapper">
			<div class="info-list">
				<div class="info-list-item" v-for='(menu,index) in info_list' :class='{active: cur_info.index === index}' @click='changes(menu,index)'>{{menu.title}}</div>
			</div>
				<infoMain  :infoTitle='cur_info.cur_menu.title' :infoList = 'listData' :listShow='listShow'></infoMain>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import infoMain from 'components/infoMain/infoMain.vue';
	export default {
		data() {
			return {
				info_list: [
					{name: 'tips', title: '通知公告'},
					{name: 'rules', title: '规章制度'},
					{name: 'coursewares', title: '学习资料'},
					{name: 'flags', title: '安全标志'}
				],
				cur_info: {index: 0, cur_menu: {title: ''}},
				tips_data: [],
				rules_data: [],
		        flags_data: [],
		        coursewares_data: [],
		        listData: [],
		        listShow: true
			};
		},
		watch: {
			'$route'() {
				this.changeRoute();
			}
		},
		created() {
			this.changeRoute();
		},
		methods: {
			changes(menu, index) {
				this.cur_info.index = index;
				this.cur_info.cur_menu = menu;
				this.$router.push(menu.name);
				this.listShow = !this.listShow;
			},
			changeRoute() {
				// 获取路由信息并存储之
				var routeName = this.$route.name;
				var zhongjian = this.info_list.filter(function(item) {
					return item.name === routeName;
				});
				this.cur_info.cur_menu = zhongjian[0];
				this.cur_info.index = this.info_list.indexOf(zhongjian[0]);

				// 获取api
				if (!this.info_list[this.cur_info.index].data) {
					this.getApi(routeName);
				}
				else {
					this.listData = this.info_list[this.cur_info.index].data;
				}
			},
			getApi(url) {
				// console.log(url);
				this.$http.get('api/' + 'all' + url).then((response) => {
						this.listData = response.body;
						this.info_list[this.cur_info.index].data = this.listData;
				});
			}
		},
		components: {
			infoMain
		}
	};

</script>

<style lang="stylus" rel="stylesheet/stylus">
	.info
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