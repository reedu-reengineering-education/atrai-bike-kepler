// Using existing images as placeholders for danger zones
import {
  OSEM_BIKE_DATA,
} from "./dataset-info";
import React from "react";
import {
  BikeIcon,
  LayersIcon,
  MapIcon,
  BarChart3,
  AlertTriangleIcon,
  ZapIcon,
  MoreHorizontal,
  Grid3X3,
  TrendingUp,
} from "lucide-react";
import { useLazyGetOsemBikePublicQuery } from "../redux/keplerApi";

/**
 * Helper function to create a generic collection loader hook
 * Returns a function that loads a collection via direct fetch
 * Compatible with RTK Query's lazy hook interface
 */
function createCollectionLoader(collectionName: string) {
  return () => {
    const trigger = (_options = {}) => {
      // Return immediately with an object that has unwrap method
      // unwrap() returns the actual Promise
      return {
        unwrap: async () => {
          try {
            const url = `${import.meta.env.VITE_API_URL}/collections/${collectionName}/items?f=json&limit=100000`;
            const response = await fetch(url);
            
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: Failed to load collection ${collectionName}`);
            }
            
            return await response.json();
          } catch (err) {
            console.error(`Error loading collection ${collectionName}:`, err);
            throw err;
          }
        }
      };
    };
    
    // Return in the format expected by the data panel
    // This mimics RTK Query's useLazy hook format: [trigger, { data, isLoading, error }]
    return [
      trigger,
      {
        data: null,
        isLoading: false,
        error: null,
        status: 'uninitialized'
      }
    ];
  };
}

/**
 * Dataset categories for organizing datasets in UI
 */
export enum DatasetCategory {
  GENERAL_DATA = 'general_data',
  ANALYZED_DATA = 'analyzed_data',
}

/**
 * Mapping of collection names to their configurations
 */
const COLLECTION_CONFIGS: Record<string, {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  description: string;
  category: DatasetCategory;
}> = {
  "bumpy_roads_heilbronn": {
    label: "Bumpy Roads (Heilbronn)",
    icon: AlertTriangleIcon,
    iconColor: "#f97316",
    description: "Roads with poor surface conditions",
    category: DatasetCategory.ANALYZED_DATA,
  },
  "danger_zones_heilbronn": {
    label: "Danger Zones (Heilbronn)",
    icon: ZapIcon,
    iconColor: "#ef4444",
    description: "Areas marked as dangerous for cyclists",
    category: DatasetCategory.ANALYZED_DATA,
  },
  "overtaking_distance_heilbronn": {
    label: "Overtaking Distances (Heilbronn)",
    icon: BarChart3,
    iconColor: "#8b5cf6",
    description: "Data on overtaking distance measurements",
    category: DatasetCategory.ANALYZED_DATA,
  },
  "road_network_heilbronn": {
    label: "Road Network (Heilbronn)",
    icon: MapIcon,
    iconColor: "#6366f1",
    description: "Complete road network layer",
    category: DatasetCategory.GENERAL_DATA,
  },
  "speed_map_heilbronn": {
    label: "Speed Map (Heilbronn)",
    icon: MoreHorizontal,
    iconColor: "#3b82f6",
    description: "Measured speed data across the city",
    category: DatasetCategory.ANALYZED_DATA,
  },
  "traffic_flow_heilbronn": {
    label: "Traffic Flow (Heilbronn)",
    icon: TrendingUp,
    iconColor: "#06b6d4",
    description: "Traffic flow visualization",
    category: DatasetCategory.ANALYZED_DATA,
  },
  "track_points": {
    label: "Track Points",
    icon: Grid3X3,
    iconColor: "#ec4899",
    description: "Individual GPS track points",
    category: DatasetCategory.GENERAL_DATA,
  },
  "tracks": {
    label: "Tracks",
    icon: BikeIcon,
    iconColor: "#0ea5e9",
    description: "Complete bike tracks and routes",
    category: DatasetCategory.GENERAL_DATA,
  },
  "osem_bike_data": {
    label: "OSEM Bike Data",
    icon: BikeIcon,
    iconColor: "#10b981",
    description: "Environmental sensor data from bike sensors",
    category: DatasetCategory.GENERAL_DATA,
  },
};

/**
 * Create a dataset configuration for a collection
 */
function createCollectionDataset(collectionName: string): DatasetConfig {
  const config = COLLECTION_CONFIGS[collectionName];
  if (!config) {
    return {
      id: collectionName,
      label: collectionName,
      icon: LayersIcon,
      iconColor: "#6b7280",
      queryHook: createCollectionLoader(collectionName),
      datasetInfo: {
        title: collectionName,
        description: "Collection from ATRAI API",
        url: `${import.meta.env.VITE_API_URL}/collections/${collectionName}/items?f=json&limit=100000`,
        configUrl: "",
      },
    };
  }

  return {
    id: collectionName,
    label: config.label,
    icon: config.icon,
    iconColor: config.iconColor,
    category: config.category,
    queryHook: createCollectionLoader(collectionName),
    datasetInfo: {
      title: config.label,
      description: config.description,
      url: `${import.meta.env.VITE_API_URL}/collections/${collectionName}/items?f=json&limit=100000`,
      configUrl: "",
    },
  };
}

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
  /** Category of the dataset (general data or analyzed data) */
  category?: DatasetCategory;
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
  // ATRAI Data Collections
  ...Object.keys(COLLECTION_CONFIGS).reduce((acc, collectionName) => {
    acc[collectionName] = createCollectionDataset(collectionName);
    return acc;
  }, {} as DatasetRegistry),

  osem_bike_campaign_geojson: {
    id: "osem_bike_campaign_geojson",
    label: "OSEM Bike Data (Campaign GeoJSON)",
    icon: BikeIcon,
    iconColor: "#0ea5e9", // Blue color
    category: DatasetCategory.GENERAL_DATA,
    // Use the campaign-aware geojson loader
    queryHook: useLazyGetOsemBikePublicQuery,
    requiresCampaign: true,
    datasetInfo: OSEM_BIKE_DATA,
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

/**
 * Helper function to get datasets filtered by category
 */
export function getDatasetsByCategory(
  category: DatasetCategory,
): DatasetConfig[] {
  return Object.values(ATRAI_DATASETS).filter(
    (dataset) => dataset.category === category
  );
}

/**
 * Helper function to get general data datasets
 */
export function getGeneralDataDatasets(): DatasetConfig[] {
  return getDatasetsByCategory(DatasetCategory.GENERAL_DATA);
}

/**
 * Helper function to get analyzed data datasets
 */
export function getAnalyzedDataDatasets(): DatasetConfig[] {
  return getDatasetsByCategory(DatasetCategory.ANALYZED_DATA);
}
