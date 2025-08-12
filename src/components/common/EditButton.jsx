import { useTranslation } from "react-i18next";

const EditButton = ({ onClick }) => {
  const { t } = useTranslation(["button"]);

  return (
    <button
      onClick={onClick}
      className="px-3 py-4 pretendard_regular text-left"
    >
      {t("button:button_edit")}
    </button>
  );
};
export default EditButton;
