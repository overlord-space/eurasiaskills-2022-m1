<template>
    <div class="p-8 bg-gray-50 flex flex-col flex-wrap gap-8 w-[20rem] max-w-full border-r">
        <div
            class="select-none w-fit cursor-move transition-transform duration-200 hover:scale-105"
            :title="element.name"
            v-for="element in elements"
            :key="element.uuid"
            v-html="element.svg"
            draggable="true"
            @dragstart="event => onDragStart(event, element)"
        />
    </div>
</template>

<script setup>
import {inject} from "vue";

const elements = inject('elements')

const onDragStart = (event, element) => {
    event.dataTransfer.dropEffect = "copy"
    event.dataTransfer.setData('uuid', element.id)
}
</script>