import { ColorModeContext, useMode } from "./contexts/ThemeContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Kanban from "./pages/Kanban/Kanban.jsx";
import Calendar from "./pages/Calendar/Calendar.jsx";
import Bar from "./pages/Bar/Bar.jsx";
import Line from "./pages/Line/Line.jsx";
import Pie from "./pages/Pie/Pie.jsx";
import Users from "./pages/Users/Users.jsx";
import UserDetail from "./pages/Users/UserDetail.jsx";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content" style={{ width: "100%" }}>
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:userId" element={<UserDetail />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;