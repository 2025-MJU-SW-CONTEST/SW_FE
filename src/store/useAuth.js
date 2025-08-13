import { create } from "zustand";

const useAuth = create((set) => ({
  accessToken: "",
  isLogin: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setIsLogin: (state) => set({ isLogin: state }),
  setUserInfo: (userInfo) => set({ userInfo }),
  clearAuth: () =>
    set({
      accessToken: "",
      isLogin: false,
      userInfo: { id: null, nickname: "", email: "", profileUrl: "" },
    }),
}));

export default useAuth;
