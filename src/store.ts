// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import keplerGlReducer, {
  enhanceReduxMiddleware,
  KeplerGlState,
} from "@kepler.gl/reducers";
import appReducer from "./app-reducer";

// helper type to make all properties of T optional
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

const initialState: DeepPartial<KeplerGlState> = {
  uiState: {
    currentModal: null,
    activeSidePanel: "rocket",
  },
  mapStyle: {
    styleType: "positron",
  },
};

const customizedKeplerGlReducer = keplerGlReducer.initialState(initialState);

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
