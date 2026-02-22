<script setup lang="ts">
import { computed, watch } from 'vue';
import { Check, X } from 'lucide-vue-next';

const props = defineProps<{
    password: string;
}>();

const emit = defineEmits<{
    (e: 'update:isValid', value: boolean): void;
}>();

const validations = computed(() => {
    const pw = props.password;
    return {
        minLength: pw.length >= 8,
        hasLowerCase: /[a-z]/.test(pw),
        hasUpperCase: /[A-Z]/.test(pw),
        hasNumber: /\d/.test(pw),
        hasSpecialChar: /[^a-zA-Z0-9]/.test(pw),
    };
});

const isPasswordValid = computed(() => {
    const v = validations.value;
    return v.minLength && v.hasLowerCase && v.hasUpperCase && v.hasNumber && v.hasSpecialChar;
});

watch(
    isPasswordValid,
    (newVal) => {
        emit('update:isValid', newVal);
    },
    { immediate: true },
);
</script>

<template>
    <Transition name="fade-slide">
        <div
            v-if="password.length > 0"
            class="flex flex-col gap-1 mt-[-0.5rem] bg-card p-3 rounded-md border border-border"
        >
            <p class="text-xs font-medium text-text-primary mb-1">A senha deve conter:</p>
            <div
                class="flex items-center gap-2 text-xs"
                :class="validations.minLength ? 'text-green-500' : 'text-text-secondary'"
            >
                <Check v-if="validations.minLength" :size="14" />
                <X v-else :size="14" class="text-red-500" />
                <span>Pelo menos 8 caracteres</span>
            </div>
            <div
                class="flex items-center gap-2 text-xs"
                :class="validations.hasLowerCase ? 'text-green-500' : 'text-text-secondary'"
            >
                <Check v-if="validations.hasLowerCase" :size="14" />
                <X v-else :size="14" class="text-red-500" />
                <span>Uma letra minúscula</span>
            </div>
            <div
                class="flex items-center gap-2 text-xs"
                :class="validations.hasUpperCase ? 'text-green-500' : 'text-text-secondary'"
            >
                <Check v-if="validations.hasUpperCase" :size="14" />
                <X v-else :size="14" class="text-red-500" />
                <span>Uma letra maiúscula</span>
            </div>
            <div
                class="flex items-center gap-2 text-xs"
                :class="validations.hasNumber ? 'text-green-500' : 'text-text-secondary'"
            >
                <Check v-if="validations.hasNumber" :size="14" />
                <X v-else :size="14" class="text-red-500" />
                <span>Um número</span>
            </div>
            <div
                class="flex items-center gap-2 text-xs"
                :class="validations.hasSpecialChar ? 'text-green-500' : 'text-text-secondary'"
            >
                <Check v-if="validations.hasSpecialChar" :size="14" />
                <X v-else :size="14" class="text-red-500" />
                <span>Um caractere especial</span>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
