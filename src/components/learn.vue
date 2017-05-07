<template>
	<div class="learnning">
		<img src="/static/img/learn_learn01.png" width="100%">
		<div class="essay-main">
			<div class="essay-list">
				<div class="title">文章列表</div>
				<ul>
					<li  class="essay-list-item" :class='{active: iscur === index}' v-for='(data,index) in essays' @click='change(data.data,index,data.count)'>{{data.subject}}({{data.count}})</li>
				</ul>
			</div>
			<div class="essay-content">
				<div class="essay-item" v-for='(item,index) in nowPageEssaysData' v-if='!item_show' @click = inEssay(item)>
					<img src="/static/img/learn_learn02.jpg" alt="">
					<div class="title">{{item.title}}
						<div class="content">{{item.content}}</div>
					</div>
				</div>
				<div class="essay-main" v-if = 'item_show'>
					<div class="title">标题:{{cur_essay.title}}
						<div class="browse">浏览人数:{{cur_essay.browse_count}}</div>
						<div class="content">{{cur_essay.content}}</div>
					</div>
				</div>
				<a @click='pregPage' class="changes" v-show='showPregPage'>上一页</a>
				<a @click='nextPage' class="changes" v-show='showNextPage'>下一页</a>
				<a @click='pregEssay' class="changes" v-show='showPregEssay'>上一篇</a>
				<a @click='nextEssay' class="changes" v-show='showNextEssay'>下一篇</a>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				essays: [],
				iscur: this.$route.params.subId,
				single_sub_essays: [],
				item_show: false,
				pageNow: 0,
				cur_essay_id: 1,
				max: Number
			};
		},
		created() {
			// 请求所有的文章
			this.$http.get('api/essay').then((response) => {
				this.essays = response.body;
				this.$nextTick(() => {
					// 单科的文章赋值
					this.single_sub_essays = this.essays[0].data;
					// 当前页的文章数据赋值
					this.max = this.essays[0].count;
		        });
			});
		},
		computed: {
			nowPageEssaysData: function() {
				return this.single_sub_essays.slice(this.pageNow, this.pageNow + 4);
			},
			cur_essay: function() {
				return this.single_sub_essays[this.cur_essay_id - 1];
			},
			showPregPage: function() {
				if (this.item_show || this.pageNow === 0) {
					return false;
				}
				return true;
			},
			showNextPage: function () {
				if (this.item_show || (this.pageNow + 3) >= this.max) {
					return false;
				}
				return true;
			},
			showPregEssay: function () {
				if (this.item_show && this.cur_essay_id !== 1) {
					return true;
				}
				return false;
			},
			showNextEssay: function () {
				if (this.item_show && this.cur_essay_id <= (this.max - 1)) {
					return true;
				}
				return false;
			}
		},
		methods: {
			change(data, index, count) {
				this.single_sub_essays = data;
				this.iscur = index;
				this.item_show = false;
				this.pageNow = 0;
				this.max = count;
			},
			inEssay(essay) {
				this.cur_essay_id = essay.id;
				this.cur_essay = essay;
				this.item_show = true;
			},
			pregPage() {
				this.pageNow -= 4;
			},
			nextPage() {
				this.pageNow += 4;
			},
			pregEssay() {
				this.cur_essay_id -= 1;
			},
			nextEssay() {
				this.cur_essay_id += 1;
			}
		}
	};

</script>

<style lang="stylus" rel="stylesheet/stylus">
	.essay-main
	  display: flex
	  min-height: 650px
	  .essay-list
	    margin: 3px
	    flex: 1
	    border: 2px solid #656565
	    .active
	      color: #2E6FA0
	      cursor: pointer
	    .title
	      margin: 2px
	      background: linear-gradient(to left, #fff 0%, rgba(8,151,217,0.8) 100%)
	    .essay-list-item
	      width: 100%
	      height: 40px
	      font-size: 18px
	      font-weight: 700
	      &:hover
	        color: #2E6FA0
	        cursor: pointer
	    &>ul
	      padding: 30px 5px
	  .essay-content
	    margin: 3px
	    border: 2px solid #656565
	    flex: 3
	    padding: 5px
	    &>.essay-item
	      width: 100%
	      margin: 5px 2px
	      display: flex
	      cursor: pointer
	      border: 2px solid
	      &:hover
	        border: 2px solid #2E6FA0
	      &>.title
	        font-size: 24px
	        font-weight: 500
	        color: #383838
	        height: 25px
	        &>.content
	          font-size: 14px
	          font-weight: 200
	    &>.essay-main
	      &>.title
	        width: 100%
	        display: block
	        text-align: center
	        &>.browse
	          font-size: 18px
	        &>.content
	          font-size: 18px
	          font-weight: 400
	          text-align: left
	          text-indent: 2em
	    &>.changes
	      font-size: 14px
	      font-weight: 700
	      cursor: pointer
</style>
