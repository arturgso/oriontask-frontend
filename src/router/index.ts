import Dashboard from '@/pages/Dashboard.vue';
import Auth from '@/pages/Auth.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Dharmas from '@/pages/Dharmas.vue';

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
    {
        path: '/dharmas',
        name: 'dharmas',
        component: Dharmas,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
