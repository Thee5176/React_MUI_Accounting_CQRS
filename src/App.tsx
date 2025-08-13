import Container from '@mui/material/Container';
import { RouterProvider } from 'react-router-dom';
import { routesBasic } from './routes';


function App() {

  return (
      <Container sx={{height:'100vh'}}>
        <RouterProvider router={routesBasic}/>
      </Container>
  ) 
}

export default App
