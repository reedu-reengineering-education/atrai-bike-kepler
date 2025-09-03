import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configJson from "@/lib/kepler/config.json";
import configDistances from "@/lib/kepler/config-distances.json";
import configStandingMvt from "@/lib/kepler/config-standing-mvt.json";
import datasetStandingMvt from "@/lib/kepler/dataset-standing-mvt.json";
import { loadKeplerDataset, loadMvtDataset } from "./loadkeplerData";

export const keplerApi = createApi({
  reducerPath: "keplerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.atrai.bike/collections/",
  }),
  endpoints: (builder) => ({
    getOsemBikeData: builder.query<any, void>({
      async queryFn() {
        await loadMvtDataset({
          dataset: datasetStandingMvt,
          config: configStandingMvt,
        });

        return { data: [] };
      },
    }),

    getRoadRoughness: builder.query<any, void>({
      // @ts-expect-error is not assignable to type
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const response = await baseQuery(
          "road_roughness/items?f=json&limit=1000000",
        );
        loadKeplerDataset({
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
  }),
});

export const {
  useGetOsemBikeDataQuery,
  useLazyGetOsemBikeDataQuery,
  useGetRoadRoughnessQuery,
  useLazyGetRoadRoughnessQuery,
  useGetDistanceFlowQuery,
  useLazyGetDistanceFlowQuery,
} = keplerApi;
