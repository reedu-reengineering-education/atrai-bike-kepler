import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configJson from "@/lib/kepler/config.json";
import configDistances from "@/lib/kepler/config-distances.json";
import configDangerZones from "@/lib/kepler/config-danger-zones.json";
import configAirPollution from "@/lib/kepler/config-air-pollution.json";
import configBumpyRoads from "@/lib/kepler/config-bumpy-roads.json";
import configSpeedMap from "@/lib/kepler/config-speed-map.json";
import configTrafficFlow from "@/lib/kepler/config-traffic-flow.json";
import configRoadNetwork from "@/lib/kepler/config-road-network.json";
import { loadKeplerDataset } from "./loadkeplerData";

export const keplerApi = createApi({
  reducerPath: "keplerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.atrai.bike/collections/",
  }),
  endpoints: (builder) => ({
    getRoadRoughness: builder.query<any, void>({
      // @ts-expect-error is not assignable to type
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const response = await baseQuery(
          "road_roughness/items?f=json&limit=1000000",
        );
        return loadKeplerDataset({
          response,
          datasetId: "road_roughness",
          label: "Road Roughness",
          config: configJson,
        });
      },
    }),

    getDistanceFlow: builder.query<any, void>({
      // @ts-expect-error is not assignable to type
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const response = await baseQuery(
          "distances_flowmap/items?f=json&limit=1000000",
        );
        return loadKeplerDataset({
          response,
          datasetId: "distances_flowmap",
          label: "Overtaking Distances",
          config: configDistances,
        });
      },
    }),

    getDangerZones: builder.query<any, string>({
      // @ts-expect-error is not assignable to type
      async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
        if (!campaign) {
          return { error: { status: 400, statusText: "Campaign is required" } };
        }

        const collectionName = `danger_zones_${campaign.toLowerCase()}`;
        const response = await baseQuery(
          `${collectionName}/items?f=json&limit=1000000`,
        );

        // Check if the API request failed
        if (response.error) {
          return {
            error: {
              status: response.error.status || 404,
              statusText: `No danger zones data available for campaign: ${campaign}`,
            },
          };
        }

        return loadKeplerDataset({
          response,
          datasetId: `danger_zones_${campaign.toLowerCase()}`,
          label: `Danger Zones - ${campaign}`,
          config: configDangerZones,
        });
      },
    }),

    getAirPollution: builder.query<any, string>({
      // @ts-expect-error is not assignable to type
      async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
        if (!campaign) {
          return { error: { status: 400, statusText: "Campaign is required" } };
        }

        const collectionName = `danger_zones_PM_${campaign.toLowerCase()}`;
        const response = await baseQuery(
          `${collectionName}/items?f=json&limit=1000000`,
        );

        // Check if the API request failed
        if (response.error) {
          return {
            error: {
              status: response.error.status || 404,
              statusText: `No air pollution data available for campaign: ${campaign}`,
            },
          };
        }

        return loadKeplerDataset({
          response,
          datasetId: `air_pollution_${campaign.toLowerCase()}`,
          label: `Air Pollution (PM) - ${campaign}`,
          config: configAirPollution,
        });
      },
    }),

    getBumpyRoads: builder.query<any, string>({
      // @ts-expect-error is not assignable to type
      async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
        if (!campaign) {
          return { error: { status: 400, statusText: "Campaign is required" } };
        }

        const collectionName = `bumpy_roads_${campaign.toLowerCase()}`;
        const response = await baseQuery(
          `${collectionName}/items?f=json&limit=1000000`,
        );

        // Check if the API request failed
        if (response.error) {
          return {
            error: {
              status: response.error.status || 404,
              statusText: `No bumpy roads data available for campaign: ${campaign}`,
            },
          };
        }

        return loadKeplerDataset({
          response,
          datasetId: `bumpy_roads_${campaign.toLowerCase()}`,
          label: `Bumpy Roads - ${campaign}`,
          config: configBumpyRoads,
        });
      },
    }),

    getOvertakingDistance: builder.query<any, string>({
      // @ts-expect-error is not assignable to type
      async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
        if (!campaign) {
          return { error: { status: 400, statusText: "Campaign is required" } };
        }

        const collectionName = `overtaking_distance_${campaign.toLowerCase()}`;
        const response = await baseQuery(
          `${collectionName}/items?f=json&limit=1000000`,
        );

        // Check if the API request failed
        if (response.error) {
          return {
            error: {
              status: response.error.status || 404,
              statusText: `No overtaking distance data available for campaign: ${campaign}`,
            },
          };
        }

        return loadKeplerDataset({
          response,
          datasetId: `overtaking_distance_${campaign.toLowerCase()}`,
          label: `Overtaking Distance - ${campaign}`,
          config: configDistances,
        });
      },
    }),

    getSpeedMap: builder.query<any, string>({
      // @ts-expect-error is not assignable to type
      async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
        if (!campaign) {
          return { error: { status: 400, statusText: "Campaign is required" } };
        }

        const collectionName = `speed_map_${campaign.toLowerCase()}`;
        const response = await baseQuery(
          `${collectionName}/items?f=json&limit=1000000`,
        );

        // Check if the API request failed
        if (response.error) {
          return {
            error: {
              status: response.error.status || 404,
              statusText: `No speed map data available for campaign: ${campaign}`,
            },
          };
        }

        return loadKeplerDataset({
          response,
          datasetId: `speed_map_${campaign.toLowerCase()}`,
          label: `Speed Map - ${campaign}`,
          config: configSpeedMap,
        });
      },
    }),

    getTrafficFlow: builder.query<any, string>({
      // @ts-expect-error is not assignable to type
      async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
        if (!campaign) {
          return { error: { status: 400, statusText: "Campaign is required" } };
        }

        const collectionName = `traffic_flow_${campaign.toLowerCase()}`;
        console.log(
          `🌐 API: Requesting traffic flow data for collection: ${collectionName}`,
        );

        const response = await baseQuery(
          `${collectionName}/items?f=json&limit=1000000`,
        );

        console.log("🌐 API: Traffic flow response:", {
          hasError: !!response.error,
          errorStatus: response.error?.status,
          errorData: response.error?.data,
          hasData: !!response.data,
        });

        // Check if the API request failed
        if (response.error) {
          const errorResult = {
            error: {
              status: response.error.status || 404,
              statusText: `No traffic flow data available for campaign: ${campaign}`,
            },
          };
          console.log("🌐 API: Returning error result:", errorResult);
          return errorResult;
        }

        return loadKeplerDataset({
          response,
          datasetId: `traffic_flow_${campaign.toLowerCase()}`,
          label: `Traffic Flow - ${campaign}`,
          config: configTrafficFlow,
        });
      },
    }),

    getRoadNetwork: builder.query<any, string>({
      // @ts-expect-error is not assignable to type
      async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
        if (!campaign) {
          return { error: { status: 400, statusText: "Campaign is required" } };
        }

        const collectionName = `road_network_${campaign.toLowerCase()}`;
        console.log(
          `🌐 API: Requesting road network data for collection: ${collectionName}`,
        );

        const response = await baseQuery(
          `${collectionName}/items?f=json&limit=1000000`,
        );

        console.log("🌐 API: Road network response:", {
          hasError: !!response.error,
          errorStatus: response.error?.status,
          errorData: response.error?.data,
          hasData: !!response.data,
        });

        // Check if the API request failed
        if (response.error) {
          const errorResult = {
            error: {
              status: response.error.status || 404,
              statusText: `No road network data available for campaign: ${campaign}`,
            },
          };
          console.log("🌐 API: Returning error result:", errorResult);
          return errorResult;
        }

        return loadKeplerDataset({
          response,
          datasetId: `road_network_${campaign.toLowerCase()}`,
          label: `Road Network - ${campaign}`,
          config: configRoadNetwork,
        });
      },
    }),
  }),
});

export const {
  useGetRoadRoughnessQuery,
  useLazyGetRoadRoughnessQuery,
  useGetDistanceFlowQuery,
  useLazyGetDistanceFlowQuery,
  useGetDangerZonesQuery,
  useLazyGetDangerZonesQuery,
  useGetAirPollutionQuery,
  useLazyGetAirPollutionQuery,
  useGetBumpyRoadsQuery,
  useLazyGetBumpyRoadsQuery,
  useGetOvertakingDistanceQuery,
  useLazyGetOvertakingDistanceQuery,
  useGetSpeedMapQuery,
  useLazyGetSpeedMapQuery,
  useGetTrafficFlowQuery,
  useLazyGetTrafficFlowQuery,
  useLazyGetRoadNetworkQuery,
} = keplerApi;
