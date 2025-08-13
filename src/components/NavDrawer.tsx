import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

export default function NavDrawer (){
        type MenuItem = {
        path: string;
        name: string;
    };

    const menuItems: MenuItem[] = [
        { path: '/', name: 'View Record Page' },
        { path: '/form', name: 'Form Page' }
    ]
    return (
        <Drawer
        variant="permanent"
        anchor="left"
        >
            <Toolbar>
                <List>
                {menuItems.map(item => (
                    <ListItemText key={item.name}>
                        <Link to={item.path} key={item.name}>{item.name}</Link>
                    </ListItemText>
                ))}
                </List>
            </Toolbar>
        </Drawer>
    )
}