// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Check if this path is correct

// A simple hook to consume the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};