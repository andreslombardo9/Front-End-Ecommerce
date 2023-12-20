// shoppingReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

export const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productsShopping = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Incrementar la cantidad si el producto ya está en el carrito
        existingItem.quantity += newItem.quantity || 1;
      } else {
        newItem.quantity = newItem.quantity || 1;
        state.cart.push(newItem);
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      );
    },
    removeOneFromCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.cart.find((item) => item.id === itemId);

      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== itemId);
        }
      }
    },
    removeAllFromCart: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemId);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setProducts, addToCart, decrementQuantity, removeOneFromCart, removeAllFromCart, clearCart } = shoppingSlice.actions;

// Agrega un selector para obtener la suma total de las cantidades en el carrito
export const selectCartCount = (state) =>
  state.shopping.cart.reduce((count, item) => count + item.quantity, 0);

export default shoppingSlice.reducer;
