import AppBar from "@components/AIChat/AppBar.jsx";
import BottomNavigation from "@components/common/BottomNavigation.jsx";
import Input from "@components/AIChat/Input.jsx";
import ChatList from "@components/common/ChatList.jsx";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  usePostNewAIChat,
  useGetAIChatRoomsHistory,
  useGetRecentChatRooms,
  usePostAIChat,
} from "@hooks/useChatService.js";

const AiChat = () => {
  const [chatRoomId, setChatRoomId] = useState(undefined);
  const [value, setValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isHistoryFetch, setIsHistoryFetch] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { t } = useTranslation(["placeholder"]);
  const { mutateAsync: createChatRoom, isSuccess: isSuccessPost } = usePostNewAIChat();
  const { mutateAsync: postChat } = usePostAIChat();
  const {
    data: chatData,
    refetch: refetchHistory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAIChatRoomsHistory({
    id: chatRoomId,
  });
  const { data: getRecent, isSuccess: getRecentSuccess } = useGetRecentChatRooms();

  const chatListRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const queryClient = useQueryClient();

  // 이전 데이터 로드
  const loadMoreHistory = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // 현재 스크롤 위치와 높이를 저장
    const scrollContainer = scrollContainerRef.current;
    const currentScrollTop = scrollContainer?.scrollTop || 0;
    const currentScrollHeight = scrollContainer?.scrollHeight || 0;

    try {
      await fetchNextPage();

      // 더 이상 데이터가 없으면 hasMore를 false로 설정
      if (!hasNextPage) {
        setHasMore(false);
      }

      // 새 데이터 로드 후 스크롤 위치 조정
      requestAnimationFrame(() => {
        if (scrollContainer) {
          const newScrollHeight = scrollContainer.scrollHeight;
          const heightDifference = newScrollHeight - currentScrollHeight;

          // 새로 추가된 콘텐츠만큼 스크롤 위치를 아래로 조정
          if (heightDifference > 0) {
            scrollContainer.scrollTop = currentScrollTop + heightDifference;
            console.log("Scroll position adjusted:", {
              oldPosition: currentScrollTop,
              newPosition: currentScrollTop + heightDifference,
              heightDifference,
            });
          }
        }
      });
    } catch (error) {
      console.error("Failed to load more history:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, hasNextPage, fetchNextPage]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(
    (e) => {
      const { scrollTop } = e.target;

      // 스크롤이 맨 위에 도달했을 때 (여유값 50px)
      if (scrollTop <= 50 && hasMore && !isLoadingMore && !isFetchingNextPage) {
        loadMoreHistory();
      }
    },
    [hasMore, isLoadingMore, isFetchingNextPage, loadMoreHistory]
  );

  // 스크롤을 맨 아래로 이동
  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, []);

  const patchNewChatRoom = async () => {
    const res = await createChatRoom();
    localStorage.setItem("tryNum", 0);
    localStorage.setItem("isSuccess", false);
    setChatRoomId(res.aiChatRoomId);
    setHasMore(true);
    setIsInitialLoad(true);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setValue("");
    if (localStorage.getItem("isSuccess") === "false") {
      const res = await postChat({
        k: parseInt(localStorage.getItem("tryNum")),
        title: value,
        aiChatRoomId: chatRoomId,
      });
      if (isSuccessPost) {
        console.log(res)
        localStorage.setItem("movieId", res.movieId);
        setIsHistoryFetch(true);
        await refetchHistory();
        setIsHistoryFetch(false);
        // 새 메시지 전송 후 맨 아래로 스크롤
        setTimeout(() => scrollToBottom(), 100);
      }
    } else if (localStorage.getItem("isSuccess") === "true") {
      setIsHistoryFetch(true);
      await postChat({
        movieId: localStorage.getItem("movieId"),
        text: value,
        aiChatRoomId: chatRoomId,
      });
      await refetchHistory();
      setIsHistoryFetch(false);
      // 새 메시지 전송 후 맨 아래로 스크롤
      setTimeout(() => scrollToBottom(), 100);
    }
  };

  const handleCheckMovie = async (type) => {
    const movieId = localStorage.getItem("movieId");
    let tryNum = parseInt(localStorage.getItem("tryNum"));

    if (type === "yes") {
      await postChat({
        movieId: movieId,
        text: "yes_sw_be",
        aiChatRoomId: chatRoomId,
      });
      localStorage.setItem("isSuccess", true);
      localStorage.setItem("tryNum", 0);
    } else if (type === "no" && isSuccessPost) {
      localStorage.setItem("tryNum", tryNum + 1);
      const res = await postChat({ k: tryNum, text: "no_sw_be", aiChatRoomId: chatRoomId });
      localStorage.setItem("movieId", res.movieId);
      localStorage.setItem("isSuccess", false);
    }
    await refetchHistory();
    // 새 메시지 전송 후 맨 아래로 스크롤
    setTimeout(() => scrollToBottom(), 100);
  };

  // 초기 로드 시 맨 아래로 스크롤
  useEffect(() => {
    if (isInitialLoad && chatData?.pages && chatData.pages.length > 0) {
      const allHistory = chatData.pages.flatMap(
        (page) => page.historyList || []
      );
      if (allHistory.length > 0) {
        setTimeout(() => {
          scrollToBottom("instant");
          setIsInitialLoad(false);
        }, 100);
      }
    }
  }, [chatData, isInitialLoad, scrollToBottom]);

  useEffect(() => {
    if (getRecentSuccess) {
      getRecent ? setChatRoomId(getRecent.aiChatRoomId) : patchNewChatRoom();
    }
  }, [getRecentSuccess, getRecent]);

  useEffect(() => {
    if (chatRoomId) {
      refetchHistory();
    }
  }, [chatRoomId]);

  useEffect(() => {
    const tryNum = parseInt(localStorage.getItem("tryNum"));
    if (localStorage.getItem("isSuccess") !== "true")
      localStorage.setItem("isSuccess", false);
    if (tryNum === null || tryNum === undefined || tryNum <= 0)
      localStorage.setItem("tryNum", 0);
    queryClient.removeQueries({
      queryKey: ["chatHistory"],
    });

    // 스크롤 컨테이너 참조 확인
    console.log("Scroll container ref:", scrollContainerRef.current);
    if (scrollContainerRef.current) {
      console.log("Scroll container dimensions:", {
        scrollHeight: scrollContainerRef.current.scrollHeight,
        clientHeight: scrollContainerRef.current.clientHeight,
        scrollTop: scrollContainerRef.current.scrollTop,
      });
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col h-screen">
        <AppBar onClickNewChat={patchNewChatRoom} />
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto"
          style={{
            height: "calc(100vh - 200px)", // 명시적인 높이 설정
            minHeight: "400px", // 최소 높이 보장
          }}
          onScroll={handleScroll}
        >
          {/* 로딩 인디케이터 */}
          {isLoadingMore && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          )}

          <ChatList
            historyList={
              chatData?.pages?.flatMap((page) => page.historyList || []) || []
            }
            onClickCheckMovie={handleCheckMovie}
          />
          <div ref={chatListRef} />
        </div>
        <div className="relative">
          <Input
            value={value}
            setValue={setValue}
            isLoading={isHistoryFetch}
            onEnter={handleKeyDown}
            onClickButton={handleSubmit}
            handleComposition={(value) => setIsComposing(value)}
            placeholder={t("placeholder_question")}
          />
          <div className="h-14" />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default AiChat;
