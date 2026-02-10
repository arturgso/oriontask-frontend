<script setup lang="ts">
import { ref, watch } from 'vue';
import type { NewDharmaProps } from '@/types/Dharma';
import { styles } from '@/styles/DefaultStyles';
import { defaultColors } from '@/types/DefaultDharmaColors';
import { DharmaService } from '@/services/DharmaService';
import { toast } from 'vue3-toastify';

const emit = defineEmits<{ (e: 'success'): void }>();

const form = ref<NewDharmaProps>({
    name: '',
    color: '',
});

watch(
    form,
    (newForm) => {
        console.log(newForm);
    },
    { deep: true },
);

const submit = async () => {
    const service = new DharmaService();
    const res = await service.create(form.value);

    if (res) {
        toast.success('Dharma cadastrado com sucesso');
        emit('success');
    }
};
</script>

<template>
    <form :class="styles.input.inputDiv" @submit.prevent="submit">
        <div :class="styles.input.inputDiv">
            <label for="name">Nome</label>
            <input
                id="name"
                v-model="form.name"
                type="text"
                :class="styles.input.defaultInput"
                placeholder="Ex: Saúde, Trabalho, Família"
                required
            />
        </div>

        <div class="flex flex-wrap gap-2 justify-between items-center mt-4">
            <button
                type="button"
                class="w-8 h-8 rounded-md cursor-pointer border-2 transition-all hover:scale-110"
                :class="form.color === '' ? 'border-accent shadow-lg' : 'border-border'"
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
                @click="form.color = ''"
            />

            <button
                v-for="color in defaultColors"
                :key="color"
                type="button"
                :style="{ backgroundColor: color }"
                class="w-8 h-8 rounded-md cursor-pointer border-2 transition-all hover:scale-110"
                :class="form.color === color ? 'border-accent shadow-lg' : 'border-transparent'"
                @click="form.color = color"
            />
        </div>

        <button
            type="submit"
            class="w-full p-2 bg-accent rounded-md font-bold text-white text-lg mt-4 hover:bg-accent-hover transition duration-150 hover:shadow-lg"
        >
            Criar
        </button>
    </form>
</template>
