import { useTranslation } from "react-i18next";

const DeleteButton = ({ onClick }) => {
  const { t } = useTranslation(["button"]);

  return (
    <button
      onClick={onClick}
      className="px-3 py-4 pretendard_regular text-left"
    >
      {t("button:button_delete")}
    </button>
  );
};

export default DeleteButton;
