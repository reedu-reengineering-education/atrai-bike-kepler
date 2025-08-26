import { useTranslation } from "react-i18next";

const logo = {
  url: "/",
  src: "/logo.png",
};

export default function LogoTile() {
  const { t } = useTranslation();

  return (
    <a href={logo.url}>
      <div className="flex items-center gap-4">
        <img
          src={logo.src}
          alt={t("logo.alt")}
          title={t("logo.title")}
          className="h-10 dark:invert"
        />
        <h2 className="text-xl font-bold">{t("logo.title")}</h2>
      </div>
    </a>
  );
}
