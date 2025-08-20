import ChatBubble from "@components/common/ChatBubble.jsx";
import dayjs from "dayjs";
import { useState, forwardRef } from "react";

const groupByDate = (messages = []) => {
  const grouped = messages.reduce((acc, curr) => {
    const date = dayjs(curr.createdAt).format("YYYY-MM-DD");
    if (!acc[date]) acc[date] = [];

    const prev = acc[date][acc[date].length - 1];

    if (prev && (curr.contents === "yes" || curr.contents === null)) {
      prev.serverActive = curr.contents === "yes" ? "yes" : "no";
      return acc;
    }

    // 정상 메시지라면 push
    acc[date].push({
      id: curr.aiChatId,
      role: curr.chatRole,
      message: curr.contents,
      createdAt: curr.createdAt,
      contentType: curr.contentType ?? "text",
      image: curr.contents?.includes("https") ? curr.contents : null,
      serverActive: null, // 초기값 null, 다음 메시지로 결정
    });

    return acc;
  }, {});

  return Object.entries(grouped).map(([date, data]) => ({
    date,
    data,
  }));
};

const groupMessages = (messages = []) => {
  return messages.reduce((acc, curr) => {
    const lastGroup = acc[acc.length - 1];
    if (
      lastGroup &&
      lastGroup.role === curr.role &&
      dayjs(lastGroup.createdAt).format("HH:mm") ===
        dayjs(curr.createdAt).format("HH:mm")
    ) {
      lastGroup.messages.push(curr);
      lastGroup.createdAt = curr.createdAt;
    } else {
      acc.push({
        role: curr.role,
        createdAt: curr.createdAt,
        messages: [curr],
      });
    }
    return acc;
  }, []);
};

const ChatList = forwardRef(({ historyList = [], onClickCheckMovie }, ref) => {
  const reversedHistory = [...historyList]?.reverse();
  const chat = groupByDate(reversedHistory);

  return (
    <div className="flex-1 overflow-y-auto p-012" ref={ref}>
      {chat.map((group, idx) => (
        <div key={idx}>
          <p className="font-family-pretendard font-normal text-012 text-font-500 text-center mb-[10px]">
            {group.date}
          </p>
          {groupMessages(group.data).map((bundle, bIdx) => (
            <div key={bIdx} className="flex flex-col gap-2">
              {bundle.messages.map((msg, mIdx) => {
                if (
                  msg.message === "yes" ||
                  msg.message === "no" ||
                  msg.message === null
                ) {
                  return null;
                }
                const cleanMessage = msg.message.replace(/"/g, "");
                return (
                  <ChatBubble
                    key={msg.id}
                    type={bundle.role}
                    activeButton={msg.serverActive === "yes" ? "yes" : "no"}
                    onClickCheck={(value) => onClickCheckMovie(value)}
                    contentType={msg.image ? "image" : "text"}
                    message={cleanMessage}
                    image={msg.image}
                    createdAt={msg.createdAt}
                    showTime={mIdx === bundle.messages.length - 1}
                    showAvatar={mIdx === 0}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});

ChatList.displayName = "ChatList";

export default ChatList;
