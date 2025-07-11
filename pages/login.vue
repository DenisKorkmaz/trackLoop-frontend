<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit" :loading="loading">
      Login
    </UButton>
  </UForm>
  <p class="mt-4 text-center">
    Noch kein Konto?
    <NuxtLink to="/register" class="underline text-blue-600">
      Registrieren
    </NuxtLink>
  </p>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useToast, useRouter } from '#imports'
import { useAuth } from '~/composables/auth/useAuth'

const { login } = useAuth()
const toast   = useToast()
const router  = useRouter()
const loading = ref(false)

const schema = z.object({
  email:    z.string().email('Ungültige E-Mail'),
  password: z.string().min(8, 'Mindestens 8 Zeichen'),
})
type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({ email: '', password: '' })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await login({ email: event.data.email!, password: event.data.password! })
    toast.add({ title: 'Erfolgreich eingeloggt', color: 'success' })
    await router.push('/dashboard')
  } catch (err: any) {
    toast.add({
      title: 'Login fehlgeschlagen',
      description: err?.data?.message || 'Bitte prüfe deine Daten.',
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>
