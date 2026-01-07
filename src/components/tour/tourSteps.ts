
import { Step } from "react-joyride";

export const TOUR_STEPS: Step[] = [
  {
    target: "#map-tour-wrapper",
    content: "This application lets you explore geospatial data through interactive maps powered by Kepler.gl Upload data, customize layers, and discover insights in just a few clicks.",
    placement: "center" as const,
    disableBeacon: true,
    spotlightClicks: true, 
  },
  {
    target: '[data-tour="campaign-switcher"]',
    content: "From here, you can choose the active campaign.",
    placement: "right" as const,
    spotlightClicks: true, 
    disableBeacon: true,
   
  },

  {
    target: '[data-tour="language-toggle"]',
    content: "Change the language of the application here. Choose between English, German, and Portuguese.",
    placement: "left" as const,
    spotlightClicks: true,
    disableBeacon: true,
  },
 {
    target: '[data-tour="nav-user"]',
    content: "This is your user profile menu. Click here to manage your account or sign out.",
    placement: "top" as const,
    spotlightClicks: true,
    disableOverlay: false, 
    disableBeacon: true,
  },
    {
    target:'#kepler-gl__map > div.sc-fccqSk.bzNvlp.maps > div > div.sc-jJLAfE.gQCuSx > div.sc-jwTyAe.hwsgrB > div.sc-cAYQHL.idqtHp.map-control > button.sc-fmKFGs.sc-ckdEwu.cuZRnF.JbZBN.button.map-control-button.button.map-control-button.show-legend',
      content: "Open the legend to understand what the map colors, symbols, and layers represent.",
    placement: "right" as const,
    spotlightClicks: true, 
    disableBeacon: true,
  },
      {
    target:' #kepler-gl__map > div.sc-fYrVWQ.cnzSEc.side-panel--container > div > div.sc-jYnQyy.dYuJiN.side-bar__inner > div.sc-gFfkIj.bCcPYH.side-panel__content > div > div.layer-manager > div.sc-kMHJlo.uUcLy > div.sc-hYkDQb.fjnQLe > button',
      content: "Add data to the map. Choose from built-in datasets, upload your own files (CSV, JSON, GeoJSON), or connect tilesets such as Vector Tiles, Raster, or WMS.",
    placement: "right" as const,
    spotlightClicks: true, 
    disableBeacon: true,
  },
 
];