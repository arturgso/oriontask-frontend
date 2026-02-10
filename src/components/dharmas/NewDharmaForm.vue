<script setup lang="ts">
import { ref } from 'vue';
import type { NewDharmaProps } from '@/types/Dharma';
import { styles } from '@/styles/DefaultStyles';

const form = ref<NewDharmaProps>({
    name: '',
    description: '',
    color: '',
});
</script>

<template>
    <form>
        <div :class="styles.input.inputDiv">
            <labe form="name">Nome</labe>
            <input
                id="name"
                v-model="form.name"
                type="text"
                :class="styles.input.defaultInput"
                placeholder="Saúde"
                required
            />
        </div>
        <div :class="styles.input.inputDiv">
            <labe form="description">Nome</labe>
            <input
                id="name"
                v-model="form.name"
                type="text"
                :class="styles.input.defaultInput"
                placeholder="Saúde"
                required
            />
        </div>
    </form>
</template>
