<script setup >
import { userAuthStore } from '@/stores/userAuth'
const { $auth } = useNuxtApp()
const store = userAuthStore() 
const user = computed(() => store.GetUserAuthenticated)
onMounted(async () => {
  // realm admin ou external
  const authInstance = await $auth('external')
  await authInstance?.init()
  console.log(authInstance.keycloak)
})
</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
