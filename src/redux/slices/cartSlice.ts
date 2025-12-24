import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../../constants/cartItems.ts';
import type { CartItemType } from '../../types/cart.ts';

export interface CartItemState {
  cartItems: CartItemType[];
  amount: number;
  total: number;
}

const initialState: CartItemState = {
  cartItems: cartItems as CartItemType[],
  amount: cartItems.length,
  total: cartItems.reduce((total, item) => total + parseInt(item.price) * item.amount, 0),
};

export const cartSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    increase: (state: CartItemState, action: PayloadAction<{ id: string }>): void => {
      const { id } = action.payload;
      const item = state.cartItems.find((i: CartItemType) => i.id === id);
      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state: CartItemState, action: PayloadAction<{ id: string }>): void => {
      const { id } = action.payload;
      const item = state.cartItems.find((i: CartItemType) => i.id === id);
      if (item) {
        item.amount -= 1;
      }

      if (item && item.amount <= 0) {
        state.cartItems = state.cartItems.filter((i: CartItemType) => i.id !== id);
      }
    },
    removeItem: (state: CartItemState, action: PayloadAction<{ id: string }>): void => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((i: CartItemType) => i.id !== id);
    },
    clearCart: (state: CartItemState): void => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    calculateTotal: (state: CartItemState): void => {
      state.amount = state.cartItems.reduce(
        (total: number, item: CartItemType) => total + item.amount,
        0
      );
      state.total = state.cartItems.reduce(
        (total: number, item: CartItemType) => total + Number(item.price) * item.amount,
        0
      );
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
