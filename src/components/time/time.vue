<template>
	<div class="time-warpper">
		距离考试结束还有:{{msg}}
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			exam_time: {
				type: Number,
				default() {
					return 60;
				}
			}
		},
		data() {
			return {
				msg: '',
				times: 60 * this.exam_time,
				timer: null
			};
		},
		created() {
			this.deadline();
		},
		methods: {
			deadline() {
				var minutes,
				seconds,
				usertime;
				if (this.times > 0) {
					minutes = Math.floor(this.times / 60);
					seconds = Math.floor(this.times % 60);
					this.msg = minutes + `分` + seconds + `秒`;
					--this.times;
					this.timer = setTimeout(this.deadline, 1000);
					window.localStorage.setItem('userTime', ++usertime);
				}
				else {
					clearInterval(this.timer);
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>