import store from "@/lib/redux/store";
import { addDataToMap } from "@kepler.gl/actions";
import { processGeojson } from "@kepler.gl/processors";
import configJson from "./config.json";

export async function addRoadRoughnessData() {
  const dataReq = await fetch(
    "https://api.atrai.bike/collections/road_roughness/items?f=json&limit=1000000",
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
          label: "Road Roughness",
          id: "road_roughness",
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
      info: {
        label: "Road Roughness",
        description: "Road roughness data from senseBox",
      },
    }),
  );
}
