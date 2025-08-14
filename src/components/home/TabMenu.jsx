import { useTranslation } from "react-i18next";

const TabMenu = ({ activeTab, onChange }) => {
  const { t } = useTranslation(["button"]);

  return (
    <div className="flex justify-center gap-[103px]">
      {[
        t("button:button_tab_basic"),
        t("button:button_tab_interpretation"),
      ].map((tab, idx) => {
        const isActive = activeTab === (idx === 0 ? "basic" : "interpretation");
        return (
          <button
            key={tab}
            onClick={() => onChange(idx === 0 ? "basic" : "interpretation")}
            className={`flex pt-3.5 pb-[7px] text-center pretendard_regular relative
              border-b-[3px] border-transparent leading-6 focus:outline-none`}
          >
            {tab}
            {isActive && (
              <span
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] rounded-b-[3px]"
                style={{
                  width: "151px",
                  background:
                    "linear-gradient(90deg, #5A77FF 0%, #BFA1FA 100%)",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabMenu;
