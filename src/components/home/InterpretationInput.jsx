import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ExclamationIcon from "@/assets/icon/ExclamationIcon";

const InterpretationInput = forwardRef(function InterpretationInput(
  {
    value = "",
    onChange,
    placeholder = "",
    minChars = 50,
    maxChars = 1000,
    onValidityChange,
  },
  inputRef // ← 부모에서 넘겨줄 ref
) {
  const { t } = useTranslation(["description"]);
  const textareaRef = useRef(null);
  const [isComposing, setIsComposing] = useState(false);

  // 공백 제외 글자 수
  const trimmedLength = useMemo(() => {
    const normalized = (value || "").replace(/\r\n/g, "\n").trim();
    const withoutSpaces = normalized.replace(/\s+/g, "");
    return [...withoutSpaces].length;
  }, [value]);

  // 최대 글자 수(1000자)
  const totalLength = useMemo(() => {
    return [...(value || "")].length;
  }, [value]);

  const showMinWarning = trimmedLength > 0 && trimmedLength < minChars;
  const isValid = trimmedLength >= minChars && totalLength <= maxChars;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    if (!inputRef) return;
    if (typeof inputRef === "function") {
      inputRef(textareaRef.current);
    } else {
      inputRef.current = textareaRef.current;
    }
  }, [inputRef]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mt-6 pretendard_regular text-014 leading-6 text-primary">
          {t("description:description_interpretation_announcement")}
        </div>
        <textarea
          ref={textareaRef}
          className="w-87 min-h-76 mt-[11px] p-4 resize-none border-b border-primary rounded-t-[28px] bg-secondary-50 focus:outline-none pretendard_regular leading-6"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxChars}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
            setIsComposing(false);
            onChange?.(e.currentTarget.value);
          }}
          style={{ lineHeight: "24px", boxSizing: "border-box" }}
        />
        <div className="mt-2 self-end mr-6 text-012 text-font-500">
          {totalLength}/{maxChars}
          {showMinWarning && (
            <span className="text-font-500">
              {" "}
              · 공백 제외 {trimmedLength}/{minChars}
            </span>
          )}
        </div>
      </div>
      {showMinWarning && (
        <div className="flex ml-[23px] mt-5">
          <ExclamationIcon />
          <div className="pretendard_regular text-014 leading-6 text-error-font">
            {t("description:description_interpretation_caution")}
          </div>
        </div>
      )}
    </>
  );
});

export default InterpretationInput;
