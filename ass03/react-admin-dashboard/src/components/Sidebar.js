import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        onClick={() => setSelected(title)}
        sx={{
          display: "flex",
          alignItems: "center",
          p: "5px 15px",
          m: "5px",
          borderRadius: "4px",
          backgroundColor: selected === title ? "#4cceac" : "transparent",
          "&:hover": {
            backgroundColor: "#4cceac",
            cursor: "pointer",
          },
        }}
      >
        {icon}
        <Typography sx={{ ml: "15px" }}>{title}</Typography>
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
          borderRight: `1px solid ${theme.palette.divider}`
        }}
      >
        <Box p={2}>
          {/* LOGO AND MENU ICON */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {!isCollapsed && (
              <Typography variant="h5" color="textPrimary">
                Shoppy
              </Typography>
            )}
            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
  
        <Box pl={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>Pages</Typography>
            <Item title="Orders" to="/orders" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Employees" to="/employees" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Customers" to="/customers" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>Apps</Typography>
            <Item title="Kanban" to="/kanban" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>Charts</Typography>
            <Item title="Bar Chart" to="/bar" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Pie Chart" to="/pie" icon={<PieChartOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Line Chart" to="/line" icon={<TimelineOutlinedIcon />} selected={selected} setSelected={setSelected} />
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;