<script lang="ts" setup>
import { PanelLeftClose, Zap, List, User, LogOut } from 'lucide-vue-next';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import DharmaList from '@/components/ui/DharmaList.vue';
import Divider from '@/components/ui/Divider.vue';
import NavButton from '@/components/sidebar/NavButton.vue';
import SettingsSection from '@/components/sidebar/SettingsSection.vue';
import { AuthService } from '@/services/AuthService';
import { useRouter } from 'vue-router';

const props = defineProps<{
    mobileMenuOpen?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:mobileMenuOpen', value: boolean): void;
}>();

const closed = ref(false);
const isMobile = ref(false);
const router = useRouter();
const isMobileMenuOpen = computed({
    get: () => props.mobileMenuOpen ?? false,
    set: (value: boolean) => emit('update:mobileMenuOpen', value),
});

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile);
    document.body.style.overflow = '';
});

watch([isMobileMenuOpen, isMobile], ([menuOpen, mobile]) => {
    document.body.style.overflow = menuOpen && mobile ? 'hidden' : '';
});

function collapsePanel() {
    closed.value = !closed.value;
}

async function logout() {
    const authService = new AuthService();
    await authService.logout();
    router.push('/auth');
}
</script>

<template>
    <div
        v-if="isMobile && isMobileMenuOpen"
        class="fixed inset-0 bg-black/30 z-40"
        @click="isMobileMenuOpen = false"
    />

    <aside
        :class="[
            'bg-background p-4 flex flex-col border-r border-border',
            !isMobile && 'justify-between sticky top-0 self-start h-screen overflow-y-auto',
            isMobile &&
                'p-4 text-sm leading-tight fixed top-0 left-0 z-50 transition-all duration-300',
            'min-h-screen',
            isMobile && 'h-[100dvh] max-h-[100dvh] overflow-y-auto overscroll-contain',
            !isMobile && (closed ? 'w-[4.5rem]' : 'w-64'),
            isMobile && (closed ? 'w-0' : 'w-64'),
            isMobile && !isMobileMenuOpen && '-translate-x-full',
        ]"
    >
        <!-- Collapse Button -->
        <button
            v-if="!isMobile"
            :class="[
                'absolute top-4 text-text-muted hover:text-accent transition-colors',
                closed ? 'left-1/2 -translate-x-1/2' : 'right-4',
            ]"
            @click="collapsePanel"
        >
            <PanelLeftClose :size="18" />
        </button>

        <!-- Logo -->
        <div class="w-full">
            <div class="flex flex-col w-full">
                <div
                    :class="[
                        'w-full flex flex-col items-center gap-3',
                        closed ? 'hidden' : '',
                        isMobile ? 'mb-5 gap-2' : 'mb-7',
                    ]"
                >
                    <img src="/logo.svg" :class="[isMobile ? 'w-10' : 'w-12', 'dark:invert']" />
                    <h1
                        :class="[
                            'font-semibold text-text-primary tracking-tight',
                            isMobile ? 'text-lg' : 'text-xl',
                        ]"
                    >
                        OrionTask
                    </h1>
                </div>

                <!-- Dharmas -->
                <div :class="closed ? 'mt-10' : ''">
                    <DharmaList :closed="closed" />
                </div>
            </div>

            <Divider />

            <!-- Navigation -->
            <div
                :class="[
                    'flex flex-col text-text-primary',
                    isMobile ? 'gap-2 mt-4' : 'gap-3 mt-10',
                ]"
            >
                <h1
                    :class="[
                        'text-text-secondary font-medium text-xs uppercase tracking-wide',
                        closed ? 'hidden' : '',
                    ]"
                >
                    Navegação
                </h1>
                <div :class="['flex flex-col', isMobile ? 'gap-2' : 'gap-3']">
                    <NavButton title="Agora" :icon="Zap" text="Agora" push="/" :closed="closed" />
                    <NavButton
                        title="Todos os dharmas"
                        :icon="List"
                        text="Todos os dharmas"
                        push="dharmas"
                        :closed="closed"
                    />
                    <NavButton
                        title="Meu Perfil"
                        :icon="User"
                        text="Meu Perfil"
                        push="profile"
                        :closed="closed"
                    />
                </div>
            </div>
        </div>

        <!-- Bottom Section -->
        <div :class="['flex flex-col', isMobile ? 'gap-2 mt-6 pb-6' : 'gap-3 mt-auto']">
            <Divider />
            <SettingsSection :closed="closed" />
            <button
                title="Sair"
                :class="[
                    'w-full flex items-center gap-3 rounded-sm px-2.5 py-2 border text-sm transition-colors',
                    closed
                        ? 'justify-center px-2 border-transparent text-red-600 hover:bg-red-50'
                        : 'border-transparent text-red-600 hover:bg-red-50',
                ]"
                @click="logout"
            >
                <LogOut :size="18" />
                <p :class="[closed ? 'hidden' : '', isMobile ? 'text-xs' : '']">Sair</p>
            </button>
        </div>
    </aside>
</template>
