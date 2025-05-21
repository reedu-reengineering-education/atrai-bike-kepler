import {createSlice} from "@reduxjs/toolkit";


let initialState = {
    activeCampaign: null,
};

const campaignSlice = createSlice({
    name: "campaign",
    initialState,
    reducers: {
        setActiveCampaign: (state, action) => {
            state.activeCampaign = action.payload;
        },
    },
});

export const { setActiveCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;