<template>
	<div class="login">
		<div class="login-box">
			<div class="title">统一身份认证服务</div>
			<ul>
				<li>学生</li>
				<li class="inner">|</li>
				
				<li>教师</li>
				<li class="inner">|</li>
				
				<li>管理员</li>
			</ul>
			<el-input placeholder='账号'></el-input>
			<el-input placeholder='密码' type='password'></el-input>
			<el-button>登录</el-button>
			<router-link class='forget' to='/forget'>忘记密码</router-link>
			<p>密码修改请登录校园信息门户-<a href="www.swun.edu">西南民族大学</a></p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: ['online'],
		data() {
			return {
			};
		},
		created() {
		},
		methods: {
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
	.login
	  width: 1237px
	  height: 520px
	  background: url('../../static/img/loginbg.jpg')
	  .login-box
	    width: 280px
	    height: 300px
	    float: right
	    background-color: #ffffff
	    margin-right: 150px
	    margin-top: 200px
	    border-radius: 4px
	    .title
	      text-align: center
	      color: #007ee5
	      padding: 24px 40px
	    ul
	      margin: 10px
	      padding: 8px
	      background-color: #159eee
	      border-radius: 3px
	      overflow: hidden
	      li
	        float: left
	        text-align:center
	        color: #ffffff
	        padding: 8px 15px
	        border-radius: 13px
	        border: 1px solid #ffffff
	        margin: 0 3px
	      li.inner
	        padding: 0px
	        border-style: none
	    button
	      width: 100px
	      margin: 0 auto
	      display: block
	    a.forget
	      display: block
	      text-align: center
</style>
