<template>
    <div id='goTop' @click='goTop' v-show = 'toTop'>
      <img src="/static/img/goTop.png">
    </div>
</template>
<script>
	let stop = false;
	let timer = null;
	export default {
	    data() {
	      return {
	        toTop: false
	      };
	    },
	    mounted() {
	      this.$nextTick(function () {
	         window.addEventListener('scroll', this.needToTop);
	      });
	    },
	    // methods: {
	    //   goTop: function() {
	    //     clearInterval(timer);
	    //     timer = setInterval(function() {
	    //         let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
	    //         var now = curHeight;
	    //         var speed = (0 - now) / 7;
	    //         speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
	            // console.log(`当前的高度应该是:` + curHeight);
	    //         if (curHeight === 0) {
	    //           clearInterval(timer);
	    //         }
	    //         document.documentElement.scrollTop = curHeight + speed;
	    //         document.body.scrollTop = curHeight + speed;
	    //         this.dataStop = false;
	            // console.log(stop);
	    //         this.dataStop = false;
	            // console.log('我来观察你啦!111: ' + this.dataStop);
	    //     }, 3000);
	    //   },
	    //   needToTop: function() {
	    //     let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
	    //     let viewHeight = document.documentElement.clientHeight;
	    //     if (curHeight > viewHeight + 100) {
	    //       this.toTop = true;
	    //     }
	    //     else
	    //     {
	    //       this.toTop = false;
	    //     }
	    //     if (this.dataStop) {
	    //       this.dataStop = true;
	          // console.log('我来观察你啦!222: ' + this.dataStop);
	    //       clearInterval(timer);
	          // console.log('当前的stop:' + stop);
	    //     }
	    //       this.dataStop = true;
	          // console.log('我来观察你啦!333: ' + this.dataStop);
	    //     this.dataStop = true;
	    //   }
	    // }
	    methods: {
	      goTop: function() {
	        clearInterval(timer);
	        timer = setInterval(function() {
	            let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
	            var now = curHeight;
	            var speed = (0 - now) / 7;
	            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
	            // console.log(`当前的高度应该是:` + curHeight);
	            if (curHeight === 0) {
	              clearInterval(timer);
	            }
	            stop = false;
	            document.documentElement.scrollTop = curHeight + speed;
	            document.body.scrollTop = curHeight + speed;
	            // console.log(stop);
	            // console.log('我来观察你啦!111: ' + stop);
	        }, 30);
	      },
	      needToTop: function() {
	        let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
	        let viewHeight = document.documentElement.clientHeight;
	        if (curHeight > viewHeight + 100) {
	          this.toTop = true;
	        }
	        else
	        {
	          this.toTop = false;
	        }
	        if (stop) {
	          // console.log('我来观察你啦!222: ' + stop);
	          clearInterval(timer);
	        }
	          stop = true;
	          // console.log('我来观察你啦!333: ' + stop + '\n此时完成一次滚动事件');
	      }
	    }
	};
</script>
	
<style >
	#goTop {
	    display: block;
	    position: fixed;
	    z-index: 1000;
	    right: 50px;
	    bottom: 50px;
 	 }
</style>