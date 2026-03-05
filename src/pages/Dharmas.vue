<script setup lang="ts">
import Layout from '@/components/layout/MainLayout.vue';
import { useDharmaStore } from '@/stores/dharmaStore';
import { onMounted } from 'vue';
import DharmasCard from '@/components/features/dharmas/DharmasCard.vue';

const dharmaStore = useDharmaStore();
const DHARMAS_LIMIT = 8;

onMounted(() => {
    if (!dharmaStore.dharmas.length) {
        dharmaStore.fetchDharmas();
    }
});
</script>

<template>
    <Layout title="Todos os dharmas">
        <section>
            <p
                class="text-xs mb-4"
                :class="
                    dharmaStore.dharmas.length >= DHARMAS_LIMIT
                        ? 'text-accent font-medium'
                        : 'text-text-secondary'
                "
            >
                {{ dharmaStore.dharmas.length }}/{{ DHARMAS_LIMIT }} dharmas
            </p>

            <div class="flex flex-col gap-3">
                <div v-for="d in dharmaStore.dharmas" :key="d.id">
                    <DharmasCard :dharma="d" />
                </div>
            </div>
        </section>
    </Layout>
</template>
