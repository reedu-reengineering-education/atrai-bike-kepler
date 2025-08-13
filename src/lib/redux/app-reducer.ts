// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { createAction, handleActions } from "redux-actions";
import { initApplicationConfig } from "@reedu-kepler.gl/utils";
import "@/loaders-config";
// CONSTANTS
export const INIT = "INIT";

// ACTIONS
export const appInit = createAction(INIT);
initApplicationConfig({
  enableRasterTileLayer: true,
  showReleaseBanner: true,
  enableWMSLayer: true,
});

// INITIAL_STATE
const initialState = {
  appName: "example",
  loaded: false,
};

// REDUCER
const appReducer = handleActions(
  {
    [INIT]: (state) => ({
      ...state,
      loaded: true,
    }),
  },
  initialState,
);

export default appReducer;
