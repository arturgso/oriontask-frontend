<script setup lang="ts">
import EditDharmaForm from '@/components/features/dharmas/EditDharmaForm.vue';
import Layout from '@/components/layout/MainLayout.vue';
import { useDharmaStore } from '@/stores/dharmaStore';
import { ChevronDown } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

const dharmaStore = useDharmaStore();
const openById = ref<Record<number, boolean>>({});
const DHARMAS_LIMIT = 8;

onMounted(() => {
    if (!dharmaStore.dharmas.length) {
        dharmaStore.fetchDharmas();
    }
});

const toggleOpen = (id: number) => {
    openById.value[id] = !openById.value[id];
};

const isOpen = (id: number) => !!openById.value[id];
const leftColumnDharmas = computed(() => dharmaStore.dharmas.filter((_, index) => index % 2 === 0));
const rightColumnDharmas = computed(() =>
    dharmaStore.dharmas.filter((_, index) => index % 2 !== 0),
);
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

            <div class="flex flex-col gap-3 lg:hidden">
                <div
                    v-for="d in dharmaStore.dharmas"
                    :key="d.id"
                    class="border rounded-sm border-border w-full h-fit flex flex-col p-3.5 bg-card relative transition-colors hover:bg-surface/40"
                    @click="toggleOpen(d.id)"
                >
                    <div class="flex gap-2.5 items-center pr-9">
                        <div :style="{ backgroundColor: d.color }" class="h-4 w-4 rounded-sm" />
                        <p class="text-base font-semibold capitalize text-text-primary">
                            {{ d.name }}
                        </p>
                    </div>

                    <button
                        class="absolute right-3 top-3 h-7 w-7 flex items-center justify-center rounded-sm text-text-muted hover:bg-surface hover:text-text-primary transition-colors"
                        @click.stop="toggleOpen(d.id)"
                    >
                        <ChevronDown
                            :size="18"
                            class="transition-transform duration-200"
                            :class="isOpen(d.id) ? 'rotate-180' : 'rotate-0'"
                        />
                    </button>

                    <div v-if="isOpen(d.id)" class="pt-3">
                        <EditDharmaForm :dharma="d" />
                    </div>
                </div>
            </div>

            <div class="hidden lg:grid lg:grid-cols-2 gap-3">
                <div class="flex flex-col gap-3">
                    <div
                        v-for="d in leftColumnDharmas"
                        :key="d.id"
                        class="border rounded-sm border-border w-full h-fit flex flex-col p-3.5 bg-card relative transition-colors hover:bg-surface/40"
                        @click="toggleOpen(d.id)"
                    >
                        <div class="flex gap-2.5 items-center pr-9">
                            <div :style="{ backgroundColor: d.color }" class="h-4 w-4 rounded-sm" />
                            <p class="text-base font-semibold capitalize text-text-primary">
                                {{ d.name }}
                            </p>
                        </div>

                        <button
                            class="absolute right-3 top-3 h-7 w-7 flex items-center justify-center rounded-sm text-text-muted hover:bg-surface hover:text-text-primary transition-colors"
                            @click.stop="toggleOpen(d.id)"
                        >
                            <ChevronDown
                                :size="18"
                                class="transition-transform duration-200"
                                :class="isOpen(d.id) ? 'rotate-180' : 'rotate-0'"
                            />
                        </button>

                        <div v-if="isOpen(d.id)" class="pt-3">
                            <EditDharmaForm :dharma="d" />
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <div
                        v-for="d in rightColumnDharmas"
                        :key="d.id"
                        class="border rounded-sm border-border w-full h-fit flex flex-col p-3.5 bg-card relative transition-colors hover:bg-surface/40"
                        @click="toggleOpen(d.id)"
                    >
                        <div class="flex gap-2.5 items-center pr-9">
                            <div :style="{ backgroundColor: d.color }" class="h-4 w-4 rounded-sm" />
                            <p class="text-base font-semibold capitalize text-text-primary">
                                {{ d.name }}
                            </p>
                        </div>

                        <button
                            class="absolute right-3 top-3 h-7 w-7 flex items-center justify-center rounded-sm text-text-muted hover:bg-surface hover:text-text-primary transition-colors"
                            @click.stop="toggleOpen(d.id)"
                        >
                            <ChevronDown
                                :size="18"
                                class="transition-transform duration-200"
                                :class="isOpen(d.id) ? 'rotate-180' : 'rotate-0'"
                            />
                        </button>

                        <div v-if="isOpen(d.id)" class="pt-3">
                            <EditDharmaForm :dharma="d" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
</template>
