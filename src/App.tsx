import Container from '@mui/material/Container';
import { RouterProvider } from 'react-router-dom';
import ProvideAuth from './hooks/auth/provider';
import ProvideCoa from './hooks/coa/provider';
import { routes } from './Routes';
import { AxiosCommandClientProvider } from './service/api/command';
import { AxiosQueryClientProvider } from './service/api/query';

function App() : React.ReactElement {
  return (
      <Container sx={{height:'100vh'}}>
          <AxiosCommandClientProvider>
          <AxiosQueryClientProvider>
            <ProvideCoa>
            <ProvideAuth>
              <RouterProvider router={routes} />
            </ProvideAuth>
            </ProvideCoa>
          </AxiosQueryClientProvider>
          </AxiosCommandClientProvider>
      </Container>
  );
}

export default App