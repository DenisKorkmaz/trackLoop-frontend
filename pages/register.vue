<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField label="Passwort" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit" :loading="loading">
      Registrieren
    </UButton>

    <p class="text-sm mt-2">
      Bereits registriert?
      <NuxtLink to="/login" class="text-blue-600 underline">Zum Login</NuxtLink>
    </p>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useToast } from '#imports'
import { useAuth } from '~/composables/auth/useAuth'
import { useRouter } from '#imports'

const { register, login } = useAuth()
const toast   = useToast()
const router  = useRouter()
const loading = ref(false)

const schema = z.object({
  name:                  z.string().min(1),
  email:                 z.string().email(),
  password:              z.string().min(8),
  password_confirmation: z.string().min(8),
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  name: '', email: '', password: '', password_confirmation: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await register({
      name: event.data.name!,
      email: event.data.email!,
      password: event.data.password!,
      password_confirmation: event.data.password!,
    })

    toast.add({ title: 'Registrierung erfolgreich', color: 'success' })

    await login({
      email: event.data.email!,
      password: event.data.password!,
    })

    await router.push('/')
  } catch (err: any) {
    toast.add({
      title: 'Fehler',
      description: err?.data?.message || 'Registrierung fehlgeschlagen',
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>
