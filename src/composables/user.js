import {computed, ref} from "vue";

const token = ref(null)
const isLoggedIn = computed(() => !!token.value)

export default function useUser() {
    const init = () => {
        setToken(localStorage.getItem('token') || null)
    }

    const setToken = (newToken) => {
        if (newToken === 'null') {
            newToken = null
        }

        token.value = newToken
        localStorage.setItem('token', newToken)
    }

    return {
        token,
        isLoggedIn,
        init,
        setToken,
    }
}