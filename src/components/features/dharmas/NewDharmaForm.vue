<script setup lang="ts">
import { ref } from 'vue';
import type { NewDharmaProps } from '@/types/Dharma';
import FormInput from '@/components/common/FormInput.vue';
import { defaultColors } from '@/types/DefaultDharmaColors';
import { useDharmaStore } from '@/stores/dharmaStore';
import { toast } from 'vue3-toastify';

const emit = defineEmits<{ (e: 'success'): void }>();
const dharmaStore = useDharmaStore();

const form = ref<NewDharmaProps>({
    name: '',
    color: '',
});

const submit = async () => {
    const res = await dharmaStore.createDharma(form.value);

    if (res) {
        toast.success('Dharma cadastrado com sucesso');
        emit('success');
    }
};
</script>

<template>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
        <FormInput
            id="name"
            v-model="form.name"
            label="Nome"
            placeholder="Ex: Saúde, Trabalho, Família"
            required
        />

        <div class="flex flex-wrap gap-2 justify-between items-center mt-4">
            <button
                type="button"
                class="w-8 h-8 rounded-sm cursor-pointer border-2 transition-colors"
                :class="form.color === '' ? 'border-accent' : 'border-border'"
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
                class="w-8 h-8 rounded-sm cursor-pointer border-2 transition-colors"
                :class="form.color === color ? 'border-accent' : 'border-transparent'"
                @click="form.color = color"
            />
        </div>

        <button
            type="submit"
            class="w-full p-2.5 bg-accent rounded-sm font-medium text-white text-base mt-4 hover:bg-accent-hover transition-colors"
        >
            Criar
        </button>
    </form>
</template>
