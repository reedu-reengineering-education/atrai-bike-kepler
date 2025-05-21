// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import keplerGlReducer, {
  enhanceReduxMiddleware,
  KeplerGlState,
} from "@kepler.gl/reducers";
import appReducer from "./app-reducer";
import compignReducer from "./campaign-slice";
import distanceFlowData from "./distanceFlowDataSlice";
import { keplerApi } from "./roadRoughnessDataSlice";


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
  campaign: compignReducer,
  distanceFlowData,
   [keplerApi.reducerPath]: keplerApi.reducer,
});

// const middlewares = enhanceReduxMiddleware([]);

const store = configureStore({
  reducer: reducers,
    middleware: (getDefaultMiddleware) => [
    // Include default middleware with custom configuration
    ...getDefaultMiddleware({
      serializableCheck: false, // Required for Kepler.gl
      immutableCheck: false,   // Optional performance improvement
    }),
    // Add Kepler.gl enhanced middleware
    ...enhanceReduxMiddleware([]),
     keplerApi.middleware,
  ],
});

export default store;
