<template>
    <button
        class="flex flex-row flex-nowrap gap-3 items-center px-5 py-4 justify-center lowercase tracking-wide leading-4 transition-colors rounded-xl"
        :class="buttonClasses"
        :type="type"
    >
        <slot/>
    </button>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
    color: {
        type: String,
        required: false,
        default: 'gray',
    },
    type: {
        type: String,
        required: false,
        default: 'button',
    }
})

const buttonClasses = computed(() => ({
    'bg-blue-500 bg-opacity-20 text-blue-700 hover:bg-opacity-30': props.color === 'blue',
    'bg-gray-300 bg-opacity-20 text-gray-700 hover:bg-opacity-50': props.color === 'gray',
}))
</script>