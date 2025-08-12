import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNavigation from "@components/common/BottomNavigation.jsx";
import MyProfile from "@/components/mypage/MyProfile";
import MypageButtons from "@/components/mypage/MypageButtons";
import ConfirmModal from "@/components/mypage/ConfirmModal";

const mockUserInfo = {
  id: 12345,
  nickname: "고은",
  email: "goeun@example.com",
  profileUrl: "https://example.com/profile.jpg",
};

const Mypage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setisModalOpen] = useState(false);

  const handleViewInterpretations = () => {
    navigate("/mypage/interpretations");
  };

  const handleChangeNickname = () => {
    navigate("/mypage/nickname");
  };

  const handleLogout = () => {
    {
      /*임시 로그아웃 로직*/
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  const handleWithdraw = () => {
    setisModalOpen(true);
  };

  const handleCancel = () => {
    setisModalOpen(false);
  };

  const handleConfirm = () => {
    setisModalOpen(false);
    // 탈퇴 API 호출
    navigate("/login");
  };

  return (
    <div>
      <div className="flex flex-col pt-19 px-[37px]">
        <MyProfile userInfo={mockUserInfo} />
        <MypageButtons
          onViewInterpretations={handleViewInterpretations}
          onChangeNickname={handleChangeNickname}
          onLogout={handleLogout}
          onWithdraw={handleWithdraw}
        />
        <ConfirmModal
          isOpen={isModalOpen}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </div>
      <BottomNavigation />
    </div>
  );
};
//
export default Mypage;
