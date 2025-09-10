// SPDX-License-Identifier: MIT
// Copyright contributors to the @reedu-kepler.gl project

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import keplerGlReducer, {
  enhanceReduxMiddleware,
  KeplerGlState,
} from "@reedu-kepler.gl/reducers";
import appReducer from "./app-reducer";
import compignReducer from "./campaign-slice";
import { keplerApi } from "./keplerApi";
import activeDatasetReducer from "./active-dataset-slice";

// helper type to make all properties of T optional
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

const initialState: DeepPartial<KeplerGlState> = {
  uiState: {
    currentModal: null,
    // activeSidePanel: "bike",
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
  activeDataset: activeDatasetReducer,
  [keplerApi.reducerPath]: keplerApi.reducer,
});

const store = configureStore({
  reducer: reducers,
  // devTools: true,

  // @ts-expect-error: kepler.gl middleware typing is incompatible with Redux Toolkit
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),

    ...enhanceReduxMiddleware([]),
    keplerApi.middleware,
  ],
});

export default store;

// Export the RootState type for use with selectors
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
