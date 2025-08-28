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
  const stompClient = useRef(null);
  const movieId = location.state.id;

  const { t } = useTranslation(["description", "placeholder"]);
  const { data: chatHistory, refetch } = useGetChatHistory({ roomId: movieId });
  const { data: chatBeforHistory } = useGetChatBeforeHistory({
    roomId: movieId,
    chatId: "68ad98fbcd9619313b322a7d",
  });

  const { accessToken, userInfo } = useAuth.getState();
  const [message, setMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  useEffect(() => {
    refetch();
  }, [movieId]);

  useEffect(() => {
    const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws-chat`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${accessToken}` },
      debug: (str) => console.log("STOMP Debug:", str),
      onConnect: () => {
        console.log("✅ STOMP 연결 성공");
        client.subscribe(`/topic/chat/${movieId}`, (frame) => {
          const body = JSON.parse(frame.body);
          refetch();
          console.log(body);
        });
      },
      onDisconnect: () => console.log("❌ STOMP 연결 종료"),
    });

    client.activate();
    stompClient.current = client;

    return () => {
      client.deactivate();
    };
  }, [movieId, accessToken]);

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
    setMessage(""); // 보낸 후 비우기
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

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
        <ChatList history={chatHistory} myId={userInfo.id} />
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
