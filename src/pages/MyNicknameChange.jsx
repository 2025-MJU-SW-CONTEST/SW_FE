import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextField from "@components/common/TextField.jsx";
import Button from "@components/common/Button.jsx";
import BackHeader from "@/components/common/BackHeader";

const MyNicknameChange = () => {
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation(["backheader", "placeholder", "button"]);

  const handleCompleteButton = () => {
    navigate("/mypage");
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
            setValue={(value) => {
              if (value.length <= 11) {
                setValue(value);
              }
            }}
            setIsActive={setIsActive}
          />
        </div>
        <div className="px-[29px] mt-auto pb-10.5">
          <Button
            text={t("button:button_complete")}
            type="emphasis"
            onClick={handleCompleteButton}
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
};

export default MyNicknameChange;
