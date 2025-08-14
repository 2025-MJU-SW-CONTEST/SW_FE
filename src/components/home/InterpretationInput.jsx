import React, { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ExclamationIcon from "@/assets/icon/ExclamationIcon";

const InterpretationInput = ({
  value = "",
  onChange,
  placeholder = "",
  minChars = 50,
  onValidityChange,
}) => {
  const { t } = useTranslation(["description"]);

  const trimmedLength = useMemo(() => {
    const normalized = (value || "").replace(/\r\n/g, "\n").trim();
    const withoutSpaces = normalized.replace(/\s+/g, "");
    return [...withoutSpaces].length;
  }, [value]);

  const showLineWarning = trimmedLength > 0 && trimmedLength < minChars;
  const isValid = trimmedLength >= minChars;

  useEffect(() => {
    if (typeof onValidityChange === "function") {
      onValidityChange(isValid);
    }
  }, [isValid, onValidityChange]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mt-6 pretendard_regular text-014 leading-6 text-primary">
          {t("description:description_interpretation_announcement")}
        </div>
        <textarea
          className="w-87 min-h-76 mt-[11px] p-4 resize-none border-b border-primary rounded-t-[28px] bg-secondary-50 focus:outline-none pretendard_regular leading-6"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ lineHeight: "24px", boxSizing: "border-box" }}
        />
      </div>
      {showLineWarning && (
        <div className="flex ml-[23px] mt-10">
          <ExclamationIcon />
          <div className="pretendard_regular text-014 leading-6 text-error-font">
            {t("description:description_interpretation_caution")}

            {` (${trimmedLength}/${minChars})`}
          </div>
        </div>
      )}
    </>
  );
};

export default InterpretationInput;
