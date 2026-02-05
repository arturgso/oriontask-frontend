<script lang="ts" setup>
import type {Dharma} from "../../types/Dharma.ts";
import {PanelLeftClose, Zap, List, User} from 'lucide-vue-next';
import {ref} from "vue";
import DharmaList from './DharmaList.vue';
import Divider from './Divider.vue';
import NavButton from "../sidebar/NavButton.vue";

const mockDharmas: Dharma[] = [
  {
    id: 1,
    user: 'arturgso',
    name: 'Health',
    color: '#3B82F6',
    hidden: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    user: 'arturgso',
    name: 'Work',
    color: '#10B981',
    hidden: false,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 3,
    user: 'arturgso',
    name: 'Software Engineer',
    color: '#F59E0B',
    hidden: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  }
]

const closed = ref(false);

function collapsePanel() {
  closed.value = !closed.value;
}

</script>

<template>
  <aside :class="[
      'bg-surface min-h-screen p-4 relative',
      closed ? 'max-w-16' : 'min-w-64'
      ]">
    <button @click="collapsePanel" class="absolute right-4 text-text-muted">
      <PanelLeftClose/>
    </button>
    <DharmaList :mockDharmas="mockDharmas" :closed="closed" />

    <Divider />

    <div class="flex flex-col gap-3 mt-10 text-text-primary">
      <h1 :class="['text-text-secondary font-semibold text-sm', closed ? 'hidden': '']">Navegação</h1>
      <div class="flex flex-col gap-3">
        <NavButton :icon="Zap" text="Agora" push="now" :closed="closed" />
        <NavButton :icon="List" text="Todos os dharmas" push="dharmas" :closed="closed" />
        <NavButton :icon="User" text="Meu Perfil" push="profile" :closed="closed" />
      </div>
    </div>
  </aside>
</template>