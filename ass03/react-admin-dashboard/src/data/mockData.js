// This is mock data. In a real application, you would fetch this from an API.
export const mockDataOrders = [
    { id: 10248, customer: 'VINET', total: 32.38, status: 'Pending', location: 'USA' },
    { id: 345653, customer: 'TOMSP', total: 56.34, status: 'Complete', location: 'Delhi' },
    { id: 390457, customer: 'HANAR', total: 93.31, status: 'Active', location: 'New York' },
    { id: 893486, customer: 'VICTE', total: 93.31, status: 'Cancelled', location: 'Germany' },
    { id: 748975, customer: 'SUPRD', total: 23.99, status: 'Rejected', location: 'USA' },
];

export const mockDataCustomers = [
    { id: 1001, name: 'Nirav Joshi', project: 'Hosting Press HTML', status: 'Active', weeks: 40, budget: '$2.4k' },
    { id: 1002, name: 'Sunil Joshi', project: 'Elite Admin', status: 'Active', weeks: 11, budget: '$3.9k' },
    { id: 1003, name: 'Andrew McDownland', project: 'Real Homes WP Theme', status: 'Pending', weeks: 19, budget: '$24.5k' },
    { id: 1004, name: 'Christopher Jamil', project: 'MedicalPro WP Theme', status: 'Completed', weeks: 34, budget: '$16.5k' },
    { id: 1005, name: 'Michael', project: 'Weekly WP Theme', status: 'Cancel', weeks: 34, budget: '$16.5k' },
];

export const mockDataEmployees = [...mockDataCustomers].map(c => ({...c, title: "Employee"})).slice(0,5); // Re-use for simplicity

export const mockLineData = [
    { x: 'Jan', y: 105 },
    { x: 'Feb', y: 120 },
    { x: 'Mar', y: 115 },
    { x: 'Apr', y: 130 },
    { x: 'May', y: 125 },
    { x: 'Jun', y: 140 },
];

export const mockPieData = [
  { id: 'Sale', label: 'Sale', value: 239, color: '#e0e0e0' },
  { id: 'Distribute', label: 'Distribute', value: 180, color: '#a1a4ab' },
  { id: 'Return', label: 'Return', value: 200, color: '#4cceac' },
];

export const mockBarData = [...mockLineData]; // Re-use for simplicity