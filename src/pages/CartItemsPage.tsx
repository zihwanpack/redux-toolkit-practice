import { MinusIcon, PlusIcon } from 'lucide-react';
import { useDispatch, useSelector } from '../hooks/useCustomRedux.tsx';
import {
  calculateTotal,
  clearCart,
  decrease,
  increase,
  type CartItemState,
} from '../redux/slices/cartSlice.ts';
import { closeModal } from '../redux/slices/modalSlice.ts';
import { Footer } from '../components/Footer.tsx';
import { Navbar } from '../components/Navbar.tsx';
import type { ModalState } from '../redux/slices/modalSlice.ts';

export const CartItemsPage = () => {
  const { cartItems } = useSelector((state: { cartItems: CartItemState }) => state.cartItems);
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: { modal: ModalState }) => state.modal);

  const handleIncrease = (id: string) => {
    dispatch(increase({ id }));
    dispatch(calculateTotal());
  };

  const handleDecrease = (id: string) => {
    dispatch(decrease({ id }));
    dispatch(calculateTotal());
  };
  return (
    <section className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex-1 px-6 py-8 min-h-[200px] overflow-y-auto">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.singer}</p>
                <div className="flex items-center gap-2 justify-between">
                  <p className="text-primary-base font-bold text-xl mt-2">₩{item.price}</p>
                  <div className="flex items-center gap-2">
                    <PlusIcon
                      className="w-6 h-6 text-gray-500 cursor-pointer"
                      onClick={() => handleIncrease(item.id)}
                    />
                    <p className="text-gray-500 text-sm">{item.amount}</p>
                    <MinusIcon
                      className="w-6 h-6 text-gray-500 cursor-pointer"
                      onClick={() => handleDecrease(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">장바구니가 비어 있습니다.</p>
          </div>
        )}
      </div>
      <Footer />
      <Modal isOpen={isOpen} />
    </section>
  );
};

const Modal = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useDispatch();
  const handleClearButton = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };
  return isOpen ? (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg size-[200px] flex flex-col items-center justify-center gap-10">
        <h2 className="text-xl font-semibold text-gray-800">정말 지울래?</h2>
        <div className="flex items-center gap-2">
          <button
            className="text-white text-sm cursor-pointer bg-gray-500  px-4 py-2 rounded-md "
            onClick={() => dispatch(closeModal())}
          >
            취소
          </button>
          <button
            className="text-white text-sm cursor-pointer bg-red-500  px-4 py-2 rounded-md "
            onClick={handleClearButton}
          >
            비우기
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
