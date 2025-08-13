import ChatBubble from "@components/common/ChatBubble.jsx";
import dayjs from "dayjs";

const groupMessages = (messages) => {
  return messages.reduce((acc, curr) => {
    const lastGroup = acc[acc.length - 1];
    if (
      lastGroup &&
      lastGroup.role === curr.role &&
      dayjs(lastGroup.createdAt).format("HH:mm") === dayjs(curr.createdAt).format("HH:mm")
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


const ChatList = ({chat, ref}) => {
  return (
      <div className="flex-1 overflow-y-auto p-012" ref={ref}>
        {chat.map((group, idx) => (
          <div key={idx}>
            <p key={idx} className="font-family-pretendard font-normal text-012 text-font-500 text-center mb-[10px]">{group.date}</p>
            {groupMessages(group.data).map((bundle, bIdx) => (
              <div key={bIdx} className="flex flex-col gap-2">
                {bundle.messages.map((msg, mIdx) => (
                  <ChatBubble
                    key={mIdx}
                    type={bundle.role}
                    contentType={msg.contentType}
                    message={msg.message}
                    image={msg.image}
                    createdAt={msg.createdAt}
                    showTime={mIdx === bundle.messages.length - 1}
                    showAvatar={mIdx === 0}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
  );
};

export default ChatList;