import { useAuth0 } from "@auth0/auth0-react";
import DvrIcon from "@mui/icons-material/Dvr";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SummarizeIcon from '@mui/icons-material/Summarize';
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

export default function NavDrawer({ drawerWidth }: { readonly drawerWidth: number }) {
  
  type MenuItem = {
    path: string;
    name: string;
    icon?: React.ElementType;
  };

  const menuItems: MenuItem[] = [
    { path: "/", name: "Accounting Ledger", icon: DvrIcon },
    { path: "/form", name: "Record Transaction", icon: EditNoteIcon },
    { path: "/report", name: "Financial Statement", icon: SummarizeIcon },
  ];

  const drawer = (
    <List>
      {menuItems.map((item, idx) => (
        <ListItem key={`${item.name}-${idx}`} disablePadding>
          <ListItemButton component={Link} to={item.path}>
            <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const base_url = globalThis.location.origin;

  return (
    <Drawer
      sx={{
        display: { xs: "none", md: "block" },
        width: `${drawerWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
      open
    >
      {drawer}
      {isAuthenticated ? (
        <Button onClick={() => logout(
          { logoutParams: { returnTo: `${base_url}/authorize`} }
        )}>Logout</Button>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      )}
    </Drawer>
  );
}
