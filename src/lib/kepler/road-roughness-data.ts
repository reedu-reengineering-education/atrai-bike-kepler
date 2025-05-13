import store from "@/store";
import { addDataToMap } from "@kepler.gl/actions";
import { processGeojson } from "@kepler.gl/processors";
import configJson from "./config.json";

export async function addRoadRoughnessData() {
  const dataReq = await fetch(
    "https://www.stadt-muenster.de/ows/mapserv706/odgruenserv?REQUEST=GetFeature&SERVICE=WFS&VERSION=2.0.0&TYPENAME=ms:Baeume&OUTPUTFORMAT=GEOJSON&EXCEPTIONS=XML&MAXFEATURES=100000&SRSNAME=EPSG:4326",
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
      config: configJson
    }),
  );
}
