import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { mockDataOrders } from '../../data/mockData';
import Header from '../../components/Header';

const Orders = () => {
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'customer', headerName: 'Customer', flex: 1 },
        { field: 'total', headerName: 'Total Amount', flex: 1, renderCell: (params) => `$${params.value}` },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
    ];

    return (
        <Box m="20px">
            <Header title="ORDERS" subtitle="List of Order for Future Reference" />
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid rows={mockDataOrders} columns={columns} />
            </Box>
        </Box>
    );
};

export default Orders;