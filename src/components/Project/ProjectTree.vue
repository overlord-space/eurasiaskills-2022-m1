<template>
    <div class="p-8 bg-gray-50 flex flex-col flex-wrap gap-8 w-[20rem] max-w-full border-l">
        <ul class="pl-4 flex flex-col flex-nowrap list-disc text-blue-900">
            <li
                v-for="(item, index) in content"
                :key="index"
                class="cursor-pointer select-none w-fit rounded-lg px-2"
                :class="{'bg-blue-500 bg-opacity-20': focusedElement === index}"
                @click="onClick(index)"
            >
                {{ getReadableName(item.id) }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import {inject} from "vue";

const content = inject('content')
const elements = inject('elements')
const focusedElement = inject('focusedElement')

const getReadableName = (id) => {
    const element = elements.value.find((element) => element.id === id)

    return element?.name
}

const onClick = (index) => {
    focusedElement.value = index
}
</script>