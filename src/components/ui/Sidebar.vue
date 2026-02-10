<script lang="ts" setup>
import { PanelLeftClose, Zap, List, User, Moon, LogOut } from 'lucide-vue-next';
import { ref } from 'vue';
import DharmaList from '@/components/ui/DharmaList.vue';
import Divider from '@/components/ui/Divider.vue';
import NavButton from '@/components/sidebar/NavButton.vue';
import SettingsSection from '@/components/sidebar/SettingsSection.vue';
import { styles } from '@/styles/DefaultStyles';

const closed = ref(false);

function collapsePanel() {
    closed.value = !closed.value;
}
</script>

<template>
    <aside
        :class="[
            'bg-surface min-h-screen p-4 relative flex flex-col justify-between border-r border-border',
            closed ? 'max-w-16' : 'min-w-64',
        ]"
    >
        <button
            :class="['absolute text-text-muted', closed ? '' : 'right-4']"
            @click="collapsePanel"
        >
            <PanelLeftClose />
        </button>
        <div>
            <DharmaList :closed="closed" />

            <Divider />

            <div class="flex flex-col gap-3 mt-10 text-text-primary">
                <h1 :class="['text-text-secondary font-semibold text-sm', closed ? 'hidden' : '']">
                    Navegação
                </h1>
                <div class="flex flex-col gap-3">
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

        <div class="flex flex-col gap-3">
            <Divider />
            <SettingsSection :closed="closed" />
            <button
                title="Mudar tema"
                :class="[styles.input.navButton.default, closed ? '' : styles.input.navButton.open]"
            >
                <Moon />
                <p :class="[closed ? 'hidden' : '']">Modo Escuro</p>
            </button>
            <button
                title="Sair"
                :class="[styles.input.navButton.default, closed ? '' : styles.input.navButton.open]"
            >
                <LogOut class="text-red-600" />
                <p :class="[closed ? 'hidden' : '']">Sair</p>
            </button>
        </div>
    </aside>
</template>
