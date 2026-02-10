<script lang="ts" setup>
import { ref } from 'vue';
import LoginForm from '../components/auth/LoginForm.vue';
import SignupForm from '../components/auth/SignupForm.vue';

const page = ref(false);

function changePage() {
    return (page.value = !page.value);
}
</script>

<template>
    <div class="min-h-screen flex flex-col justify-center items-center bg-background">
        <div class="max-w-[26rem] min-w-[26rem] flex flex-col gap-4">
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
            <div class="bg-card shadow-lg border border-border p-8 rounded-md">
                <Transition name="expand" mode="out-in">
                    <LoginForm v-if="!page" />
                    <SignupForm v-else />
                </Transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: all 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    transform: scaleY(0.95);
}

.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    transform: scaleY(1);
}
</style>
