<template>
    <div class="flex flex-col flex-nowrap gap-3 transition-opacity" :class="{'pointer-events-none opacity-50': isBusy}">
        <app-toolbar>
            <app-button color="blue" class="mr-auto" @click="createProject">
                &plus;
                Create new project
            </app-button>
            <router-link to=/logout>
                <app-button>
                    Logout
                </app-button>
            </router-link>
        </app-toolbar>
        <main class="p-8">
            <h1 class="text-2xl border-b border-b-gray-100 pb-3 mb-8">Project list</h1>
            <div class="grid grid-cols-4 gap-6">
                <router-link
                    v-for="project in projects"
                    :key="project.id"
                    :to="`/projects/${project.id}`"
                    class="px-8 py-6 border border-gray-100 rounded-2xl border-blue-100 shadow-gray-200 shadow-sm tracking-wide transition-transform hover:scale-105 duration-500 cursor-pointer">
                    <p class="text-lg">{{ project.name }}</p>
                </router-link>
            </div>
        </main>
    </div>
</template>

<script setup>
import AppToolbar from "../components/AppToolbar.vue";
import AppButton from "../components/contols/AppButton.vue";
import useRequest from "../composables/request";
import {ref} from "vue";
import {useRouter} from "vue-router";
import useNotification from "../composables/notify";

const router = useRouter()
const isBusy = ref(false)
const {data: projects} = await useRequest('get', 'projects')

const createProject = async () => {
    if (isBusy.value) return
    isBusy.value = true

    try {
        const {data: project} = await useRequest('post', 'projects')

        router.push(`/projects/${project.id}`)
        useNotification().notify('positive', 'New project successfully created!')
    } catch {
        isBusy.value = false
    }
}
</script>
