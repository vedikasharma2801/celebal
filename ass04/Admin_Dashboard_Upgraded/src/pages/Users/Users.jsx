import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Modal, Paper, Typography, IconButton, InputAdornment } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useStore } from '../../store/useStore.js';
import Header from '../../components/Header.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const Users = () => {
    const users = useStore((state) => state.users);
    const addUser = useStore((state) => state.addUser);
    const deleteUser = useStore((state) => state.deleteUser);
    
    const [open, setOpen] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewUserName('');
    };

    const handleDelete = (id) => deleteUser(id);

    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUserName.trim() === '') return;
        addUser(newUserName.trim());
        handleClose();
    };

    const handleRowClick = (params) => navigate(`/users/${params.id}`);

    // --- The Robust Fix ---
    // We use useMemo to create a new array with the serial number already added.
    // This calculation only runs when users or searchText changes.
    const usersWithSerial = useMemo(() => {
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase())
        );
        // Map over the filtered results to add the `serialNumber` property.
        return filtered.map((user, index) => ({
            ...user,
            serialNumber: index + 1,
        }));
    }, [users, searchText]); // Dependencies for the calculation

    const columns = [
        {
            // The field now directly points to the property we created. No special functions needed.
            field: 'serialNumber',
            headerName: 'ID',
            width: 90,
        },
        { field: 'name', headerName: 'Name', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(params.row.id); }} color="error"><DeleteIcon /></IconButton>
            ),
        },
    ];

    const modalStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 };

    return (
        <Box m="20px">
            <Header title="USERS" subtitle="Manage Your Team" />
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <TextField variant="outlined" placeholder="Search users..." value={searchText} onChange={(e) => setSearchText(e.target.value)} sx={{ width: '300px' }} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}/>
                <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleOpen}>Add User</Button>
            </Box>
            <Box m="40px 0 0 0" height="75vh" sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}>
                <DataGrid
                    // Pass the newly created array with serial numbers to the grid.
                    rows={usersWithSerial}
                    columns={columns}
                    onRowClick={handleRowClick}
                />
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Paper sx={modalStyle}>
                    <Typography variant="h6">Add a New User</Typography>
                    <Box component="form" onSubmit={handleAddUser} mt={2}>
                        <TextField fullWidth label="User Name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} variant="outlined" autoFocus />
                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
                            <Button type="submit" variant="contained" color="secondary">Add</Button>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </Box>
    );
};
export default Users;