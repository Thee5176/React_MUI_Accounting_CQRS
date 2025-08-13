import { Outlet } from "react-router-dom";
import NavDrawer from "./NavDrawer";

export default function Layout() {
    return (
        <>
            <NavDrawer />
            <Outlet />
        </>
    )
}