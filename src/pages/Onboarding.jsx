import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import formatNewlines from "@/utils/formatText";
import PageIndicator from "@/components/onboarding/PageIndicator";
import Button from "@/components/common/Button";
import BackButton from "@/components/common/BackButton";

const Onboarding = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["onboarding", "button"]);
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    if (page < 3) {
      setPage(page + 1);
    } else {
      navigate("/login");
    }
  };

  const buttonMarginBottomClass = page === 1 ? "mb-25.5" : "mb-5";

  return (
    <div className="flex flex-col items-center">
      <p className="pretendard_bold mt-[149px] text-center">
        {formatNewlines(t(`onboarding:onboarding_intro_0${page}`))}
      </p>
      <div className="flex items-center mt-[37px] min-h-[221px]">
        {page === 1 && <img src="img/onboarding_01.png" />}
        {page === 2 && <img src="img/onboarding_02.png" />}
        {page === 3 && <img src="img/onboarding_03.png" />}
      </div>
      <p
        className="pretendard_regular min-h-30 my-[38px] px-12 text-center"
        style={{ whiteSpace: "pre-line" }}
      >
        <Trans
          i18nKey={`onboarding:onboarding_intro_description_0${page}`}
          components={{
            bold: <span className="font-bold text-primary" />,
            bold1: <span className="font-bold" />,
          }}
        />
      </p>
      <PageIndicator totalPages={3} currentPage={page} />
      <div className="w-full px-[49px]">
        <Button
          text={page !== 3 ? t("button:button_next") : t("button:button_start")}
          type={page !== 3 ? "normal" : "emphasis"}
          onClick={handleNextPage}
          className={`mt-[61px] ${buttonMarginBottomClass}`}
        />
      </div>
      {page > 1 && (
        <BackButton
          variant="text"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="text-font-400 text-016 font-bold mb-[57px]"
        />
      )}
    </div>
  );
};

export default Onboarding;
