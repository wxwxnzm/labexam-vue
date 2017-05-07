<template>
	<div class="time-warpper">
		<el-button type="primary">{{msg}}</el-button>
	</div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
	export default {
		data() {
			return {
				msg: '',
				times: 60 * this.minues,
				timer: null
			};
		},
		created() {
			this.deadline();
		},
    computed: {
      ...mapGetters({
        minues: 'getTime'
      })
    },
		methods: {
			deadline() {
				var minutes,
				seconds;
				var usertime = 0;
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
