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
      <ProvideAuth>
        <AxiosCommandClientProvider>
          <AxiosQueryClientProvider>
            <ProvideCoa>
              <RouterProvider router={routes} />
            </ProvideCoa>
          </AxiosQueryClientProvider>
        </AxiosCommandClientProvider>
      </ProvideAuth>
    </Container>
  );
}

export default App