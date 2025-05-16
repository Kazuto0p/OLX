
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

const onRedirectCallback = (appState) => {
  window.history.replaceState({}, document.title, appState?.returnTo || "/");
};

createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain="dev-jualdgdxsldqmwm3.us.auth0.com"
  clientId="5bXYRl7k3JLMtECKFXZHatIC3Iu2PqAM"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
  useRefreshTokens={true}
  cacheLocation='localstorage'
  onRedirectCallback={onRedirectCallback}
>

    <App />
  </Auth0Provider> 


)