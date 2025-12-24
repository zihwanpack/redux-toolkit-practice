import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItemType } from '../../types/cart.ts';
import { axiosInstance } from '../../api/axiosInstance.ts';

// CartItemType[],         ① 성공하면 이걸 반환한다
// void,                   ② 이 thunk는 인자를 받지 않는다
// { rejectValue: string } ③ 실패하면 string을 payload로 보낸다

export const fetchCartItems = createAsyncThunk<CartItemType[], void, { rejectValue: string }>(
  'cartItems/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/musics');
      return response.data;
    } catch {
      return rejectWithValue('에러가 발생했습니다. 데이터 요청 경로를 확인해주세요!');
    }
  }
);
export interface CartItemState {
  cartItems: CartItemType[];
  amount: number;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartItemState = {
  loading: false,
  error: null,
  cartItems: [] as CartItemType[],
  amount: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cartItems',
  initialState,
  // action creators가 자동으로 생성됨
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
  // action creators가 자동으로 생성되지 않음
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.loading = false;
      // 데이터 로드 후 amount와 total 계산
      state.amount = state.cartItems.reduce(
        (total: number, item: CartItemType) => total + item.amount,
        0
      );
      state.total = state.cartItems.reduce(
        (total: number, item: CartItemType) => total + Number(item.price) * item.amount,
        0
      );
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? null;
    });
    builder.addCase(fetchCartItems.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
