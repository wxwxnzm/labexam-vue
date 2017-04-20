<template>
	<div class="login">
		<div class="login-box">
			<h3>统一身份认证</h3>
			<ul>
				<li>学生</li>
				<li>教师</li>
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
	  width: 100%
	  min-height: 700px
	  min-width: 1200px
	  background: url('../../static/img/Loginbg.png')
	  .login-box
	    width: 280px
	    height: 300px
	    float: right
	    background-color: #ffffff
	    margin-right: 150px
	    margin-top: 200px
	    border-radius: 4px
	    h3
	      text-align: center
	    ul
	      margin: 3px
	      padding: 3px
	      background-color: #159eee
	      overflow: hidden
	      li
	        float: left
	        width: 70px
	        text-align:center
	    button
	      width: 100px
	      margin: 0 auto
	      display: block
	    a.forget
	      display: block
	      text-align: center
</style>
