<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { nextTick, ref, watch } from 'vue';

const props = defineProps<{
    open: boolean;
    title: string;
    onClose: () => void;
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
</script>

<template>
    <div
        ref="modalRef"
        tabindex="0"
        :class="['fixed inset-0 bg-black/60 z-50 grid place-items-center', open ? '' : 'hidden']"
        @keydown.esc="onClose()"
    >
        <div
            class="relative w-full max-w-md rounded-md bg-white p-6 shadow-xl border-2 border-border"
        >
            <h1 class="capitalize font-bold text-xl text-text-secondary">
                {{ title }}
            </h1>
            <button
                class="text-text-primary absolute top-3 right-3 hover:bg-surface rounded-full p-1"
                @click="onClose()"
            >
                <X />
            </button>
            <div class="mt-6">
                <slot />
            </div>
        </div>
    </div>
</template>
