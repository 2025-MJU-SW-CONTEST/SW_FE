import {axiosInstance} from "@apis/axiosInstance.js";

export const chatService = {
  postNewAIChatRooms: async () => {
    const res = await axiosInstance.post(
      '/api/aiChatRooms/new'
    )
    return res.data
  },
  postAIChat: async ({k, title, movieId, text, aiChatRoomId}) => {
    const res = await axiosInstance.post(
      `/api/chats/${aiChatRoomId}`,
      {k, title, movieId, text, aiChatRoomId}
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
  getRecentAIChatRoom: async () => {
    const res = await axiosInstance.get(
      '/api/aiChatRooms/recent'
    )
    return res.data;
  },
  getChatHistory: async ({roomId}) => {
    const res = await axiosInstance.get(
      `/api/chat/history/recent/${roomId}`
    )
    return res.data;
  },
  getChatBeforeHistory: async ({roomId, chatId}) => {
    const res = await axiosInstance.get(
      `/api/chat/history/${roomId}/before/${chatId}`
    )
    return res.data;
  },
  postChatSend: async ({chatRoomId, userId, message, timestamp}) => {
    const res = await axiosInstance.post(
      '/api/chat/send',
      {chatRoomId,userId,message,timestamp}
    )
    return res.data;
  }

}