import clsx from "clsx";
import CancelGradientIcon from "@assets/icon/CancelGradientIcon.jsx";
import ExclamationIcon from "@assets/icon/ExclamationIcon.jsx";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
const TextField = ({placeholder, value, setValue, type = "normal", className, setIsActive}) => {
  const { t } = useTranslation(["title", "placeholder", "description"]);
  const specialCharPattern = /[!@#$%^&*()]/;
  const isOverLimit = value.length > 10;
  const isContainSpecialChar = specialCharPattern.test(value);

  useEffect(() => {
    setIsActive(!isOverLimit && !isContainSpecialChar && value.length > 0);
  }, [value]);

  return (
    <div>
      {type === "normal" && <p className="text-primary font-family-pretendard text-xs font-normal leading-none pl-016">{t("title_nickname")}</p>}
      <div className="flex relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          className={clsx("w-full border-b border-primary px-016 h-10 outline-none", className)}
        />
        {value.length > 0 && type === "normal" &&
          <div className="flex items-center gap-007 absolute right-2 bottom-2">
          <p className={clsx("font-family-pretendard text-018 font-normal tracking-tight", isOverLimit ? "text-error-font": "text-primary")}>{value.length}/10</p>
          <CancelGradientIcon onClick={() => setValue("")}/>
        </div>}
      </div>
      {(isOverLimit || isContainSpecialChar) && type === "normal" &&
        <div className="mt-3 flex items-center">
        <ExclamationIcon className="text-error"/>
        <p className="text-error-font pretendard_regular">{
          isOverLimit ? t("description:description_limit_nickname") :  t("description:description_special_nickname")
        }</p>
      </div>}
    </div>
  );
};

export default TextField;
