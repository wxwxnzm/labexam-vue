/**
 * Created by gjx on 17-5-6.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import login from 'components/login.vue';
import home from 'components/home.vue';
import info from 'components/webInfo/index.vue';
import infoList from 'components/webInfo/infoList.vue';
import infoSingle from 'components/webInfo/infoSingle.vue';
import infoMain from 'components/webInfo/infoMain.vue';
import subjects from 'components/webInfo/subjects.vue';
import doTopic from 'components/userDo/doTopic.vue';
import result from './components/userDo/result.vue';
import me from 'components/me.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'login', component: login },
  { path: '/home', name: 'home', component: home },
  { path: '/info',
    name: 'info',
    component: info,
    redirect: '/info/list',
    children: [
      {path: '/info/list', name: infoList, component: infoList},
      {path: '/info/single', name: infoSingle, component: infoSingle},
      {path: '/info/main', name: infoMain, component: infoMain}
    ]
  },
  { path: '/subjects', name: 'sub', component: subjects },
  { path: '/doTopic', name: 'doTopic', component: doTopic },
  { path: '/result', name: 'result', component: result },
  { path: '/me', name: 'me', component: me },
  { path: '*', redirect: '/home' }
];
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

export default router;
