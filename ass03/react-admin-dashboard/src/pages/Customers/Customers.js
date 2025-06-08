import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { mockDataCustomers } from '../../data/mockData';
import Header from '../../components/Header';

const Customers = () => {
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'project', headerName: 'Project Name', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'weeks', headerName: 'Weeks', type: 'number', align: 'left', headerAlign: 'left' },
        { field: 'budget', headerName: 'Budget', flex: 1 },
    ];

    return (
        <Box m="20px">
            <Header title="CUSTOMERS" subtitle="List of Customers for Future Reference" />
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid rows={mockDataCustomers} columns={columns} />
            </Box>
        </Box>
    );
};

export default Customers;