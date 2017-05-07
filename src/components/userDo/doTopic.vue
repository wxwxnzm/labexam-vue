<template>
	<div class='doTopic'>
    <el-steps :space="250" direction="vertical" :active="active" class="topic-steps">
      <!--<el-step status="wait" ></el-step>-->
      <!--<el-step status="process"></el-step>-->
      <!--<el-step status="finish"></el-step>-->
      <!--<el-step status="error"></el-step>-->
      <!--<el-step status="success"></el-step>-->
      <el-step v-for="(topic,index) in topics" :status="topicStatu(topic.done)" v-show="curPageData.indexOf(topic) !== -1"></el-step>
    </el-steps>
    <div class="main">
      <div class="item" v-for="(topic,index) in curPageData">
        <topicContent :topic=topic @doSelect="handleSelect"></topicContent>
      </div>
    </div>

    <div class="topic-footer">
      <el-button type="primary"style="float: left">{{msg}}</el-button>
      <el-pagination
        @current-change="curChange"
        :page-size="5"
        layout="total,prev, pager, next"
        :total="50">
      </el-pagination>
      <el-button type="primary" style="float: right;position: relative;top: -36px;right: 0px;" @click="dialogVisible = true">提交答卷</el-button>
      <el-dialog
        :modal-append-to-body="true"
        title="提示"
        v-model="dialogVisible"
        size="tiny">
        <span>确认提交答卷吗？提交后将无法修改</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="postTopics">确 定</el-button>
        </span>
      </el-dialog>
    </div>
	</div>
</template>
<script type="text/ecmascript-6">
  import topicContent from 'components/component/topicContent';
  import {mapGetters, mapActions} from 'vuex';
  import {formatDate} from '../../common/js/date.js';
  const FINISHING = 1;
  const BEFOREFINISH = 0;
  const AFTERFINISH = 0;
  export default {
    data() {
      return {
        msg: '',
        times: 0,
        timer: null,
        dialogVisible: false,
        stepLen: 200,
        active: 1,
        page: 1,
        pageSize: 5,
//        curPageData: [0, 1, 2, 3, 4],
        topics: [],
        userAnswers: [],
        finishing: window.localStorage.getItem('userFinish')
      };
    },
    created() {
      if (!(this.finishing * 1)) {
        window.localStorage.setItem('userFinish', FINISHING);

        /* 从后台取得试题 */
        this.getTopics();

        /* 置空用户答案 */
        window.localStorage.setItem('userInfo', JSON.stringify([]));

        /* 创建开始考试时间并本地存储 */
        var date = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
        window.localStorage.setItem('time', date);
      }
      else {       /* 中途退出了重新进来 */
        this.topics = JSON.parse(window.localStorage.getItem('userTopics'));
        this.userAnswers = JSON.parse(window.localStorage.getItem('userInfo'));
        this.active = JSON.parse(window.localStorage.getItem('active'));
      }
    },
    watch: {
      topics: {
        handler: function (topics) {
          window.localStorage.setItem('userTopics', JSON.stringify(topics));
        },
        deep: true
      },
      '$route'(to, from) {
      }
    },
    methods: {
      handleSelect(topic) {
        this.userAnswers[topic.xuhao - 1] = topic;
        this.active = topic.xuhao >= this.active ? topic.xuhao : this.active;
        window.localStorage.setItem('userInfo', JSON.stringify(this.userAnswers));
        window.localStorage.setItem('active', JSON.stringify(this.active));
      },
      getTopics() {
//        let url = '/api/' + this.getDoType().subject + this.getDoType().type;
        let url = 'api/exam/1';
        this.$http.get(url).then((res) => {
          console.log(res.data);
          this.topics = this.filterTopics(res.data.exam_topics);
          this.total = res.data.exam_numbers;
          this.times = 60 * res.data.exam_time;
          this.deadline();
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      postTopics() {
        const params = {
          time: window.localStorage.getItem('time'),
          user_id: window.localStorage.getItem('myId'),
          testInfo: JSON.parse(window.localStorage.getItem('userInfo')).filter(index => index !== null),
          terminate: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        };
//        const api = 'api/' + this.doType + '/submit';
        const api = 'api/exam/submit';
        this.$http.post(api, params).then((response) => {
          this.$message({type: 'success', message: '提交成功'});
          this.handlerResult(response.data);
          this.setAnswers(this.topics);
          this.$router.push('/result');
        }).catch((err) => {
          this.$message.error(err);
        });
      },
      handlerResult(results) {
        for (var i in this.topics) {
//          this.topics[i]['done'] = -1;
          this.topics[i]['curAnswer'] = '';
          this.topics[i]['userAnswers'] = '';
        }
        for (var j in results) {
          if (j === 'score') {
            this.setScore(results[j]);
            return 0;
          }
          let xuhao = results[j]['xuhao'] - 1;
          this.topics[xuhao]['curAnswer'] = results[j]['dbAnswer'];
          this.topics[xuhao]['userAnswer'] = this.userAnswers[xuhao]['answer'];
          this.topics[xuhao]['right'] = results[j]['right'];
        }
      },
      curChange(curPage) {
        this.page = curPage;
      },
      filterTopics(topics) {
        var _topics = [];
        for (var i = 0; i < topics.length; i++) {
          _topics[i] = {};
          _topics[i]['type'] = topics[i]['type_name'];
          _topics[i]['topic_id'] = topics[i]['topic_id'];
          _topics[i]['content'] = topics[i]['topic_content'];
          _topics[i]['score'] = topics[i]['topic_score'];
          _topics[i]['topic_option'] = topics[i]['topic_option'];
          _topics[i]['done'] = -1;
          _topics[i]['cur'] = i;
        }
        return _topics;
      },
      topicStatu(done) {
        return done !== -1 ? 'finish' : 'wait';
      },
      deadline() {
        var minutes,
          seconds;
        var usertime = 0;
        if (this.times > 0) {
          minutes = Math.floor(this.times / 60);
          seconds = Math.floor(this.times % 60);
          this.msg = minutes + `分` + seconds + `秒`;
          --this.times;
          window.localStorage.setItem('userTime', ++usertime);
          this.timer = setTimeout(this.deadline, 1000);
        }
        else {
          clearInterval(this.timer);
        }
      },
      ...mapActions([
        'setAnswers',
        'setScore',
        'setTime'
      ])
    },
    computed: {
      ...mapGetters({
        doType: 'getDoType'
      }),
      curPageData() {
          return this.topics.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
      }
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
        width: 10%
      .main
        float: left
        width: 90%
        .item
          min-height: 150px
      .topic-footer
        padding: 20px
        clear: both
        text-align: center
</style>
