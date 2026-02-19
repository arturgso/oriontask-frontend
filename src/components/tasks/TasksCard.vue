<script setup lang="ts">
import { styles } from '@/styles/DefaultStyles';
import type { Tasks } from '@/types/Tasks';

defineProps<{ task: Tasks }>();
</script>

<template>
    <article :class="styles.card.surface">
        <header>
            <p>{{ task.status }}</p>
            <p v-if="task.hidden">Oculta</p>
            <button type="button">Acoes</button>
        </header>

        <section>
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
        </section>

        <section>
            <p>Karma: {{ task.karmaType }}</p>
            <p>Esforco: {{ task.effortLevel }}</p>
            <p>Dharma ID: {{ task.dharmasId }}</p>
        </section>

        <section>
            <p>Criada em: {{ task.createdAt }}</p>
            <p>Atualizada em: {{ task.updatedAt }}</p>
            <p v-if="task.snoozedUntil">Soneca ate: {{ task.snoozedUntil }}</p>
            <p v-if="task.completedAt">Concluida em: {{ task.completedAt }}</p>
        </section>

        <footer>
            <button type="button">Concluir</button>
            <button type="button">Snooze</button>
            <button type="button">Editar</button>
            <button type="button">{{ task.hidden ? 'Mostrar' : 'Ocultar' }}</button>
        </footer>
    </article>
</template>
