<script lang="ts" setup>
import type {Dharma} from "../../types/Dharma.ts";
import {Plus} from 'lucide-vue-next';

defineProps<{
  mockDharmas: Dharma[];
  closed: boolean;
}>();
</script>

<template>
  <div class="flex flex-col gap-3 mt-10 text-text-primary">
    <h1 :class="['text-text-secondary font-semibold text-sm', closed ? 'hidden': '']">Dharmas</h1>
    <button v-for="d in mockDharmas"
            :key="d.id"
            :class="[
                'flex flex-row items-center gap-2 rounded-lg hover:bg-card transtion duration-150',
                 closed ? '' : 'border border-border p-2'
                ]"
    >
      <div
          :title="d.name"
          :class="[
              'w-4 h-4 rounded-sm',
              closed ? 'w-6 h-6' : ''
          ]"
          :style="{backgroundColor: d.color}"
      />
      <p :class="[
      'font-semibold',
      closed ? 'hidden' : ''
      ]">
        {{ d.name }}
      </p>
    </button>
    <button
        :class="['flex flex-row items-center',
        closed ? 'justify-center' : ' gap-2 border-dashed border-2 border-border p-2 rounded-lg hover:bg-card transtion'
        ]">
      <Plus/>
      <p :class="[closed ? 'hidden' : '']">Gerenciar Dharmas</p>
    </button>
  </div>
</template>
