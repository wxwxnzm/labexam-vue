<template>
	<div class="topic-warpper">
		<div class="title">
			<span class="number" v-if="!_select">{{topic.cur+1}}:</span>
			{{topic.content}}
			<span class="type">{{topic.type}}</span>
			<span v-if='typeof(topic.score) === "number" && !_select' class="Tscore">({{topic.score}}分)</span>
		</div>


		<div v-show='topic.curAnswer' class="user-answers">
			<div class="curAnswer">正确答案：{{topic.curAnswer}}</div>
			<div class="" :class='{curAnswer: topic.right === 1}'>你的答案： {{topic.userAnswer}}</div>
			<!-- <div :class='[topic.right === 1? curAnswer:userAnswer]'>你的答案： {{topic.userAnswer}}</div> -->
		</div>


		<div class="content">
			<div class="option" v-for='(option,index) in topic.topic_option' @click='select(option,index)' :class='{checked: topic.done === index}'>{{String.fromCharCode(65+index)}}: {{option.option_content}}</div>
      <!--<div class="option">1,6ubasofubasof</div>-->
      <!--<div class="option">1,6ubasofubasof</div>-->
      <!--<div class="option checked">1,6ubasofubasof</div>-->
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
		    console.log(this.topic);
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
				console.log(this.anwser);
				this.$emit('doSelect', this.anwser);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .topic-warpper
      overflow-y: auto
      height: 250px
      width: 100%
      .title
        word-break: break-all
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
          overflow: auto
          width: 46%
          float: left
          background-color: #FCFDFD
          border-radius: 5px
          border: 1px solid #D8DDE9
          padding: 8px 10px
          margin: 12px 10px
          font-size: 16px
          transition: all 0.25s linear
          color: #B2BCD5
          text-indent: 5px
          &:hover
            border: 1px solid #13CE66
            text-indent: 30px
            color: #4BC380
            font-weight: 400
          &.checked
            font-weight: 700
            text-indent: 30px
            border: 1px solid #007EE5
            color: #3F9EEB
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
