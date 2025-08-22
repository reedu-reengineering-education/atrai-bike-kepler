import RoadRoughnessImageUrl from "@/assets/road-roughness.png";
import DistancesImageUrl from "@/assets/distances.png";
import {
  useLazyGetDistanceFlowQuery,
  useLazyGetRoadRoughnessQuery,
} from "@/lib/redux/keplerApi";
import { DISTANCES_FLOWMAP_INFO, ROAD_ROUGHNESS_INFO } from "./dataset-info";

/**
 * Configuration interface for ATRAI datasets
 */
export interface DatasetConfig {
  /** Unique identifier for the dataset */
  id: string;
  /** Display label for the dataset */
  label: string;
  /** URL or imported image for the dataset preview */
  imageUrl: string;
  /** React Query lazy hook for data fetching - returns a trigger function */
  queryHook: () => any;
  /** Dataset information object containing metadata */
  datasetInfo: {
    title: string;
    description: string;
    url: string;
    configUrl: string;
  };
}

/**
 * Registry interface for organizing multiple datasets
 */
export interface DatasetRegistry {
  [key: string]: DatasetConfig;
}

/**
 * ATRAI Datasets Registry
 *
 * This registry contains all available ATRAI datasets that can be loaded
 * through the Add Data Modal. To add a new dataset:
 *
 * 1. Add the dataset configuration to this registry
 * 2. Ensure the queryHook follows the useLazy*Query pattern
 * 3. Create corresponding dataset info in dataset-info.ts
 * 4. Add the preview image to the assets folder
 */
export const ATRAI_DATASETS: DatasetRegistry = {
  "road-roughness": {
    id: "road-roughness",
    label: "Road Roughness",
    imageUrl: RoadRoughnessImageUrl,
    queryHook: useLazyGetRoadRoughnessQuery,
    datasetInfo: ROAD_ROUGHNESS_INFO,
  },
  "overtaking-distances": {
    id: "overtaking-distances",
    label: "Overtaking Distances",
    imageUrl: DistancesImageUrl,
    queryHook: useLazyGetDistanceFlowQuery,
    datasetInfo: DISTANCES_FLOWMAP_INFO,
  },
};

/**
 * Helper function to get all datasets as an array
 */
export function getAllDatasets(): DatasetConfig[] {
  return Object.values(ATRAI_DATASETS);
}

/**
 * Helper function to get a specific dataset by ID
 */
export function getDatasetById(id: string): DatasetConfig | undefined {
  return ATRAI_DATASETS[id];
}

/**
 * Helper function to get dataset IDs
 */
export function getDatasetIds(): string[] {
  return Object.keys(ATRAI_DATASETS);
}
