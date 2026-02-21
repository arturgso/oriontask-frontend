<script setup lang="ts">
import { useDharmaStore } from '@/stores/dharmaStore';
import type { Tasks } from '@/types/Tasks';
import { computed } from 'vue';
import Divider from '../ui/Divider.vue';
import TaskCardActions from './TaskCardActions.vue';
import TaskCardContent from './TaskCardContent.vue';
import TaskCardMenu from './TaskCardMenu.vue';

const props = defineProps<{ task: Tasks }>();
const emit = defineEmits<{
    (e: 'updated'): void;
}>();

const dharmaStore = useDharmaStore();
const dharmaColor = dharmaStore.getDharmaColor(props.task.dharmasId);
const isSnoozed = computed(() => props.task.status === 'SNOOZED');

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
    <div
        :class="[
            'w-full h-fit flex flex-row rounded-sm border bg-card',
            isSnoozed ? 'border-border/70 bg-surface/60' : 'border-border',
        ]"
    >
        <div
            class="w-1.5 rounded-l-sm self-stretch"
            :style="{ backgroundColor: dharmaColor }"
        ></div>

        <div class="flex-1 p-4">
            <div class="flex items-start justify-between gap-3">
                <h1 class="font-semibold text-base text-text-primary">{{ task.title }}</h1>
                <TaskCardMenu :task="task" @updated="emit('updated')" />
            </div>

            <TaskCardContent :task="task" />

            <Divider :margin="true" />

            <footer class="mt-1 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
                <TaskCardActions :task="task" @updated="emit('updated')" />
                <div class="text-xs text-text-muted text-center sm:text-right">
                    <span class="sm:hidden">Criada em: </span>
                    <span class="hidden sm:inline">Criada em:</span>
                    <br class="hidden sm:block" />
                    {{ formatTimestamp(task.createdAt) }}
                </div>
            </footer>
        </div>
    </div>
</template>
