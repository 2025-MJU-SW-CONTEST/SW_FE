import React from "react";
import { useTranslation } from "react-i18next";
import MyIcon_1 from "@/assets/icon/MyPage/MyIcon_1";
import MyIcon_2 from "@/assets/icon/MyPage/MyIcon_2";
import MyIcon_3 from "@/assets/icon/MyPage/MyIcon_3";
import MyIcon_4 from "@/assets/icon/MyPage/MyIcon_4";
import NextIcon from "@/assets/icon/MyPage/NextIcon";

const MypageButtons = ({
  onViewInterpretations,
  onChangeNickname,
  onLogout,
  onWithdraw,
}) => {
  const { t } = useTranslation(["list"]);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        className="flex items-center justify-between pt-10 pb-5 bg-white pretendard_bold text-016 text-font-700"
        onClick={onViewInterpretations}
      >
        <div className="flex">
          <MyIcon_1 />
          <span className="ml-9 leading-6">{t("list:list_mypage_01")}</span>
        </div>
        <NextIcon className="text-primary" />
      </button>

      <button
        type="button"
        className="flex items-center justify-between py-5 bg-white pretendard_bold text-016 text-font-700"
        onClick={onChangeNickname}
      >
        <div className="flex">
          <MyIcon_2 />
          <span className="ml-9 leading-6">{t("list:list_mypage_02")}</span>
        </div>
        <NextIcon className="text-primary" />
      </button>

      <button
        type="button"
        className="flex items-center justify-between py-5 bg-white pretendard_bold text-016 text-font-700"
        onClick={onLogout}
      >
        <div className="flex">
          <MyIcon_3 />
          <span className="ml-9 leading-6">{t("list:list_mypage_03")}</span>
        </div>
        <NextIcon className="text-primary" />
      </button>

      <button
        type="button"
        className="flex items-center justify-between py-5 bg-white pretendard_bold text-016 text-error-font"
        onClick={onWithdraw}
      >
        <div className="flex">
          <MyIcon_4 />
          <span className="ml-9 leading-6">{t("list:list_mypage_04")}</span>
        </div>
        <NextIcon className="text-error" />
      </button>
    </div>
  );
};

export default MypageButtons;
