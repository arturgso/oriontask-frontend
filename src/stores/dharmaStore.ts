import { DharmaService } from '@/services/DharmaService';
import type { Dharma, NewDharmaProps } from '@/types/Dharma';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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

    function dharmaById(id: number) {
        return dharmas.value.find((d) => d.id === id);
    }

    function getDharmaColor(id: number): string {
        const dharma = dharmaById(id);

        if (!dharma) {
            return '#000000';
        }

        return dharma.color;
    }

    return {
        dharmas,
        loading,
        error,
        fetchDharmas,
        createDharma,
        dharmaById,
        getDharmaColor,
    };
});
