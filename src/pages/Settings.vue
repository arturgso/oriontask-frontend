<script setup lang="ts">
import Layout from '@/components/layout/MainLayout.vue';
import type { ThemeMode } from '@/utils/ThemeUtils';
import { getThemeMode, setThemeMode } from '@/utils/ThemeUtils';
import { Laptop, Moon, Settings2, Sun } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const mode = ref<ThemeMode>('system');

function syncThemeToState() {
    mode.value = getThemeMode();
}

function setMode(value: ThemeMode) {
    mode.value = value;
    setThemeMode(value);
}

onMounted(() => {
    syncThemeToState();
});
</script>

<template>
    <Layout title="Configurações" :icon="Settings2">
        <section class="max-w-2xl border border-border rounded-sm bg-card p-4 md:p-5">
            <p class="text-xs text-text-secondary mb-4">Preferências de aparência</p>

            <div class="flex items-center justify-between gap-4 py-2">
                <div class="flex items-center gap-3 min-w-0">
                    <div
                        class="h-8 w-8 rounded-sm border border-border bg-surface flex items-center justify-center"
                    >
                        <Moon v-if="mode === 'dark'" :size="16" class="text-accent" />
                        <Sun v-else-if="mode === 'light'" :size="16" class="text-accent" />
                        <Laptop v-else :size="16" class="text-accent" />
                    </div>
                    <div>
                        <h2 class="text-sm font-medium text-text-primary">Tema</h2>
                        <p class="text-xs text-text-secondary">
                            Escolha entre claro, escuro ou sincronizar com o sistema
                        </p>
                    </div>
                </div>

                <div
                    class="grid grid-cols-3 rounded-sm border border-border bg-surface p-1 text-xs font-medium"
                >
                    <button
                        type="button"
                        :class="[
                            'px-2.5 py-1.5 rounded-sm transition-colors',
                            mode === 'light'
                                ? 'bg-card text-text-primary border border-border'
                                : 'text-text-secondary hover:text-text-primary',
                        ]"
                        @click="setMode('light')"
                    >
                        Claro
                    </button>
                    <button
                        type="button"
                        :class="[
                            'px-2.5 py-1.5 rounded-sm transition-colors',
                            mode === 'dark'
                                ? 'bg-card text-text-primary border border-border'
                                : 'text-text-secondary hover:text-text-primary',
                        ]"
                        @click="setMode('dark')"
                    >
                        Escuro
                    </button>
                    <button
                        type="button"
                        :class="[
                            'px-2.5 py-1.5 rounded-sm transition-colors',
                            mode === 'system'
                                ? 'bg-card text-text-primary border border-border'
                                : 'text-text-secondary hover:text-text-primary',
                        ]"
                        @click="setMode('system')"
                    >
                        Sistema
                    </button>
                </div>
            </div>
        </section>
    </Layout>
</template>
