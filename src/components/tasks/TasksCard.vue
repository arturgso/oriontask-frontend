<script setup lang="ts">
import { useDharmaStore } from '@/stores/dharmaStore';
import { TasksService } from '@/services/TasksService';
import type { Tasks } from '@/types/Tasks';
import { Check, Clock3, Play } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import Divider from '../ui/Divider.vue';
import TaskCardButton from './TaskCardButton.vue';
import StatusBadge from './StatusBadge.vue';
import EffortLevelBadge from './EffortLevelBadge.vue';
import KarmaTypeBadge from './KarmaTypeBadge.vue';
import { toast } from 'vue3-toastify';

const props = defineProps<{ task: Tasks }>();
const emit = defineEmits<{
    (e: 'updated'): void;
}>();
const MAX_DESC_LENGTH = 60;

const dharmaStore = useDharmaStore();
const tasksService = new TasksService();

const dharmaColor = dharmaStore.getDharmaColor(props.task.dharmasId);
const expanded = ref(false);
const updatingStatus = ref(false);

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

const isSnoozed = computed(() => props.task.status === 'SNOOZED');
const isNow = computed(() => props.task.status === 'NOW');

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

async function moveTaskToNow() {
    if (updatingStatus.value) return;

    updatingStatus.value = true;

    try {
        await tasksService.moveToNow(props.task.id);
        toast.success('Task movida para Agora');
        emit('updated');
    } catch (error) {
        console.error(error);
        toast.error('Não foi possível atualizar o status da task');
    } finally {
        updatingStatus.value = false;
    }
}

async function snoozeTask() {
    if (updatingStatus.value) return;

    updatingStatus.value = true;

    try {
        await tasksService.snooze(props.task.id);
        toast.success('Task adiada');
        emit('updated');
    } catch (error) {
        console.error(error);
        toast.error('Não foi possível atualizar o status da task');
    } finally {
        updatingStatus.value = false;
    }
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
            <h1 class="font-semibold text-base text-text-primary">{{ task.title }}</h1>
            <div class="flex flex-col gap-3 mt-3">
                <div v-if="props.task.description" class="relative">
                    <p class="pr-16 text-sm text-text-secondary break-words leading-relaxed">
                        {{ displayText }}
                    </p>
                    <button
                        v-if="props.task.description.length > MAX_DESC_LENGTH"
                        class="mt-1 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                        @click="toggle"
                    >
                        <div v-if="expanded">Ver menos...</div>
                        <div v-else>Ver mais...</div>
                    </button>
                </div>
                <div class="flex gap-2 flex-wrap">
                    <StatusBadge :status="task.status" />
                    <EffortLevelBadge :level="task.effortLevel" />
                    <KarmaTypeBadge :type="task.karmaType" />
                </div>
            </div>
            <Divider :margin="true" />
            <footer class="mt-1 flex justify-between items-end gap-4">
                <div class="flex items-center gap-3">
                    <template v-if="isSnoozed">
                        <TaskCardButton
                            text="Agora"
                            :icon="Play"
                            :disabled="updatingStatus"
                            @click="moveTaskToNow"
                        />
                    </template>
                    <template v-else>
                        <TaskCardButton
                            text="Adiar"
                            :icon="Clock3"
                            :disabled="updatingStatus"
                            @click="snoozeTask"
                        />
                        <TaskCardButton
                            text="Agora"
                            :icon="Play"
                            :disabled="updatingStatus || isNow"
                            @click="moveTaskToNow"
                        />
                        <TaskCardButton text="Concluir" :icon="Check" />
                    </template>
                </div>
                <div class="text-xs text-text-muted text-right">
                    Criada em: <br />
                    {{ formatTimestamp(task.createdAt) }}
                </div>
            </footer>
        </div>
    </div>
</template>
