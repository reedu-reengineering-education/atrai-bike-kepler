import i18n from "@/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setLocale } from "@reedu-kepler.gl/actions";
import { useDispatch, useSelector } from "react-redux";

const I18NEXT_LNG_LOCAL_STORAGE_KEY = "i18nextLng";

export function LanguageToggle() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const keplerLocale = useSelector(
    (state: any) => state?.keplerGl?.map?.uiState?.locale,
  );

  useEffect(() => {
    const savedI18nLanguage = localStorage.getItem(
      I18NEXT_LNG_LOCAL_STORAGE_KEY,
    );
    if (savedI18nLanguage) {
      dispatch(setLocale(savedI18nLanguage));
    }
  }, [dispatch, keplerLocale, t]);

  const changeLanguage = (lang: string) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      {["de", "en", "pt"].map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={`w-[50%] h-6 ml-2 rounded-lg text-xs font-medium flex items-center justify-center transition ${
            i18n.language === lng
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
          title={t(
            `language.${lng === "de" ? "german" : lng === "en" ? "english" : "portuguese"}`,
          )}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
