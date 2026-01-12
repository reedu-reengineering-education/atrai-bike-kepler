import { useState, useEffect, useCallback } from "react";
import Joyride, { Step, STATUS, CallBackProps } from "react-joyride";
import { useTranslation } from "react-i18next";
import WelcomeModal from "./WelcomeModal";
import ShadcnTourTooltip from "./shadncnTourCard";
import { getTourSteps } from "./tourSteps";

interface TourManagerProps {
  campaignName?: string;
  currentLanguage?: string;
}

const TOUR_STORAGE_KEY = "app-tour-completed";
const START_TOUR_EVENT = "start-app-tour";

const TourManager = ({ campaignName, currentLanguage }: TourManagerProps) => {
  const { t } = useTranslation();
  const [runTour, setRunTour] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem(TOUR_STORAGE_KEY));
  const [dynamicSteps, setDynamicSteps] = useState<Step[]>(getTourSteps(t));


  useEffect(() => {
    setDynamicSteps(getTourSteps(t));
  }, [t, campaignName, currentLanguage]);

  const startTour = useCallback(() => {
    setShowWelcome(false);
    setRunTour(true);
  }, []);



  // Listen for manual tour start (like a button)
  useEffect(() => {
    const handleManualStart = () => {
      localStorage.removeItem(TOUR_STORAGE_KEY);
      startTour();
    };
    window.addEventListener(START_TOUR_EVENT, handleManualStart);
    return () => window.removeEventListener(START_TOUR_EVENT, handleManualStart);
  }, [startTour]);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED || data.status === STATUS.ERROR) {
      localStorage.setItem(TOUR_STORAGE_KEY, "true");
      setRunTour(false);
    }
  }, []);

  const handleStartTour = () => startTour();
  const handleSkipTour = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setShowWelcome(false);
  };

  return (
    <>
      <WelcomeModal isOpen={showWelcome} onStart={handleStartTour} onSkip={handleSkipTour} />

      <Joyride
        steps={dynamicSteps}
        run={runTour}
        continuous
        scrollToFirstStep
        showProgress
        showSkipButton
        spotlightClicks
        disableOverlayClose
        disableCloseOnEsc
        tooltipComponent={ShadcnTourTooltip}
        spotlightPadding={8}
        callback={handleJoyrideCallback}
        locale={{
          last: t("tour.finish"),
          skip: t("tour.skip"),
          next: t("tour.next"),
          back: t("tour.back"),
        }}
      />
    </>
  );
};

export default TourManager;
