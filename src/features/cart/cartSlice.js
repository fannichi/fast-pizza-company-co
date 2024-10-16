import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //Payload = new item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //Payload is the id of the item to delete
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload is the id again of the item we want to increase
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
      //   state.cart = state.cart.map((curItem) => (curItem.pizzaId === item.pizzaId ? item : curItem));
    },
    decreaseItemQuantity(state, action) {
      // payload is the id again of the item we want to decrease
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } =
  cartSlice.actions;

export const getCart = (store) => store.cart.cart;

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((sum, item) => {
    return sum + item.unitPrice * item.quantity;
  }, 0);

export const getItemQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

//reselect library for redux
