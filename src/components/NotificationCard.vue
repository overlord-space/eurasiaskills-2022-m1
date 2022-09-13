<template>
    <div class="p-6 text-lg rounded-xl shadow-sm tracking-wide" :class="cardClasses">{{ message }}</div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})

const isVisible = ref(false)

onMounted(() => {
    setTimeout(() => {
        isVisible.value = true

        setTimeout(() => {
            isVisible.value = false
        }, 2500)
    }, 100)
})

const cardClasses = computed(() => ([
    {
        'bg-red-100 text-red-900 shadow-red-200': props.type === "negative",
        'bg-lime-100 text-lime-900 shadow-lime-200': props.type === "positive",
    },
    `transition-opacity duration-500 opacity-${isVisible.value ? 100 : 0}`
]))
</script>
