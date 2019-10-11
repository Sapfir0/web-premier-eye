import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PageNotFound from './components/PageNotFound.vue';

Vue.use(Router);


const routes = [
  {
    path: '*',
    component: PageNotFound,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/ping',
    name: 'ping',
    component: () => import('./components/Ping.vue'),
  },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
