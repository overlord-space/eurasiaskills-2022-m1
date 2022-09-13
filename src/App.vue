<template>
    <div>
        <suspense>
            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <component :is="Component"/>
                </transition>
            </router-view>

            <template #fallback>
                <main class="min-h-screen flex flex-col flex-nowrap items-center justify-center">
                    Loading...
                </main>
            </template>
        </suspense>

        <!-- Notifications wrapper -->
        <div
            class="fixed bottom-0 left-0 p-[2rem] w-[32rem] max-w-full flex flex-col flex-nowrap gap-3 pointer-events-none select-none">
            <notification-card
                v-for="(notification, i) in notifications"
                :key="i"
                :type="notification.type"
                :message="notification.message"
            />
        </div>
    </div>
</template>

<script setup>
import {RouterView} from 'vue-router'
import NotificationCard from "./components/NotificationCard.vue";
import useNotification from "./composables/notify";

const {notifications} = useNotification()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-active {
    transition-delay: .4s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>