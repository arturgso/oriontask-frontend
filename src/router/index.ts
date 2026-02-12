import Now from '@/pages/Now.vue';
import Auth from '@/pages/Auth.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Dharmas from '@/pages/Dharmas.vue';
import { AuthService } from '@/services/AuthService';

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

router.beforeEach(async (to)  => {
    if (to.name === 'auth') {
        return true
    }

    const authService = new AuthService();
    const ok = await authService.validateToken();

    if (!ok) {
        await authService.logout();
        return {name: 'auth'};
    }

    return true
})

export default router;
