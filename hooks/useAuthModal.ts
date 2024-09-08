import { ViewType } from "@supabase/auth-ui-shared";
import { create } from "zustand";

interface AuthModalStore {
  view: ViewType;
  isOpen: boolean;
  openModal: (window: ViewType) => void;
  closeModal: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  view: "sign_in",
  isOpen: false,
  openModal: (view: ViewType) => set({ view, isOpen: true }),
  closeModal: () => set({ view: "sign_in", isOpen: false }),
}));

export default useAuthModal;
