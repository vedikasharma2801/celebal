// frontend/src/slices/usersApiSlice.js
import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants/constants';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),

    // --- ADD THIS LOGOUT MUTATION ---
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    // --------------------------------
  }),
});

// Export the new hook
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;