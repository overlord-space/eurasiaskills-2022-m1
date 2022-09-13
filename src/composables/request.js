import useUser from "./user";
import useNotification from "./notify";

const apiUrl = 'http://nvafmzc-m1.wsr.ru/api/'
const user = useUser()

const parseError = (object) => {
    if (typeof object !== "string") {
        Object.values(object).forEach((subObject) => parseError(subObject))
    } else {
        useNotification().notify('negative', object)
    }
}

export default async function useRequest(method, uri, body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    if (user.isLoggedIn.value) {
        headers['Authorization'] = `Bearer ${user.token.value}`
    }

    const response = await fetch(apiUrl + uri, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers
    })

    const json = await response.json()

    if (!response.ok) {
        if (json.errors) {
            parseError(json.errors)
        }

        throw json
    }

    return json
}