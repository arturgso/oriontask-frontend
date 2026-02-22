<script setup lang="ts">
import { TasksService } from '@/services/TasksService';
import type { TaskUpdateProps, Tasks } from '@/types/Tasks';
import { EFFORT_LABELS, EFFORT_LEVEL, KARMA_LABELS, KARMA_TYPES } from '@/types/Types';
import { MoreVertical, Pencil, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';
import Modal from '@/components/common/modals/Modal.vue';
import { toast } from 'vue3-toastify';

const props = defineProps<{ task: Tasks }>();
const emit = defineEmits<{
    (e: 'updated'): void;
}>();

const tasksService = new TasksService();
const actionsOpen = ref(false);
const editModalOpen = ref(false);
const deleteModalOpen = ref(false);
const updatingTask = ref(false);

const editForm = ref<TaskUpdateProps>({
    title: props.task.title,
    description: props.task.description ?? '',
    karmaType: props.task.karmaType,
    effortLevel: props.task.effortLevel,
});

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

function openDeleteModal() {
    actionsOpen.value = false;
    deleteModalOpen.value = true;
}

function closeDeleteModal() {
    deleteModalOpen.value = false;
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
    if (updatingTask.value) return;

    updatingTask.value = true;

    try {
        await tasksService.delete(props.task.id);
        toast.success('Task deletada');
        closeDeleteModal();
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
                @click="openDeleteModal"
            >
                <Trash2 :size="15" />
                Deletar
            </button>
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

    <Modal :open="deleteModalOpen" title="Deletar task" @close="closeDeleteModal">
        <div class="flex flex-col gap-4">
            <p class="text-sm text-text-secondary">
                Tem certeza que deseja deletar a task
                <span class="font-semibold text-text-primary">"{{ task.title }}"</span>?
            </p>
            <div class="flex items-center justify-end gap-2">
                <button
                    type="button"
                    class="px-3 py-2 rounded-sm border border-border text-sm text-text-primary hover:bg-surface transition-colors"
                    :disabled="updatingTask"
                    @click="closeDeleteModal"
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    class="px-3 py-2 rounded-sm border border-red-200 bg-red-50 text-sm text-red-600 hover:bg-red-100 transition-colors disabled:opacity-60"
                    :disabled="updatingTask"
                    @click="deleteTask"
                >
                    Deletar
                </button>
            </div>
        </div>
    </Modal>
</template>
