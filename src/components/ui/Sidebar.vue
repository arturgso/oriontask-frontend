<script lang="ts" setup>
import type {Dharma} from "../../types/Dharma.ts";
import {PanelLeftClose} from 'lucide-vue-next';
import {ref} from "vue";
import DharmaList from './DharmaList.vue';

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

const closed = ref(true);

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

  </aside>
</template>