import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuth = create(
  persist(
    (set, get) => ({
      // 상태
      accessToken: null,
      isLogin: false,
      userInfo: { id: null, nickname: null, email: null, profileUrl: null },
      authStatus: "idle",
      pendingRegister: null,

      // 액션
      setChecking: () => set({ authStatus: "checking" }),
      setAuthenticated: ({ token, user }) =>
        set({
          accessToken: token,
          isLogin: true,
          userInfo: {
            id: user?.id ?? get().userInfo.id,
            nickname: user?.nickname ?? get().userInfo.nickname,
            email: user?.email ?? get().userInfo.email,
            profileUrl: user?.profileUrl ?? get().userInfo.profileUrl,
          },
          authStatus: "authenticated",
          pendingRegister: null,
        }),
      setNeedsRegister: (pending) =>
        set({
          pendingRegister: pending ?? null,
          authStatus: "needsRegister",
          isLogin: false,
          accessToken: null,
        }),
      setAccessToken: (token) => set({ accessToken: token }),
      setIsLogin: (state) => set({ isLogin: state }),
      setUserInfo: (userInfo) => set({ userInfo }),

      clearAuth: () =>
        set({
          accessToken: null,
          isLogin: false,
          userInfo: { id: null, nickname: null, email: null, profileUrl: null },
          pendingRegister: null,
          authStatus: "idle",
        }),
    }),
    {
      name: "auth", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        isLogin: state.isLogin,
        userInfo: state.userInfo,
      }),
    }
  )
);

export default useAuth;
