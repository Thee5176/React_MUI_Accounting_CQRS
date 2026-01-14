import { Auth0Provider } from '@auth0/auth0-react';
import Container from '@mui/material/Container';
import { RouterProvider } from 'react-router-dom';
import ProvideAuth from './hooks/auth/provider';
import ProvideCoa from './hooks/coa/provider';
import { routes } from './Routes';
import { AxiosCommandClientProvider } from './service/api/command';
import { AxiosQueryClientProvider } from './service/api/query';

// Resolve runtime + build-time environment values
const runtime: any = (globalThis as any).runtimeConfig || {};
const rawDomain = runtime.AUTH0_DOMAIN || import.meta.env.VITE_AUTH0_DOMAIN || '';
const clientId = runtime.AUTH0_CLIENT_ID || import.meta.env.VITE_AUTH0_CLIENT_ID || '';
const audience = runtime.AUTH0_AUDIENCE || import.meta.env.VITE_AUTH0_AUDIENCE || '';

if (rawDomain) {
  console.log('[Auth0] Using domain:', rawDomain);
} else {
  // eslint-disable-next-line no-console
  console.warn('[Auth0] Missing AUTH0_DOMAIN (runtimeConfig or VITE_AUTH0_DOMAIN).');
}
if (clientId) {
  // eslint-disable-next-line no-console
  console.log('[Auth0] Using clientId:', clientId);
}
if (audience) {
  // eslint-disable-next-line no-console
  console.log('[Auth0] Using audience:', audience);
} else {
  // eslint-disable-next-line no-console
  console.warn('[Auth0] Missing AUTH0_AUDIENCE (runtimeConfig or VITE_AUTH0_AUDIENCE). Tokens may be unusable for the API.');
}

function App() : React.ReactElement {
  return (
    <Container sx={{ height: '100vh' }}>
      <Auth0Provider
        domain={`https://${rawDomain}`}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: globalThis.location.origin,
          audience: audience,
        }}
        cacheLocation="memory"
        useRefreshTokens
      >
      <ProvideAuth>
        <AxiosCommandClientProvider>
        <AxiosQueryClientProvider>
            <ProvideCoa>
              <RouterProvider router={routes} />
            </ProvideCoa>
        </AxiosQueryClientProvider>
        </AxiosCommandClientProvider>
      </ProvideAuth>
      </Auth0Provider>
    </Container>
  );
}

export default App