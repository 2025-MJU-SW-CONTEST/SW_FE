import {axiosInstance} from "@apis/axiosInstance.js";

export const authService = {
  postSignUp: async ({nickname, profileUrl, tempToken}) => {
    const res = await axiosInstance.post(
      '/auth/signup',
      {nickname, profileUrl},
      {
        headers: {
          Authorization: tempToken
        }
      }
    );
    return res;
  }
}