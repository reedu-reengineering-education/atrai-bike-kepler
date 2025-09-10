import RoadRoughnessImageUrl from "@/assets/road-roughness.png";
import DistancesImageUrl from "@/assets/distances.png";
// Using existing images as placeholders for danger zones
import DangerZonesImageUrl from "@/assets/road-roughness.png";
import {
  useLazyGetDangerZonesQuery,
  useLazyGetAirPollutionQuery,
  useLazyGetBumpyRoadsQuery,
  useLazyGetOvertakingDistanceQuery,
  useLazyGetSpeedMapQuery,
  useLazyGetTrafficFlowQuery,
  useLazyGetRoadNetworkQuery,
  useLazyGetMvtOsemBikeDataQuery,
} from "@/lib/redux/keplerApi";
import {
  DANGER_ZONES_INFO,
  AIR_POLLUTION_INFO,
  BUMPY_ROADS_INFO,
  OVERTAKING_DISTANCE_INFO,
  SPEED_MAP_INFO,
  TRAFFIC_FLOW_INFO,
  ROAD_NETWORK_INFO,
  OSEM_BIKE_DATA,
} from "./dataset-info";
import React from "react";
import {
  SpaceIcon,
  WavesIcon,
  AlertTriangleIcon,
  CloudIcon,
  ZapIcon,
  TrendingUpIcon,
  RailSymbolIcon,
  BikeIcon,
} from "lucide-react";

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
  /** Optional: campaigns this dataset is available for. If not specified, available for all campaigns */
  campaigns?: string[];
  /** Optional: indicates if this dataset requires campaign parameter */
  requiresCampaign?: boolean;
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
  // road_roughness: {
  //   id: "road_roughness",
  //   label: "Road Roughness",
  //   imageUrl: RoadRoughnessImageUrl,
  //   icon: WavesIcon,
  //   iconColor: "#0ea5e9", // Blue color
  //   queryHook: useLazyGetRoadRoughnessQuery,
  //   datasetInfo: ROAD_ROUGHNESS_INFO,
  // },
  // distances_flowmap: {
  //   id: "distances_flowmap",
  //   label: "Overtaking Distances",
  //   imageUrl: DistancesImageUrl,
  //   icon: SpaceIcon,
  //   iconColor: "#0ea5e9", // Blue color
  //   queryHook: useLazyGetDistanceFlowQuery,
  //   datasetInfo: DISTANCES_FLOWMAP_INFO,
  // },
  osem_bike_data: {
    id: "osem_bike_data",
    label: "openSenseMap Bike Data (Experimental)",
    icon: BikeIcon,
    iconColor: "#0ea5e9", // Blue color
    queryHook: useLazyGetMvtOsemBikeDataQuery,
    datasetInfo: OSEM_BIKE_DATA,
  },
  danger_zones: {
    id: "danger_zones",
    label: "Danger Zones",
    imageUrl: DangerZonesImageUrl,
    icon: AlertTriangleIcon,
    iconColor: "#dc2626", // Red color
    queryHook: useLazyGetDangerZonesQuery,
    datasetInfo: DANGER_ZONES_INFO,
    requiresCampaign: true,
  },
  air_pollution: {
    id: "air_pollution",
    label: "Air Pollution (PM)",
    imageUrl: DangerZonesImageUrl, // Reusing danger zones image
    icon: CloudIcon,
    iconColor: "#8b4513", // Brown color for pollution
    queryHook: useLazyGetAirPollutionQuery,
    datasetInfo: AIR_POLLUTION_INFO,
    requiresCampaign: true,
  },
  bumpy_roads: {
    id: "bumpy_roads",
    label: "Bumpy Roads",
    imageUrl: RoadRoughnessImageUrl, // Reusing road roughness image
    icon: WavesIcon,
    iconColor: "#f59e0b", // Orange color
    queryHook: useLazyGetBumpyRoadsQuery,
    datasetInfo: BUMPY_ROADS_INFO,
    requiresCampaign: true,
  },
  overtaking_distance: {
    id: "overtaking_distance",
    label: "Overtaking Distance",
    imageUrl: DistancesImageUrl, // Reusing distances image
    icon: SpaceIcon,
    iconColor: "#8b5cf6", // Purple color
    queryHook: useLazyGetOvertakingDistanceQuery,
    datasetInfo: OVERTAKING_DISTANCE_INFO,
    requiresCampaign: true,
  },
  speed_map: {
    id: "speed_map",
    label: "Speed Map",
    imageUrl: RoadRoughnessImageUrl, // Reusing road roughness image
    icon: ZapIcon,
    iconColor: "#10b981", // Green color
    queryHook: useLazyGetSpeedMapQuery,
    datasetInfo: SPEED_MAP_INFO,
    requiresCampaign: true,
  },
  traffic_flow: {
    id: "traffic_flow",
    label: "Traffic Flow",
    imageUrl: DistancesImageUrl, // Reusing distances image
    icon: TrendingUpIcon,
    iconColor: "#3b82f6", // Blue color
    queryHook: useLazyGetTrafficFlowQuery,
    datasetInfo: TRAFFIC_FLOW_INFO,
    requiresCampaign: true,
  },
  road_network: {
    id: "road_network",
    label: "Road Network",
    imageUrl: DistancesImageUrl, // Reusing distances image
    icon: RailSymbolIcon,
    iconColor: "#3b82f6", // Blue color
    queryHook: useLazyGetRoadNetworkQuery,
    datasetInfo: ROAD_NETWORK_INFO,
    requiresCampaign: true,
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

/**
 * Helper function to get datasets filtered by campaign
 */
export function getDatasetsByCampaign(
  campaignName?: string | null,
): DatasetConfig[] {
  console.log("🔍 Filtering datasets for campaign:", campaignName);

  if (!campaignName) {
    return getAllDatasets();
  }

  const filteredDatasets = Object.values(ATRAI_DATASETS).filter((dataset) => {
    // If no campaigns specified, dataset is available for all campaigns
    if (!dataset.campaigns) {
      return true;
    }

    // Check if the campaign name matches any of the dataset's campaigns (case-insensitive partial match)
    const campaignLower = campaignName.toLowerCase();
    const isMatch = dataset.campaigns.some(
      (supportedCampaign) =>
        campaignLower.includes(supportedCampaign.toLowerCase()) ||
        supportedCampaign.toLowerCase().includes(campaignLower),
    );

    console.log(
      `📊 Dataset ${dataset.label} (campaigns: ${dataset.campaigns.join(", ")}) - Match: ${isMatch}`,
    );
    return isMatch;
  });

  console.log(
    `✅ Filtered ${filteredDatasets.length} datasets for campaign "${campaignName}"`,
  );
  return filteredDatasets;
}
