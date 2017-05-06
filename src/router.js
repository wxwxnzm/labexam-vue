/**
 * Created by gjx on 17-5-6.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import login from 'components/login.vue';
import home from 'components/home.vue';
import info from 'components/webInfo/index.vue';
import subjects from 'components/webInfo/subjects.vue';
import doTopic from 'components/userDo/doTopic.vue';
import result from './components/userDo/result.vue';
import me from 'components/me.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'login', component: login },
  { path: '/home', name: 'home', component: home },
  { path: '/info', name: 'info', component: info },
  { path: '/subjects', name: 'sub', component: subjects },
  { path: '/doTopic', name: 'doTopic', component: doTopic },
  { path: '/result', name: 'result', component: result },
  { path: '/me', name: 'me', component: me },
  // { path: '/webInfo',
  //   name: 'webInfo',
  //   component: information,
  //   children: [
  //     { path: '/list', name: infoList, component: infoList },
  //     { path: '/item', name: infoMain, component: infoMain },
  //   ]
  // },
  // { path: '/essay', name: 'essay', component: learn },
  // { path: '/exam/:subId', name: 'exam', component: doTopic },
  // { path: '/learn/:subId', name: 'learn', component: learn },
  // { path: '/pratice/:subId', name: 'pratice', component: doTopic },
  // { path: '/moni/:subId', name: 'moni', component: doTopic },
  // { path: '/tips', name: 'tips', component: information },
  // { path: '/rules', name: 'rules', component: information },
  // { path: '/coursewares', name: 'coursewares', component: information },
  // { path: '/flags', name: 'flags', component: information },
  { path: '*', redirect: '/home' }
];
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

export default router;
