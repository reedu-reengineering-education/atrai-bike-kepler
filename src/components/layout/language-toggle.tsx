import i18n from "@/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [language, setLanguage] = useState(i18n.language);
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <button
        onClick={() => changeLanguage("de")}
        className={`w-[50%] h-6 ml-2 rounded-lg text-xs font-medium flex items-center justify-center transition ${
          i18n.language === "de"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
        title={t("language.german")}
      >
        DE
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`w-[50%] h-6 ml-2 rounded-lg text-xs font-medium flex items-center justify-center transition ${
          i18n.language === "en"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
        title={t("language.english")}
      >
        EN
      </button>
    </div>
  );
}
