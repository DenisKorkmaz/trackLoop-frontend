import { useSanctumCsrf } from '~/composables/auth/useSanctumCsrf'
import { useRuntimeConfig } from '#imports'

export function useAuth() {
    const { login, logout, user } = useSanctumAuth()
    const config = useRuntimeConfig()

    async function register(payload: {
        name: string
        email: string
        password: string
        password_confirmation: string
    }) {
        await useSanctumCsrf()

        return await $fetch(`${config.public.baseUrl}/api/register`, {
            method: 'POST',
            credentials: 'include',
            headers: { Accept: 'application/json' },
            body: payload,
        })
    }

    return { login, logout, user, register }
}
