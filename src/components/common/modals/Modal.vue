<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { nextTick, ref, watch } from 'vue';

const props = defineProps<{
    open: boolean;
    title: string;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const modalRef = ref<HTMLDivElement | null>(null);

watch(
    () => props.open,
    async (isOpen) => {
        if (isOpen) {
            await nextTick();
            modalRef.value?.focus();
        }
    },
);

function handleClose() {
    emit('close');
}
</script>

<template>
    <div
        ref="modalRef"
        tabindex="0"
        :class="[
            'fixed inset-0 bg-black/35 z-50 grid place-items-center p-4',
            open ? '' : 'hidden',
        ]"
        @keydown.esc="handleClose"
    >
        <div
            class="relative w-full max-w-md rounded-sm bg-card p-5 md:p-6 border border-border max-h-[85vh] overflow-y-auto"
        >
            <h1 class="capitalize font-semibold text-base text-text-primary tracking-tight">
                {{ title }}
            </h1>
            <button
                class="text-text-muted absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-sm border border-transparent hover:bg-surface hover:text-accent transition-colors"
                @click="handleClose"
            >
                <X :size="18" />
            </button>
            <div class="mt-5">
                <slot />
            </div>
        </div>
    </div>
</template>
