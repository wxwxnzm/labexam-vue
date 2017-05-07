<template>
	<div class='info-main'>
		<div class="wrapper">
			<transition name = 'fade'>
				<div  class="item-main">
					<h2 class="title">{{curItem.title}}</h2>
					<h3 class="time">发表于:{{curItem.time}}</h3>
					<p class="content">{{curItem.content}}</p>
				</div>
			</transition>
		</div>
    <el-button-group>
      <el-button type="primary" icon="arrow-left">上一篇</el-button>
      <el-button type="primary">下一篇<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
	</div>
</template>

<script>
	const ITEM = 10;
	export default {
		data() {
			return {
				curItem: {title: 'ftgbhl', time: '2016-5-9', content: 'figvbhkljk njyvbhjljk '},
        curId: 0,
        total: 100,
        currentPage: 1
			};
		},
//		props: {
//			infoTitle: {
//				type: String,
//				default() {
//					return '';
//				}
//			},
//			infoList: {
//				type: Array,
//				default() {
//					return [];
//				}
//			},
//			listShow: {
//				type: Boolean,
//				default() {
//					return false;
//				}
//			}
//		},
		methods: {
      handleCurrentChange(page) {
        console.log(page);
      }
		},
		created() {

		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .info-main
      min-height: 600px
      text-align: center
      &.fade-enter-active, .fade-leave-active
        transition: opacity 0.5s
      &.fade-enter, .fade-leave-active
        opacity: 0
      .wrapper
        min-height: 500px
        background-color: #FCFDFD
        border: 1px solid #D8DDE9
        border-radius: 3px
        margin-bottom: 20px
        padding: 10px
</style>
