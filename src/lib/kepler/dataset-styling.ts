/**
 * Dataset styling configuration mapping
 * Maps dataset IDs to their kepler.gl configuration files
 */

// Import all config files
import configBumpyRoads from './config-bumpy-roads.json';
import configDangerZones from './config-danger-zones.json';
import configDistances from './config-distances.json';
import configOsemBikeData from './config-osem-bike-data.json';
import configRoadNetwork from './config-road-network.json';
import configSpeedMap from './config-speed-map.json';
import configTrafficFlow from './config-traffic-flow.json';
import configAirPollution from './config-air-pollution.json';

/**
 * Mapping of dataset ID patterns to their styling configs
 * Uses partial matching (e.g., "bumpy_roads" matches "bumpy_roads_heilbronn")
 */
const DATASET_STYLING_MAP: Record<string, any> = {
  'bumpy_roads': configBumpyRoads,
  'danger_zones': configDangerZones,
  'overtaking_distance': configDistances,
  'osem_bike_data': configOsemBikeData,
  'road_network': configRoadNetwork,
  'speed_map': configSpeedMap,
  'traffic_flow': configTrafficFlow,
  'air_pollution': configAirPollution,
};

/**
 * Generate default styling for a dataset based on geometry type
 * Fallback when no pre-configured style exists
 */
function generateDefaultLayerConfig(
  datasetId: string,
  label: string,
  geometryType?: string
) {
  const baseConfig: any = {
    id: `layer_${datasetId}`,
    type: geometryType === 'Point' ? 'point' : geometryType === 'LineString' ? 'line' : 'geojson',
    config: {
      dataId: datasetId,
      label: label,
      columnMode: 'geojson',
      isVisible: true,
      visConfig: {
        opacity: 0.8,
        strokeOpacity: 0.8,
        thickness: 1,
        colorRange: {
          name: 'Viridis',
          type: 'sequential',
          category: 'Uber',
          colors: ['#440154', '#31688e', '#35b779', '#fde724'],
        },
      },
    },
  };

  if (geometryType === 'Point') {
    baseConfig.config.visConfig.radius = 8;
    baseConfig.config.visConfig.sizeRange = [5, 10];
  }

  return baseConfig;
}

/**
 * Get styling configuration for a dataset
 * Returns the kepler.gl config with updated dataId and label
 */
export function getDatasetStyling(
  datasetId: string,
  label: string,
  geojson?: any
): any {
  // Find matching style config by partial ID match
  let matchedConfig = null;
  for (const [pattern, config] of Object.entries(DATASET_STYLING_MAP)) {
    if (datasetId.includes(pattern)) {
      matchedConfig = config;
      break;
    }
  }

  if (!matchedConfig) {
    // Detect geometry type from GeoJSON if available
    let geometryType: string | undefined;
    if (geojson?.features && geojson.features.length > 0) {
      geometryType = geojson.features[0].geometry?.type;
    }

    // Generate default config
    return {
      config: {
        version: 'v1',
        config: {
          visState: {
            filters: [],
            layers: [generateDefaultLayerConfig(datasetId, label, geometryType)],
            interactionConfig: {
              tooltip: {
                fieldsToShow: {
                  [datasetId]: [],
                },
                enabled: true,
              },
              brush: {
                enabled: false,
              },
            },
          },
          mapState: {
            bearing: 0,
            dragRotate: false,
            latitude: 0,
            longitude: 0,
            pitch: 0,
            zoom: 1,
            isSplit: false,
          },
          mapStyle: {
            styleType: 'light',
            topLayerGroups: [],
            visibleLayerGroups: [
              'label',
              'road',
              'border',
              'building',
              'water',
              'base',
            ],
            threeDBuildingColor: [
              9.677307006835251,
              17.18305478057247,
              31.1442258468418,
            ],
            mapStyles: {},
          },
        },
      },
    };
  }

  // Deep clone the matched config to avoid mutations
  const updatedConfig = JSON.parse(JSON.stringify(matchedConfig));

  // Update all layers with the new datasetId and label
  if (updatedConfig.config?.visState?.layers) {
    updatedConfig.config.visState.layers.forEach((layer: any) => {
      if (layer.config) {
        layer.config.dataId = datasetId;
        layer.config.label = label;
      }
    });
  }

  // Update tooltip fieldsToShow if it exists
  if (updatedConfig.config?.visState?.interactionConfig?.tooltip?.fieldsToShow) {
    const fieldsToShow =
      updatedConfig.config.visState.interactionConfig.tooltip.fieldsToShow;
    const oldKeys = Object.keys(fieldsToShow);

    oldKeys.forEach((oldKey) => {
      if (oldKey !== datasetId) {
        fieldsToShow[datasetId] = fieldsToShow[oldKey];
        delete fieldsToShow[oldKey];
      }
    });
  }

  return updatedConfig;
}
