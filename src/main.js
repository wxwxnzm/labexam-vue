import Vue from 'vue';
import router from './router';
import App from './App';
import store from 'src/vuex/store.js'; // 管理web和考试
import 'element-ui/lib/theme-default/index.css'; // ele组件样式

import VueResource from 'vue-resource';
import elementUI from 'element-ui';
Vue.use(VueResource); // ajax请求
Vue.use(elementUI); // ele组件

Vue.http.interceptors.push((request, next) => {
  var loading = Vue.prototype.$loading({ fullscreen: true });
  // let loadingInstance = Loading.service(options);
  next((response) => {
    // loadingInstance.close();
    // setTimeout(() => {
    //   loading.close();
    // }, 3000);
    loading.close();
    if (response.ok && response.status === 200) {
      return response;
    } else if (!response.ok) {
      Vue.prototype.$message.error('失败:' + response.url);
      return response;
    }
  });
});
// 请求过滤

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');
