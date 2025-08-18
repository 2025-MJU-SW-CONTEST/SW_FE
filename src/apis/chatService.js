import {axiosInstance} from "@apis/axiosInstance.js";

export const chatService = {
  postNewAIChatRooms: async () => {
    const res = await axiosInstance.post(
      '/api/aiChatRooms/new'
    )
    return res.data
  },
  getAIChatRoomsHistory: async ({id, page, size}) => {
    const res = await axiosInstance.get(
      `/api/aiChatRooms/${id}/history`,
    {
        params: {page, size}
      }
    )
    return res.data
  },
  getAIChat: async ({k, title, movieId, text, aiChatRoomId}) => {
    const res = await axiosInstance.get(
      '/api/chats',
      {
        params: {k, title, movieId, text, aiChatRoomId}
      }
    )
    return res.data
  }
}