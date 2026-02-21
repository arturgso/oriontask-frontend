<script lang="ts" setup>
import { ref } from 'vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import SignupForm from '@/components/auth/SignupForm.vue';

const page = ref(false);

function changePage() {
    return (page.value = !page.value);
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-background px-4">
        <div class="w-full max-w-[26rem] border border-border rounded-md bg-card p-6 md:p-8">
            <div class="flex flex-col items-center gap-2">
                <img src="/logo.svg" class="w-10 dark:invert" />
                <h1 class="text-text-primary text-2xl font-semibold tracking-tight">OrionTask</h1>
                <p class="text-text-secondary text-sm">Tarefas com propósito</p>
            </div>

            <div class="mt-7 border-b border-border flex">
                <button
                    :class="[
                        'w-1/2 pb-2 text-sm font-medium transition-colors',
                        !page
                            ? 'text-accent border-b-2 border-accent -mb-px'
                            : 'text-text-secondary hover:text-text-primary',
                    ]"
                    @click="changePage"
                >
                    Entrar
                </button>
                <button
                    :class="[
                        'w-1/2 pb-2 text-sm font-medium transition-colors',
                        page
                            ? 'text-accent border-b-2 border-accent -mb-px'
                            : 'text-text-secondary hover:text-text-primary',
                    ]"
                    @click="changePage"
                >
                    Cadastrar
                </button>
            </div>

            <div class="mt-6">
                <LoginForm v-if="!page" />
                <SignupForm v-else />
            </div>
        </div>
    </div>
</template>
