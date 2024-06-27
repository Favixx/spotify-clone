import { create } from "zustand";

interface AuthModalStore {
  isOpenRegister: boolean;
  isOpenLogin: boolean;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpenRegister: false,
  isOpenLogin: false,
  onOpenLogin: () => set({ isOpenLogin: true }),
  onOpenRegister: () => set({ isOpenRegister: true }),
  onClose: () => set({ isOpenLogin: false, isOpenRegister: false }),
}));

export default useAuthModal;
