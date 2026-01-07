
// import { Step } from "react-joyride";
// import { useTranslation } from "react-i18next";

// const { t } = useTranslation();

// export const TOUR_STEPS: Step[] = [
//   {
//     target: "#map-tour-wrapper",
//     content:  t("tour.welcome"),
//     placement: "center" as const,
//     disableBeacon: true,
//     spotlightClicks: true, 
//   },
//   {
//     target: '[data-tour="campaign-switcher"]',
//     content: t("tour.campaignSwitcher"),
//     placement: "right" as const,
//     spotlightClicks: true, 
//     disableBeacon: true,
   
//   },

//   {
//     target: '[data-tour="language-toggle"]',
//     content:  t("tour.languageToggle"),
//     placement: "left" as const,
//     spotlightClicks: true,
//     disableBeacon: true,
//   },
//  {
//     target: '[data-tour="nav-user"]',
//     content: t("tour.userMenu"),
//     placement: "top" as const,
//     spotlightClicks: true,
//     disableOverlay: false, 
//     disableBeacon: true,
//   },
//     {
//     target:'#kepler-gl__map > div.sc-fccqSk.bzNvlp.maps > div > div.sc-jJLAfE.gQCuSx > div.sc-jwTyAe.hwsgrB > div.sc-cAYQHL.idqtHp.map-control > button.sc-fmKFGs.sc-ckdEwu.cuZRnF.JbZBN.button.map-control-button.button.map-control-button.show-legend',
//       content:t("tour.legend"),
//     placement: "right" as const,
//     spotlightClicks: true, 
//     disableBeacon: true,
//   },
//       {
//     target:' #kepler-gl__map > div.sc-fYrVWQ.cnzSEc.side-panel--container > div > div.sc-jYnQyy.dYuJiN.side-bar__inner > div.sc-gFfkIj.bCcPYH.side-panel__content > div > div.layer-manager > div.sc-kMHJlo.uUcLy > div.sc-hYkDQb.fjnQLe > button',
//       content: t("tour.addData"),
//     placement: "right" as const,
//     spotlightClicks: true, 
//     disableBeacon: true,
//   },
 
// ];

import { Step } from "react-joyride";
import { TFunction } from "i18next";

export const getTourSteps = (t: TFunction): Step[] => [
  {
    target: "#map-tour-wrapper",
    content: t("tour.welcome"),
    placement: "center",
    disableBeacon: true,
    spotlightClicks: true,
  },
  {
    target: '[data-tour="campaign-switcher"]',
    content: t("tour.campaignSwitcher"),
    placement: "right",
    spotlightClicks: true,
    disableBeacon: true,
  },
  {
    target: '[data-tour="language-toggle"]',
    content: t("tour.languageToggle"),
    placement: "left",
    spotlightClicks: true,
    disableBeacon: true,
  },
  {
    target: '[data-tour="nav-user"]',
    content: t("tour.userMenu"),
    placement: "top",
    spotlightClicks: true,
    disableOverlay: false,
    disableBeacon: true,
  },
  {
    target:
      '#kepler-gl__map > div.sc-fccqSk.bzNvlp.maps > div > div.sc-jJLAfE.gQCuSx > div.sc-jwTyAe.hwsgrB > div.sc-cAYQHL.idqtHp.map-control > button.sc-fmKFGs.sc-ckdEwu.cuZRnF.JbZBN.button.map-control-button.button.map-control-button.show-legend',
    content: t("tour.legend"),
    placement: "right",
    spotlightClicks: true,
    disableBeacon: true,
  },
  {
    target:
      '#kepler-gl__map > div.sc-fYrVWQ.cnzSEc.side-panel--container > div > div.sc-jYnQyy.dYuJiN.side-bar__inner > div.sc-gFfkIj.bCcPYH.side-panel__content > div > div.layer-manager > div.sc-kMHJlo.uUcLy > div.sc-hYkDQb.fjnQLe > button',
    content: t("tour.addData"),
    placement: "right",
    spotlightClicks: true,
    disableBeacon: true,
  },
];

