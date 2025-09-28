import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet, useLocation, type Location } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";

export default function Layout() {
    const path : Location = useLocation();
    const isAuthPath : boolean = path.pathname.startsWith("/auth");

    const drawerWidth: number = isAuthPath ? 0 : 240;

    return (
        <Container sx={{ display: "flex" }}>
            <NavDrawer drawerWidth={drawerWidth}/>
            <Box sx={{
                width: {sm: `100%`, md:`calc(100% - ${drawerWidth}px)`},
                py: 3
            }}>
                <Outlet />
            </Box>
        </Container>
    );
}