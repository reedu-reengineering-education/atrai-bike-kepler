
import { useEffect, useState, useCallback } from "react";
import Joyride, { Step, STATUS, CallBackProps } from "react-joyride";
import WelcomeModal from "./WelcomeModal";
import ShadcnTourTooltip from "./schadn";

interface TourManagerProps {
  steps: Step[];
  campaignName?: string;
  currentLanguage?: string;
}

const TOUR_STORAGE_KEY = "app-tour-completed";
const START_TOUR_EVENT = "start-app-tour";

const TourManager = ({ steps }: TourManagerProps) => {
  const [runTour, setRunTour] = useState(false);

  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    return !localStorage.getItem(TOUR_STORAGE_KEY);
  });

  const [dynamicSteps, setDynamicSteps] = useState<Step[]>(steps);

  useEffect(() => {
    setDynamicSteps(steps);
  }, [steps]);

  const startTour = useCallback(() => {
    setShowWelcome(false);
    setRunTour(true);
  }, []);

  useEffect(() => {
    const handleManualStart = () => {
      localStorage.removeItem(TOUR_STORAGE_KEY);
      startTour();
    };

    window.addEventListener(START_TOUR_EVENT, handleManualStart);
    return () => window.removeEventListener(START_TOUR_EVENT, handleManualStart);
  }, [startTour]);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status } = data;

    if (
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      status === STATUS.ERROR
    ) {
      localStorage.setItem(TOUR_STORAGE_KEY, "true");
      setRunTour(false);
    }
  }, []);

  const handleStartTour = () => {
    startTour();
  };

  const handleSkipTour = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setShowWelcome(false);
  };

  return (
    <>
      <WelcomeModal
        isOpen={showWelcome}
        onStart={handleStartTour}
        onSkip={handleSkipTour}
      />

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
          last: "Finish",
          skip: "Skip Tour",
          next: "Next",
          back: "Back",
        }}
      />
    </>
  );
};

export default TourManager;
