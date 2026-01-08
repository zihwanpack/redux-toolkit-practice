import { immer } from 'zustand/middleware/immer';
import type { CartItemType } from '../types/cart.ts';
import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import cartItems from '../data/cartItems.ts';
import { devtools } from 'zustand/middleware';

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

interface CartState {
  cartItems: CartItemType[];
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  devtools(
    immer((set) => ({
      cartItems: cartItems,
      amount: 0,
      total: 0,

      actions: {
        increase: (id: string) =>
          set(
            (state) => {
              const item = state.cartItems.find((item) => item.id === id);
              if (item && item.amount > 0) {
                item.amount += 1;
              }
            },
            false,
            'cart/increase'
          ),

        decrease: (id: string) =>
          set(
            (state) => {
              const item = state.cartItems.find((item) => item.id === id);
              if (item && item.amount > 0) {
                item.amount -= 1;
              }
            },
            false,
            'cart/decrease'
          ),

        removeItem: (id: string) =>
          set(
            (state) => {
              state.cartItems = state.cartItems.filter((item) => item.id !== id);
            },
            false,
            'cart/removeItem'
          ),

        clearCart: () =>
          set(
            (state) => {
              state.cartItems = [];
            },
            false,
            'cart/clearCart'
          ),

        calculateTotal: () =>
          set(
            (state) => {
              let total = 0;
              let amount = 0;

              state.cartItems.forEach((item) => {
                total += Number(item.price) * item.amount;
                amount += item.amount;
              });

              state.total = total;
              state.amount = amount;
            },
            false,
            'cart/calculateTotal'
          ),
      },
    })),
    {
      name: 'CartStore',
    }
  )
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => {
      const { cartItems, amount, total } = state;
      return { cartItems, amount, total };
    })
  );

export const useCartActions = () => useCartStore((state) => state.actions);
