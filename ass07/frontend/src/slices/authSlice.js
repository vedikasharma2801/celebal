// frontend/src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // --- ADD THIS LOGOUT REDUCER ---
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    // ------------------------------
  },
});

// Export the new action
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;