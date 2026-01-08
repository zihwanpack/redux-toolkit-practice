import { useCartInfo } from '../hooks/useCartStore.tsx';

export const Footer = () => {
  const { total } = useCartInfo();

  return (
    <footer className="px-6 py-5 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
      <span className="font-semibold text-gray-700">총 금액</span>
      <span className="text-primary-base font-bold text-xl">₩{total}</span>
    </footer>
  );
};
