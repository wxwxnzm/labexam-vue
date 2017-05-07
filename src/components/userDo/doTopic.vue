<template>
	<div class='doTopic'>
    <el-steps :space="250" direction="vertical" :active="active" class="topic-steps">
      <!--<el-step status="wait" ></el-step>-->
      <!--<el-step status="process"></el-step>-->
      <!--<el-step status="finish"></el-step>-->
      <!--<el-step status="error"></el-step>-->
      <!--<el-step status="success"></el-step>-->
      <el-step v-for="(topic,index) in topics" v-show="curPageData.indexOf(index) !== -1"></el-step>
    </el-steps>
    <div class="main">
      <div class="item" v-for="(topic,index) in curPageData">
        <topicContent @doSelect="handleSelect"></topicContent>
      </div>
    </div>
    <div class="topic-footer">
      <el-pagination
        layout="total,prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
	</div>
</template>
<script type="text/ecmascript-6">
  import topicContent from 'components/component/topicContent';
  import {mapGatters} from 'vuex';
  export default {
    data() {
      return {
        stepLen: 200,
        active: 7,
        gg: 30,
        curPageData: [6, 7, 8, 9, 10],
        topics: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        userAnswers: []
      };
    },
    created() {
//      this.getTopics();
    },
    methods: {
      handleSelect(topic) {
        this.userAnswers[topic.id] = topic;
      },
      getTopics() {
        let url = '/api/' + this.getDoType().subject + this.getDoType().type;
        this.$http.get().then((res) => {
          this.topics = res.data;
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      postTopics() {
        this.$http.post().then((res) => {
          this.topics = res.data;
        }).catch((err) => {
          this.$message.error(err);
        });
      }
    },
    computed: {
      ...mapGatters({
        doType: 'getDoType'
      })
    },
    components: {
      topicContent
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .doTopic
      overflow: auto
      padding: 0 200px
      .topic-steps
        float: left
      .main
        float: left
        width: 90%
        .item
          min-height: 150px
      .topic-footer
        clear: both
        text-align: center
</style>
<!--<script type="text/ecmascript-6">-->
	<!--import topicContent from 'components/component/topicContent';-->
	<!--import result from 'components/userDo/result';-->
	<!--import examtime from 'components/userDo/time';-->
	<!--import {formatDate} from '../../common/js/date.js';-->
	<!--var handlerDatas = function(datas) {-->
		<!--var topics = [];-->
		<!--for (var i = 0; i < datas.length; i++) {-->
			<!--topics[i] = {};-->
			<!--topics[i]['type'] = datas[i]['type_name'];-->
			<!--topics[i]['topic_id'] = datas[i]['topic_id'];-->
			<!--topics[i]['content'] = datas[i]['topic_content'];-->
			<!--topics[i]['score'] = datas[i]['topic_score'];-->
			<!--topics[i]['topic_option'] = datas[i]['topic_option'];-->
			<!--topics[i]['done'] = -1;-->
			<!--topics[i]['cur'] = i;-->
		<!--}-->
		<!--return topics;-->
	<!--};-->
	<!--const FINISHING = 1;-->
	<!--const BEFOREFINISH = 0;-->
	<!--const AFTERFINISH = 0;-->
	<!--export default {-->
		<!--data() {-->
			<!--return {-->
				<!--topics: [],-->
				<!--iscur: 0,-->
				<!--done: 0,-->
				<!--currentTopic: '',-->
				<!--show: true,-->
				<!--userAnswers: [],-->
				<!--type: 1,-->
				<!--result: [],-->
				<!--userScore: Number,-->
				<!--finishing: window.localStorage.getItem('userFinish'),-->
				<!--exam_name: '',-->
				<!--exam_time: Number-->
			<!--};-->
		<!--},-->
		<!--watch: {-->
			<!--topics: {-->
				<!--handler: function (topics) {-->
					<!--window.localStorage.setItem('userTopics', JSON.stringify(topics));-->
				<!--},-->
				<!--deep: true-->
			<!--}-->
		<!--},-->
		<!--created() {-->
			<!--// if (this.$route.name === 'pratice') {-->
			<!--// }-->
			<!--// else {-->
				<!--/* 第一次进入考试 */-->
				<!--if (!(this.finishing * 1)) {-->
					<!--window.localStorage.setItem('userFinish', FINISHING);-->

					<!--/* 从后台取得试题 */-->
					<!--this.getTopics();-->

					<!--/* 置空用户答案 */-->
					<!--window.localStorage.setItem('userInfo', JSON.stringify([]));-->

					<!--/* 监听题目组件选中题目的派发 */-->
					<!--this.$on('select', function(data) {-->
						<!--this.topics[data.xuhao - 1]['done'] = data.option;-->
						<!--// 存答案-->
						<!--this.userAnswers[data.xuhao - 1] = data;-->
						<!--window.localStorage.setItem('userInfo', JSON.stringify(this.userAnswers));-->
					<!--});-->

					<!--/* 创建开始考试时间并本地存储 */-->
					<!--var date = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');-->
					<!--window.localStorage.setItem('time', date);-->
				<!--}-->
				<!--/* 中途退出了重新进来 */-->
				<!--else {-->
					<!--this.topics = JSON.parse(window.localStorage.getItem('userTopics'));-->
					<!--this.userAnswers = JSON.parse(window.localStorage.getItem('userInfo'));-->
				<!--}-->
			<!--// }-->
			<!--this.$parent.$emit('hideHeader');-->
		<!--},-->
		<!--methods: {-->
			<!--read(index) {-->
				<!--this.iscur = index;-->
			<!--},-->
			<!--getTopics() {-->
				<!--const sub_id = this.$route.params['subId'];-->
				<!--const _type = this.$route.name;-->
				<!--const api = 'api/' + _type + '/' + sub_id;-->
				<!--// 定义后端接口-->
				<!--this.$http.get(api).then((response) => {-->
					<!--this.topics = handlerDatas(response.body.exam_topics ? response.body.exam_topics : response.body.practice_topics);-->
					<!--// this.userAnswers全部存上空值-->
					<!--for (let i = 0; i < this.topics.length; i++) {-->
						<!--this.userAnswers[i] = {};-->
						<!--this.userAnswers[i]['xuhao'] = i + 1;-->
						<!--this.userAnswers[i]['answer'] = '';-->
						<!--this.userAnswers[i]['topic_id'] = this.topics[i]['topic_id'];-->
					<!--}-->
					<!--this.exam_name = response.body.exam_name;-->
					<!--this.exam_time = response.body.exam_time;-->
					<!--this.$nextTick(() => {-->
						<!--this.show = false;-->
						<!--// 提示的显示-->
					<!--});-->
				<!--});-->
			<!--},-->
			<!--postAnswers() {-->
				<!--const params = {-->
					<!--time: window.localStorage.getItem('time'),-->
					<!--user_id: window.localStorage.getItem('myId'),-->
					<!--testInfo: JSON.parse(window.localStorage.getItem('userInfo')).filter(index => index !== null),-->
					<!--terminate: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')-->
				<!--};-->
				<!--const _type = this.$route.name;-->
				<!--const api = 'api/' + _type + '/submit';-->
				<!--this.$http.post(api, params).then((response) => {-->
					<!--this.$nextTick(() => {-->
						<!--this.type = 0;-->
						<!--this.handlerResult(response.body);-->
						<!--this.result = this.topics;-->
					<!--});-->
				<!--});-->
				<!--window.localStorage.setItem('userFinish', AFTERFINISH);-->
			<!--},-->
			<!--handlerResult(results) {-->
				<!--for (var i in this.topics) {-->
					<!--this.topics[i]['done'] = -1;-->
					<!--this.topics[i]['curAnswer'] = '';-->
					<!--this.topics[i]['userAnswers'] = '';-->
				<!--}-->
				<!--for (var j in results) {-->
					<!--if (j === 'score') {-->
						<!--this.userScore = results[j];-->
						<!--return 0;-->
					<!--}-->
					<!--let xuhao = results[j]['xuhao'] - 1;-->
					<!--this.topics[xuhao]['curAnswer'] = results[j]['dbAnswer'];-->
					<!--this.topics[xuhao]['userAnswer'] = this.userAnswers[xuhao]['answer'];-->
					<!--this.topics[xuhao]['right'] = results[j]['right'];-->
				<!--}-->
			<!--},-->
			<!--pergpage() {-->
				<!--this.iscur -= 1;-->
			<!--},-->
			<!--nextpage() {-->
				<!--this.iscur += 1;-->
			<!--},-->
			<!--more() {-->
				<!--this.type = 2;-->
			<!--},-->
			<!--less() {-->
				<!--this.type = 1;-->
			<!--}-->
		<!--},-->
		<!--components: {-->
			<!--topicContent,-->
			<!--result,-->
			<!--examtime-->
		<!--}-->
	<!--};-->
<!--</script>-->

<!--<style lang="stylus" rel="stylesheet/stylus">-->
	<!--#topic-main-->
	  <!--border-radius: 2px-->
	  <!--margin: 65px 100px 65px 100px-->
	  <!--min-width: 400px-->
	  <!--background-color: rgba(66, 185, 131, 0.33)-->
	  <!--.header-->
	    <!--text-align: center-->
	    <!--font-weight: 900-->
	    <!--font-size: 30px-->
	    <!--&>.tips-->
	      <!--background-color:rgb(227, 22, 119)-->
	    <!--&>.tip-leave-active-->
	      <!--transition: all 5s ease-->
	      <!--transform: translateX(100px);-->
	      <!--opacity: 0;-->
	    <!--&>.tip-leave-->
	      <!--opacity: 1-->
	  <!--.list-->
	    <!--margin: 0px 1px 10px 1px-->
	    <!--display: flex-->
	    <!--flex-flow: row wrap-->
	    <!--max-height: 200px-->
	    <!--overflow: auto-->
	    <!--&gt;li-->
	      <!--flex: 0 0 10%-->
	      <!--height: 30px-->
	      <!--line-height: 30px-->
	      <!--background-color: rgba(127, 140, 141, 0.46)-->
	      <!--border-radius: 5px-->
	      <!--text-align: center-->
	      <!--padding: 1px 2px-->
	      <!--&:hover,&:active-->
	        <!--background-color: rgba(66, 185, 131, 0.59)-->
	        <!--cursor: pointer-->
	      <!--&.active-->
	        <!--background-color: #42b983-->
	      <!--&.done-->
	        <!--background-color: #337ab7-->
	  <!--.wrapper-->
	    <!--width: 100%-->
	    <!--background-color: rgba(66, 185, 131, 0.33)-->
	  <!--.footer-->
	    <!--min-height: 50px-->
	    <!--text-align: center-->
	    <!--display: flex-->
	    <!--&>div-->
	      <!--cursor: pointer-->
	      <!--flex: 1-->
	      <!--line-height: 50px-->
	      <!--width: 100%-->
	      <!--border-radius: 5px-->
	      <!--border: 1px solid green-->
	      <!--margin: 2px-->
	      <!--&:hover-->
	        <!--background-color: rgba(127,140,141,0.46)-->
	        <!--color: white-->
	      <!--&.sbumit:hover-->
	        <!--background-color: #008000-->
	  <!--.choose-->
	    <!--position: fixed-->
	    <!--top:200px-->
	    <!--left: 20px-->
	    <!--border: 1px solid #4cae4c-->
	    <!--&>div-->
	      <!--font-size: 18px-->
	      <!--border-radius: 5px-->
	      <!--background-color: #fff-->
	      <!--cursor: pointer-->
	      <!--&:hover-->
	        <!--background-color: #449d44-->
	      <!--&.active-->
	        <!--background-color: #5cb85c-->
<!--</style>-->
