import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItem, ListItemText, Avatar, useTheme, Grid, Button, Modal, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Header from '../../components/Header.jsx';
import { useStore } from '../../store/useStore.js';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const UserDetail = () => {
    const theme = useTheme();
    const { userId } = useParams();
    const users = useStore((state) => state.users);
    const tasks = useStore((state) => state.tasks);
    const assignTaskToUser = useStore((state) => state.assignTaskToUser);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');

    const user = users.find((u) => u.id === parseInt(userId));

    const { userTasks, unassignedTasks, doneCount, inProgressCount, todoCount } = useMemo(() => {
        if (!user) return { userTasks: [], unassignedTasks: [], doneCount: 0, inProgressCount: 0, todoCount: 0 };
        const userTasks = tasks.filter(task => task.assignedTo === user.id);
        const unassignedTasks = tasks.filter(task => task.assignedTo === null);
        return { userTasks, unassignedTasks,
            doneCount: userTasks.filter(t => t.status === 'done').length,
            inProgressCount: userTasks.filter(t => t.status === 'in-progress').length,
            todoCount: userTasks.filter(t => t.status === 'todo').length,
        };
    }, [user, tasks]);

    const handleAssignTask = () => {
        if (!selectedTask || !user) return;
        assignTaskToUser(selectedTask, user.id);
        setSelectedTask('');
        setModalOpen(false);
    };

    if (!user) {
        return <Box m="20px"><Header title="User Not Found" /><Link to="/users">Go Back</Link></Box>;
    }

    const modalStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 };

    return (
        <Box m="20px">
            <Header title="USER PROFILE" subtitle={`Details for ${user.name}`} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 70, height: 70, mr: 2, bgcolor: theme.palette.secondary.main }}>
                            <Typography variant="h3">{user.name.charAt(0)}</Typography>
                        </Avatar>
                        <Box><Typography variant="h4">{user.name}</Typography><Typography variant="body1" color="textSecondary">ID: {user.id}</Typography></Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box display="flex" justifyContent="space-around" alignItems="center" height="100%">
                        <Box textAlign="center"><CheckCircleOutlineIcon sx={{ fontSize: 40, color: 'green' }} /><Typography variant="h4">{doneCount}</Typography><Typography>Done</Typography></Box>
                        <Box textAlign="center"><AutorenewIcon sx={{ fontSize: 40, color: 'orange' }} /><Typography variant="h4">{inProgressCount}</Typography><Typography>In Progress</Typography></Box>
                        <Box textAlign="center"><PlaylistAddCheckIcon sx={{ fontSize: 40, color: 'blue' }} /><Typography variant="h4">{todoCount}</Typography><Typography>To Do</Typography></Box>
                    </Box>
                </Grid>
            </Grid>
            <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Assigned Tasks</Typography>
                    <Button variant="contained" color="secondary" onClick={() => setModalOpen(true)}>Assign New Task</Button>
                </Box>
                <List>
                    {userTasks.length > 0 ? userTasks.map((task) => (
                        <ListItem key={task.id} divider><ListItemText primary={task.title} secondary={`Project: ${task.project} | Status: ${task.status}`} /></ListItem>
                    )) : <ListItem><ListItemText primary="No tasks assigned." /></ListItem>}
                </List>
            </Paper>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Paper sx={modalStyle}>
                    <Typography variant="h6">Assign a Task to {user.name}</Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Unassigned Tasks</InputLabel>
                        <Select value={selectedTask} label="Unassigned Tasks" onChange={(e) => setSelectedTask(e.target.value)}>
                            {unassignedTasks.length > 0 ? unassignedTasks.map(task => (
                                <MenuItem key={task.id} value={task.id}>{task.title}</MenuItem>
                            )) : <MenuItem disabled>No unassigned tasks</MenuItem>}
                        </Select>
                    </FormControl>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }}>Cancel</Button>
                        <Button onClick={handleAssignTask} variant="contained" color="secondary">Assign</Button>
                    </Box>
                </Paper>
            </Modal>
        </Box>
    );
};
export default UserDetail;