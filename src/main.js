import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';

import './common/stylus/index.styl';
import home from './components/home/home.vue';
import doTopic from './components/doTopic/doTopic.vue';
import me from './components/me/me.vue';
import result from './components/result/result.vue';
import learn from './components/learn/learn.vue';
import information from './components/information/information.vue';
import login from './components/login.vue';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(elementUI);

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    // ...
    // 请求发送后的处理逻辑
    // ...
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    if (response.ok && response.status === 200) {
      return response;
    } else if (!response.ok) {
      return '访问失败:' + response.url;
      // Vue.$message.error('访问失败:' + response.url);
    }
  });
});
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: home },
  { path: '/index', name: 'login', component: login },
  { path: '/me', name: 'me', component: me },
  { path: '/essay', name: 'essay', component: learn },
  { path: '/exam/:subId', name: 'exam', component: doTopic },
  { path: '/learn/:subId', name: 'learn', component: learn },
  { path: '/pratice/:subId', name: 'pratice', component: doTopic },
  { path: '/moni/:subId', name: 'moni', component: doTopic },
  { path: '/tips', name: 'tips', component: information },
  { path: '/rules', name: 'rules', component: information },
  { path: '/coursewares', name: 'coursewares', component: information },
  { path: '/flags', name: 'flags', component: information },
  { path: '*', redirect: '/home' }
];
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
