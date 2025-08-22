import DvrIcon from "@mui/icons-material/Dvr";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

export default function NavDrawer({ drawerWidth }: { drawerWidth: number }) {
  type MenuItem = {
    path: string;
    name: string;
    icon?: React.ElementType;
  };

  const menuItems: MenuItem[] = [
    { path: "/", name: "General Ledger", icon: DvrIcon },
    { path: "/form", name: "Record Transaction", icon: EditNoteIcon },
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
    </Drawer>
  );
}
