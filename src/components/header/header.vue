<template>
	<nav style='min-width: 1050px' class="navbar navbar-inverse navbar-fixed-top">
	    <div class="navbar-header">
	        <router-link to="/home" class="navbar-brand">西南民族大学<span>实验室安全知识培训系统</span></router-link>
	    </div>
	    <div class="navbar-collapse">
	        <ul class="nav navbar-nav">
				<li class="dd" v-if='headInfos' v-for='(menu,index) in headInfos'>
					<div v-if='menu.child.length !== 0'>{{menu.nav_title}}<span  class="caret"></span></div>
					<ul v-if='menu.child.length !== 0' class="dropdown-menu">
						<li v-for='subject in menu.child'>
							<router-link :to="{name: menu.nav_name, params: {subId: subject.nav_subid ,subName: subject.nav_title}}">{{subject.nav_title}}</router-link>
						</li>
					</ul>
					<router-link v-else :to='{name: menu.nav_name}'>{{menu.nav_title}}</router-link>
				</li>
				

	            <li v-show='status'>
	            	<router-link to="/me">我的</router-link>
	            </li>
	            <li class="dd" v-show='status' id="li_nav_back">
					<div @click='offLine'>退出</div>
	            </li>
	        </ul>
	    </div>
	</nav>
</template>

<script type="text/ecmascript-6">
	export default {
		props: ['online'],
		data() {
			return {
				headInfos: [],
				subjects: [],
				userName: ''
			};
		},
		created() {
			this.$http.get('api/nav').then((response) => {
				console.log(response.body);
				this.headInfos = response.body;
			});
		},
		methods: {
			Animos(value) {
				console.log('Animos');
			},
			offLine() {
				this.$parent.$emit('offline');
				this.$router.replace('/home');
			}
		},
		computed: {
			status: function() {
				return this.online;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.dd
	  &:hover>.dropdown-menu
	    display: block
	  &.open
	    background-color: #080808
	    & > div
	      color: #fff
	  & > div
	    line-height:40px
	    margin: 5px 10px 5px 10px
	    color: #9d9d9d
	    cursor: pointer
	    &:hover
	      color: #fff
	.nav-header
	  background-color: #222222
	  border-color: #101010
	  position: fixed
	  left: 0
	  top: 0
	  width: 100%
	  color: rgb(157, 157, 157)
</style>