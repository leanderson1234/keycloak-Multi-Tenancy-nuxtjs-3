// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      authClientId: process.env.KEYCLOAK_CLIENT_ID,
      authUrl: process.env.KEYCLOAK_BASE_URL,
    }
  },
  devtools: { enabled: true },
  plugins:[{src:'~/plugins/keycloak',mode:'client'}],
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  modules: ['@pinia/nuxt'],
})
