import BackHeader from "@components/common/BackHeader.jsx";
import Input from "@components/AIChat/Input.jsx";
import BottomNavigation from "@components/common/BottomNavigation.jsx";
import ChatList from "@components/chat/ChatList.jsx";
import useAuth from "@store/useAuth.js";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useGetChatBeforeHistory, useGetChatHistory } from "@hooks/useChatService.js";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const movieId = location.state.id;
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [chattingHistory, setChattingHistory] = useState([]);
  const [lastChatId, setLastChatId] = useState("");

  const { t } = useTranslation(["description", "placeholder"]);
  const {data: chatHistory, refetch } = useGetChatHistory({ roomId: movieId });
  const {data: chatBeforeHistory} = useGetChatBeforeHistory({roomId: movieId, chatId: lastChatId});
  const { accessToken, userInfo } = useAuth.getState();

  useEffect(() => {
    if(lastChatId && chatBeforeHistory?.length > 0){
      setChattingHistory((prev) => {
        const ids = new Set(prev.map(m => m.id));
        const newHist = chatBeforeHistory.filter(m => !ids.has(m.id));
        return [...prev, ...newHist];
      });
    } else{
      setChattingHistory([])
    }
  }, [chatBeforeHistory, lastChatId]);

  useEffect(() => {
    if (chatHistory && !lastChatId) {
      setChattingHistory((prev) => {
        const ids = new Set(prev.map((m) => m.id));
        const newHist = chatHistory.filter((m) => !ids.has(m.id));
        return [...prev, ...newHist];
      });
    } else{
      setChattingHistory([])
    }
  }, [chatHistory, lastChatId]);

  // STOMP WebSocket 연결
  useEffect(() => {
    const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws-chat`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${accessToken}` },
      debug: (str) => console.log("STOMP Debug:", str),
      onConnect: () => {
        console.log("✅ STOMP 연결 성공");

        client.subscribe(`/topic/chat/${movieId}`, (frame) => {
          const body = { ...JSON.parse(frame.body) }; // 새로운 객체로 생성
          localStorage.setItem("lastChatId", body.id);
          setChattingHistory((prev) => {
            if (prev.find((m) => m.id === body.id)) return prev; // 중복 방지
            return [body,...prev];
          });
        });
      },
      onDisconnect: () => console.log("❌ STOMP 연결 종료"),
    });

    client.activate();
    stompClient.current = client;

    return () => client.deactivate();
  }, [movieId, accessToken]);

  // 메시지 입력 및 전송
  const sendMessage = (msg) => {
    if (stompClient.current && msg.trim() !== "") {
      const chatMessage = {
        chatRoomId: movieId,
        userId: userInfo.id,
        message: msg,
      };
      stompClient.current.publish({
        destination: `/app/send/${movieId}`,
        body: JSON.stringify(chatMessage),
      });
    }
  };

  const handleSubmit = () => {
    const msg = message.trim();
    if (!msg) return;
    sendMessage(msg);
    setMessage(""); // 보낸 후 입력창 비우기
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 채팅이 업데이트될 때 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chattingHistory]);

  // roomId 변경 시 데이터 refetch
  useEffect(() => {
    refetch();
  }, [movieId]);

  return (
    <div className="flex flex-col h-screen">
      <BackHeader label={location.state.title} onBack={() => navigate(-1)} />
      <div className="px-016 mt-3">
        <div className="bg-secondary-50 rounded-010 p-012">
          <p className="text-012 font-bold text-center">{t("description_chat_title")}</p>
          <p className="text-[9px] text-center whitespace-pre-wrap pt-1 px-7">
            {t("description_chat_content")}
          </p>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto px-016 mt-3"
        style={{ height: "calc(100vh - 200px)", minHeight: "400px" }}
      >
        <ChatList history={chattingHistory} myId={userInfo.id} />
        <div ref={messagesEndRef} />
      </div>
      <div className="relative">
        <Input
          value={message}
          setValue={setMessage}
          onEnter={handleKeyDown}
          onClickButton={handleSubmit}
          placeholder={t("placeholder:placeholder_message")}
          handleComposition={(status) => setIsComposing(status)} // 한글 조합 중 체크
        />
        <div className="h-14" />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Chat;
