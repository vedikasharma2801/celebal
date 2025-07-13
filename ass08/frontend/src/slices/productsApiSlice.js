// frontend/src/slices/productsApiSlice.js
import { PRODUCTS_URL } from '../constants/constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword } = {}) => ({
  url: PRODUCTS_URL,
  params: { keyword },
}),
      keepUnusedDataFor: 5,
    }),
    // --- ADD THIS NEW ENDPOINT ---
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    // -----------------------------
     getTopProducts: builder.query({
        query: () => `${PRODUCTS_URL}/top`,
        keepUnusedDataFor: 5,
    }),
  }),
});

// Export the new hook that RTK Query creates for us
export const { useGetProductsQuery, useGetProductDetailsQuery, useGetTopProductsQuery } = productsApiSlice;