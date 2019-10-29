import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PageNotFound from './components/PageNotFound.vue';

Vue.use(Router);


async function fetchTo(url: string) {
    const response = await fetch(url);
    const { status } = response;
    if (status === 404) {
        const { statusText } = response;
        console.log('Статус', statusText);
    }
    return response.json();
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
];

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export {
    fetchTo
};
