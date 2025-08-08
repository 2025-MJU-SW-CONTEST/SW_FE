import {useTranslation} from "react-i18next";
import clsx from "clsx";

const TextField = ({placeholder, value, setValue, type = "normal", className}) => {
  const { t } = useTranslation(["title", "placeholder"]);

  return (
    <div>
      {type === "normal" && <p
        className="text-primary font-family-pretendard text-xs font-normal leading-none pl-016">
        {t("title_nickname")
        }</p>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={clsx("w-full border-b border-primary px-016 h-10 outline-none", className)}
      />
    </div>
  );
};

export default TextField;
