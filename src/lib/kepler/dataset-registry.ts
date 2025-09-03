import RoadRoughnessImageUrl from "@/assets/road-roughness.png";
import DistancesImageUrl from "@/assets/distances.png";
import {
  useLazyGetDistanceFlowQuery,
  useLazyGetOsemBikeDataQuery,
  useLazyGetRoadRoughnessQuery,
} from "@/lib/redux/keplerApi";
import {
  DISTANCES_FLOWMAP_INFO,
  OSEM_BIKE_DATA,
  ROAD_ROUGHNESS_INFO,
} from "./dataset-info";
import React from "react";
import { BikeIcon, SpaceIcon, WavesIcon } from "lucide-react";

/**
 * Configuration interface for ATRAI datasets
 */
export interface DatasetConfig {
  /** Unique identifier for the dataset */
  id: string;
  /** Display label for the dataset */
  label: string;
  /** URL or imported image for the dataset preview */
  imageUrl?: string;
  /** Icon name from Lucide React for the dataset */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Icon color (CSS color value) */
  iconColor: string;
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
  osem_bike_data: {
    id: "osem_bike_data",
    label: "openSenseMap Bike Data",
    icon: BikeIcon,
    iconColor: "#0ea5e9", // Blue color
    queryHook: useLazyGetOsemBikeDataQuery,
    datasetInfo: OSEM_BIKE_DATA,
  },
  road_roughness: {
    id: "road_roughness",
    label: "Road Roughness",
    imageUrl: RoadRoughnessImageUrl,
    icon: WavesIcon,
    iconColor: "#0ea5e9", // Blue color
    queryHook: useLazyGetRoadRoughnessQuery,
    datasetInfo: ROAD_ROUGHNESS_INFO,
  },
  distances_flowmap: {
    id: "distances_flowmap",
    label: "Overtaking Distances",
    imageUrl: DistancesImageUrl,
    icon: SpaceIcon,
    iconColor: "#0ea5e9", // Blue color
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
