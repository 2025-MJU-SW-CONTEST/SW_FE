import {axiosInstance} from "@apis/axiosInstance.js";

export const reviewService = {
  getMonthReview: async ({year, month}) => {
    const res = await axiosInstance.get(
      `/api/review/dates/${year}/${month}`
    )
    return res.data;
  },
  getDateReview: async ({date}) => {
    if (!date) return null;
    const res = await axiosInstance.get(
      `/api/review/${date}`
    )
    return res.data;
  },
  postCreateReview: async ({title, content, date}) => {
    const res = await axiosInstance.post(
      `/api/review/create`,
      {title, content, date}
    )
    return res.data;
  },
  putReview: async ({id, title, content}) => {
    const res = await axiosInstance.put(
      '/api/review/update',
      {id, title, content}
    )
    return res.data;
  },
  deleteReview: async ({id}) => {
    const res = await axiosInstance.delete(
      `/api/review/delete/${id}`
    )
    return res.data;
  }
}