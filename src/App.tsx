import Container from '@mui/material/Container';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes';

function App() {

  return (
      <Container sx={{height:'100vh'}}>
        <RouterProvider router={routes}/>
      </Container>
  ) 
}

export default App
