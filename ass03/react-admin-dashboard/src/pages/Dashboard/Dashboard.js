import React, { useState } from 'react';
import { Box, Grid, Typography, useTheme, Modal, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import { mockUsers, mockTasks } from '../../data/mockData';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = () => {
    const theme = useTheme();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);

    const totalUsers = mockUsers.length;
    const totalTasks = mockTasks.length;
    const completedTasksData = mockTasks.filter(t => t.status === 'done');
    const upcomingTasksData = mockTasks.filter(t => new Date(t.dueDate) > new Date() && t.status !== 'done');

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleStatBoxClick = (title, data) => {
        setModalTitle(title);
        setModalData(data);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Box m="20px">
            <Header title="Dashboard Page" subtitle="Welcome to your admin dashboard!" />
            
            <Typography variant="h5" fontWeight="600" sx={{ mb: '15px' }}>Stats Summary</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => handleStatBoxClick("Total Users", mockUsers)}>
                        <StatBox title="Total Users" value={totalUsers} icon={<PeopleIcon sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => handleStatBoxClick("Total Tasks", mockTasks)}>
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

            {/* Modal for displaying data */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Paper sx={modalStyle}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography id="modal-title" variant="h6" component="h2">
                            {modalTitle}
                        </Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List sx={{ maxHeight: 300, overflow: 'auto', mt: 2 }}>
                        {modalData.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemText 
                                  primary={modalTitle === 'Total Users' ? item.name : item.title} 
                                  secondary={modalTitle !== 'Total Users' ? `Due: ${item.dueDate}` : null}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Modal>
        </Box>
    );
};

export default Dashboard;