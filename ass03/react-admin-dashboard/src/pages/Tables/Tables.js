import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
];

const rows = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

const Tables = () => {
  return <div style={{ height: 300, width: '100%' }}><DataGrid rows={rows} columns={columns} /></div>;
};

export default Tables;
