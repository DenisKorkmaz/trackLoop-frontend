export const useSanctumCsrf = async () => {
    await $fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
    })
}
