<template>
	<div class="result">
		<div class="score" v-show='score'>
			总分:{{score}}
		</div>	
		<!-- {{result}} -->
		<div class="topic" v-for='(topic,index) in result'>
			<topicContent :topic ='result[index]' :_select = '0'></topicContent>
		</div>
	</div>
</template>

<script>
	import topicContent from 'components/topicContent/topicContent';
	export default {
		props: {
			result: {
				type: Array
			},
			score: {
				type: Number
			}
		},
		created() {
		},
		components: {
			topicContent
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.result
	  color: red
	  &>.score
	    position: fixed
	    top: 65px
	    left: 45%
	    font-size: 34px
	  &>.topic
	    border: 1px solid rgba(66,185,131,0.57)
	    margin: 2px 40px 
	    padding: 2px
</style>