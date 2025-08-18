import {chatService} from "@apis/chatService.js";
import {useQuery, useMutation} from "@tanstack/react-query";


export const useGetAIChat = ({k, title, movieId, text,aiChatRoomId}) => {
  return useQuery({
    queryFn: () => chatService.getAIChat({k, title, movieId, text,aiChatRoomId}),
    queryKey: ["chat"],
  })
}

export const useGetAIChatRoomsHistory = ({id, page, size = 30}) => {
  return useQuery({
    queryFn: () => chatService.getAIChatRoomsHistory({id, page, size}),
    queryKey: ['chatHistory'],
    enabled: id >=0
  })
}

export const usePostNewAIChat = () => {
  return useMutation({
    mutationFn: () => chatService.postNewAIChatRooms(),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    }
  })
}