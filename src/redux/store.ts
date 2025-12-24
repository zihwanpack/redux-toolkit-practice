import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice.ts';
import modalSlice from './slices/modalSlice.ts';

export const store = configureStore({ reducer: { cartItems: cartSlice, modal: modalSlice } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
