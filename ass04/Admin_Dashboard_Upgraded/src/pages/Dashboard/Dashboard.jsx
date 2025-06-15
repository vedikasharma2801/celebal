import React, { useState, useMemo } from 'react';
import { Box, Grid, Typography, useTheme, Modal, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import Header from '../../components/Header.jsx';
import StatBox from '../../components/StatBox.jsx';
import { useStore } from '../../store/useStore.js';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = () => {
    const theme = useTheme();
    const users = useStore((state) => state.users);
    const tasks = useStore((state) => state.tasks);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);

    const { totalUsers, totalTasks, completedTasksData, upcomingTasksData } = useMemo(() => ({
        totalUsers: users.length,
        totalTasks: tasks.length,
        completedTasksData: tasks.filter(t => t.status === 'done'),
        upcomingTasksData: tasks.filter(t => new Date(t.dueDate) > new Date() && t.status !== 'done'),
    }), [users, tasks]);

    const modalStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 };

    const handleStatBoxClick = (title, data) => {
        setModalTitle(title);
        setModalData(data);
        setModalOpen(true);
    };

    const handleCloseModal = () => setModalOpen(false);

    return (
        <Box m="20px">
            <Header title="Dashboard" subtitle="Welcome to your dashboard" />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => handleStatBoxClick("Total Users", users)}>
                        <StatBox title="Total Users" value={totalUsers} icon={<PeopleIcon sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => handleStatBoxClick("Total Tasks", tasks)}>
                        <StatBox title="Total Tasks" value={totalTasks} icon={<AssignmentIcon sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => handleStatBoxClick("Completed Tasks", completedTasksData)}>
                        <StatBox title="Completed Tasks" value={completedTasksData.length} icon={<CheckCircleIcon sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => handleStatBoxClick("Upcoming Tasks", upcomingTasksData)}>
                        <StatBox title="Upcoming Tasks" value={upcomingTasksData.length} icon={<AssignmentLateIcon sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />} />
                    </Box>
                </Grid>
            </Grid>
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Paper sx={modalStyle}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{modalTitle}</Typography>
                        <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
                    </Box>
                    <List sx={{ maxHeight: 300, overflow: 'auto', mt: 2 }}>
                        {modalData.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemText primary={modalTitle === 'Total Users' ? item.name : item.title} secondary={modalTitle !== 'Total Users' ? `Due: ${item.dueDate}` : null} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Modal>
        </Box>
    );
};
export default Dashboard;