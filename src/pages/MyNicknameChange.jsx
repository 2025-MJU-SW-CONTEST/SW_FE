import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useMyInfo } from "@/hooks/useMyInfo";
import { updateMyNickname } from "@/apis/userService";
import useAuth from "@/store/useAuth";
import TextField from "@components/common/TextField.jsx";
import Button from "@components/common/Button.jsx";
import BackHeader from "@/components/common/BackHeader";

const MyNicknameChange = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["backheader", "placeholder", "button"]);

  const qc = useQueryClient();
  const setUserInfo = useAuth((s) => s.setUserInfo);

  // 현재 닉네임 불러오기
  const { data: me, isLoading: isMeLoading } = useMyInfo();
  const currentNickname = me?.nickname ?? "";

  const [value, setValue] = useState("");
  const [isActiveFromField, setIsActiveFromField] = useState(false);

  // 조회된 닉네임으로 입력 초기화
  useEffect(() => {
    if (!isMeLoading) setValue(currentNickname);
    setIsActiveFromField(false);
  }, [isMeLoading, currentNickname]);

  // 닉네임 변경
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ nickname }) => updateMyNickname(nickname),
    onSuccess: (res, vars) => {
      const newNick = res?.nickname ?? vars.nickname;

      // zustand 동기화 (토큰 변경 없음)
      setUserInfo((prev) => ({
        id: res?.id ?? prev?.id ?? null,
        nickname: newNick,
        email: res?.email ?? prev?.email ?? null,
        profileUrl: res?.profileUrl ?? prev?.profileUrl ?? null,
      }));

      // 내 정보 캐시 무효화 → 마이페이지/헤더 등 즉시 갱신
      qc.invalidateQueries({ queryKey: ["myInfo"] });

      navigate("/mypage", { replace: true });
    },
    onError: (err) => {
      console.error("[nickname:update:error]", err);
      alert("닉네임 변경에 실패했어요. 잠시 후 다시 시도해 주세요.");
    },
  });

  const trimmed = useMemo(() => value.trim(), [value]);
  const canSubmit =
    isActiveFromField &&
    trimmed.length > 0 &&
    trimmed !== currentNickname.trim() &&
    !isMeLoading &&
    !isPending;

  const handleCompleteButton = async () => {
    if (!canSubmit) return;
    await mutateAsync({ nickname: trimmed });
  };

  return (
    <div className=" flex flex-col h-screen">
      <BackHeader
        label={t("backHeader:backHeader_changeNickname")}
        onBack={() => navigate(-1)}
      />
      <div className="flex flex-col flex-1 px-020">
        <div className="px-022 mt-12">
          <TextField
            placeholder={t("placeholder:placeholder_nickname")}
            value={value}
            setValue={setValue}
            setIsActive={setIsActiveFromField}
          />
        </div>
        <div className="px-[29px] mt-auto pb-10.5">
          <Button
            text={t("button:button_complete")}
            type="emphasis"
            onClick={handleCompleteButton}
            isActive={canSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default MyNicknameChange;
