import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Button
} from "@mui/material";

// 🎨 Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const drawerWidth = 240;

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // 🎯 Role-based menu with icons
  const menuItems = [
    {
      text: "Dashboard",
      path: `/${role?.toLowerCase()}`,
      icon: <DashboardIcon />
    }
  ];

  if (role === "ADMIN") {
    menuItems.push({
      text: "Users",
      path: "/admin",
      icon: <PeopleIcon />
    });
  }

  if (role === "MOTIVATOR") {
    menuItems.push({
      text: "Manage Users",
      path: "/motivator",
      icon: <PeopleIcon />
    });
  }

  if (role === "CHALLENGER") {
    menuItems.push({
      text: "My Logs",
      path: "/challenger",
      icon: <FitnessCenterIcon />
    });
  }

  if (role === "ADMIN") {
  menuItems.push({ text: "Assign Batch", path: "/assign" });
  menuItems.push({ text: "Leaderboard", path: "/leaderboard" });
}

  menuItems.push({
  text: "Profile",
  path: "/profile",
  icon: <DashboardIcon />
  });

  return (
    <Box sx={{ display: "flex" }}>

      {/* 🔷 TOP NAVBAR */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            Diet Management System
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* 🔷 SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >
        <Toolbar />

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>

              <ListItemButton
                selected={location.pathname === item.path} // ✅ highlight active
                onClick={() => navigate(item.path)}
              >
                {/* Icon */}
                <Box sx={{ mr: 1 }}>
                  {item.icon}
                </Box>

                {/* Text */}
                <ListItemText primary={item.text} />

              </ListItemButton>

            </ListItem>
          ))}
        </List>

      </Drawer>

      {/* 🔷 MAIN CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>

    </Box>
  );
}

export default Layout;