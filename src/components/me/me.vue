<template>
	<div id='me'>
	  <div class="my-info">
	  	<h2>用户信息</h2>
	  	<div class="info-list">
	  		<p><label for="infoName">用户名</label><input id="infoName" type='text' :value='myInfo.name'></input></p>
	  		<p><label for="infoEmail">邮箱</label><input id="infoEmail" type='text' :value='myInfo.email'></input></p>
	  		<p><label for="infoPhone">电话</label><input id="infoPhone" type='text' :value='myInfo.phone'></input></p>
	  		<p><label for="infoNumber">编号</label><input id="infoNumber" type='text' :value='myInfo.number'></input></p>
	  		<button class="submit">修改</button>
	  	</div>
	  </div>
	  <div class="my-exam">
	  	<h2>我的考试</h2>
	  	<div class="exam-count">
	  		<div>考试次数: <span>{{examcount.number}}</span></div>
	  		<div>平均分数: <span>{{examcount.average}}</span></div>
	  		<div>最高分数: <span>{{examcount.max}}</span></div>
	  		<div>最低分数: <span>{{examcount.min}}</span></div>
	  	</div>
	  	<div class="exam-list">
	  		<div class="list-head">
	  			<div class="name">考试名称</div>
	  			<div class="usingtime">用时</div>
	  			<div class="time">考试时间</div>
	  			<div class="time">分数</div>
	  		</div>
	  		<div class="list-item" :id='exam.userTest_id' v-for='exam in myExam' @click = 'intoExam(exam.userTest_id)' :class='{eo: exam.score === examcount.min,max: exam.score === examcount.max}'>
	  			<div class="name">{{exam.exam_name}}</div>
	  			<div class="usingtime">{{exam.time_cost}}</div>
	  			<div class="time">{{exam.time}}</div>
	  			<div  class="score">{{exam.score}}</div>
	  			<span class="icon-point-left"></span>
	  		</div>
	  	</div>
	  	<div class="singleExam">
		  	<div class="curExam" v-for='topic in curExam'>
		  		<topicContent  :topic='topic'></topicContent>
		  	</div>
	  	</div>
	  </div>
	</div>
</template>

<script>
	import topicContent from 'components/topicContent/topicContent';
	function handleData(apiData) {
		var topics = [];
		for (var i = 0; i < apiData.length; i++) {
			topics[i] = {};
			topics[i]['type'] = apiData[i]['type_name'];
			topics[i]['topic_id'] = apiData[i]['topic_id_name'];
			topics[i]['content'] = apiData[i]['topic_content'];
			topics[i]['score'] = apiData[i]['topic_score'];
			topics[i]['topic_option'] = apiData[i]['topic_option'];
			topics[i]['type'] = apiData[i]['type_name'];
			topics[i]['cur'] = i;
			topics[i]['curAnswer'] = apiData[i]['topic_answer'];
			topics[i]['userAnswer'] = apiData[i]['user_answer'];
		}
		return topics;
	};
	export default {
		data() {
			return {
				myExam: {},
				myPratice: {},
				examcount: {},
				myInfo: {},
				curExam: [],
				maxScore: 0
			};
		},
		created() {
			this.getMe();
		},
		methods: {
			getMe: function() {
				const id = window.localStorage.getItem('myId');
				this.$http.get('api/me/myexamlist/' + id).then((respanse) => {
					this.myExam = respanse.body;
					this.countExam();
				});
				// ajax
				this.$http.get('api/me/info/' + id).then((respanse) => {
					this.myInfo = respanse.body;
				});
				// ajax
			},
			countExam() {
				this.examcount.number = this.myExam.length;
				// 得到次数
				let total = 0;
				let min = this.myExam[0].score;
				let max = this.myExam[0].score;
				let minid = 0;
				let maxid = 0;
				let maxids = [];
				let minids = [];
				for (var i in this.myExam) {
					total += this.myExam[i].score;
					if (min > this.myExam[i].score) {
						minid = i;
						min = this.myExam[i].score;
					}
					if (max < this.myExam[i].score) {
						maxid = i;
						max = this.myExam[i].score;
					}
				}
				for (i in this.myExam) {
					if (this.myExam[i].score === minid) {
						minids.push(i);
					}
					if (this.myExam[i].score === maxid) {
						maxids.push(i);
					}
				}
				this.examcount.average = parseInt(total / this.examcount.number);
				this.examcount.min = min;
				this.examcount.minids = minids;
				this.examcount.max = max;
				this.examcount.maxids = maxids;
			},
			intoExam(id) {
				this.$http.get('api/me/myexam/' + id).then((respanse) => {
					this.curExam = handleData(respanse.body);
				});
			}
		},
		components: {
			topicContent
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#me
	  padding: 0 50px
	  &>.my-exam
	    border: 1px solid #e0e0e0
	    &>.exam-count
	      display: flex
	      font-size: 24px
	      padding: 4px
	      margin: 5px
	      &>div
	        flex: 1
	        text-align: center
	        color: #969696
	        &>span
	          color: #00bc9b
	          font-weight: 700
	    &>.exam-list
	      &>.list-head
	        display: flex
	        background: #ededed
	        text-align: center
	        font-size: 20px
	        padding: 2px
	        &>div
	          flex: 1
	      &>.list-item
	        display: flex
	        text-align: center
	        padding: 7px
	        transition: 0.3
	        cursor: pointer
	        border: 1px solid rgba(237, 237, 237, 0.55)
	        &:hover
	          background-color: #ededed
	          padding: 7px
	          border: 1px solid #e0e0e0
	          color: rgba(0, 188, 155, 0.71)
	          font-weight: 400
	          &>.icon-point-left
	            display: block
	        &>div
	          flex: 1
	        &>.icon-point-left
	          position: relative
	          left: 23px
	          display: none
	        &.eo
	          color: red
	          font-weight: 700
	        &.max
	          color: #00bc9b
	          font-weight: 700
	    &>.singleExam
	      width: 80%
	      margin: 0 auto
	  &>.my-info
	    border: 1px solid #e0e0e0
	    &>.info-list
	      font-size: 24px
	      color: #00bc9b
	      padding: 33px
	      width: 100%
	      &>p>label
	        width: 100px
	        display: inline-block
	        padding: 3px
	      &>p>input
	        text-align: center
	        border: 1px solid
	      &>.submit
	        float: right
</style>
