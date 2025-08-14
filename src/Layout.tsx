import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";

export default function Layout() {
    const drawerWidth:number = 240;
    
    return (
        <Container sx={{ display: "flex" }}>
            <NavDrawer drawerWidth={drawerWidth}/>
            <Box sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                py: 3
            }}>
                <Outlet />
            </Box>
        </Container>
    );
}