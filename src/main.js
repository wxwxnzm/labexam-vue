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
import elementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(elementUI);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: home },
  { path: '/me', component: me },
  { path: '/essay', component: learn },
  { path: '/exam/:subId', name: 'exam', component: doTopic },
  { path: '/learn/:subId', name: 'learn', component: learn },
  { path: '/pratice/:subId', name: 'pratice', component: doTopic },
  { path: '/moni/:subId', name: 'moni', component: doTopic },
  { path: '/tips', name: 'tips', component: information },
  { path: '/rules', name: 'rules', component: information },
  { path: '/coursewares', name: 'coursewares', component: information },
  { path: '/flags', name: 'flags', component: information }
];
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
