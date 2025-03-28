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
  mapState: {
    latitude: 51.9764007406153,
    longitude: 7.620825845746908,
    pitch: 0,
    zoom: 11.231547146346966,
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
