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

export default function NavDrawer({
  drawerWidth,
}: {
  readonly drawerWidth: number;
}) {
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

  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const getCacheKey = () =>
    user?.sub ? `myFormState_${user.sub}` : "myFormState";

  const handleMenuClick = (path: string) => {
    if (path === "/form") {
      const cacheKey = getCacheKey();
      const savedData = localStorage.getItem(cacheKey);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.id) {
          localStorage.removeItem(cacheKey);
        }
      }
    }
  };

  const drawer = (
    <List>
      {menuItems.map((item, idx) => (
        <ListItem key={`${item.name}-${idx}`} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            onClick={() => handleMenuClick(item.path)}
          >
            <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

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
        <Button
          onClick={() => {
            localStorage.removeItem(getCacheKey());
            logout({ logoutParams: { returnTo: base_url } });
          }}
        >
          Logout
        </Button>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      )}
    </Drawer>
  );
}
