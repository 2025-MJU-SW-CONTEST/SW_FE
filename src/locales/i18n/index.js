import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import koButton from "@locales/ko/button.json";
import koNavigation from "@locales/ko/navigation.json";
import koDescription from "@locales/ko/description.json";
import koOnboarding from "@locales/ko/onboarding.json";
import koPlaceholder from "@locales/ko/placeholder.json";
import koTitle from "@locales/ko/title.json";
import koPopup from "@locales/ko/popup.json";
import koList from "@locales/ko/list.json";
import koBackHeader from "@locales/ko/backheader.json";

i18n.use(initReactI18next).init({
  resources: {
    ko: {
      button: koButton,
      description: koDescription,
      navigation: koNavigation,
      onboarding: koOnboarding,
      placeholder: koPlaceholder,
      title: koTitle,
      popup: koPopup,
      list: koList,
      backHeader: koBackHeader,
    },
  },
  lng: "ko", // 기본 언어
  fallbackLng: "ko",
  ns: ["button", "navigation", "backheader"], // 네임스페이스 추가
  defaultNS: "button",
  interpolation: {
    escapeValue: false, // React는 XSS 방지 처리됨
  },
});

export default i18n;
