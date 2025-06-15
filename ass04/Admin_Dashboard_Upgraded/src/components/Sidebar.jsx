import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const linkColor = theme.palette.text.primary;
  const hoverBg = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)';
  const selectedBg = theme.palette.secondary.main;
  const selectedColor = theme.palette.getContrastText(selectedBg);

  return (
    <Link to={to} style={{ textDecoration: "none", color: linkColor }}>
      <Box
        onClick={() => setSelected(title)}
        sx={{
          display: "flex",
          alignItems: "center",
          p: "5px 15px",
          m: isCollapsed ? "10px 0" : "5px 15px",
          borderRadius: "4px",
          backgroundColor: selected === title ? selectedBg : "transparent",
          color: selected === title ? selectedColor : "inherit",
          "&:hover": {
            backgroundColor: selected !== title ? hoverBg : selectedBg,
            cursor: "pointer",
          },
          transition: 'background-color 0.2s ease',
        }}
      >
        {icon}
        {!isCollapsed && <Typography sx={{ ml: "15px" }}>{title}</Typography>}
      </Box>
    </Link>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        width: isCollapsed ? '80px' : '250px',
        transition: 'width 0.3s ease-in-out',
      }}
    >
      {/* LOGO AND COLLAPSE ICON */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          alignItems: 'center',
          p: 2,
          height: '65px',
        }}
      >
        {!isCollapsed && (
          <Typography variant="h5" color="textPrimary" fontWeight="bold">
            ADMIN
          </Typography>
        )}
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          <MenuOutlinedIcon />
        </IconButton>
      </Box>

      {/* USER PROFILE SECTION */}
      {!isCollapsed && (
        <Box mb="25px">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar
              alt="User Profile"
              src={`/image.png`} // Assumes image.png is in the /public folder
              sx={{ width: 80, height: 80, cursor: "pointer", border: `2px solid ${theme.palette.secondary.main}` }}
            />
          </Box>
          <Box textAlign="center">
            <Typography variant="h5" color={theme.palette.text.primary} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
              Admin User
            </Typography>
            <Typography variant="body2" color={theme.palette.secondary.main}>
              VP Admin
            </Typography>
          </Box>
        </Box>
      )}

      {/* MENU ITEMS */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        
        {!isCollapsed && <Typography variant="body2" sx={{ m: "15px 0 5px 20px", color: theme.palette.text.secondary }}>Management</Typography>}
        <Item title="Users" to="/users" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        
        {!isCollapsed && <Typography variant="body2" sx={{ m: "15px 0 5px 20px", color: theme.palette.text.secondary }}>Apps</Typography>}
        <Item title="Kanban Board" to="/kanban" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        
        {!isCollapsed && <Typography variant="body2" sx={{ m: "15px 0 5px 20px", color: theme.palette.text.secondary }}>Charts</Typography>}
        <Item title="Bar Chart" to="/bar" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        <Item title="Pie Chart" to="/pie" icon={<PieChartOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
        <Item title="Line Chart" to="/line" icon={<TimelineOutlinedIcon />} selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} />
      </Box>
    </Box>
  );
};

export default Sidebar;