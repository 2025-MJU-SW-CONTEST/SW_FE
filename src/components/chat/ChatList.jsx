import ChatBubble from "@components/common/ChatBubble.jsx";
import dayjs from "dayjs";

const groupByDate = (message) => {
  console.log(message)
  const grouped = message.reduce((acc, curr) => {
    const date = dayjs(curr.timestamp).format("YYYY-MM-DD");
    if (!acc[date]) acc[date] = [];

    const prev = acc[date][acc[date].length - 1];

    if (prev && (curr.contents === "yes" || curr.contents === null)) {
      prev.serverActive = curr.contents === "yes" ? "yes" : "no";
      return acc;
    }

    acc[date].push({
      id: curr.id,
      chatRoomId: curr.chatRoomId,
      message: curr.message,
      profileImg: curr.profileImg,
      nickName: curr.nickName,
      createdAt: curr.timestamp,
      userId: curr.userId
    });

    return acc;
  }, {});

  return Object.entries(grouped).map(([date, data]) => ({
    date,
    data,
  }));
}

const groupMessages = (messages = []) => {
  return messages.reduce((acc, curr) => {
    const lastGroup = acc[acc.length - 1];
    if(lastGroup &&
      lastGroup.userId === curr.userId &&
      dayjs(lastGroup.createdAt).format("HH:mm") ===
      dayjs(curr.createdAt).format("HH:mm")
    ){
      lastGroup.messages.push(curr);
      lastGroup.createdAt = curr.createdAt;
    } else{
      acc.push({
        userId: curr.userId,
        createdAt: curr.createdAt,
        messages: [curr],
      });
    }
    return acc;
  }, [])
}
const ChatList = ({history =[], myId}) => {
  const reverse = [...history]?.reverse();
  const chat = groupByDate(reverse);
  console.log(chat);
  return (
    <div className="flex-1 overflow-y-auto p-012">
      {chat.map((group, idx) => (
        <div key={idx}>
          <p className="font-family-pretendard font-normal text-012 text-font-500 text-center mb-[10px]">
            {group.date}
          </p>
          {groupMessages(group.data).map((bundle, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              {bundle.messages.map((msg, mIdx) => {
                  return (
                    <ChatBubble
                    key={mIdx}
                    type={bundle.userId === myId ? "USER" : "OTHERS"}
                    contentType={"text"}
                    message={msg.message}
                    nickName={msg.nickName}
                    profileImg={msg.profileImg}
                    createdAt={msg.createdAt}
                    showTime={mIdx === bundle.messages.length - 1}
                    showNickName={mIdx === 0}
                    showAvatar={mIdx === 0}
                  />)
                }
              )}
            </div>
          ))}
        </div>
      ))}

    </div>
  );
};

export default ChatList;