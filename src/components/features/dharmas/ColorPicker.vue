<script setup lang="ts">
import { defaultColors } from '@/types/DefaultDharmaColors';

const props = defineProps<{
    color: string;
}>();
const emit = defineEmits<{ (e: 'update:color', value: string): void }>();

const setColor = (value: string) => {
    emit('update:color', value);
};
</script>

<template>
    <div class="flex flex-wrap gap-2 justify-between items-center mt-1">
        <button
            type="button"
            class="w-8 h-8 rounded-sm cursor-pointer border-2 transition-colors"
            :class="props.color === '' ? 'border-accent' : 'border-border'"
            title="Randomizar"
            style="
                background: linear-gradient(
                    90deg,
                    #ef4444,
                    #f59e0b,
                    #eab308,
                    #22c55e,
                    #06b6d4,
                    #3b82f6,
                    #8b5cf6
                );
            "
            @click="setColor('')"
        />

        <button
            v-for="c in defaultColors"
            :key="c"
            type="button"
            :style="{ backgroundColor: c }"
            class="w-8 h-8 rounded-sm cursor-pointer border-2 transition-colors"
            :class="props.color === c ? 'border-accent' : 'border-transparent'"
            @click="setColor(c)"
        />
    </div>
</template>
