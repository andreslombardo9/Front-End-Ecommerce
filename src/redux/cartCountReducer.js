// cartCountSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartCount: 0,
};

export const cartCountSlice = createSlice({
  name: 'cartCount',
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
});

export const { setCartCount } = cartCountSlice.actions;

export default cartCountSlice.reducer;
