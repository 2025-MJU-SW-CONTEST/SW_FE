import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMyInfo } from "@/hooks/useMyInfo";
import { deleteMyAccount } from "@/apis/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/store/useAuth";
import BottomNavigation from "@components/common/BottomNavigation.jsx";
import MyProfile from "@/components/mypage/MyProfile";
import MypageButtons from "@/components/mypage/MypageButtons";
import ConfirmModal from "@/components/mypage/ConfirmModal";

const Mypage = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const clearAuth = useAuth((s) => s.clearAuth);
  const { data: userInfo, isLoading, isError, error, refetch } = useMyInfo();
  const [isModalOpen, setisModalOpen] = useState(false);

  useEffect(() => {
    if (isError) {
      const status = error?.response?.status;
      if (status === 401) {
        clearAuth();
        navigate("/login", { replace: true });
      }
    }
  }, [isError, error, navigate, clearAuth]);

  const handleViewInterpretations = () => {
    navigate("/mypage/interpretations");
  };

  const handleChangeNickname = () => {
    navigate("/mypage/nickname");
  };

  const handleLogout = () => {
    clearAuth();
    qc.clear();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLogin");
    sessionStorage.removeItem("kakao_oauth_state");
    navigate("/login", { replace: true });
  };

  const { mutateAsync: withdrawAsync, isPending: isWithdrawing } = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      clearAuth();
      qc.clear();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLogin");
      sessionStorage.removeItem("kakao_oauth_state");

      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.error("[withdraw:error]", err);
      alert("탈퇴 처리에 실패했어요. 잠시 후 다시 시도해 주세요.");
    },
  });

  const handleWithdraw = () => {
    setisModalOpen(true);
  };

  const handleCancel = () => {
    setisModalOpen(false);
  };

  const handleConfirm = async () => {
    await withdrawAsync();
  };

  return (
    <div>
      <div className="flex flex-col pt-[29px] px-[37px]">
        <MyProfile userInfo={userInfo} isLoading={isLoading} />
        <MypageButtons
          onViewInterpretations={handleViewInterpretations}
          onChangeNickname={handleChangeNickname}
          onLogout={handleLogout}
          onWithdraw={handleWithdraw}
        />
        {isError && (
          <div className="mt-3 text-sm text-error">
            프로필 정보를 불러오지 못했어요.{" "}
            <button onClick={() => refetch()} className="underline">
              다시 시도
            </button>
          </div>
        )}
        <ConfirmModal
          isOpen={isModalOpen}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          loading={isWithdrawing}
        />
      </div>
      <BottomNavigation />
    </div>
  );
};
//
export default Mypage;
