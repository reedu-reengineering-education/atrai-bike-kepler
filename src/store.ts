// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import keplerGlReducer, { enhanceReduxMiddleware } from "@kepler.gl/reducers";
import appReducer from "./app-reducer";

const customizedKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    // currentModal: null,
    activeSidePanel: "rocket",
  },
});

const reducers = combineReducers({
  keplerGl: customizedKeplerGlReducer,
  app: appReducer,
});

const middlewares = enhanceReduxMiddleware([]);

const store = configureStore({
  reducer: reducers,
  middleware: middlewares,
});

export default store;
