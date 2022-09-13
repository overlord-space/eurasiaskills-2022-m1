<template>
    <main class="min-h-screen flex flex-col flex-nowrap items-center justify-center">
        Please, stand by...
    </main>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import useUser from "../composables/user";
import {useRouter} from "vue-router";
import useNotification from "../composables/notify";

const router = useRouter()

onMounted(() => {
    useUser().setToken(null)
    useNotification().notify('positive', 'Successful logout')
    router.push('/')
})
</script>