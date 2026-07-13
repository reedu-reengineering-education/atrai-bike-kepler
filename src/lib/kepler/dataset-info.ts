export const OSEM_BIKE_DATA = {
  title: "openSenseMap Bike Data (Experimental)",
  description: "All openSenseMap data as Vector Tiles. Limited functionality",
  url: `${import.meta.env.VITE_API_URL}/collections/osem_bike_data/items?f=json&limit=1000000`,
  configUrl:
    "https://github.com/reedu-reengineering-education/atrai-bike-kepler/tree/main/src/lib/kepler/config-osem.json",
};

export const DISTANCES_FLOWMAP_INFO = {
  title: "Overtaking Distances",
  description: "Overtaking distances flowmap data",
  url: `${import.meta.env.VITE_API_URL}/collections/distances_flowmap/items?f=json&limit=1000000`,
  configUrl:
    "https://github.com/reedu-reengineering-education/atrai-bike-kepler/tree/main/src/lib/kepler/config-distances.json",
};

export const ROAD_ROUGHNESS_INFO = {
  title: "Road Roughness Data",
  description: "Data showing road roughness in the city",
  url: `${import.meta.env.VITE_API_URL}/collections/road_roughness/items?f=json&limit=1000000`,
  configUrl:
    "https://github.com/reedu-reengineering-education/atrai-bike-kepler/tree/main/src/lib/kepler/config.json",
};

// Removed: danger zones, overtaking map, bumpy roads, speed map, traffic flow, air pollution, road network dataset info

export const OSEM_BIKE_DATA_INFO = {
  title: "OSEM Bike Data",
  description:
    "Environmental sensor data from OSEM bike sensors (requires box ID)",
  url: `${import.meta.env.VITE_API_URL}/collections/osem_bike_data/items?f=json&boxId=*`,
  configUrl:
    "https://github.com/reedu-reengineering-education/atrai-bike-kepler/tree/main/src/lib/kepler/config-osem-bike-data.json",
};
