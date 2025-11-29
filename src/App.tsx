import { Auth0Provider } from '@auth0/auth0-react';
import Container from '@mui/material/Container';
import { RouterProvider } from 'react-router-dom';
import ProvideAuth from './hooks/auth/provider';
import ProvideCoa from './hooks/coa/provider';
import { routes } from './Routes';
import { AxiosCommandClientProvider } from './service/api/command';
import { AxiosQueryClientProvider } from './service/api/query';

function App() : React.ReactElement {
  return (
    <Container sx={{ height: '100vh' }}>
      <Auth0Provider
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
              authorizationParams={{
                redirect_uri: globalThis.location.origin
              }}
              cacheLocation="localstorage"
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