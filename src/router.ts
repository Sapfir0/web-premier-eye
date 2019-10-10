import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PageNotFound from './components/PageNotFound.vue';

Vue.use(Router);


export async function pingRouter() {
  const localhost: string = 'http://localhost:5000/gallery';
  const response = await fetch(localhost);
  const json = await response.json();
  json.forEach(async (element) => {
    const res = await fetch(`http://localhost:5000/gallery/${element}`);
    console.log(res);
  });
}

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
