<script setup lang="ts">
import { TasksService } from '@/services/TasksService';
import type { Tasks } from '@/types/Tasks';
import { Check, Clock3, Play } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { toast } from 'vue3-toastify';
import TaskCardButton from './TaskCardButton.vue';

const props = defineProps<{ task: Tasks }>();
const emit = defineEmits<{
    (e: 'updated'): void;
}>();

const tasksService = new TasksService();
const updatingStatus = ref(false);

const isSnoozed = computed(() => props.task.status === 'SNOOZED');
const isNow = computed(() => props.task.status === 'NOW');
const isDone = computed(() => props.task.status === 'DONE');

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
</script>

<template>
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
</template>
