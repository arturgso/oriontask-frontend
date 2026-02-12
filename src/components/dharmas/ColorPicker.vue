<script setup lang="ts">
import { defaultColors } from '@/types/DefaultDharmaColors';

const props = defineProps<{
    color: string;
}>();
const emit = defineEmits<{(e: 'update:color', value: string): void}>();

const setColor = (value: string) => {
    emit('update:color', value);
}

</script>

<template>        <div class="flex flex-wrap gap-2 justify-between items-center mt-4">
            <button
                type="button"
                class="w-8 h-8 rounded-md cursor-pointer border-2 transition-all hover:scale-110"
                :class="props.color === '' ? 'border-accent shadow-lg' : 'border-border'"
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
                class="w-8 h-8 rounded-md cursor-pointer border-2 transition-all hover:scale-110"
                :class="props.color === c ? 'border-accent shadow-lg' : 'border-transparent'"
                @click="setColor(c)"
            />
        </div>

        <button
            type="submit"
            class="w-full p-2 bg-accent rounded-md font-bold text-white text-lg mt-4 hover:bg-accent-hover transition duration-150 hover:shadow-lg"
        >
            Criar
        </button>
</template>
