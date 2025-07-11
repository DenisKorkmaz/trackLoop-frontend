<template>
  <div>
    <p>Willkommen, {{ user?.name }}!</p>
    <UButton @click="handleLogout">Logout</UButton>
  </div>
</template>
<script setup lang="ts">
import { definePageMeta, useToast, useRouter } from '#imports'
import { useAuth } from '~/composables/auth/useAuth'


definePageMeta({
  middleware: ['sanctum:auth'],
});

const { logout, user } = useAuth()
const toast  = useToast()
const router = useRouter()

async function handleLogout() {
  try {
    await logout()
    toast.add({ title: 'Abgemeldet', color: 'success' })
    await router.push('/login')
  } catch (err: any) {
    toast.add({ title: 'Logout fehlgeschlagen', color: 'error' })
  }
}
</script>
