import Keycloak from 'keycloak-js';

export default defineNuxtPlugin(async (app) => {
  const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'admin',
    clientId: 'nuxtjs_example',
    
});

try {
    const authenticated = await keycloak.init({
      onLoad: 'login-required',
      
  });
    console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    app.$keycloak = keycloak;
} catch (error) {
    console.error('Failed to initialize adapter:', error);
}

try {
  const refreshed = await keycloak.updateToken(5);
  console.log(refreshed ? 'Token was refreshed' : 'Token is still valid');
} catch (error) {
  console.error('Failed to refresh the token:', error);
}
})