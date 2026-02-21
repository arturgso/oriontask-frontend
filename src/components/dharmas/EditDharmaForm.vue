<script setup lang="ts">
import { styles } from '@/styles/DefaultStyles';
import type { Dharma, EditDharmaProps } from '@/types/Dharma';
import { ref } from 'vue';
import ColorPicker from './ColorPicker.vue';
import ActionButton from '../ui/ActionButton.vue';
import { Trash } from 'lucide-vue-next';

const props = defineProps<{
    dharma: Dharma;
}>();

const form = ref<EditDharmaProps>({
    name: props.dharma.name,
    color: props.dharma.color,
    hidden: props.dharma.hidden,
});
</script>

<template>
    <form class="mt-1 flex flex-col gap-4" @submit.prevent="">
        <div :class="styles.input.inputDiv">
            <label
                class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                for="name"
            >
                Nome
            </label>
            <input
                id="name"
                :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent`"
                :placeholder="dharma.name"
            />
        </div>
        <ColorPicker v-model:color="form.color" />
        <div class="flex items-center gap-2">
            <ActionButton
                type="submit"
                text="Salvar"
                extra-class="!rounded-sm !font-medium !text-sm !hover:shadow-none"
            />
            <button
                type="button"
                class="p-2.5 mt-1 rounded-sm border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
                <Trash :size="18" />
            </button>
        </div>
    </form>
</template>
