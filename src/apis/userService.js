import { axiosInstance } from "./axiosInstance";

// 내 정보 조회
export async function getMyInfo() {
  const { data } = await axiosInstance.get("/api/my");
  return data;
}

// 닉네임 수정
export async function updateMyNickname(nickname) {
  const { data } = await axiosInstance.put("/api/my/nickname", { nickname });
  return data;
}

// 회원탈퇴
export async function deleteMyAccount() {
  const { data } = await axiosInstance.delete("/api/my/delete");
  return data;
}
