import { DharmaService } from '@/services/DharmaService';
import type { Dharma, NewDharmaProps } from '@/types/Dharma';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useDharmaStore = defineStore('dharma', () => {
    const dharmas = ref<Dharma[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const serv = new DharmaService();

    async function fetchDharmas() {
        loading.value = true;
        error.value = null;

        try {
            dharmas.value = await serv.getUserDharmas();
        } catch (e) {
            console.error(e);
            error.value = 'Erro ao carregar dharmas';
        } finally {
            loading.value = false;
        }
    }

    async function createDharma(form: NewDharmaProps) {
        const newDharma = await serv.create(form);
        dharmas.value.push(newDharma);
        return newDharma;
    }

    const dharmaById = computed(() => {
        return (id: number) => dharmas.value.find((d) => d.id === id);
    });

    return {
        dharmas,
        loading,
        error,
        fetchDharmas,
        createDharma,
        dharmaById,
    };
});
