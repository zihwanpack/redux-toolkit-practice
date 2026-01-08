import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
  devtools(
    immer((set) => ({
      isOpen: false,
      actions: {
        openModal: () => set({ isOpen: true }, false, 'modal/open'),
        closeModal: () => set({ isOpen: false }, false, 'modal/close'),
      },
    })),
    {
      name: 'ModalStore', // 👈 Redux DevTools에 표시될 이름
    }
  )
);

export const useModalInfo = () => useModalStore((state) => state.isOpen);
export const useModalActions = () => useModalStore((state) => state.actions);
