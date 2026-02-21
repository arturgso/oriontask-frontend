import Now from '@/pages/Now.vue';
import Auth from '@/pages/Auth.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Dharmas from '@/pages/Dharmas.vue';
import { AuthService } from '@/services/AuthService';
import DharmasDetails from '@/pages/DharmasDetails.vue';
import Profile from '@/pages/Profile.vue';
import Settings from '@/pages/Settings.vue';
import NotFound from '@/pages/NotFound.vue';
import Cookie from 'js-cookie';

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
    {
        path: '/dharmas/:id',
        name: 'dharmas-details',
        component: DharmasDetails,
        props: true,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    if (to.name === 'not-found') {
        return true;
    }

    const authService = new AuthService();
    const hasToken = Boolean(Cookie.get('access_token'));

    if (to.name === 'auth') {
        if (!hasToken) {
            return true;
        }

        const ok = await authService.validateToken();

        if (ok) {
            return { name: 'now' };
        }

        await authService.logout();
        return true;
    }

    if (!hasToken) {
        return { name: 'auth' };
    }

    const ok = await authService.validateToken();

    if (!ok) {
        await authService.logout();
        return { name: 'auth' };
    }

    return true;
});

export default router;
