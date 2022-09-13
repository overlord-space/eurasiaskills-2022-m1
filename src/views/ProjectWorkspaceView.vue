<template>
    <div class="flex flex-col flex-nowrap min-h-screen" v-if="project">
        <app-toolbar>
            <router-link @click="updateProject" to=/projects>
                <app-button>
                    Go back
                </app-button>
            </router-link>
            <input
                class="px-4 py-2 text-lg rounded-xl border border-transparent transition-colors hover:border-gray-200 text-gray-600 focus:text-black outline-none tracking-wide font-mono"
                type="text"
                v-model.lazy="project.name" placeholder="Project name..."
                required
            >

            <app-button class="ml-auto" color="blue" @click="rotateElement">
                Rotate element
            </app-button>
        </app-toolbar>
        <main class="flex-auto flex flex-row flex-nowrap">
            <elements-bar/>
            <div class="flex flex-col flex-nowrap flex-auto overflow-hidden">
                <workspace-area/>
                <status-bar/>
            </div>
            <project-tree/>
        </main>
    </div>
</template>

<script setup>
import AppToolbar from "../components/AppToolbar.vue";
import AppButton from "../components/contols/AppButton.vue";
import useRequest from "../composables/request";
import {provide, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import useNotification from "../composables/notify";
import ElementsBar from "../components/Project/ElementsBar.vue";
import WorkspaceArea from "../components/Project/WorkspaceArea.vue";
import ProjectTree from "../components/Project/ProjectTree.vue";
import StatusBar from "../components/Project/StatusBar.vue";

const router = useRouter()

const project = ref(null)
const elements = ref(null)
const content = ref([])
const focusedElement = ref(null)

try {
    const projectId = parseInt(useRoute().params.id)
    project.value = (await useRequest('get', `projects/${projectId}`)).data
    elements.value = (await useRequest('get', 'elements')).data
    content.value = [...project.value.content] || []
} catch {
    useNotification().notify('negative', 'Project not found')
    router.push('/projects')
}

provide('project', project)
provide('elements', elements)
provide('content', content)
provide('focusedElement', focusedElement)

const lastSave = ref(null)

const updateProject = async () => {
    const newData = {
        name: project.value.name,
        content: project.value.content
    }

    try {
        await useRequest('patch', `projects/${project.value.id}`, newData)
        useNotification().notify('positive', 'Project successful updated!')
    } catch {
        useNotification().notify('negative', 'Error occurred while project updating!')
    }
}

watch(project.value, () => {
    const key = `${Date.now()}-${Math.random().toString().substring(2)}`
    lastSave.value = key

    setTimeout(() => {
        if (lastSave.value === key) {
            updateProject()
        }
    }, 1500)
})


watch(content.value, () => {
    project.value.content = [...content.value]
})

const rotateElement = () => {
    if (focusedElement.value === null) {
        useNotification().notify('negative', 'Element not selected')
    } else {
        let angle = content.value[focusedElement.value].angle || 0

        angle += 90

        if (angle >= 360) {
            angle = 0
        }

        content.value[focusedElement.value].angle = angle
    }
}
provide('rotateElement', rotateElement)
</script>
