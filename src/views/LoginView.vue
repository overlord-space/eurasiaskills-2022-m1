<template>
    <main class="min-h-screen flex flex-col flex-nowrap items-center justify-center">
        <div class="flex flex-col w-[28rem] gap-8 max-w-full p-6 border border-gray-100 rounded-lg shadow-sm">
            <h1 class="text-xl text-center">
                <span class="border-b">Authorization</span>
            </h1>

            <form @submit.prevent="login" class="flex flex-col gap-4">
                <label class="flex flex-col gap-2">
                    Login:
                    <form-input
                        v-model="formData.login"
                        type="text"
                        required
                    />
                </label>
                <label class="flex flex-col gap-2">
                    Pin-code:
                    <form-input
                        v-model="formData.pin"
                        type="password"
                        maxlength="4"
                        required
                    />
                </label>

                <app-button type="submit" color="blue">Login</app-button>
            </form>
        </div>
    </main>
</template>

<script setup>
import {reactive, ref} from "vue";
import FormInput from "../components/contols/FormInput.vue";
import useRequest from "../composables/request";
import useUser from "../composables/user";
import {useRouter} from "vue-router";
import useNotification from "../composables/notify";
import AppButton from "../components/contols/AppButton.vue";

const formData = reactive({
    login: 'abcde',
    pin: '1234',
})
const router = useRouter()
const isFormBusy = ref(false)

const login = async () => {
    if (isFormBusy.value) return
    isFormBusy.value = true

    try {
        const {data: {token}} = await useRequest('post', 'login', formData)

        useUser().setToken(token || null)
        useNotification().notify('positive', 'Successful login!')
        router.push('/projects')
    } catch (errors) {
        isFormBusy.value = false
    }
}
</script>