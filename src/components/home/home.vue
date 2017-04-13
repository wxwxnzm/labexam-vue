<template>
	<div id='main'>
		<!-- <img class="image1" src="/static/img/home_image1.png" alt="">
		
		<div class="main-wrapper">
			<div id='count-img' v-show='status'></div>
			<div v-show='status' class="login-box">
			                <ul class="roles-tabs">
			                    <li :class="{active:iscur === index}" v-for='(role,index) in roles' @click='iscur = index'>{{role.name}}</li>
			                </ul>
			                选项卡面板
			                <div class="tab-content">
			                            <label>name</label>	
			                            <input id='tab_userName' v-model='loginData.name' type="text" class="form-control" :placeholder="roles[iscur].name+'号'">
		
			                            <label>password</label>
			                            <input v-model='loginData.password' type="password" id="tab_password" name="password" class="form-control" placeholder="密码">
		
			                            <input v-model='loginData.code' type="text" id="tab_yanzhengma" name="code" class="form-control" placeholder="验证码">
			                            <img id="tab_ima_yzm" src="http://localhost/labexam/user/code" @click='changeImg'>
			                </div>
					<button @keyup.enter='login' @click='login'>登录</button>
			        </div>
			<div v-for='(wab,index) in wabs' class="home-box" :style='{order: (index+1)*2,flex: wab.flex}'>
				<div class="title border-1px">{{wab.title}}<router-link :to="wab.name">更多...</router-link ></div>
				<div class="content">{{wab.content[0].title}}</div>
			</div>
		</div> -->

		<img class="swun" src="../../../static/img/Home.jpg" alt="" width="">
	</div>
</template>

<script type="text/ecmascript-6">
	// var echarts = require('echarts');
	import echarts from 'echarts';

	var userStore = {
		save(data) {
			var datas = JSON.stringify(data);
			window.localStorage.setItem('USERKEY', datas);
		}
	};
	export default {
		props: ['online'],
		data() {
			return {
				iscur: 1,
				roles: [
					{
						role: `user`,
						name: `学生`
					},
					{
						role: `tea`,
						name: `教职工`
					},
					{
						role: `admin`,
						name: `管理员`
					}
				],
				loginData: {
					name: '',
					password: '',
					code: '',
					role: 'user'
				},
				wabs: [
					{title: '通知公告', name: 'tips', content: [{title: '11月份考试通知'}], flex: 3},
					{title: '规章制度', name: 'rules', content: [{title: '11月份考试通知'}], flex: 2},
					{title: '安全标志', name: 'flags', content: [{title: '11月份考试通知'}], flex: 3},
					{title: '学习资料', name: 'coursewares', content: [{title: '11月份考试通知'}], flex: 2}
				]
			};
		},
		created() {
		},
		mounted() {
			var myChart = echarts.init(document.getElementById('count-img'));
			// 绘制图表
			var options = {
			    title: {
			        text: '各班成绩/人数统计'
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data: ['软工1班', '软工2班', '计科1班', '计科2班', '信计1班'],
			        top: 24
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: [
			        {
			            type: 'category',
			            boundaryGap: false,
			            data: ['50', '60', '70', '80', '90', '100']
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value'
			        }
			    ],
			    series: [
			        {
			            name: '软工1班',
			            type: 'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data: [4, 3, 5, 6, 7, 14]
			        },
			        {
			            name: '软工2班',
			            type: 'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data: [2, 4, 2, 14, 4, 7]
			        },
			        {
			            name: '计科1班',
			            type: 'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data: [3, 0, 4, 5, 10, 3]
			        },
			        {
			            name: '计科2班',
			            type: 'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data: [4, 6, 7, 4, 18, 2]
			        },
			        {
			            name: '信计1班',
			            type: 'line',
			            stack: '总量',
			            label: {
			                normal: {
			                    show: true,
			                    position: 'top'
			                }
			            },
			            areaStyle: {normal: {}},
			            data: [3, 2, 4, 6, 12, 3]
			        }
			    ],
			    borderColor: '#eee'
			};
			myChart.setOption(options);
		},
		methods: {
			login() {
				this.loginData.role = this.roles[this.iscur].role;
				this.$http.post('api/user/login', this.loginData).then((response) => {
					response = response.body;
					this.login_success(response);
				});
				// // for test
				// this.$parent.$emit('successAni');
			},
			login_success(data) {
				if (data.msg === `0`)
				{
					console.log(`验证码不正确!`);
					this.changeImg();
				}
				else if (data.msg === `1`)
				{
				    console.log(`用户名不存在！`);
				    this.changeImg();
				}
				else if (data.msg === `2`)
				{
				    console.log(`密码错误！`);
				    this.changeImg();
				}
				else if (data.msg === `3`)
				{
					// 储存登录的用户信息
					this.userInfoStorage(data.user[0].name, data.user[0]['user_id']);
					// 慢慢消失的动画
				    this.$parent.$emit('successAni');
				}
				else if (data.msg === `4`)
				{ // 登录管理员
				  window.location.href = `http://localhost/labexam/index`;
				}
				else
				{
				  console.log(`用户角色不符！`);
				}
			},
			changeImg() {
				var code = document.getElementById('tab_ima_yzm');
				code.setAttribute('src', 'http://localhost/labexam/user/code?' + Math.random());
			},
			userInfoStorage(name, id) {
		        window.localStorage.setItem(`myName`, name);
		        window.localStorage.setItem(`myId`, id);
		        // 本地存储用户信息
			},
			getApi(url) {
				this.$http.get('api/' + 'all' + url).then((response) => {
						this.listData = response.body;
				});
			}
		},
		computed: {
			status: function() {
				return !(this.online);
			}
		}
	};
</script>

<!-- <style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minix.styl"
	#main
	  background-color: #F2F2F2
	  margin: 60px auto
	  width: 80%
	  padding: 0
	  overflow: hidden
	  text-align: center
	  .image1
	    width: 100%
	  .main-wrapper
	    display: flex
	    flex-wrap: wrap
	    #count-img
	      height: 290px
	      min-width: 28%
	      flex: 2
	      order: 1
	      border: 1px solid #eee
	      box-shadow: 0px 1px 5px #AAAAAA
	    .login-box
	      flex: 2
	      order: 3
	      min-width: 28%
	      height: 28%
	      border: 1px solid #eee
	      box-shadow: 0px 1px 5px #AAAAAA
	      &>.roles-tabs
	        display: flex
	        &>li
	          height: 40px
	          line-height: 40px
	          border-radius: 4px
	          color: white
	          flex: 1
	          background-color: #64bde6
	          text-align: center
	          &.active
	            background-color: #337ab7
	            font-size: 18px
	            &:hover
	              background-color: #337ab7
	          &:hover
	            background-color: #3dace0
	            cursor:pointer
	            font-size: 18px
	    .home-box
	      min-width: 28%
	      min-height: 290px
	      margin: 2px
	      padding: 1px
	      border: 1px solid #eee
	      box-shadow: 0px 1px 5px #AAAAAA
	      background-color: white
	      &:hover>.title
	        color: white
	      &>.title
	        position: relative
	        display: inline-block
	        width: 100%
	        background: linear-gradient(to left,  #fff 0%,rgba(8, 151, 217, 0.8) 100%)
	        &>a
	          position: absolute
	          font-size: 14px
	          right: 5px
	          top: 5px
	      &>.content
	        padding: 10px
</style> -->
<style lang="stylus" rel="stylesheet/stylus">
	#main
	  width: 100%
	  height: 100%
	  padding: 0
	  margin: 0 auto
	  .swun
	    width: 100%
	    min-width: 1280px
</style>