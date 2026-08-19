import { processGeojson } from "@reedu-kepler.gl/processors";
import {
  addDataToMap,
  replaceDataInMap,
  updateVisData,
  updateMap,
} from "@reedu-kepler.gl/actions";
import store from "@/lib/redux/store";
import { bboxToViewport } from "@/lib/utils/bbox-utils";

export async function loadMvtDataset({
  dataset,
  config,
}: {
  dataset: any;
  config: any;
}) {
  store.dispatch(
    updateVisData(
      dataset,
      {
        keepExistingConfig: true,
        // autoCreateLayers: true,
      },
      config,
    ),
  );
}

// store.dispatch(addLayer(config));
// Utility function to update config with dynamic dataId and label
function updateConfigWithDynamicValues(
  config: any,
  datasetId: string,
  label: string,
) {
  if (!config?.config?.visState?.layers) return config;

  const updatedConfig = JSON.parse(JSON.stringify(config)); // Deep clone

  // Update layers
  updatedConfig.config.visState.layers.forEach((layer: any) => {
    if (layer.config) {
      // Update dataId and label in layer config
      layer.config.dataId = datasetId;
      layer.config.label = label;
    }
  });

  // Update tooltip fieldsToShow keys
  if (updatedConfig.config.visState.interactionConfig?.tooltip?.fieldsToShow) {
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

// Utility function to apply campaign bbox to map viewport if available
function applyBboxViewportIfAvailable() {
  const state = store.getState();
  const campaignState = state.campaign;

  if (campaignState.campaignBbox && campaignState.activeCampaign) {
    console.log(
      `🗺️ Applying bbox viewport for campaign: ${campaignState.activeCampaign}`,
    );

    try {
      const viewport = bboxToViewport(campaignState.campaignBbox, 0.15);

      // Dispatch viewport update with a slight delay to ensure data is loaded
      setTimeout(() => {
        store.dispatch(
          updateMap({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            zoom: viewport.zoom,
            pitch: 0,
            bearing: 0,
            transitionDuration: 1500,
          }),
        );
      }, 500); // 500ms delay to ensure data rendering is complete

      console.log(`🗺️ Applied bbox viewport:`, {
        center: [viewport.longitude, viewport.latitude],
        zoom: viewport.zoom,
      });
    } catch (error) {
      console.error(`🗺️ Failed to apply bbox viewport:`, error);
    }
  }
}

export async function loadKeplerDataset({
  response,
  datasetId,
  label,
  config,
}: {
  response: any;
  datasetId: string;
  label: string;
  config: any;
}) {
  if (response.error) return { error: response.error };

  const geojson = processGeojson(response.data);
  if (!geojson) {
    return { error: { status: 500, statusText: "GeoJSON processing failed" } };
  }

  // Update config with dynamic dataId and label values
  const updatedConfig = updateConfigWithDynamicValues(config, datasetId, label);

  // Check if dataset already exists and handle replacement properly
  const currentState = store.getState();
  const keplerState = (currentState.keplerGl as any)?.map;

  const isReloading = keplerState?.visState?.datasets?.[datasetId];

  if (isReloading) {
    console.log(`🔄 Reloading existing dataset ${datasetId}`);
    try {
      store.dispatch(
        replaceDataInMap({
          datasetToReplaceId: datasetId,
          datasetToUse: {
            info: { label, id: datasetId },
            data: geojson,
          },
          options: {
            centerMap: false, // We'll handle centering with bbox
            keepExistingConfig: true,
            autoCreateLayers: true,
          },
        }),
      );
      console.log(`✅ Successfully replaced existing dataset ${datasetId}`);

      // Apply bbox viewport if available for campaign data
      applyBboxViewportIfAvailable();
    } catch (removeError) {
      console.warn(
        `Error replacing dataset ${datasetId}:`,
        removeError,
      );
      // Continue with loading even if replacement fails
    }
  } else {
    console.log(`Loading new dataset ${datasetId}`);
  }

  if (!isReloading) {
    try {
      console.log(`📊 Loading new dataset ${datasetId} with styling config`);
      
      // Add data with config that includes layer styling
      // Set keepExistingConfig to false to apply the new config styling
      store.dispatch(
        addDataToMap({
          datasets: {
            info: { label, id: datasetId },
            data: geojson,
          },
          options: {
            readOnly: false,
            // Use the provided config instead of keeping existing one
            keepExistingConfig: false,
            // Use layers defined in config instead of auto-creating with defaults
            autoCreateLayers: false,
          },
          config: updatedConfig,
        }),
      );

      console.log(
        `✅ Successfully loaded dataset ${datasetId} with ${geojson.rows?.length || 0} rows`,
      );
      console.log(`🎨 Layers configured:`, updatedConfig.config.visState.layers.map((l: any) => ({
        id: l.id,
        type: l.type,
        label: l.config?.label,
        isVisible: l.config?.isVisible,
      })));

      // Apply bbox viewport if available for campaign data
      applyBboxViewportIfAvailable();

      return { data: geojson };
    } catch (error) {
      console.error(`Error loading dataset ${datasetId}:`, error);
      return {
        error: {
          status: 500,
          statusText: `Failed to load dataset: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      };
    }
  }
}
