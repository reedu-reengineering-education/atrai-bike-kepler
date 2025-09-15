import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CampaignState {
  activeCampaign: string | null;
}

// Load campaign from localStorage
const loadCampaignFromStorage = (): string | null => {
  try {
    const stored = localStorage.getItem("atrai-active-campaign");
    return stored;
  } catch (error) {
    console.warn("Failed to load campaign from localStorage:", error);
    return null;
  }
};

// Save campaign to localStorage
const saveCampaignToStorage = (campaign: string | null): void => {
  try {
    if (campaign) {
      localStorage.setItem("atrai-active-campaign", campaign);
    } else {
      localStorage.removeItem("atrai-active-campaign");
    }
  } catch (error) {
    console.warn("Failed to save campaign to localStorage:", error);
  }
};

const initialState: CampaignState = {
  activeCampaign: loadCampaignFromStorage(),
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setActiveCampaign: (state, action: PayloadAction<string | null>) => {
      state.activeCampaign = action.payload;
      saveCampaignToStorage(action.payload);
      console.log("🏛️ Campaign changed to:", action.payload);
    },
  },
});

export const { setActiveCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;
