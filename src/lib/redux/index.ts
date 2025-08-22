// SPDX-License-Identifier: MIT
// Copyright contributors to the @reedu-kepler.gl project

/**
 * Redux utilities and selectors index
 *
 * This file exports all Redux-related utilities, selectors, and types
 * for easy importing throughout the application.
 */

// Export store and types
export { default as store } from "./store";
export type { RootState, AppDispatch } from "./store";

// Export selectors
export {
  selectLoadedDatasetIds,
  selectLoadedDatasets,
  selectIsDatasetLoaded,
} from "./selectors";

// Export slice actions
export { setActiveDataset } from "./active-dataset-slice";

// Export API
export { keplerApi } from "./keplerApi";

// Export data loading utilities
export { loadKeplerDataset } from "./loadkeplerData";
