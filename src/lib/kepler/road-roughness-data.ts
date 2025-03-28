import store from "@/store";

import { addDataToMap } from "@kepler.gl/actions";
import { processGeojson } from "@kepler.gl/processors";

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
        // centerMap: false,
        readOnly: false,
        keepExistingConfig: false,
        autoCreateLayers: false,
      },
      config: {
        visState: {
          layers: [
            {
              id: "aqw8risi",
              type: "geojson",
              config: {
                dataId: "road_roughness",
                columnMode: "geojson",
                label: "Road Roughness",
                // color: [18, 147, 154],
                // highlightColor: [252, 242, 26, 255],
                columns: { geojson: "_geojson" },
                // isVisible: true,
                visConfig: {
                  opacity: 0.8,
                  //   strokeOpacity: 0.8,
                  //   thickness: 0.5,
                  //   strokeColor: null,
                  colorRange: {
                    name: "Test",
                    type: "sequential",
                    category: "custom",
                    colors: [
                      "#4C0035",
                      "#880030",
                      "#B72F15",
                      "#D6610A",
                      "#EF9100",
                      "#FFC300",
                    ],
                  },
                  //   strokeColorRange: {
                  //     name: "Global Warming",
                  //     type: "sequential",
                  //     category: "Uber",
                  //     colors: [
                  //       "#4C0035",
                  //       "#880030",
                  //       "#B72F15",
                  //       "#D6610A",
                  //       "#EF9100",
                  //       "#FFC300",
                  //     ],
                  //   },
                  radius: 10,
                  sizeRange: [0, 10],
                  radiusRange: [0, 50],
                  heightRange: [0, 500],
                  elevationScale: 5,
                  stroked: false,
                  filled: true,
                  //   enable3d: false,
                  //   wireframe: false,
                  //   fixedHeight: false,
                },
                // hidden: false,
              },
              visualChannels: {
                colorField: { name: "Roughness_Normalized", type: "real" },
                colorScale: "quantize",
                // strokeColorField: null,
                // strokeColorScale: "quantile",
                // sizeField: null,
                // sizeScale: "linear",
                // heightField: null,
                // heightScale: "linear",
                // radiusField: null,
                // radiusScale: "linear",
              },
            },
          ],
        },
      },
    }),
  );
}
