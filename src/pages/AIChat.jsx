import AppBar from "@components/AIChat/AppBar.jsx";
import BottomNavigation from "@components/common/BottomNavigation.jsx";
import Input from "@components/AIChat/Input.jsx";
import ChatList from "@components/common/ChatList.jsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import dayjs from "dayjs";

const dummyData = [
  {
    date: "2025-08-06",
    data: [
      {
        role: "ai",
        contentType: "text",
        message: "안녕하세요! 저는 필리, 여러분과 함께\n" +
          "영화의 숨겨진 의미를 찾아가는 친구에요.\n" +
          "궁금한 장면이나 감독의 의도가 있다면 편하게 물어보세요!",
        createdAt: "2025-08-06T09:15:00+09:00"
      },
      {
        role: "ai",
        contentType: "text",
        message: "어떤 영화를 보셨나요?",
        createdAt: "2025-08-06T09:15:00+09:00"
      },
      {
        role: "user",
        contentType: "text",
        message: "오늘 날씨 알려줘.",
        createdAt: "2025-08-06T09:16:30+09:00"
      },
      {
        role: "ai",
        contentType: "image",
        image: "https://via.placeholder.com/150x200",
        active: "yes",
        message: null,
        createdAt: "2025-08-06T09:17:00+09:00"
      }
    ]
  },
  {
    date: "2025-08-07",
    data: [
      {
        role: "user",
        contentType: "text",
        message: "어제 보낸 이미지 다시 보여줄 수 있어?",
        createdAt: "2025-08-07T14:05:00+09:00"
      },
      {
        role: "ai",
        contentType: "image",
        image: "https://via.placeholder.com/150x200",
        message: null,
        createdAt: "2025-08-07T14:06:15+09:00"
      }
    ]
  },
  {
    date: "2025-08-08",
    data: [
      {
        role: "ai",
        contentType: "text",
        message: "오늘은 기온이 27도, 맑음입니다.",
        createdAt: "2025-08-08T07:50:00+09:00"
      },
      {
        role: "user",
        contentType: "text",
        message: "좋네! 고마워.",
        createdAt: "2025-08-08T07:51:00+09:00"
      }
    ]
  }
]
const AiChat = () => {
  const [value, setValue] = useState("");
  const [chat, setChat] = useState(dummyData);

  const {t} = useTranslation(["placeholder"]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!value.trim()) return;
    setChat((prev) => [...prev,
      {
        date: dayjs().format("YYYY-MM-DD"),
        data: [
          {
            role: "user",
            contentType: "text",
            message: value,
            createdAt: dayjs()
          }
        ]
      }
    ])
  }

  return (
    <div>
      <div className="flex flex-col h-screen">
        <AppBar/>
        <ChatList chat={chat} />
        <div className="relative">
          <Input
            value={value}
            setValue={setValue}x
            onEnter={handleKeyDown}
            onClickButton={handleSubmit}
            placeholder={t("placeholder_question")}
          />
          <div className="h-14"/>
        </div>
        <BottomNavigation/>
      </div>
    </div>
  );
};

export default AiChat;