import { create } from 'zustand';
import { mockUsers, mockTasks } from '../data/mockData';

// Helper function to get data from localStorage or use fallback data
const loadState = (key, fallback) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return fallback;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(`Error loading state for ${key}:`, error);
    return fallback;
  }
};

// Helper function to save data to localStorage
const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error(`Error saving state for ${key}:`, error);
  }
};

export const useStore = create((set, get) => ({
  // =============== STATE ===============
  users: loadState('app_users', mockUsers),
  tasks: loadState('app_tasks', mockTasks),

  // =============== ACTIONS ===============
  addUser: (userName) => {
    const newUser = {
      id: Math.max(...get().users.map(u => u.id), 0) + 1,
      name: userName,
    };
    const newUsers = [...get().users, newUser];
    set({ users: newUsers });
    saveState('app_users', newUsers);
  },

  deleteUser: (userId) => {
    const newUsers = get().users.filter(user => user.id !== userId);
    // Also unassign tasks from the deleted user
    const updatedTasks = get().tasks.map(task => 
        task.assignedTo === userId ? { ...task, assignedTo: null } : task
    );
    set({ users: newUsers, tasks: updatedTasks });
    saveState('app_users', newUsers);
    saveState('app_tasks', updatedTasks);
  },

  updateTaskStatus: (taskId, newStatus) => {
    const newTasks = get().tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    set({ tasks: newTasks });
    saveState('app_tasks', newTasks);
  },
  
  updateTasksOrder: (orderedTasksInColumn) => {
    const status = orderedTasksInColumn[0]?.status;
    if (!status) return; // Cannot reorder if status is unknown
    const otherTasks = get().tasks.filter(t => t.status !== status);
    const updatedTasks = [...otherTasks, ...orderedTasksInColumn];
    set({ tasks: updatedTasks });
    saveState('app_tasks', updatedTasks);
  },
  
  assignTaskToUser: (taskId, userId) => {
    const newTasks = get().tasks.map(task =>
      task.id === taskId ? { ...task, assignedTo: userId } : task
    );
    set({ tasks: newTasks });
    saveState('app_tasks', newTasks);
  },

  addEvent: (newEvent) => {
    const newTask = {
      id: newEvent.id,
      title: newEvent.title,
      dueDate: newEvent.start,
      status: 'todo',
      project: 'General',
      assignedTo: null,
    };
    const newTasks = [...get().tasks, newTask];
    set({ tasks: newTasks });
    saveState('app_tasks', newTasks);
  },
  
  deleteTask: (taskId) => {
    const newTasks = get().tasks.filter(task => task.id !== taskId);
    set({ tasks: newTasks });
    saveState('app_tasks', newTasks);
  }
}));