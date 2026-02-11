<script lang="ts" setup>
import { PanelLeftClose, Zap, List, User, Moon, LogOut, Menu } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import DharmaList from '@/components/ui/DharmaList.vue';
import Divider from '@/components/ui/Divider.vue';
import NavButton from '@/components/sidebar/NavButton.vue';
import SettingsSection from '@/components/sidebar/SettingsSection.vue';
import { styles } from '@/styles/DefaultStyles';

const closed = ref(false);
const isMobileMenuOpen = ref(false)
const isMobile = ref(false)

onMounted(() => {
    const checkMobile = () => {
        isMobile.value = window.innerWidth < 768;
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
})

function collapsePanel() {
    closed.value = !closed.value;
}
</script>

<template>
    <button 
        v-if="isMobile && !isMobileMenuOpen" 
        @click="isMobileMenuOpen = true" 
        class="fixed top-4 left-4 z-50 text-text-muted"
    >
        <Menu />
    </button>

    <div v-if="isMobile && isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 bg-black/50 z-40"/>

    <aside
        :class="[
            'bg-surface p-4 relative flex flex-col justify-between border-r border-border',
            isMobile && 'p-3 text-sm leading-tight',
            !isMobile && 'min-h-screen',
            isMobile && 'h-[100dvh] overflow-y-auto',
            !isMobile && (closed ? 'max-w-16' : 'min-w-64'),
            isMobile && 'fixed top-0 left-0 z-50 w-72 transition-transform duration-300',
            isMobile && !isMobileMenuOpen && '-translate-x-full'
        ]"
    >
        <button
            v-if="!isMobile"
            :class="['absolute text-text-muted', closed ? '' : 'right-4']"
            @click="collapsePanel"
        >
            <PanelLeftClose />
        </button>
        <div>
            <DharmaList :closed="closed" />

            <Divider />

            <div :class="['flex flex-col text-text-primary', isMobile ? 'gap-2 mt-6' : 'gap-3 mt-10']">
                <h1
                    :class="[
                        'text-text-secondary font-semibold text-sm',
                        isMobile ? 'text-xs' : '',
                        closed ? 'hidden' : ''
                    ]"
                >
                    Navegação
                </h1>
                <div :class="['flex flex-col', isMobile ? 'gap-2' : 'gap-3']">
                    <NavButton title="Agora" :icon="Zap" text="Agora" push="now" :closed="closed" />
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

        <div :class="['flex flex-col', isMobile ? 'gap-2' : 'gap-3']">
            <Divider />
            <SettingsSection :closed="closed" />
            <button
                title="Mudar tema"
                :class="[styles.input.navButton.default, closed ? '' : styles.input.navButton.open]"
            >
                <Moon />
                <p :class="[closed ? 'hidden' : '', isMobile ? 'text-xs' : '']">Modo Escuro</p>
            </button>
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
