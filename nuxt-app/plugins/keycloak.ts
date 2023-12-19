import Keycloak from "keycloak-js";
import {userAuthStore} from '@/stores/userAuth'
export default defineNuxtPlugin( () => {
    let runtimeConfig = useRuntimeConfig();
    let keycloak:Keycloak
    let store = userAuthStore()
        return {
            provide:{
                'auth': async (realm:string) => {
                    if(realm == 'admin'){
                        keycloak = new Keycloak({
                            url: runtimeConfig.public.authUrl,
                            realm:realm,
                            clientId: runtimeConfig.public.authClientId,
                        });
                        console.log(keycloak)
                        return {
                            keycloak,
                            init: async () => {
                                console.log("keycloak - init", keycloak)
                                let authenticated = await keycloak.init({
                                    onLoad: "login-required",
                                    
                                });
                                console.log("keycloak - init - authenticated", authenticated)
                                if(authenticated){
                                    try {
                                        let dados = await keycloak.loadUserProfile()
                                        store.SetUserAuthenticated(dados)                                            
                                    } catch (error) {
                                        console.log('error',error)                
                                    }
                                }
                            },
                        }
                    } else if(realm == 'external'){
                        keycloak = new Keycloak({
                            url: runtimeConfig.public.authUrl,
                            realm:realm,
                            clientId: runtimeConfig.public.authClientId,
                        });
                        return {
                            keycloak,
                            init: async () => {
                                let authenticated = await keycloak.init({
                                    onLoad: "login-required",
                                    
                                });
                                if(authenticated){
                                    try {
                                        let dados = await keycloak.loadUserProfile()
                                        store.SetUserAuthenticated(dados)      
                                        
                                    } catch (error) {
                                        console.log('error',error)                
                                    }
                                }
                            },
                        }
                    }
                }     
            }
        }
});

