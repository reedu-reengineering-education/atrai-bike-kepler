import i18n from "@/i18n";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setLocale } from "@reedu-kepler.gl/actions";
import { useDispatch, useSelector } from "react-redux";

const LOCAL_STORAGE_KEY = "keplerLocale";

export function LanguageToggle() {
  const [, setLanguage] = useState(i18n.language);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const keplerLocale = useSelector(
    (state: any) => state?.keplerGl?.map?.uiState?.locale,
  );

  useEffect(() => {
    const savedKeplerLocale = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedKeplerLocale) {
      dispatch(setLocale(savedKeplerLocale));
      if (i18n.language !== savedKeplerLocale) {
        i18n.changeLanguage(savedKeplerLocale);
        setLanguage(savedKeplerLocale);
      }
    } else if (keplerLocale && i18n.language !== keplerLocale) {
      i18n.changeLanguage(keplerLocale);
      setLanguage(keplerLocale);
    }
  }, [dispatch, keplerLocale]);

  const changeLanguage = (lang: string) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      dispatch(setLocale(lang));
      localStorage.setItem(LOCAL_STORAGE_KEY, lang);
      setLanguage(lang);
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
