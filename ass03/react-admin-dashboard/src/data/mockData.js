// src/data/mockData.js

// src/data/mockData.js

export const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
];

export const mockProjects = [
    { id: 'proj-1', name: 'Admin Dashboard' },
    { id: 'proj-2', name: 'E-commerce Site' },
    { id: 'proj-3', name: 'Mobile App' },
    { id: 'proj-4', name: 'Marketing Campaign'}
];

// Added `assignedTo` (userId) to tasks. `null` means unassigned.
export const mockTasks = [
    // Project 1 Tasks
    { id: 'task-1', title: 'Design the UI', status: 'done', project: 'Admin Dashboard', dueDate: '2024-06-10', assignedTo: 1 },
    { id: 'task-2', title: 'Develop Sidebar', status: 'done', project: 'Admin Dashboard', dueDate: '2024-06-12', assignedTo: 2 },
    { id: 'task-3', title: 'Implement Theming', status: 'in-progress', project: 'Admin Dashboard', dueDate: '2024-06-20', assignedTo: 1 },
    { id: 'task-4', title: 'Setup Charting', status: 'todo', project: 'Admin Dashboard', dueDate: '2024-06-25', assignedTo: 2 },
    { id: 'task-5', title: 'Deploy to Staging', status: 'todo', project: 'Admin Dashboard', dueDate: '2024-06-30', assignedTo: 3 },

    // Project 2 Tasks
    { id: 'task-6', title: 'Create Product Page', status: 'done', project: 'E-commerce Site', dueDate: '2024-06-05', assignedTo: 3 },
    { id: 'task-7', title: 'Implement Checkout', status: 'in-progress', project: 'E-commerce Site', dueDate: '2024-06-22', assignedTo: 1 },
    
    // Project 3 Tasks
    { id: 'task-9', title: 'Splash Screen Design', status: 'in-progress', project: 'Mobile App', dueDate: '2024-06-18', assignedTo: 4 },
    { id: 'task-10', title: 'User Authentication', status: 'todo', project: 'Mobile App', dueDate: '2024-07-01', assignedTo: 4 },

    // Unassigned Tasks
    { id: 'task-8', title: 'Setup Payment Gateway', status: 'todo', project: 'E-commerce Site', dueDate: '2024-06-28', assignedTo: null },
    { id: 'task-11', title: 'Write Blog Post', status: 'todo', project: 'Marketing Campaign', dueDate: '2024-07-05', assignedTo: null },
    { id: 'task-12', title: 'Fix Login Bug', status: 'todo', project: 'Admin Dashboard', dueDate: '2024-06-29', assignedTo: null },
];
export const mockLineData = [
  { x: "Jan", y: 105 },
  { x: "Feb", y: 120 },
  { x: "Mar", y: 115 },
  { x: "Apr", y: 130 },
  { x: "May", y: 125 },
  { x: "Jun", y: 140 },
];

// Re-use line data for simplicity
export const mockBarData = [...mockLineData]; 

// Use task statuses for the pie chart
export const mockPieData = [
  {
    id: "todo",
    label: "To Do",
    value: mockTasks.filter((t) => t.status === "todo").length,
  },
  {
    id: "in-progress",
    label: "In Progress",
    value: mockTasks.filter((t) => t.status === "in-progress").length,
  },
  {
    id: "done",
    label: "Done",
    value: mockTasks.filter((t) => t.status === "done").length,
  },
];