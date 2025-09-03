import { processGeojson } from "@reedu-kepler.gl/processors";
import {
  addDataToMap,
  replaceDataInMap,
  updateVisData,
} from "@reedu-kepler.gl/actions";
import store from "@/lib/redux/store";

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
        // keepExistingConfig: true,
        // autoCreateLayers: true,
      },
      config,
    ),
  );

  // store.dispatch(addLayer(config));
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

  // Check if dataset already exists and handle replacement properly
  const currentState = store.getState();
  const keplerState = (currentState.keplerGl as any)?.map;

  const isReloading = keplerState?.visState?.datasets?.[datasetId];

  if (isReloading) {
    console.log(`Reloading existing dataset ${datasetId}`);
    // Remove the existing dataset first to prevent conflicts
    try {
      store.dispatch(
        replaceDataInMap({
          datasetToReplaceId: datasetId,
          datasetToUse: {
            info: { label, id: datasetId },
            data: geojson,
          },
          options: {
            centerMap: true,
            keepExistingConfig: true,
            autoCreateLayers: true,
          },
        }),
      );
      console.log(`Successfully removed existing dataset ${datasetId}`);
    } catch (removeError) {
      console.warn(
        `Error removing existing dataset ${datasetId}:`,
        removeError,
      );
      // Continue with loading even if removal fails
    }
  } else {
    console.log(`Loading new dataset ${datasetId}`);
  }

  if (!isReloading) {
    try {
      store.dispatch(
        addDataToMap({
          datasets: {
            info: { label, id: datasetId },
            data: geojson,
          },
          options: {
            readOnly: false,
            keepExistingConfig: true,
            autoCreateLayers: true,
          },
          config: config,
        }),
      );

      console.log(
        `Successfully loaded dataset ${datasetId} with ${geojson.rows?.length || 0} rows`,
      );
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
