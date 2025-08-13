import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@components/common/Button.jsx";
import BackHeader from "@/components/common/BackHeader";

const EditInterpretation = () => {
  const navigate = useNavigate();

  const { t } = useTranslation(["backheader", "button"]);

  return (
    <>
      <BackHeader
        label={t("backHeader:backHeader_editInterpretation")}
        onBack={() => navigate(-1)}
      />
    </>
  );
};

export default EditInterpretation;
