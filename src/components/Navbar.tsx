import { ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import { useCartActions, useCartInfo } from '../hooks/useCartStore.tsx';
import { useModalActions } from '../hooks/useModalStore.tsx';

export const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotal } = useCartActions();
  const { openModal } = useModalActions();
  useEffect(() => {
    calculateTotal();
  }, [calculateTotal, cartItems]);

  return (
    <header className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
      <h1
        className="text-xl font-semibold text-gray-800 cursor-pointer"
        onClick={() => (window.location.href = '/')}
      >
        나의 장바구니
      </h1>
      <div className="flex items-center gap-2">
        <ShoppingCart className="text-gray-500 w-6 h-6" />
        <p>{amount}개</p>
        <button
          className="text-white text-sm cursor-pointer bg-red-500 px-4 py-2 rounded-md "
          onClick={() => openModal()}
        >
          전체 삭제
        </button>
      </div>
    </header>
  );
};
