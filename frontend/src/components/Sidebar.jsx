import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import { Add, ListAlt, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar = ({ handleDrawerClose, open }) => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem component={Link} to="/add-user" sx={{ color: "black", textDecoration: "none" }}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add User" />
        </ListItem>
        <ListItem component={Link} to="/" sx={{ color: "black", textDecoration: "none" }}>
          <ListItemIcon>
            <ListAlt />
          </ListItemIcon>
          <ListItemText primary="View Details" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
