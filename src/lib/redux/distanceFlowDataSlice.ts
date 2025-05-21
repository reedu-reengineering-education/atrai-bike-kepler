
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDataToMap } from '@kepler.gl/actions';
import { processGeojson } from '@kepler.gl/processors';
import configJson from '../kepler/config-distances.json';

export const fetchKeplerData = createAsyncThunk(
  'keplerData/fetchKeplerData',
  async (_, { dispatch }) => {
    try {
      const dataReq = await fetch(
        'https://api.atrai.bike/collections/distances_flowmap/items?f=json&limit=1000000'
      );
      
      if (!dataReq.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await dataReq.json();
      const geojson = processGeojson(data);

      if (!geojson) {
        throw new Error('Failed to process GeoJSON data');
      }
      dispatch(
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
        })
      );

      return geojson; 
    } catch (error) {
    }
  }
);

const keplerDataSlice = createSlice({
  name: 'keplerData',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKeplerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKeplerData.fulfilled, (state: any, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchKeplerData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
let distanceFlowData=keplerDataSlice.reducer
export default distanceFlowData;