import { create } from "zustand";

const useArticle = create((set) => ({
  selectedDay: "", // 선택된 날짜
  articles: [],    // [{ id, title, content }, ...]

  // selectedDay 설정
  setSelectedDay: (day) => set({ selectedDay: day }),

  // articles 관련
  setArticles: (articles) => set({ articles }), // 전체 갱신
  addArticle: (article) =>
    set((state) => ({ articles: [...state.articles, article] })), // 새 글 추가
  updateArticle: (id, updatedData) =>
    set((state) => ({
      articles: state.articles.map((a) =>
        a.id === id ? { ...a, ...updatedData } : a
      ),
    })),
  removeArticle: (id) =>
    set((state) => ({ articles: state.articles.filter((a) => a.id !== id) })),
}));

export default useArticle;
