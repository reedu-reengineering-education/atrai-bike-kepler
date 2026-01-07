import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";


export function StartTourButton() {
  const { t } = useTranslation();

  const startTour = () => {
    window.dispatchEvent(new Event("start-app-tour"));
  };

  return (
    <Button
      variant="outline"
      className="w-full justify-start gap-2 px-2 text-sm"
      onClick={startTour}
    >
      <HelpCircle className="h-4 w-4" />
      {t("nav.startTour")}
    </Button>
  );
}
