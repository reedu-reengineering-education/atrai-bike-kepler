import store from "@/store";
import { addDataToMap } from "@kepler.gl/actions";
import { processGeojson } from "@kepler.gl/processors";
import configJson from "./config-distances.json";

export async function addDistancesFlowmapData() {
  const dataReq = await fetch(
    "https://api.atrai.bike/collections/distances_flowmap/items?f=json&limit=1000000",
  );
  const data = await dataReq.json();
  const geojson = processGeojson(data);

  if (!geojson) {
    console.error("Failed to process GeoJSON data.");
    return;
  }
  store.dispatch(
    addDataToMap({
      datasets: {
        info: {
          label: "Overtaking Distances",
          id: "distances_flowmap",
        },
        data: geojson,
      },
      options: {
        readOnly: false,
        keepExistingConfig: false,
        autoCreateLayers: false,
      },
      // @ts-expect-error not-compatible
      config: configJson,
    }),
  );
}
