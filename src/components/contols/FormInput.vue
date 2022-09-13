<template>
    <input
        v-model="localValue"
        class="text-base px-5 py-4 border bg-gray-100 rounded-lg outline-none transition-colors  ring-blue-400 focus:ring-3"
    >
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
        modelValue: {
            type: [String, Number, null],
            required: false,
            default: () => null,
        },
    }),
    emit = defineEmits(['update:modelValue'])

const localValue = computed({
    get: () => props.modelValue,
    set: (newValue) => emit('update:modelValue', newValue)
})
</script>