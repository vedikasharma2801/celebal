import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants/constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a new order
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),

    // Query to get a single order's details
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Mutation to update an order's payment status
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    
    // Mutation to create a Stripe payment intent
    createStripePaymentIntent: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/create-stripe-payment-intent`,
        method: 'POST',
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// Export all the auto-generated hooks
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useCreateStripePaymentIntentMutation,
  useGetMyOrdersQuery, 
} = ordersApiSlice;