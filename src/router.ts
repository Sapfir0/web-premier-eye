import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PageNotFound from './components/PageNotFound.vue';

Vue.use(Router);

function getImage(filename: string) {
    return `http://localhost:8050/gallery/${filename}`;
}

const port = 8050;

async function pingRouter(camerId: number) {
    const localhost = `http://localhost:${port}/gallery/camera/${camerId}`;
    const response = await fetch(localhost);
    const { status } = response;
    if (status === 404) {
        const { statusText } = response;
        console.log('Статус', statusText);
    }
    return await response.json()
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

export {port, pingRouter};
