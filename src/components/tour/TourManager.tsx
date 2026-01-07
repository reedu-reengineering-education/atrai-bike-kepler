// components/TourManager.tsx
import { useState, useEffect } from "react";
import Joyride, { Step, STATUS, CallBackProps } from "react-joyride";
import WelcomeModal from "./WelcomeModal";
import ShadcnTourTooltip from "./schadn";

interface TourManagerProps {
  steps: Step[];
  campaignName?: string;
  currentLanguage?: string;
}


const TOUR_STORAGE_KEY = "app-tour-completed"

const TourManager = ({ steps, campaignName, currentLanguage }: TourManagerProps) => {
  const [runTour, setRunTour] = useState(false);
   const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem(TOUR_STORAGE_KEY);
  });
  const [dynamicSteps, setDynamicSteps] = useState<Step[]>(steps);

  // Update steps when props change
  useEffect(() => {
    const updatedSteps = steps.map((step, index) => {
      // Update campaign switcher step
      // if (index === 1 && step.target === '[data-tour="campaign-switcher"]' && campaignName) {
      //   return {
      //     ...step,
      //     content: `Currently viewing "${campaignName}". Click here to switch to other campaigns.`,
      //   };
      // }
      
      // // Update language toggle step
      // if (index === 2 && step.target === '[data-tour="language-toggle"]' && currentLanguage) {
      //   const languageNames = {
      //     en: "English",
      //     de: "German",
      //     pt: "Portuguese"
      //   };
        
      //   return {
      //     ...step,
      //     content: `Current language is ${languageNames[currentLanguage as keyof typeof languageNames] || currentLanguage}. Click buttons to switch to English, German, or Portuguese.`,
      //   };
      // }
      
      return step;
    });
    
    setDynamicSteps(updatedSteps);
  }, [steps, campaignName, currentLanguage]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    
  const { status } = data;

  if (
    status === STATUS.FINISHED ||
    status === STATUS.SKIPPED ||
    status === STATUS.ERROR
  ) {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setRunTour(false);
  }
};


  const handleStartTour = () => {
    setShowWelcome(false);
    const waitForMap = setInterval(() => {
    const mapElement = document.querySelector("#map-tour-wrapper");

    if (mapElement) {
      clearInterval(waitForMap);
      setRunTour(true);
    }
  }, 100);
    // setTimeout(() => setRunTour(true), 100);
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
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        spotlightClicks={true}
        disableOverlayClose={true}
        disableCloseOnEsc={true}
        tooltipComponent={ShadcnTourTooltip}
        spotlightPadding={8}
       
        callback={handleJoyrideCallback}
        // styles={{
        //   options: {
        //     zIndex: 10000,
        //     primaryColor: "#3b82f6",
        //     beaconSize: 36,
        //     overlayColor: "rgba(0, 0, 0, 0.5)",
        //   },
        //   buttonNext: {
        //     backgroundColor: "#3b82f6",
        //   },
        //   buttonBack: {
        //     color: "#6b7280",
        //   },
        //   buttonSkip: {
        //     color: "#6b7280",
        //   },
        //   spotlight: {
        //     borderRadius: 8,
        //   },
        // }}
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