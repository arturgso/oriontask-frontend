import Dashboard from '../pages/Dashboard.vue';
import Auth from '../pages/Auth.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
