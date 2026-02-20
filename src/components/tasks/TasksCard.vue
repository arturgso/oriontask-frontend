<script setup lang="ts">
import { useDharmaStore } from '@/stores/dharmaStore';
import { styles } from '@/styles/DefaultStyles';
import type { Tasks } from '@/types/Tasks';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import Divider from '../ui/Divider.vue';
import { EFFORT_LABELS, KARMA_LABELS, TASKS_LABELS } from '@/types/Types';

const props = defineProps<{ task: Tasks }>();
const MAX_DESC_LENGTH = 60;

const dharmaStore = useDharmaStore();

const dharmaColor = dharmaStore.getDharmaColor(props.task.dharmasId);
const expanded = ref(false);

const isTruncated = computed(() => {
    return props.task.description.length > MAX_DESC_LENGTH;
});

const truncatedText = computed(() => {
    if (!isTruncated.value) return props.task.description;

    const sliced = props.task.description.slice(0, MAX_DESC_LENGTH);
    const lastSpace = sliced.lastIndexOf(' ');

    return sliced.slice(0, lastSpace > 0 ? lastSpace : MAX_DESC_LENGTH).trimEnd() + '...';
});

const displayText = computed(() => {
    return expanded.value ? props.task.description : truncatedText.value;
});

function toggle() {
    expanded.value = !expanded.value;
}

function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) return 'Data Inválida';

    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(date);
}
</script>

<template>
    <div :class="[styles.card.surface, 'gap-3']">
        <!-- Header -->
        <header class="flex gap-2 items-center">
            <div class="w-4 h-4" :style="{ backgroundColor: dharmaColor }" />
            <h1 class="capitalize">{{ props.task.title }}</h1>
        </header>

        <!-- Body -->
        <div>
            <div class="relative bg-surface p-4 rounded-md" v-if="props.task.description">
                <p class="pr-16 text-text-secondary break-words">
                    {{ displayText }}
                </p>
                <button
                    v-if="props.task.description.length > MAX_DESC_LENGTH"
                    @click="toggle"
                    class="absolute top-3 right-3"
                >
                    <div v-if="expanded">
                        <ChevronUp />
                    </div>
                    <div v-else>
                        <ChevronDown />
                    </div>
                </button>
            </div>
            <Divider />
            <div class="flex gap-2">
                <span class="text-sm font-bold py-1 px-2 bg-blue-600 text-white rounded-full">
                    {{ TASKS_LABELS[task.status] }}
                </span>
                <span class="text-sm font-bold py-1 px-2 bg-[#EF4444] text-white rounded-full">
                    {{ EFFORT_LABELS[task.effortLevel] }}
                </span>
                <span class="text-sm font-bold py-1 px-2 bg-[#DB2777] text-white rounded-full">
                    {{ KARMA_LABELS[task.karmaType] }}
                </span>
            </div>
        </div>

        <!-- Footer -->
        <Divider />
        <div>
            <button>Depois</button>
            <button>Concluir</button>
            <span>{{ formatTimestamp(props.task.createdAt) }}</span>
        </div>
    </div>
</template>
