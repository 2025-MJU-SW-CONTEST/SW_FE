import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextField from "@components/common/TextField.jsx";
import Button from "@components/common/Button.jsx";
import BackHeader from "@/components/common/BackHeader";

const MyNicknameChange = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const { t } = useTranslation(["backheader", "placeholder", "button"]);

  const handleCompleteButton = () => {
    navigate("/mypage");
  };

  return (
    <>
      <BackHeader
        label={t("backHeader:backHeader_changeNickname")}
        onBack={() => navigate(-1)}
      />
      <div className="px-020">
        <div className="px-022 mt-12">
          <TextField
            placeholder={t("placeholder:placeholder_nickname")}
            value={value}
            setValue={(value) => {
              if (value.length <= 10) {
                setValue(value);
              }
            }}
          />
        </div>
        <div className="px-[29px]">
          <Button
            text={t("button:button_complete")}
            type="emphasis"
            onClick={handleCompleteButton}
            className="mt-[563px] mb-10.5"
          />
        </div>
      </div>
    </>
  );
};

export default MyNicknameChange;
