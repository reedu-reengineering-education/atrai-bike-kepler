export async function getAllStatistics() {
  const query = new URLSearchParams({
    f: "json",
  });
  const url = `${import.meta.env.VITE_API_URL}/collections/statistics_flowmap/items?${query.toString()}`;
  const response: Response = await fetch(url);
  const data: GeoJSON.FeatureCollection = await response.json();

  console.log("data", data);

  // wach features property has a statistics property. this is a json object as a string
  // parse it and assign it to the statistics property
  data.features.forEach((feature) => {
    if (feature.properties && feature.properties.statistics) {
      const stats = feature.properties.statistics;
      if (typeof stats === "string") {
        try {
          feature.properties.statistics = JSON.parse(stats.replace(/'/gi, '"'));
        } catch (e) {
          console.error("Error parsing statistics:", e);
        }
      }
    }
  });
  return data;
}

export async function getStatistics(tag: string) {
  const query = new URLSearchParams({
    tag,
    f: "json",
  });
  const url = `${import.meta.env.VITE_API_URL}/collections/statistics_flowmap/items?${query.toString()}`;
  const response: Response = await fetch(url);
  const data: GeoJSON.FeatureCollection = await response.json();
  const feature = data.features[0];
  if (!feature) {
    throw new Error(`No feature found for tag: ${tag}`);
  }
  // wach features property has a statistics property. this is a json object as a string
  // parse it and assign it to the statistics property
  if (feature.properties && feature.properties.statistics) {
    const stats = feature.properties.statistics;
    if (typeof stats === "string") {
      try {
        feature.properties.statistics = JSON.parse(stats);
      } catch (e) {
        console.error("Error parsing statistics:", e);
      }
    }
  }
  return feature;
}
