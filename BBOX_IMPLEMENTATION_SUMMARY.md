# Campaign Bbox Implementation Summary

## What Was Implemented

I've implemented a system that automatically fetches the bounding box (bbox) from the `bumpy_roads_` collection when a campaign is selected, and applies it to the map viewport when campaign data is loaded. This has been integrated with the new campaign selection system from main.

## Key Components

### 1. Redux State Management

- **Enhanced Campaign Slice** (`src/lib/redux/campaign-slice.ts`)
  - Added `campaignBbox`, `bboxLoading`, and `bboxError` to state
  - Actions: `setBboxLoading`, `setCampaignBbox`, `setBboxError`

### 2. API Integration

- **New Endpoint** (`src/lib/redux/keplerApi.ts`)
  - `getCampaignBbox` endpoint fetches collection metadata from `bumpy_roads_${campaign}`
  - Extracts spatial extent and returns standardized bbox format
  - Includes `useLazyGetCampaignBboxQuery` hook

### 3. React Hook

- **useCampaignBbox Hook** (`src/hooks/useCampaignBbox.ts`)
  - Automatically triggers when `activeCampaign` changes
  - Fetches bbox from API and stores in Redux state
  - Handles loading states and errors

### 4. Data Loading Integration

- **Modified loadkeplerData.ts** (`src/lib/redux/loadkeplerData.ts`)
  - Added `applyBboxViewportIfAvailable()` function
  - Automatically applies bbox viewport after data loading
  - 500ms delay ensures data rendering is complete
  - 1.5 second smooth transition

### 5. UI Integration

- **App Sidebar** (`src/components/layout/app-sidebar.tsx`)
  - Added `useCampaignBbox()` hook to trigger bbox fetching
  - Ensures bbox is fetched when campaign is selected

## How It Should Work

1. **Initial Load**: User opens website, campaign selection modal appears
2. **Campaign Selection**: User selects "Münster" campaign in modal or sidebar
3. **Bbox Fetch**: `useCampaignBbox` hook automatically triggers API call to:
   ```
   https://api.atrai.bike/collections/bumpy_roads_muenster?f=json
   ```
4. **Bbox Storage**: Bbox extracted from collection metadata and stored in Redux
5. **Data Loading**: User clicks "Danger Zones" in Add Data modal
6. **Dataset Load**: Danger zones data loads from:
   ```
   https://api.atrai.bike/collections/danger_zones_muenster/items?f=json&limit=1000000
   ```
7. **Auto Viewport**: Map automatically centers on campaign area using stored bbox
8. **Smooth Transition**: 1.5 second animation to new viewport

## Expected Network Calls

When you select "Münster" campaign, you should see:

1. `https://api.atrai.bike/collections/bumpy_roads_muenster?f=json` (bbox fetch)

When you then load danger zones: 2. `https://api.atrai.bike/collections/danger_zones_muenster/items?f=json&limit=1000000` (data) 3. Map should automatically center on Münster area

## Debugging

If the bbox call isn't happening:

1. Check browser console for `useCampaignBbox` logs
2. Verify campaign name matches expected format (lowercase)
3. Check Redux DevTools for campaign state changes
4. Look for bbox API call in Network tab

## Files Modified

- `src/lib/redux/campaign-slice.ts` - Added bbox state + merged with localStorage functionality
- `src/lib/redux/keplerApi.ts` - Added bbox endpoint
- `src/hooks/useCampaignBbox.ts` - Created bbox hook
- `src/lib/redux/loadkeplerData.ts` - Added auto viewport
- `src/components/layout/app-sidebar.tsx` - Added bbox hook
- `src/components/modal/campaign-selection-modal.tsx` - Added bbox hook
- `src/lib/utils/bbox-utils.ts` - Utility functions

## Integration with Main Branch

Successfully merged with latest main branch changes:

- ✅ Resolved merge conflicts in campaign-slice.ts
- ✅ Integrated with new campaign selection modal
- ✅ Combined bbox functionality with localStorage persistence
- ✅ Added bbox hooks to both sidebar and modal components
- ✅ Maintained compatibility with improved campaign system

## Next Steps

Test the implementation:

1. Open website (campaign selection modal should appear)
2. Select Münster campaign (should trigger bbox API call)
3. Click "Add Data" → "ATRAI Data" → "Danger Zones"
4. Map should automatically center on Münster area

The system is now ready and fully integrated with the latest main branch!
