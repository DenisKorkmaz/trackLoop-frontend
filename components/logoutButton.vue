<template>
  <UButton @click="handleLogout">Logout</UButton>
</template>

<script setup lang="ts">
import { useToast, useRouter } from '#imports'
import { useAuth } from '~/composables/auth/useAuth'

const { logout } = useAuth()
const toast        = useToast()
const router       = useRouter()

async function handleLogout() {
  try {
    await logout()
    toast.add({ title: 'Abgemeldet', color: 'success' })
    await router.push('/login')
  } catch {
    toast.add({ title: 'Logout fehlgeschlagen', color: 'error' })
  }
}
</script>
