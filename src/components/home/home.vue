<template>
	<div id='main'>
		<img class="swun" src="../../../static/img/Home.jpg">
    <div class="info-wrapper">
      <div class="info-item">
        <div class="box tips-box">
          <h4>系统公告</h4>
          <ul class="box-main">
            <li class="box-item">
              <i class="date-ball"></i>
              <i class="date-line"></i>
              <div class="date">2013-01-15</div>
              <router-link to="tips">date+title</router-link>
            </li>
            <li class="box-item"><i class="date-ball"></i><i class="date-line"></i><a href="">date+title</a></li>
            <li class="box-item"><i class="date-ball"></i><i class="date-line"></i><a href="">date+title</a></li>
            <li class="box-item"><i class="date-ball"></i><i class="date-line"></i><a href="">date+title</a></li>
          </ul>
          <el-button class="read-more">阅读更多</el-button>
        </div>
        <img src="../../../static/img/Content1.jpg" alt="">
      </div>
      <div class="info-item">
        <img src="../../../static/img/Content2.jpg" alt="">
        <div class="box roles-box">规章制度</div>
      </div>
      <div class="info-item">
        <div class="box coursewares-box">课件资料</div>
        <img src="../../../static/img/Content3.jpg" alt="">
      </div>
    </div>
    <div class="link-to">
      <div class="link-wrapper">
        <a href="www.swun.edu.cn">
          <img src="../../../static/img/link1.jpg" alt="">
          <span>西南民族大学</span>
        </a>
        <a href="">
          <img src="../../../static/img/link2.jpg" alt="">
          <span>资产与实验管理处</span>
        </a>
        <a href="">
          <img src="../../../static/img/link3.jpg" alt="">
          <span>西南民族大学保卫处</span>
        </a>
        <a href="">
          <img src="../../../static/img/link4.jpg" alt="">
          <span>国家安全生产总局</span>
        </a>
      </div>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
//	import echarts from 'echarts';

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

<style lang="stylus" rel="stylesheet/stylus">
    #main
      width: 100%
      height: 100%
      padding: 0
      margin: 0 auto
      &>.swun
        min-width: 1280px
      &>.info-wrapper
        margin-top: 65px
        min-height: 880px
        &>.info-item
          float: left
          height: 0
          padding-bottom: 64%
          .box
            height: 480px
            padding: 40px
            text-align: center
            color: #ffffff
            &>.box-main
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
          .tips-box
            background-color: #70E6C6
            & .read-more
              border-color: #70E6C6
              color: #70E6C6
          .roles-box
            background-color: #05b2fe
            & .read-more
              border-color: #05B2FE
              color: #05B2FE
          .coursewares-box
            background-color: #007ee5
            & .read-more
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
