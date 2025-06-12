import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DatasetInfo {
  title: string;
  description: string;
  url?: string;
  configUrl?: string;
}

interface ActiveDatasetState {
  info: DatasetInfo | null;
}

const initialState: ActiveDatasetState = {
  info: null,
};

const activeDatasetSlice = createSlice({
  name: "activeDataset",
  initialState,
  reducers: {
    setActiveDataset: (state, action: PayloadAction<DatasetInfo>) => {
      state.info = action.payload;
    },
  },
});

export const { setActiveDataset } = activeDatasetSlice.actions;
export default activeDatasetSlice.reducer;
