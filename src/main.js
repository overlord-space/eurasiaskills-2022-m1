import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import useUser from "./composables/user";

const app = createApp(App)
app.use(router)

const user = useUser()
user.init()

app.mount('#app')

router.beforeEach((to) => {
    if (to.path !== '/' && !user.isLoggedIn.value) {
        setTimeout(() => {
            router.push('/')
        }, 200)
        return false
    }
})
