import { createSlice } from '@reduxjs/toolkit';

// This helper function can be defined once at the top
const updateCart = (state) => {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // Calculate prices
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  state.shippingPrice = addDecimals(state.itemsPrice > 5000 ? 0 : 50);
  state.taxPrice = addDecimals(Number(0.18 * state.itemsPrice).toFixed(2));
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save the entire cart state to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};

// Check localStorage for the entire cart object
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
    state.cartItems = [];
    return updateCart(state);
},
  },
});

export const { addToCart, removeFromCart, saveShippingAddress,
  savePaymentMethod,
  clearCartItems, } = cartSlice.actions;

export default cartSlice.reducer;