<template>
	<header id="header">
		<img src="../../../static/img/logo.jpg" class="logo" width='51px' height='51px'>
		<ul class="nav-first">
			<li v-for='menu in headInfos' class="nav-item">
				<div @click='clickMe(menu.nav_name)'>{{menu.nav_title}}</div>
				<ul v-if='menu.child.length !== 0' class="nav-second">
					<li v-for='subject in menu.child' class="nav-second-item" @click.prevent='clickMe(menu.nav_name,subject.nav_subid)'>
						<!-- <router-link :to="{name: menu.nav_name, params: {subId: subject.nav_subid ,subName: subject.nav_title}}"  @click.prevent='clickMe'>{{subject.nav_title}}</router-link> -->
						{{subject.nav_title}}
					</li>
				</ul>
			</li>
		</ul>
		<el-popover
		ref="popover4"
		placement="bottom"
		width="400"
		trigger="click">
			<el-input v-model='userName' placeholder='用户名'></el-input>	
			<el-input v-model='password' type='password' placeholder='密码'></el-input>	
		</el-popover>
		<el-button v-if='' type="primary" icon="information" class='login_btn' @click='' v-popover:popover4>登录</el-button>

	

	</header>
</template>

<script type="text/ecmascript-6">
	export default {
		props: ['online'],
		data() {
			return {
				headInfos: [],
				subjects: [],
				userName: '',
				password: '',
				headerShow: true,
				dialogTableVisible: false
			};
		},
		created() {
			this.$http.get('api/nav').then((response) => {
				console.log(response.body);
				this.headInfos = response.body;
			});
			this.$parent.$on('hideHeader', function() {
				console.log('want to hide header!');
				this.headerShow = false;
				});
		},
		methods: {
			Animos(value) {
				console.log('Animos');
			},
			offLine() {
				this.$parent.$emit('offline');
				this.$router.replace('/home');
			},
			clickMe(name, id) {
				if (id) {
					this.$router.push('/' + name + '/' + id);
				}
				else if (name === 'tips' || name === 'flags' || name === 'rules' || name === 'coursewares' || name === 'home') {
					this.$router.push('/' + name);
				}
			},
			login() {
				// this.$router
			}
		},
		computed: {
			status: function() {
				return this.online;
			},
			showHeader() {
				return this.headerShow;
			}
		},
		watch: {
			'$route'(to, from) {
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#header
	  position: fixed
	  top: 0
	  left: 0
	  min-width: 960px
	  width: 100%
	  height: 56px
	  background-color: #ffffff
	  z-index: 1
	  .logo
	    margin: 0px 30px
	    cursor: pointer
	    float: left
	  .nav-first
	    height: 56px
	    max-width: 1000px
	    float: left
	    .nav-item
	      float: left
	      width: 94px
	      line-height: 56px
	      color: #333333
	      font-size: 14px
	      text-align: center
	      position: relative
	      &:hover
	        background-color: #f2f2f2
	        cursor: pointer
	        .nav-second
	          display: block
	      .nav-second
	        display: none
	        width: 110px
	        position: absolute
	        .nav-second-item
	          height: 46px
	          color: #333333
	          text-align: left
	          line-height: 46px
	          &:hover
	            background-color: #007ee5
	            color: #ffffff
	  .login_btn
	    margin: 10px 30px
	    width: 90px
</style>