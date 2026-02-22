<script setup lang="ts">
import { styles } from '@/styles/DefaultStyles';

interface Props {
    id: string;
    label?: string;
    modelValue?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    minlength?: string | number;
    maxlength?: string | number;
    autocomplete?: string;
    autocapitalize?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    placeholder: '',
    required: false,
    disabled: false,
    error: '',
    autocomplete: 'off',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
</script>

<template>
    <div :class="styles.input.inputDiv">
        <label
            v-if="label"
            :for="id"
            class="text-xs font-medium uppercase tracking-wide text-text-secondary"
        >
            {{ label }}
        </label>
        <input
            :id="id"
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :minlength="minlength"
            :maxlength="maxlength"
            :autocomplete="autocomplete"
            :autocapitalize="autocapitalize"
            :class="[
                styles.input.defaultInput,
                'bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent transition-colors',
                error ? 'border-red-500' : 'border-border',
                disabled ? 'opacity-60 cursor-not-allowed' : '',
            ]"
            @input="onInput"
        />
        <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
    </div>
</template>
