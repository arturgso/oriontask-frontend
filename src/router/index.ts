import Now from '@/pages/Now.vue';
import Auth from '@/pages/Auth.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Dharmas from '@/pages/Dharmas.vue';

const routes = [
    {
        path: '/',
        name: 'now',
        component: Now,
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
