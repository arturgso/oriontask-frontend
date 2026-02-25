import Now from '@/pages/Now.vue';
import Auth from '@/pages/Auth.vue';
import ConfirmEmail from '@/pages/ConfirmEmail.vue';
import ResetPassword from '@/pages/ResetPassword.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Dharmas from '@/pages/Dharmas.vue';
import { AuthService } from '@/services/AuthService';
import DharmasDetails from '@/pages/DharmasDetails.vue';
import Profile from '@/pages/Profile.vue';
import Settings from '@/pages/Settings.vue';
import NotFound from '@/pages/NotFound.vue';
import { useAuthStore } from '@/stores/AuthStore';

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
        path: '/confirm-email',
        name: 'confirm-email',
        component: ConfirmEmail,
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPassword,
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
    if (to.name === 'not-found' || to.name === 'confirm-email' || to.name === 'reset-password') {
        return true;
    }

    const authService = new AuthService();
    const authStore = useAuthStore();

    let isAuthenticated = authStore.isAuthenticated;

    // Only validate if not authenticated and last validation was more than 5 minutes ago
    const shouldValidate = !isAuthenticated && Date.now() - authStore.lastValidated > 5 * 60 * 1000;

    if (shouldValidate) {
        isAuthenticated = await authService.validateToken();
    }

    if (to.name === 'auth') {
        if (isAuthenticated) {
            return { name: 'now' };
        }
        return true;
    }

    if (!isAuthenticated) {
        return { name: 'auth' };
    }

    return true;
});

export default router;
