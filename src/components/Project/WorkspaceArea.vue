<template>
    <div
        v-if="elements"
        class="flex-auto relative overflow-hidden"
        @wheel="onWheel"
        @dragover.prevent
        @drop="onElementDrop"
        @mousemove="onMouseMove"
        @mousedown="onMouseDown(null)"
        :style="{'transform': `scale(${scale})`}"
    >
        <div
            class="absolute select-none cursor-move w-fit"
            :class="{'ring-4': focusedElement === index}"
            :style="{'top': `${item.y}px`, 'left': `${item.x}px`,'transform': `rotate(${item.angle || 0}deg)`}"
            v-for="(item, index) in content"
            :key="`${item.id}-${index}`" v-html="getElementSvg(item.id)"
            @mousedown="onMouseDown(index)"
        />
    </div>
</template>

<script setup>
import {inject, onBeforeUnmount, onMounted, ref} from "vue";

const elements = inject('elements')
const content = inject('content')
const focusedElement = inject('focusedElement')
const rotateElement = inject('rotateElement')
const scale = ref(1)

const currentMovableElement = ref(null)
const moveActive = ref(false)

const getElementSvg = (uuid) => {
    const element = elements.value.find((element) => element.id === uuid)

    return element?.svg
}

const onElementDrop = (event) => {
    const uuid = event.dataTransfer.getData('uuid')

    const element = elements.value.find((element) => element.id === uuid)
    if (!element) return

    content.value.push({
        id: element.id,
        x: event.layerX - (element.width / 2),
        y: event.layerY - (element.height / 2),
    })
}

const onMouseDown = (index) => {
    if (!isNaN(parseInt(index))) {
        currentMovableElement.value = index
        focusedElement.value = index
    }
    moveActive.value = true
}

const onMouseUp = () => {
    currentMovableElement.value = null
    moveActive.value = false
}

onMounted(() => {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('keyup', deleteItem)
})

onBeforeUnmount(() => {
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('keyup', deleteItem)
    // window.removeEventListener('wheel', onWheel)
})

const onMouseMove = (event) => {
    if (currentMovableElement.value !== null) {
        content.value[currentMovableElement.value].x += event.movementX
        content.value[currentMovableElement.value].y += event.movementY
    }
}

const deleteItem = (event) => {
    if (['Delete', 'Backspace'].includes(event.code)) {
        if (focusedElement.value !== null) {
            content.value = content.value.filter((item, index) => index !== focusedElement.value)
        }
    } else if (event.code === 'Escape') {
        currentMovableElement.value = null
        focusedElement.value = null
    } else if (event.code === 'KeyR') {
        rotateElement()
    }
}

const onWheel = (event) => {
    const zoomSpeed = 0.1

    let newValue = scale.value

    if (event.deltaY < 0) {
        newValue += zoomSpeed
    } else {
        newValue -= zoomSpeed
    }

    scale.value = Math.max(0.3, Math.min(newValue, 4))
}
</script>
