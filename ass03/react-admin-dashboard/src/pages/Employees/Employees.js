import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { mockDataEmployees } from '../../data/mockData';
import Header from '../../components/Header';

const Employees = () => {
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', flex: 1, cellClassName: 'name-column--cell' },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'project', headerName: 'Project Name', flex: 1 },
        { field: 'budget', headerName: 'Budget', flex: 1 },
    ];

    return (
        <Box m="20px">
            <Header title="EMPLOYEES" subtitle="Managing the Team Members" />
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid rows={mockDataEmployees} columns={columns} />
            </Box>
        </Box>
    );
};

export default Employees;