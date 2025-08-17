import {axiosInstance} from "@apis/axiosInstance.js";

export const reviewService = {
  getMonthReview: async ({year, month}) => {
    const res = await axiosInstance.get(
      `/api/review/dates/${year}/${month}`
    )
    return res.data;
  }
}