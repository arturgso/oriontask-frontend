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
    <div class="min-h-screen flex flex-col justify-center items-center bg-background">
        <div class="max-w-[26rem] md:min-w-[26rem] w-full px-4 md:px-0 flex flex-col gap-4">
            <div
                class="bg-card shadow-lg border border-border gap-6 p-4 md:p-8 rounded-md flex flex-col items-center"
            >
                <div class="flex flex-col items-center w-full gap-3">
                    <div class="w-[5rem]">
                        <img src="/logo.svg" />
                    </div>
                    <div class="text-center">
                        <h1 class="text-text-primary text-3xl font-bold">OrionTask</h1>
                        <p class="text-text-secondary">Tarefas com propósito</p>
                    </div>
                </div>
                <div
                    class="flex items-center justify-between w-full gap-3 bg-surface shadow-lg border border-border rounded-md"
                >
                    <button
                        :onClick="changePage"
                        :class="[
                            'w-full p-1 rounded-l-md font-bold',
                            page ? '' : 'bg-accent text-white',
                        ]"
                    >
                        Entrar
                    </button>
                    <button
                        :onClick="changePage"
                        :class="[
                            'w-full p-1 rounded-r-md font-bold',
                            !page ? '' : 'bg-accent text-white',
                        ]"
                    >
                        Cadastrar
                    </button>
                </div>

                <LoginForm v-if="!page" />
                <SignupForm v-else />
            </div>
        </div>
    </div>
</template>
