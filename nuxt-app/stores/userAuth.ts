import { defineStore } from 'pinia'

export const userAuthStore = defineStore('userAuth', () => {
    let usuario = ref()
    const GetUserAuthenticated = computed(() => usuario)

 
   function SetUserAuthenticated(payload:any) {
    const dados = payload
      usuario = dados
    }
return {GetUserAuthenticated,SetUserAuthenticated}
})
