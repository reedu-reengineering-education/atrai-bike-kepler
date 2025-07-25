import { processGeojson } from "@kepler.gl/processors";
import { addDataToMap } from "@kepler.gl/actions";
import store from "@/lib/redux/store";

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

  store.dispatch(
    addDataToMap({
      datasets: {
        info: { label, id: datasetId },
        data: geojson,
      },
      options: {
        readOnly: false,
        keepExistingConfig: false,
        autoCreateLayers: false,
      },

      config,
    }),
  );

  return { data: geojson };
}
