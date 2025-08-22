// SPDX-License-Identifier: MIT
// Copyright contributors to the @reedu-kepler.gl project

/**
 * Example usage of the Redux selectors for loaded dataset detection
 *
 * This file demonstrates how to use the selectors in React components
 * to detect which datasets are currently loaded in kepler.gl
 */

import { useSelector } from "react-redux";
import {
  selectLoadedDatasetIds,
  selectLoadedDatasets,
  selectIsDatasetLoaded,
} from "./selectors";
import type { RootState } from "./store";

/**
 * Example React hook that uses the dataset selectors
 */
export function useDatasetStatus() {
  // Get all loaded dataset IDs
  const loadedDatasetIds = useSelector(selectLoadedDatasetIds);

  // Get detailed information about loaded datasets
  const loadedDatasets = useSelector(selectLoadedDatasets);

  // Create a helper function to check if a specific dataset is loaded
  const isDatasetLoaded = (datasetId: string) => {
    return useSelector((state: RootState) =>
      selectIsDatasetLoaded(state, datasetId),
    );
  };

  return {
    loadedDatasetIds,
    loadedDatasets,
    isDatasetLoaded,
  };
}

/**
 * Example usage in a component:
 *
 * ```tsx
 * import { useDatasetStatus } from '@/lib/redux/selector-usage-example';
 *
 * function MyComponent() {
 *   const { loadedDatasetIds, loadedDatasets, isDatasetLoaded } = useDatasetStatus();
 *
 *   // Check if a specific dataset is loaded
 *   const isRoadRoughnessLoaded = isDatasetLoaded('road_roughness');
 *
 *   return (
 *     <div>
 *       <p>Loaded datasets: {loadedDatasetIds.join(', ')}</p>
 *       <p>Road Roughness loaded: {isRoadRoughnessLoaded ? 'Yes' : 'No'}</p>
 *
 *       {loadedDatasets.map(dataset => (
 *         <div key={dataset.id}>
 *           {dataset.label} (ID: {dataset.id})
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
