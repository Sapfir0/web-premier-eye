import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Ping from './components/Ping.vue'

Vue.use(Router);

// function* generatorCreator(uri) { // хах это не указатель
//   const response = yield fetch(uri); // генераторы это прикольно, но не оч
//   const data = yield response.json()
// }


export async function pingRouter() {
  const localhost = "http://localhost:5000/gallery"
  const response = await fetch(localhost);
  const json = await response.json();
  // json.forEach( async (element) => {
  //   const res = await fetch("http://localhost:5000/gallery/"+element)
  //   console.log(res)
  // }); 

}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/ping',
      name: 'ping',
      component: Ping
    }
  ],
});
