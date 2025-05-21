import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { processGeojson } from '@kepler.gl/processors';
import { addDataToMap } from '@kepler.gl/actions';
import configJson from '@/lib/kepler/config.json';
import configDistances from '@/lib/kepler/config-distances.json';
import store from '@/lib/redux/store';


export const keplerApi = createApi({
  reducerPath: 'keplerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.atrai.bike/collections/',
  }),
  endpoints: (builder) => ({
    getRoadRoughness: builder.query<any, void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const response = await baseQuery('road_roughness/items?f=json&limit=1000000');

        if (response.error) return { error: response.error };

        const geojson = processGeojson(response.data);
        if (!geojson) {
          return { error: { status: 500, statusText: 'GeoJSON processing failed' } };
        }

        store.dispatch(
          addDataToMap({
            datasets: {
              info: { label: 'Road Roughness', id: 'road_roughness' },
              data: geojson,
            },
            options: {
              readOnly: false,
              keepExistingConfig: false,
              autoCreateLayers: false,
            },
            // @ts-expect-error
            config: configJson,
          })
        );

        return { data: geojson };
      },
    }),

    getDistanceFlow: builder.query<any, void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const response = await baseQuery('distances_flowmap/items?f=json&limit=1000000');

        if (response.error) return { error: response.error };

        const geojson = processGeojson(response.data);
        if (!geojson) {
          return { error: { status: 500, statusText: 'GeoJSON processing failed' } };
        }

        store.dispatch(
          addDataToMap({
            datasets: {
              info: { label: 'Overtaking Distances', id: 'distances_flowmap' },
              data: geojson,
            },
            options: {
              readOnly: false,
              keepExistingConfig: false,
              autoCreateLayers: false,
            },
            // @ts-expect-error
            config: configDistances,
          })
        );

        return { data: geojson };
      },
    }),
  }),
});

export const {
  useGetRoadRoughnessQuery,
  useLazyGetRoadRoughnessQuery,
  useGetDistanceFlowQuery,
  useLazyGetDistanceFlowQuery,
} = keplerApi;
