<template>
	<header id="header">
		<img src="../../../static/img/logo.jpg" class="logo" width='51px' height='51px' @click="toHome">
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
		<el-button v-if='' type="primary" icon="information" class='login_btn' @click='toLogin'>登录</el-button>



	</header>
</template>

<script type="text/ecmascript-6">
	export default {
//		props: ['online'],
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
				this.headInfos = response.data;
			}).catch((error) => {
        this.$message.error(error);
      });
		},
		methods: {
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
			toLogin() {
				 this.$router.push('/index');
			},
      toHome() {
			    this.$router.push('/');
      }
		},
		computed: {
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
	          background-color: #ffffff
	      .nav-second
	        display: none
	        width: 110px
	        position: absolute
	        .nav-second-item
	          height: 46px
	          color: #333333
	          text-align: left
	          line-height: 46px
	          padding: 2px 15px
	          &:hover
	            background-color: #007ee5
	            color: #ffffff
	  .login_btn
	    margin: 10px 30px
	    width: 90px
</style>
