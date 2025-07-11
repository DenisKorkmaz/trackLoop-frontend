<template>
  <div class="p-4">
    <h1 class="text-2xl mb-4">Pomodoro-Daten:</h1>
    <p> {{ data }}}</p>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['sanctum:auth'],
});


import {useRuntimeConfig} from '#imports'

const config = useRuntimeConfig()

const {data} = await useFetch(`${config.public.baseUrl}/api/pomodoros`, {
  credentials: 'include',
  server: false
})


</script>
