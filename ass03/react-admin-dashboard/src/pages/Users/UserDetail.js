import React, { useState } from 'react'; // Corrected: Removed useEffect
import { useParams, Link } from 'react-router-dom';
import { 
    Box, Typography, Paper, List, ListItem, ListItemText, Avatar, useTheme, Grid, 
    Button, Modal, Select, MenuItem, FormControl, InputLabel 
} from '@mui/material';
import Header from '../../components/Header';
import { mockUsers, mockTasks } from '../../data/mockData';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const UserDetail = () => {
  const theme = useTheme();
  const { userId } = useParams();

  // We need state to manage tasks, since they will be updated
  const [allTasks, setAllTasks] = useState(mockTasks);
  
  // State for the assignment modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');

  const user = mockUsers.find((u) => u.id === parseInt(userId));

  // Filter tasks for the current user from the state
  const userTasks = allTasks.filter(task => task.assignedTo === user?.id);
  const unassignedTasks = allTasks.filter(task => task.assignedTo === null);

  // Calculate stats for the current user
  const doneCount = userTasks.filter(t => t.status === 'done').length;
  const inProgressCount = userTasks.filter(t => t.status === 'in-progress').length;
  const todoCount = userTasks.filter(t => t.status === 'todo').length;

  const handleAssignTask = () => {
    if (!selectedTask) return;

    // Update the state of all tasks
    setAllTasks(prevTasks => 
        prevTasks.map(task => 
            task.id === selectedTask ? { ...task, assignedTo: user.id } : task
        )
    );

    // Close modal and reset
    setSelectedTask('');
    setModalOpen(false);
  };

  if (!user) {
    return (
      <Box m="20px">
        <Header title="User Not Found" />
        <Typography>The user you are looking for does not exist.</Typography>
        <Link to="/users">Go Back to Users List</Link>
      </Box>
    );
  }
  
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

  return (
    <Box m="20px">
      <Header title="USER PROFILE" subtitle={`Details for ${user.name}`} />

      {/* USER INFO AND STATS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 70, height: 70, mr: 2, bgcolor: theme.palette.secondary.main }}>
                    <Typography variant="h3">{user.name.charAt(0)}</Typography>
                </Avatar>
                <Box>
                    <Typography variant="h4">{user.name}</Typography>
                    <Typography variant="body1" color="textSecondary">User ID: {user.id}</Typography>
                </Box>
            </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
            <Box display="flex" justifyContent="space-around" alignItems="center" height="100%">
                <Box textAlign="center">
                    <CheckCircleOutlineIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />
                    <Typography variant="h4">{doneCount}</Typography>
                    <Typography color="textSecondary">Done</Typography>
                </Box>
                <Box textAlign="center">
                    <AutorenewIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />
                    <Typography variant="h4">{inProgressCount}</Typography>
                    <Typography color="textSecondary">In Progress</Typography>
                </Box>
                <Box textAlign="center">
                    <PlaylistAddCheckIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />
                    <Typography variant="h4">{todoCount}</Typography>
                    <Typography color="textSecondary">To Do</Typography>
                </Box>
            </Box>
        </Grid>
      </Grid>
      
      {/* TASK LIST AND ACTIONS */}
      <Paper elevation={3} sx={{ mt: 4 }}>
        <Box p={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" gutterBottom>Assigned Tasks</Typography>
            <Button variant="contained" color="secondary" onClick={() => setModalOpen(true)}>Assign New Task</Button>
          </Box>
          <List>
            {userTasks.length > 0 ? (
              userTasks.map((task) => (
                <ListItem key={task.id} divider>
                  <ListItemText
                    primary={task.title}
                    secondary={`Project: ${task.project} | Status: ${task.status}`}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No tasks assigned to this user." />
              </ListItem>
            )}
          </List>
        </Box>
      </Paper>

      {/* ASSIGN TASK MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Paper sx={modalStyle}>
          <Typography variant="h6" component="h2">Assign a Task to {user.name}</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="task-select-label">Unassigned Tasks</InputLabel>
            <Select
              labelId="task-select-label"
              value={selectedTask}
              label="Unassigned Tasks"
              onChange={(e) => setSelectedTask(e.target.value)}
            >
              {unassignedTasks.length > 0 ? (
                unassignedTasks.map(task => (
                    <MenuItem key={task.id} value={task.id}>{task.title}</MenuItem>
                ))
              ) : (
                <MenuItem disabled>No unassigned tasks available</MenuItem>
              )}
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