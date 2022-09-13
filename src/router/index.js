import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import ProjectListView from "../views/ProjectListView.vue";
import ProjectWorkspaceView from "../views/ProjectWorkspaceView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/logout',
            name: 'logout',
            component: LogoutView,
        },
        {
            path: '/projects',
            name: 'projects',
            component: ProjectListView
        },
        {
            path: '/projects/:id',
            name: 'projects.view',
            component: ProjectWorkspaceView
        },
    ]
})

export default router
