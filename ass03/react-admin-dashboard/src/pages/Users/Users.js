import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // NEW: Import useNavigate
import { Box, Button, TextField, Modal, Paper, Typography, IconButton, InputAdornment } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { mockUsers } from '../../data/mockData';
import Header from '../../components/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const Users = () => {
    const [users, setUsers] = useState(mockUsers);
    const [open, setOpen] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate(); // NEW: Initialize the navigate function

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewUserName('');
    };

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUserName.trim() === '') return;
        
        const newUser = {
            id: Math.max(...users.map(u => u.id), 0) + 1,
            name: newUserName.trim(),
        };
        setUsers([...users, newUser]);
        handleClose();
    };

    // NEW: Function to handle clicking on a row
    const handleRowClick = (params) => {
        navigate(`/users/${params.id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(params.row.id); }} color="error">
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

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
            <Header title="USERS" subtitle="Manage Your Team" />
            
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <TextField
                    variant="outlined"
                    placeholder="Search users..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ width: '300px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                >
                    Add User
                </Button>
            </Box>

            <Box m="40px 0 0 0" height="75vh" sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}>
                <DataGrid 
                    rows={users} 
                    columns={columns}
                    quickFilterText={searchText}
                    onRowClick={handleRowClick} // NEW: Add the onRowClick handler
                />
            </Box>

            {/* Add User Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-user-modal-title"
            >
                <Paper sx={modalStyle}>
                    <Typography id="add-user-modal-title" variant="h6" component="h2">
                        Add a New User
                    </Typography>
                    <Box component="form" onSubmit={handleAddUser} mt={2}>
                        <TextField
                            fullWidth
                            label="User Name"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            variant="outlined"
                            autoFocus
                        />
                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Button onClick={handleClose} sx={{ mr: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="secondary">
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </Box>
    );
};

export default Users;