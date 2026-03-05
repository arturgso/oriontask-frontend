import { DharmaService } from '@/services/DharmaService';
import type { Dharma, EditDharmaProps, NewDharmaProps } from '@/types/Dharma';
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

    async function updateDharma(id: number, form: EditDharmaProps) {
        const updated = await serv.update(id, form);
        const index = dharmas.value.findIndex((d) => d.id === id);

        if (index !== -1) {
            dharmas.value[index] = updated;
        }

        return updated;
    }

    async function hideDharma(id: number) {
        const hidded = await serv.hide(id);
        const index = dharmas.value.findIndex((d) => d.id === id);

        if (index !== -1) {
            dharmas.value[index] = hidded;
        }

        return hidded;
    }

    async function deleteDharma(id: number) {
        await serv.delete(id);
        dharmas.value = dharmas.value.filter((d) => d.id !== id);
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
        updateDharma,
        hideDharma,
        deleteDharma,
        dharmaById,
        getDharmaColor,
    };
});
