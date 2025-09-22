import Container from '@mui/material/Container';
import { CookiesProvider } from 'react-cookie';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes';

function App() : React.ReactElement {
  return (
      <Container sx={{height:'100vh'}}>
        <CookiesProvider>
          <RouterProvider router={routes}/>
        </CookiesProvider>
      </Container>
  ) 
}

export default App
