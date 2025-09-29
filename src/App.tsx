import Container from '@mui/material/Container';
import { RouterProvider } from 'react-router-dom';
import ProvideAuth from './hooks/auth/provider';
import { routes } from './Routes';
import { AxiosCommandClientProvider } from './service/api/command';
import { AxiosQueryClientProvider } from './service/api/query';

function App() : React.ReactElement {
  return (
      <Container sx={{height:'100vh'}}>
          <AxiosCommandClientProvider>
          <AxiosQueryClientProvider>
            <ProvideAuth>
              <RouterProvider router={routes} />
            </ProvideAuth>
          </AxiosQueryClientProvider>
          </AxiosCommandClientProvider>
      </Container>
  );
}

export default App