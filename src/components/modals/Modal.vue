<script setup lang="ts">
import { X } from 'lucide-vue-next';

    defineProps<{
        open: boolean
        onClose: () => void
    }>();


</script>

<template>
    <div :class="[
        'fixed inset-0 bg-black/60 z-50 grid place-items-center',
        open ? '' : 'hidden' 
    ]">
        <div class="relative w-full max-w-md rounded-md bg-white p-6 shadow-xl">
            <button class="text-text-primary absolute top-3 right-3 hover:bg-surface rounded-full p-1"
                @click="onClose()"
            >
                <X />
            </button>

            <slot />
        </div>
    </div>
</template>