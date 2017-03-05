<template>
	<div class="topic-warpper">
		<div class="title">
			<span class="number">{{topic.cur+1}}:</span>
			{{topic.content}}
			<span class="type">{{topic.type}}</span>
			<span v-if='typeof(topic.score) === "number"' class="Tscore">({{topic.score}}分)</span>
		</div>


		<div v-show='topic.curAnswer' class="user-answers">
			<div class="curAnswer">正确答案：{{topic.curAnswer}}</div>
			<div class="" :class='{curAnswer: topic.right === 1}'>你的答案： {{topic.userAnswer}}</div>
			<!-- <div :class='[topic.right === 1? curAnswer:userAnswer]'>你的答案： {{topic.userAnswer}}</div> -->
		</div>


		<div class="content">
			<div class="option" v-for='(option,index) in topic.topic_option' @click='select(option,index)' :class='{checked: topic.done === index}'>{{String.fromCharCode(65+index)}}: {{option.option_content}}</div>
		</div>


		<div class="timer"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	let OPTIONAL = 1;
	export default {
		props: {
			topic: {
				type: Object,
				default() {
					return {};
				}
			},
			_select: {
				type: Number,
				default() {
					return OPTIONAL;
				}
			}
		},
		data() {
			return {
				iscur: 0,
				anwser: {}
			};
		},
		computed: {
		},
		created() {
		},
		methods: {
			select: function(option, index) {
				console.log(this._select);
				if (!this._select) {
					return 0;
				}
				this.iscur = index;
				this.topic['done'] = index;
				this.anwser = {topic_id: option.topic_id, answer: option.option_content, xuhao: this.topic.cur + 1, option: index};
				this.$parent.$emit('select', this.anwser);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.title
	  font-size: 24px
	  &>.number
	    color: blue
	    margin-right: 3px
	  &>.type
	    margin-left: 3px
	  &>.Tscore
	    color: blue
	.content
	  &>.option
	    background-color: rgba(66, 185, 131, 0.57)
	    border-radius: 5px
	    border: 1px solid
	    padding: 3px
	    margin: 3px
	    font-size: 16px
	    transition: all 0.25s linear
	    &:hover
	      border: 1px solid #d4d4d4
	      text-indent: 30px
	    &.checked
	      font-weight: 700
	      text-indent: 30px
	      background-color: #42b983
	      color: white
	    &.yes
	      color: green
	    &.no
	      color: red
	.user-answers
	  &>.curAnswer
	    color: green
	  &>.userAnswer
	    color: red
	  &>.yes
	    color: green
</style>