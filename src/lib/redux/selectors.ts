// SPDX-License-Identifier: MIT
// Copyright contributors to the @reedu-kepler.gl project

import type { RootState } from "./store";

/**
 * Selector to get loaded dataset IDs from kepler.gl state
 *
 * This selector extracts the IDs of all currently loaded datasets
 * from the kepler.gl state, which can be used to determine which
 * datasets are already loaded in the map.
 *
 * @param state - The root Redux state
 * @returns Array of loaded dataset IDs
 */
export const selectLoadedDatasetIds = (state: RootState): string[] => {
  try {
    // Validate root state exists
    if (!state || typeof state !== "object") {
      console.error("Invalid Redux state provided to selectLoadedDatasetIds");
      return [];
    }

    // Check if keplerGl exists in state
    if (!state.keplerGl) {
      console.warn(
        "keplerGl not found in Redux state - kepler.gl may not be initialized",
      );
      return [];
    }

    // Access the kepler.gl state with additional validation
    const keplerState = (state.keplerGl as any)?.map;

    if (!keplerState) {
      console.warn(
        "kepler.gl map state not found - no map instance may be active",
      );
      return [];
    }

    if (!keplerState.visState) {
      console.warn(
        "kepler.gl visState not found - visualization state may not be initialized",
      );
      return [];
    }

    // Extract dataset IDs from the kepler.gl datasets with validation
    const datasets = keplerState.visState.datasets;

    if (!datasets) {
      // This is normal when no datasets are loaded
      return [];
    }

    if (typeof datasets !== "object" || Array.isArray(datasets)) {
      console.error(
        "kepler.gl datasets is not a valid object:",
        typeof datasets,
      );
      return [];
    }

    // Return array of dataset IDs
    const datasetIds = Object.keys(datasets);

    // Log successful dataset detection for debugging
    if (datasetIds.length > 0) {
      console.debug(`Found ${datasetIds.length} loaded datasets:`, datasetIds);
    }

    return datasetIds;
  } catch (error) {
    console.error(
      "Unexpected error accessing kepler.gl state for dataset IDs:",
      {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        stateKeys: state ? Object.keys(state) : "state is null/undefined",
      },
    );
    return [];
  }
};

/**
 * Selector to get detailed information about loaded datasets
 *
 * This selector returns more detailed information about each loaded dataset,
 * including the dataset ID, label, and other metadata.
 *
 * @param state - The root Redux state
 * @returns Array of loaded dataset information objects
 */
export const selectLoadedDatasets = (
  state: RootState,
): Array<{
  id: string;
  label?: string;
  color?: number[];
}> => {
  try {
    // Validate root state exists
    if (!state || typeof state !== "object") {
      console.error("Invalid Redux state provided to selectLoadedDatasets");
      return [];
    }

    // Check if keplerGl exists in state
    if (!state.keplerGl) {
      console.warn(
        "keplerGl not found in Redux state - kepler.gl may not be initialized",
      );
      return [];
    }

    // Access the kepler.gl state with additional validation
    const keplerState = (state.keplerGl as any)?.map;

    if (!keplerState) {
      console.warn(
        "kepler.gl map state not found - no map instance may be active",
      );
      return [];
    }

    if (!keplerState.visState) {
      console.warn(
        "kepler.gl visState not found - visualization state may not be initialized",
      );
      return [];
    }

    // Extract datasets from the kepler.gl state with validation
    const datasets = keplerState.visState.datasets;

    if (!datasets) {
      // This is normal when no datasets are loaded
      return [];
    }

    if (typeof datasets !== "object" || Array.isArray(datasets)) {
      console.error(
        "kepler.gl datasets is not a valid object:",
        typeof datasets,
      );
      return [];
    }

    // Map datasets to include relevant information with error handling for each dataset
    const datasetDetails = Object.entries(datasets)
      .map(([id, dataset]: [string, any]) => {
        try {
          if (!id || typeof id !== "string") {
            console.warn("Invalid dataset ID found:", id);
            return null;
          }

          if (!dataset || typeof dataset !== "object") {
            console.warn(`Invalid dataset object for ID ${id}:`, dataset);
            return {
              id,
              label: id, // Fallback to ID as label
              color: undefined,
            };
          }

          return {
            id,
            label: dataset?.label || dataset?.info?.label || id,
            color: Array.isArray(dataset?.color) ? dataset.color : undefined,
          };
        } catch (datasetError) {
          console.error(`Error processing dataset ${id}:`, {
            error:
              datasetError instanceof Error
                ? datasetError.message
                : String(datasetError),
            datasetId: id,
          });
          // Return minimal valid object to keep UI functional
          return {
            id: id || "unknown",
            label: id || "Unknown Dataset",
            color: undefined,
          };
        }
      })
      .filter(
        (dataset): dataset is NonNullable<typeof dataset> => dataset !== null,
      );

    console.debug(`Processed ${datasetDetails.length} dataset details`);
    return datasetDetails;
  } catch (error) {
    console.error(
      "Unexpected error accessing kepler.gl state for dataset details:",
      {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        stateKeys: state ? Object.keys(state) : "state is null/undefined",
      },
    );
    return [];
  }
};

/**
 * Selector to check if a specific dataset is loaded
 *
 * @param state - The root Redux state
 * @param datasetId - The ID of the dataset to check
 * @returns Boolean indicating if the dataset is loaded
 */
export const selectIsDatasetLoaded = (
  state: RootState,
  datasetId: string,
): boolean => {
  try {
    // Validate inputs
    if (!datasetId || typeof datasetId !== "string") {
      console.warn(
        "Invalid datasetId provided to selectIsDatasetLoaded:",
        datasetId,
      );
      return false;
    }

    const loadedIds = selectLoadedDatasetIds(state);

    // Additional validation that loadedIds is an array
    if (!Array.isArray(loadedIds)) {
      console.error(
        "selectLoadedDatasetIds returned non-array value:",
        loadedIds,
      );
      return false;
    }

    const isLoaded = loadedIds.includes(datasetId);
    console.debug(`Dataset ${datasetId} loaded status: ${isLoaded}`);

    return isLoaded;
  } catch (error) {
    console.error("Error checking if dataset is loaded:", {
      error: error instanceof Error ? error.message : String(error),
      datasetId,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return false;
  }
};
/**
 * Interface for dataset status detection error information
 */
export interface DatasetStatusError {
  hasError: boolean;
  errorType: "state_access" | "kepler_missing" | "malformed_data" | "unknown";
  errorMessage: string;
  fallbackBehavior: "empty_array" | "cached_data" | "default_state";
}

/**
 * Selector to get dataset status detection error information
 * This helps components understand why dataset status detection might have failed
 * and what fallback behavior is being used.
 *
 * @param state - The root Redux state
 * @returns Error information object
 */
export const selectDatasetStatusError = (
  state: RootState,
): DatasetStatusError => {
  try {
    // Validate root state exists
    if (!state || typeof state !== "object") {
      return {
        hasError: true,
        errorType: "state_access",
        errorMessage: "Invalid Redux state - state is null or not an object",
        fallbackBehavior: "empty_array",
      };
    }

    // Check if keplerGl exists in state
    if (!state.keplerGl) {
      return {
        hasError: true,
        errorType: "kepler_missing",
        errorMessage: "kepler.gl not initialized in Redux state",
        fallbackBehavior: "empty_array",
      };
    }

    // Access the kepler.gl state
    const keplerState = (state.keplerGl as any)?.map;

    if (!keplerState) {
      return {
        hasError: true,
        errorType: "kepler_missing",
        errorMessage: "kepler.gl map instance not found",
        fallbackBehavior: "empty_array",
      };
    }

    if (!keplerState.visState) {
      return {
        hasError: true,
        errorType: "kepler_missing",
        errorMessage: "kepler.gl visualization state not initialized",
        fallbackBehavior: "empty_array",
      };
    }

    // Check datasets structure
    const datasets = keplerState.visState.datasets;

    if (datasets && (typeof datasets !== "object" || Array.isArray(datasets))) {
      return {
        hasError: true,
        errorType: "malformed_data",
        errorMessage: "kepler.gl datasets structure is malformed",
        fallbackBehavior: "empty_array",
      };
    }

    // No errors detected
    return {
      hasError: false,
      errorType: "unknown",
      errorMessage: "",
      fallbackBehavior: "default_state",
    };
  } catch (error) {
    return {
      hasError: true,
      errorType: "unknown",
      errorMessage:
        error instanceof Error ? error.message : "Unknown error occurred",
      fallbackBehavior: "empty_array",
    };
  }
};
