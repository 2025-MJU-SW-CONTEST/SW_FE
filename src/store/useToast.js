import {create} from "zustand";

export const useToast = create((set) => ({
  message: null,
  showToast: (msg) => set({ message: msg }),
  hideToast: () => set({ message: null }),
}))