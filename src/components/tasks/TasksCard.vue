<script setup lang="ts">
import { useDharmaStore } from '@/stores/dharmaStore';
import { TasksService } from '@/services/TasksService';
import type { TaskUpdateProps, Tasks } from '@/types/Tasks';
import { EFFORT_LABELS, EFFORT_LEVEL, KARMA_LABELS, KARMA_TYPES } from '@/types/Types';
import { Check, Clock3, MoreVertical, Pencil, Play, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import Divider from '../ui/Divider.vue';
import TaskCardButton from './TaskCardButton.vue';
import StatusBadge from './StatusBadge.vue';
import EffortLevelBadge from './EffortLevelBadge.vue';
import KarmaTypeBadge from './KarmaTypeBadge.vue';
import Modal from '../modals/Modal.vue';
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
const actionsOpen = ref(false);
const editModalOpen = ref(false);
const updatingTask = ref(false);

const editForm = ref<TaskUpdateProps>({
    title: props.task.title,
    description: props.task.description ?? '',
    karmaType: props.task.karmaType,
    effortLevel: props.task.effortLevel,
});

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
const isDone = computed(() => props.task.status === 'DONE');

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

function getErrorMessage(error: unknown, fallback: string): string {
    const maybeError = error as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
    };

    return (
        maybeError?.response?.data?.message ||
        maybeError?.response?.data?.error ||
        maybeError?.message ||
        fallback
    );
}

function toggleActions() {
    actionsOpen.value = !actionsOpen.value;
}

function openEditModal() {
    editForm.value = {
        title: props.task.title,
        description: props.task.description ?? '',
        karmaType: props.task.karmaType,
        effortLevel: props.task.effortLevel,
    };
    actionsOpen.value = false;
    editModalOpen.value = true;
}

function closeEditModal() {
    editModalOpen.value = false;
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
        toast.error(getErrorMessage(error, 'Não foi possível mover a task para Agora'));
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
        toast.error(getErrorMessage(error, 'Não foi possível adiar a task'));
    } finally {
        updatingStatus.value = false;
    }
}

async function completeTask() {
    if (updatingStatus.value || isDone.value) return;

    updatingStatus.value = true;

    try {
        await tasksService.done(props.task.id);
        toast.success('Task concluída');
        emit('updated');
    } catch (error) {
        console.error(error);
        toast.error(getErrorMessage(error, 'Não foi possível concluir a task'));
    } finally {
        updatingStatus.value = false;
    }
}

async function saveTaskEdit() {
    if (updatingTask.value) return;

    updatingTask.value = true;

    try {
        await tasksService.update(props.task.id, editForm.value);
        toast.success('Task atualizada');
        closeEditModal();
        emit('updated');
    } catch (error) {
        console.error(error);
        toast.error(getErrorMessage(error, 'Não foi possível atualizar a task'));
    } finally {
        updatingTask.value = false;
    }
}

async function deleteTask() {
    const confirmed = window.confirm('Tem certeza que deseja deletar esta task?');
    if (!confirmed || updatingTask.value) return;

    updatingTask.value = true;
    actionsOpen.value = false;

    try {
        await tasksService.delete(props.task.id);
        toast.success('Task deletada');
        emit('updated');
    } catch (error) {
        console.error(error);
        toast.error(getErrorMessage(error, 'Não foi possível deletar a task'));
    } finally {
        updatingTask.value = false;
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
            <div class="flex items-start justify-between gap-3">
                <h1 class="font-semibold text-base text-text-primary">{{ task.title }}</h1>
                <div class="relative shrink-0">
                    <button
                        class="h-8 w-8 flex items-center justify-center rounded-sm border border-transparent text-text-muted hover:bg-surface hover:text-text-primary transition-colors"
                        :disabled="updatingTask"
                        @click="toggleActions"
                    >
                        <MoreVertical :size="16" />
                    </button>
                    <div
                        v-if="actionsOpen"
                        class="absolute right-0 top-9 z-10 min-w-36 rounded-sm border border-border bg-card p-1"
                    >
                        <button
                            class="w-full flex items-center gap-2 px-2.5 py-2 text-sm rounded-sm hover:bg-surface transition-colors text-text-primary"
                            @click="openEditModal"
                        >
                            <Pencil :size="15" />
                            Editar
                        </button>
                        <button
                            class="w-full flex items-center gap-2 px-2.5 py-2 text-sm rounded-sm hover:bg-red-50 transition-colors text-red-600"
                            @click="deleteTask"
                        >
                            <Trash2 :size="15" />
                            Deletar
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-3 mt-3">
                <div v-if="props.task.description" class="relative">
                    <p class="text-sm text-text-secondary break-words leading-relaxed">
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
            <footer class="mt-1 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
                <div class="flex items-center gap-2 flex-wrap">
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
                        <TaskCardButton
                            text="Concluir"
                            :icon="Check"
                            :disabled="updatingStatus || isDone"
                            @click="completeTask"
                        />
                    </template>
                </div>
                <div class="text-xs text-text-muted text-center sm:text-right">
                    <span class="sm:hidden">Criada em: </span>
                    <span class="hidden sm:inline">Criada em:</span>
                    <br class="hidden sm:block" />
                    {{ formatTimestamp(task.createdAt) }}
                </div>
            </footer>
        </div>
    </div>

    <Modal :open="editModalOpen" title="Editar task" @close="closeEditModal">
        <form class="flex flex-col gap-4" @submit.prevent="saveTaskEdit">
            <div class="flex flex-col gap-2">
                <label
                    class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    for="task-title"
                >
                    Título
                </label>
                <input
                    id="task-title"
                    v-model="editForm.title"
                    type="text"
                    minlength="5"
                    maxlength="60"
                    required
                    class="p-2 border border-border bg-card rounded-sm focus:outline-none focus:ring-0 focus:border-accent"
                />
            </div>

            <div class="flex flex-col gap-2">
                <label
                    class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    for="task-description"
                >
                    Descrição
                </label>
                <textarea
                    id="task-description"
                    v-model="editForm.description"
                    maxlength="200"
                    class="min-h-24 max-h-32 p-2 border border-border bg-card rounded-sm focus:outline-none focus:ring-0 focus:border-accent"
                />
            </div>

            <div class="flex flex-col gap-2">
                <label
                    class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    for="task-effort"
                >
                    Esforço
                </label>
                <select
                    id="task-effort"
                    v-model="editForm.effortLevel"
                    class="p-2 border border-border bg-card rounded-sm focus:outline-none focus:ring-0 focus:border-accent"
                >
                    <option v-for="option in EFFORT_LEVEL" :key="option" :value="option">
                        {{ EFFORT_LABELS[option] }}
                    </option>
                </select>
            </div>

            <div class="flex flex-col gap-2">
                <label
                    class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    for="task-karma"
                >
                    Karma
                </label>
                <select
                    id="task-karma"
                    v-model="editForm.karmaType"
                    class="p-2 border border-border bg-card rounded-sm focus:outline-none focus:ring-0 focus:border-accent"
                >
                    <option v-for="option in KARMA_TYPES" :key="option" :value="option">
                        {{ KARMA_LABELS[option] }}
                    </option>
                </select>
            </div>

            <button
                type="submit"
                :disabled="updatingTask"
                class="w-full mt-1 p-2.5 rounded-sm bg-accent text-white font-medium hover:bg-accent-hover transition-colors disabled:opacity-60"
            >
                Salvar alterações
            </button>
        </form>
    </Modal>
</template>
