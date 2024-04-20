import { create } from "zustand";

interface NavbarState {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export const useNavbar = create<NavbarState>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen: boolean) => set((state) => ({ isMenuOpen })),
}));
