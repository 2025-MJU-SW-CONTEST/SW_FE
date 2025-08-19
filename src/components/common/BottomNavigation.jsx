import BottomNavigationItem from "@components/common/BottomNavigationItem.jsx";
import HomeIcon from "@assets/icon/Navi/HomeIcon.jsx";
import RobotIcon from "@assets/icon/Navi/RobotIcon.jsx";
import ArticleIcon from "@assets/icon/Navi/ArticleIcon.jsx";
import PersonIcon from "@assets/icon/Navi/PersonIcon.jsx";

import { useTranslation } from "react-i18next";
import { pagePath } from "@routes/pagePath.js";

const BottomNavigation = () => {
  const { t } = useTranslation(["navigation"]);
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="flex justify-center items-center bg-secondary-50 w-full max-w-(--min-screen-size) mx-auto ">
        <div className="w-full flex items-center justify-center gap-8 h-full">
          <BottomNavigationItem
            Icon={HomeIcon}
            href={"/"}
            text={t("navigation_home")}
            isAlsoActive={(pathname) => /^\/movies\/[^/]+/.test(pathname)}
          />
          <BottomNavigationItem
            Icon={RobotIcon}
            href={pagePath.AICHAT}
            text={t("navigation_ai")}
          />
          <BottomNavigationItem
            Icon={ArticleIcon}
            href={pagePath.ARTICLE}
            text={t("navigation_article")}
          />
          <BottomNavigationItem
            Icon={PersonIcon}
            href={pagePath.MYPAGE}
            text={t("navigation_mypage")}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
