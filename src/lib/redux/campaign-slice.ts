import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoundingBox {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

interface CampaignState {
  activeCampaign: string | null;
  campaignBbox: BoundingBox | null;
  bboxLoading: boolean;
  bboxError: string | null;
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
  campaignBbox: null,
  bboxLoading: false,
  bboxError: null,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setActiveCampaign: (state, action: PayloadAction<string | null>) => {
      state.activeCampaign = action.payload;
      saveCampaignToStorage(action.payload);
      // Reset bbox when campaign changes
      state.campaignBbox = null;
      state.bboxError = null;
      console.log("🏛️ Campaign changed to:", action.payload);
    },
    setBboxLoading: (state, action: PayloadAction<boolean>) => {
      state.bboxLoading = action.payload;
    },
    setCampaignBbox: (state, action: PayloadAction<BoundingBox | null>) => {
      state.campaignBbox = action.payload;
      state.bboxLoading = false;
      state.bboxError = null;
    },
    setBboxError: (state, action: PayloadAction<string | null>) => {
      state.bboxError = action.payload;
      state.bboxLoading = false;
    },
  },
});

export const {
  setActiveCampaign,
  setBboxLoading,
  setCampaignBbox,
  setBboxError,
} = campaignSlice.actions;
export default campaignSlice.reducer;
