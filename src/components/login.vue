<template>
	<div class="login">
		<div class="login-box">
			<div class="title">统一身份认证服务</div>
      <el-radio-group class="roles" v-model="role">
        <el-radio-button label="学生" value="user"></el-radio-button>
        <el-radio-button label="教师" value="tea"></el-radio-button>
        <el-radio-button label="管理员" value="admin"></el-radio-button>
      </el-radio-group>
			<el-input :placeholder='accountTips' v-model="account"></el-input>
			<el-input @keyup.enter.native="login" placeholder='密码' type='password' v-model="passWord"></el-input>
			<el-button type="primary" :disabled="!account || ! passWord" @click="login">登录</el-button>
			<router-link class='forget' to='/forget'>忘记密码?</router-link>
			<p>密码修改请登录校园信息门户-<a href="www.swun.edu">西南民族大学</a></p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
			  role: '学生',
        accountTips: '账号',
        account: '',
        passWord: '',
        roleType: 'user'
			};
		},
		created() {
		},
		methods: {
      login() {
        const postData = {
          name: this.account,
          password: this.passWord,
          role: this.roleType
        };
        this.$http.post('api/user/login', postData).then((response) => {
          console.log(response);
//          if (response)

//          this.login_success(response);
        }, (error) => {
            console.log(error);
          this.$router.push('/home');
        });
      },
      login_success(data) {
        if (data.msg === `0`)
        {
          console.log(`验证码不正确!`);
        }
        else if (data.msg === `1`)
        {
          console.log(`用户名不存在！`);
        }
        else if (data.msg === `2`)
        {
          console.log(`密码错误！`);
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
      }
		},
		computed: {
		},
		watch: {
      role(r) {
        if (r === '学生') {
          this.accountTips = '一卡通账号';
          this.roleType = 'user';
        } else if (r === '教师') {
          this.accountTips = '教职工号';
          this.roleType = 'tea';
        } else if (r === '管理员') {
          this.accountTips = '管理员账号';
          this.roleType = 'admin';
        }
      }
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    width: 100%
    height: 520px
    background: url('../../static/img/loginbg.jpg') no-repeat
    background-size: 100%
    .login-box
      width: 270px
      height: 300px
      float: right
      background-color: #ffffff
      margin-right: 160px
      margin-top: 180px
      border-radius: 4px
      text-align center
      .title
        text-align: center
        color: #007ee5
        padding: 24px 40px
        font-size: 20px
      .roles
        width: 100%
        label
          width: 90px
          span
            width: 100%
      button
        width: 160px
        margin: 10px auto
        display: block
      p
        font-size: 12px
      a.forget
        margin 10px 0px
        display: block
</style>
