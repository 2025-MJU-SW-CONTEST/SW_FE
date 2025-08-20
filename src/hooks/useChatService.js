import { chatService } from "@apis/chatService.js";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useToast } from "@store/useToast.js";

export const usePostAIChat = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: ({ k, title, movieId, text, aiChatRoomId }) =>
      chatService.postAIChat({ k, title, movieId, text, aiChatRoomId }),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      showToast(err.message);
    },
  });
};

export const usePostNewAIChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => chatService.postNewAIChatRooms(),
    onSuccess: (res) => {
      queryClient.removeQueries({ queryKey: ["chatHistory"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useGetRecentChatRooms = () => {
  return useQuery({
    queryFn: () => chatService.getRecentAIChatRoom(),
    queryKey: ["chatRecent"],
  });
};

export const useGetAIChatRoomsHistory = ({ id, page, size = 10 }) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 0 }) =>
      chatService.getAIChatRoomsHistory({
        id,
        page: pageParam,
        size,
      }),
    queryKey: ["chatHistory", id],
    enabled: !!id && id >= 0,
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지에 데이터가 있으면 다음 페이지가 있다고 판단
      if (lastPage?.historyList && lastPage.historyList.length === size) {
        return allPages.length;
      }
      return undefined; // 더 이상 페이지가 없음
    },
    initialPageParam: 0,
  });
};

export const useRefetchChatHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await queryClient.refetchQueries({ queryKey: ["chatHistory"] });
    },
  });
};
