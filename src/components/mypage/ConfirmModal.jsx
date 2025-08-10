import React from "react";
import { useTranslation } from "react-i18next";
import MyIcon_5 from "@/assets/icon/MyPage/MyIcon_5";

const ConfirmModal = ({ isOpen, onCancel, onConfirm, children }) => {
  const { t } = useTranslation(["description", "button"]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="w-[var(--min-screen-size)] h-full flex justify-center items-center"
        style={{ backgroundColor: "rgba(54, 54, 54, 0.5)" }}
      >
        <div className="flex flex-col items-center text-center gap-5.5 bg-primary-50 rounded-sm pt-6 px-[19px] pb-5 max-w-[351px] w-full shadow-modal">
          <MyIcon_5 />
          <div className="flex flex-col pretendard_regular leading-6">
            <span className="">{t("description:description_modal_01")}</span>
            <span className="text-error-font">
              {t("description:description_modal_02")}
            </span>
          </div>
          <div className="flex gap-11.5 pretendard_medium text-016">
            <button
              onClick={onCancel}
              className="px-12.5 py-[5px] rounded-006 bg-font-200 cursor-pointer focus:outline-none text-font-400"
            >
              {t("button:button_cancel")}
            </button>
            <button
              onClick={onConfirm}
              className="px-12.5 py-[5px] rounded-006 bg-error cursor-pointer focus:outline-none text-blue-50"
            >
              {t("button:button_withdrawal")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
