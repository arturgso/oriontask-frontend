<script lang="ts" setup>
import { PanelLeftClose, Zap, List, User, LogOut, Menu } from 'lucide-vue-next';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import DharmaList from '@/components/ui/DharmaList.vue';
import Divider from '@/components/ui/Divider.vue';
import NavButton from '@/components/sidebar/NavButton.vue';
import SettingsSection from '@/components/sidebar/SettingsSection.vue';
import { styles } from '@/styles/DefaultStyles';

const closed = ref(false);
const isMobileMenuOpen = ref(false);
const isMobile = ref(false);

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
</script>

<template>
    <button
        v-if="isMobile && !isMobileMenuOpen"
        class="fixed top-4 left-4 z-50 text-text-muted"
        @click="isMobileMenuOpen = true"
    >
        <Menu />
    </button>

    <div
        v-if="isMobile && isMobileMenuOpen"
        class="fixed inset-0 bg-black/50 z-40"
        @click="isMobileMenuOpen = false"
    />

    <aside
        :class="[
            'bg-surface p-4 flex flex-col  border-r border-border  ',
            !isMobile && 'justify-between relative',
            isMobile && 'p-3 text-sm leading-tight fixed top-0 left-0 z-50 transition-all duration-300',
            'min-h-screen',
            isMobile && 'h-[100dvh] max-h-[100dvh] overflow-y-auto overscroll-contain',
            !isMobile && (closed ? 'w-16' : 'w-64'),
            isMobile && (closed ? 'w-0' : 'w-64'),
            isMobile && !isMobileMenuOpen && '-translate-x-full',
        ]"
    >
        <!-- Collapse Button -->
        <button
            v-if="!isMobile"
            :class="['absolute top-4 text-text-muted', closed ? '' : 'right-4']"
            @click="collapsePanel"
        >
            <PanelLeftClose />
        </button>

        <!-- Logo -->
        <div class="w-full">
            <div class="flex flex-col w-full">
                <div
                    :class="[
                        'w-full flex flex-col items-center gap-3',
                        closed ? 'hidden' : '',
                        isMobile ? 'mb-4 gap-2' : 'mb-6',
                    ]"
                >
                    <img src="/logo.svg" :class="isMobile ? 'w-12' : 'w-16'" />
                    <h1 :class="['font-bold text-text-primary', isMobile ? 'text-lg' : 'text-xl']">
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
                        'text-text-secondary font-semibold text-sm',
                        isMobile ? 'text-xs' : '',
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
                :class="[styles.input.navButton.default, closed ? '' : styles.input.navButton.open]"
            >
                <LogOut class="text-red-600" />
                <p :class="[closed ? 'hidden' : '', isMobile ? 'text-xs' : '']">Sair</p>
            </button>
        </div>
    </aside>
</template>
