import { create } from "zustand";

const useAuth = create((set) => ({
  accessToken: "",
  isLogin: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setIsLogin: (state) => set({isLogin: state})
}));

export default useAuth;
