import { useSelector } from '../hooks/useCustomRedux.tsx';
import type { RootState } from '../redux/store.ts';
import type { CartItemState } from '../redux/slices/cartSlice.ts';

export const Footer = () => {
  const { total } = useSelector(
    (state: RootState & { cartItems: CartItemState }) => state.cartItems
  );
  return (
    <footer className="px-6 py-5 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
      <span className="font-semibold text-gray-700">총 금액</span>
      <span className="text-primary-base font-bold text-xl">₩{total}</span>
    </footer>
  );
};
