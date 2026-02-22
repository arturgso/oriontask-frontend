<script setup lang="ts">
import type { Dharma, EditDharmaProps } from '@/types/Dharma';
import { ref } from 'vue';
import ColorPicker from './ColorPicker.vue';
import ActionButton from '@/components/common/ActionButton.vue';
import FormInput from '@/components/common/FormInput.vue';
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
        <FormInput id="dharma-name" v-model="form.name" label="Nome" :placeholder="dharma.name" />
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
