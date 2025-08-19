import { axiosInstance } from "./axiosInstance";

// 해석 생성
export async function createAnalysis({ movieId, content }) {
  const body = { content, movie_id: Number(movieId) };
  const { data } = await axiosInstance.post("/api/analysis/create", body);
  return data;
}

// 해석 리스트 조회
export async function getMovieAnalyses({ movieId, page = 0, size = 10 }) {
  const { data } = await axiosInstance.get(`/api/analysis/movie/${movieId}`, {
    params: { page, size },
  });

  return data;
}

// 해석 단건 조회
export async function getAnalysisById(id) {
  const { data } = await axiosInstance.get(`/api/analysis/${id}`);
  return data;
}

// 해석 수정
export async function updateAnalysis({ analysisId, content }) {
  const body = { analysis_id: Number(analysisId), content };
  const { data } = await axiosInstance.put("/api/analysis/update", body);
  return data;
}

// 해석 삭제
export async function deleteAnalysis(id) {
  const analysisId = Number(id);
  const { data } = await axiosInstance.delete(
    `/api/analysis/delete/${analysisId}`
  );
  return data;
}

// 내 해석 리스트
export async function getMyAnalyses() {
  const { data } = await axiosInstance.get("/api/my/analysis");
  return data;
}

export function mapAnalysis(dto) {
  return {
    id: dto.analysis_id,
    content: dto.content,
    hashtags: Array.isArray(dto?.hashtags) ? dto.hashtags : [],
    createdAt: dto.createdAt,
    author: {
      id: dto.userId ?? null,
      nickname: dto.nickName ?? "",
      profileUrl: dto.profileImg ?? "",
    },
  };
}
