<script setup lang="ts">
import { styles } from '@/styles/DefaultStyles';
import type { Dharma, EditDharmaProps } from '@/types/Dharma';
import { ref } from 'vue';
import ColorPicker from './ColorPicker.vue';
import ActionButton from '../ui/ActionButton.vue';

const props = defineProps<{
    dharma: Dharma
}>();

const form = ref<EditDharmaProps>({
    name: props.dharma.name,
    color: props.dharma.color,
    hidden: props.dharma.hidden
})

</script>

<template>
    <form class="mt-4" @submit.prevent="">
        <div :class="styles.input.inputDiv">
            <label for="name">
                Nome
            </label>
            <input id="name" :class="styles.input.defaultInput"  :placeholder="dharma.name"/>  
        </div>
        <ColorPicker v-model:color="form.color" /> 
        <ActionButton type="submit" text="Salvar" />
    </form>
</template>