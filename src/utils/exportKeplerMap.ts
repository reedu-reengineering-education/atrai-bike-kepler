import store from "@/lib/redux/store"; // adjust if your store export is default/named
import { KeplerGlSchema } from "@kepler.gl/schemas";

export function exportKeplerDatasetAndConfig() {
  const state = store.getState() as { keplerGl: any };
  console.log("state", state);
  const datasets = state.keplerGl.map.visState.datasets;

  const datasetId1 = Object.keys(datasets)[0];
  if (!datasetId1) {
    throw new Error("No dataset found in keplerGl store");
  }
  // const datasetId2 = Object.keys(datasets)[1];
  // const dataset2 = datasets[datasetId2];
  // const features2 = dataset2?.dataContainer?._rows?.map((row: any[]) => row[0]);

  const dataset1 = datasets[datasetId1];

  const features = dataset1?.dataContainer?._rows?.map((row: any[]) => row[0]);

  const geojson = {
    type: "FeatureCollection",
    features: features ?? [],
  };
  // console.log("dataset2", datasetId2, dataset2, features2);
  // console.log("------------------------------------------");
  // console.log("dataset1", datasetId1, dataset1, features);

  const config = KeplerGlSchema.getConfigToSave(state.keplerGl.map);

  return {
    datasetId1,
    geojson,
    config,
  };
}
