import {ref} from "vue";

const notifications = ref([])

export default function useNotification() {
    const notify = (type, message) => {
        notifications.value.push({
            type,
            message,
        })
    }

    return {
        notifications,
        notify,
    }
}