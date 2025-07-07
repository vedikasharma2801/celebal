import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants.js';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// This is the critical line. It must have "export const"
export const apiSlice = createApi({
  baseQuery,
  // Define the "tags" that will be used for caching and invalidating data
  tagTypes: ['Product', 'Order', 'User'],
  // The endpoints will be injected from other slice files
  endpoints: (builder) => ({}),
});