import TextField from "@components/common/TextField.jsx";
import Button from "@components/common/Button.jsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useRegister} from "@hooks/useAuthService.js";
import {useLocation} from "react-router-dom";

const Register = () => {
  const location = useLocation();

  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { t } = useTranslation(["title", "description","placeholder", "button"]);
  const {mutateAsync} = useRegister();

  const handleCompleteButton = async () => {
    await mutateAsync({nickname: value, ...location.state});
  }

  return (
    <div className="px-020 flex flex-col h-screen">
      <p className="pretendard_bold mt-[153px] pl-022">
        <span className="text-primary">{t("title:title_service")}</span>
        {t("title:title_welcome")}
      </p>
      <p className="font-famliy-pretendard text-018 text-font-700 mt-3.5 pl-022">{t("description:description_nickname")}</p>
      <div className="px-022 mt-[35px]">
        <TextField
          placeholder={t("placeholder:placeholder_nickname")}
          value={value}
          setValue={(value) => {
            if(value.length <= 11){
              setValue(value);
            }
          }}
          setIsActive={setIsActive}
        />
      </div>
      <div className="px-[29px] mt-auto pb-[91px]">
        <Button
          text={t("button:button_complete")}
          type="emphasis"
          onClick={handleCompleteButton}
          isActive={isActive}
        />
      </div>
    </div>
  );
};

export default Register;