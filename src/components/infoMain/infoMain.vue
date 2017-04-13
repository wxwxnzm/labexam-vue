<template>
	<div class='info-main'>
		<div class="title">{{infoTitle}}</div>
		<div class="img-wrapper" v-if='infoList[0].url' v-cloak>
			<div class="img-item" v-for='data in infoList'>
			
				<img  :src='data.url' alt="无图无真相啊">
			</div> 
		</div>
		<div class="wrapper" v-else>
			<div v-show='showList' class="list-item" v-for='(data,index) in infoList' @click='inItem(data,index)'>
				<div class="sanjiaoxing"></div>
				<a class="title">{{data.title}}</a>
				<span class="time">{{data.time}}</span>
			</div>
			<transition name = 'fade'>
				<div v-show='!showList' class="item-main">
					<h2 class="title">{{curItem.title}}</h2>
					<h3 class="time">发表于:{{curItem.time}}</h3>
					<p class="content">{{curItem.content}}</p>
				</div>
			</transition>
		</div>
			
		<div v-show='showList' class="footer">
			<span class="item-count">{{infoList.length}}条记录</span>
			<span class="page-count">共1页</span>
			<a class="first-page active">首页</a>
			<a class="preg-page">上一页</a>
			<a class="next-page">下一页</a>
			<a class="end-page">末页</a>
		</div>
		
		<div v-show='!showList' class="footer">
			<span class="item-count">共{{infoList.length}}条记录</span>
			<span class="item-now">当前为第{{curId + 1}}篇</span>
			<a v-show='curId !== 0' class="preg-item" @click = 'curItem = infoList[--curId]'>上一篇</a>
			<a v-show='curId + 1 < infoList.length' class="next-item" @click = 'curItem = infoList[++curId]'>下一篇</a>
		</div>

	</div>
</template>

<script>
	const ITEM = 10;
	export default {
		data() {
			return {
				curItem: {title: '', time: '', content: ''},
				showList: true,
				curId: 0
			};
		},
		props: {
			infoTitle: {
				type: String,
				default() {
					return '';
				}
			},
			infoList: {
				type: Array,
				default() {
					return [];
				}
			},
			listShow: {
				type: Boolean,
				default() {
					return false;
				}
			}
		},
		methods: {
			inItem(data, index) {
				this.curItem = data;
				this.curId = index;
				this.showList = false;
			}
		},
		created() {
			this.$on('showlist', function() {
				console.log('showlist!!!!!!');
				this.showList = true;
			});
		},
		watch: {
			'listShow'() {
				this.showList = true;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.img-wrapper
	  display: flex
	  flex-wrap: wrap
	  &>.img-item
	    width: 25%
	.wrapper
	  &>.item-main
	    padding: 10px
	    &.fade-enter-active, .fade-leave-active
	      transition: opacity 0.5s
	    &.fade-enter, .fade-leave-active
	      opacity: 0
</style>