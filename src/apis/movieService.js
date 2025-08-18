import { axiosInstance } from "./axiosInstance";

// 페이지 단위 영화 목록 조회
export async function getMoviePage({ page = 0, size = 10 }) {
  const { data } = await axiosInstance.get("/api/movie/list", {
    params: { page, size },
  });
  return data; // data.content, data.totalPages, data.page 등
}

// 제목 키워드 검색(페이지 단위)
export async function getMovieSearchPage({ keyword, page = 0, size = 10 }) {
  const { data } = await axiosInstance.get("/api/movie/search", {
    params: { keyword, page, size },
  });
  return data; // { content, totalPages, totalElements, page, size }
}

// 영화 상세 조회
export async function getMovieDetail(id) {
  const { data } = await axiosInstance.get(`/api/movie/${id}`);
  return data; // { id, title, rating, thumbnailUrl, summary, releaseDate }
}
