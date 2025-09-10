import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CampaignState {
  activeCampaign: string | null;
}

const initialState: CampaignState = {
  activeCampaign: null,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setActiveCampaign: (state, action: PayloadAction<string | null>) => {
      state.activeCampaign = action.payload;
      console.log("🏛️ Campaign changed to:", action.payload);
    },
  },
});

export const { setActiveCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;
