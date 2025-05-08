import * as React from "react";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useNavigate } from "react-router-dom";

export default function Sidemenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const listOptions = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={() => navigate("/reservas")}>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary="Reservas" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/reportes")}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Reportes" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/clientes")}>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/karts")}>
          <ListItemIcon>
            <DirectionsCarIcon />
          </ListItemIcon>
          <ListItemText primary="Karts" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/rackSemanal")}>
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="Rack Semanal" />
        </ListItemButton>

      </List>

      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {listOptions()}
      </Drawer>
    </div>
  );
}
