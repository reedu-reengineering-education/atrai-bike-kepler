# ATRAI Campaigns API Analysis

## Overview

The ATRAI Kepler app uses a **campaign-based architecture** where different geographic regions (campaigns) have their own collections of bike-related data. Campaigns are central to the app's data model.

---

## Campaigns Endpoints & Data

### 1. Campaign Metadata Endpoint

**Base URL**: `https://api.atrai.bike`

#### Get All Campaigns
```
GET /campaigns
```

**Response**: GeoJSON FeatureCollection with campaign metadata
- Returns list of campaigns with geometry and statistics
- Used in [src/lib/pygeiapi-client/statistics.ts](src/lib/pygeiapi-client/statistics.ts) via `getAllStatistics()`

**Example Response Structure**:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "lauds_26",
      "geometry": { /* GeoJSON geometry */ },
      "properties": {
        "name": "LAUDS",
        "statistics": {
          "latest_stats": {
            "total_distance_m": 12345678
          }
        }
      }
    }
  ]
}
```

#### Get Single Campaign Stats
```
GET /campaigns/{tag}
```

**Usage**: [src/lib/pygeiapi-client/statistics.ts](src/lib/pygeiapi-client/statistics.ts) via `getStatistics(tag)`

---

## Campaign Configuration

### Environment Variable
```env
VITE_CAMPAIGNS=LAUDS,lauds_26,6.065,48.617,6.308,48.757; Heilbronn,heilbronn,9.15,49.12,9.25,49.16
```

**Format**: `Label,value,minLng,minLat,maxLng,maxLat;...`

**Parsed in**: [src/lib/campaigns.ts](src/lib/campaigns.ts)
- Returns `Campaign[]` with label, value, and bbox
- Campaign value becomes lowercase collection suffix (e.g., "LAUDS" → `lauds`)

### Campaigns Currently Configured
1. **LAUDS** (`lauds_26`) - Bounding box: 6.065, 48.617, 6.308, 48.757
2. **Heilbronn** (`heilbronn`) - Bounding box: 9.15, 49.12, 9.25, 49.16

---

## Campaign Collections

The API has two types of collections:

### Global Collections (no campaign parameter needed)
```
GET /collections/{collection_name}/items?f=json&limit=1000000
```

**Available Global Collections**:
- `road_roughness` - Road surface quality data
- `distances_flowmap` - General overtaking distances flowmap
- `osem_bike_data` - OSEM bike sensor data (with boxId parameter)
- `statistics` - Campaign statistics

### Campaign-Specific Collections (requires campaign name)
```
GET /collections/{collection_name}_{campaign}/items?f=json&limit=1000000
```

**Pattern**: `{collection_name}_{campaign_lowercase}`

**Available Campaign-Specific Collections**:

| Collection | Endpoint Pattern | Usage |
|------------|------------------|-------|
| Danger Zones | `danger_zones_{campaign}` | Identified hazard zones |
| Air Pollution (PM) | `danger_zones_PM_{campaign}` | Fine dust pollution zones |
| Bumpy Roads | `bumpy_roads_{campaign}` | Road surface roughness |
| Overtaking Distance | `overtaking_distance_{campaign}` | Safe passing distances |
| Speed Map | `speed_map_{campaign}` | Speed distribution data |
| Traffic Flow | `traffic_flow_{campaign}` | Traffic patterns |
| Road Network | `road_network_{campaign}` | Complete road network |

### Special Endpoint: Campaign Bbox
```
GET /collections/bumpy_roads_{campaign}?f=json
```

**Purpose**: Fetch spatial extent (bounding box) from collection metadata  
**Returns**:
```json
{
  "extent": {
    "spatial": {
      "bbox": [[minLng, minLat, maxLng, maxLat]]
    }
  }
}
```

---

## How Campaigns Are Used Throughout the App

### 1. Redux State Management
**File**: [src/lib/redux/campaign-slice.ts](src/lib/redux/campaign-slice.ts)

```typescript
interface CampaignState {
  activeCampaign: string | null;        // Currently selected campaign
  campaignBbox: BoundingBox | null;     // Bounding box for map viewport
  bboxLoading: boolean;                 // Loading indicator
  bboxError: string | null;             // Error messages
}
```

**Actions**:
- `setActiveCampaign(campaign)` - Select/change campaign
- `setCampaignBbox(bbox)` - Store campaign boundaries
- `setBboxLoading(bool)` - Set loading state
- `setBboxError(error)` - Set error state

**Storage**: Persists to localStorage as `atrai-active-campaign`

### 2. Campaign Selection UI
**File**: [src/components/layout/campaign-switcher.tsx](src/components/layout/campaign-switcher.tsx)

- Dropdown menu in sidebar
- Fetches campaign list from environment via `getCampaigns()`
- Displays campaign name and total distance statistics
- Stores selection in Redux

### 3. RTK Query API Endpoints
**File**: [src/lib/redux/keplerApi.ts](src/lib/redux/keplerApi.ts)

All campaign-specific data queries follow this pattern:

```typescript
getCollectionName: builder.query<any, string>({
  async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
    if (!campaign) {
      return { error: { status: 400, statusText: "Campaign is required" } };
    }

    const collectionName = `collection_name_${campaign.toLowerCase()}`;
    const response = await baseQuery(
      `${collectionName}/items?f=json&limit=1000000`,
    );

    return loadKeplerDataset({
      response,
      datasetId: `collection_name_${campaign.toLowerCase()}`,
      label: `Collection Name - ${campaign}`,
      config: configCollectionName,
    });
  },
}),
```

**Exported Hooks** (all campaign-specific):
- `useGetDangerZonesQuery(campaign)`
- `useGetAirPollutionQuery(campaign)`
- `useGetBumpyRoadsQuery(campaign)`
- `useGetOvertakingDistanceQuery(campaign)`
- `useGetSpeedMapQuery(campaign)`
- `useGetTrafficFlowQuery(campaign)`
- `useGetRoadNetworkQuery(campaign)`
- `useLazyGetCampaignBboxQuery()` - Fetches bbox for active campaign

### 4. Automatic Bbox Fetching Hook
**File**: [src/hooks/useCampaignBbox.ts](src/hooks/useCampaignBbox.ts)

- Automatically triggers when active campaign changes
- Calls `getCampaignBbox` API endpoint
- Stores bbox in Redux for map centering
- Handles loading/error states

### 5. Dataset Registry
**File**: [src/lib/kepler/dataset-registry.ts](src/lib/kepler/dataset-registry.ts)

Maps dataset IDs to their query hooks and configuration:
```typescript
danger_zones: {
  id: "danger_zones",
  label: "Danger Zones",
  queryHook: useLazyGetDangerZonesQuery,
  requiresCampaign: true,
  // ... other config
}
```

### 6. Campaign Selection Modal
**File**: [src/components/modal/campaign-selection-modal.tsx](src/components/modal/campaign-selection-modal.tsx)

- Initial campaign selection on app load
- Uses statistics data from `/campaigns` endpoint
- Displays campaign geometry preview

---

## API Call Flow

### User selects campaign "Münster":

1. **Campaign Selection** (via UI or modal)
   - Redux: `setActiveCampaign("muenster")`
   - localStorage: save "muenster"

2. **Bbox Fetch** (automatic via useCampaignBbox hook)
   ```
   GET /collections/bumpy_roads_muenster?f=json
   ```
   - Extract spatial extent from metadata
   - Redux: `setCampaignBbox(bbox)`
   - Redux: `setActiveCampaign("muenster")` (triggers map centering)

3. **Data Loading** (user clicks "Danger Zones" in Add Data modal)
   ```
   GET /collections/danger_zones_muenster/items?f=json&limit=1000000
   ```
   - Parsed as GeoJSON features
   - Loaded into Kepler visualization

4. **Map Viewport Update**
   - Map auto-centers on campaign bbox with 1.5s animation

---

## Campaign Data Structure

### Campaign Naming Convention
- **Display Name**: Human-readable (e.g., "LAUDS", "Münster")
- **API Value**: Lowercase, used as collection suffix (e.g., "lauds", "muenster")
- **Collection Prefix**: `{collection_type}_{api_value}`

### Example: LAUDS Campaign
```
Display: LAUDS
API Value: lauds
Collections:
  - bumpy_roads_lauds
  - danger_zones_lauds
  - danger_zones_PM_lauds
  - overtaking_distance_lauds
  - speed_map_lauds
  - traffic_flow_lauds
  - road_network_lauds
```

---

## Known Issues & Implementation Notes

### Bbox Retrieval
- Uses `bumpy_roads_${campaign}` collection as the source
- Assumes bumpy roads data exists for all campaigns
- Falls back to error if collection not available

### Campaign-Specific Data Availability
- Not all collections may exist for all campaigns
- API returns 404 if collection doesn't exist for campaign
- UI gracefully handles missing data

### Global Collections
- `road_roughness` available globally (no campaign needed)
- `distances_flowmap` available globally
- OSEM bike data can use boxId parameter instead of campaign

---

## Testing the API

### Get all campaigns:
```bash
curl -s 'https://api.atrai.bike/campaigns' | jq '.features[] | {name: .properties.name, id: .id, distance: .properties.statistics.latest_stats.total_distance_m}'
```

### Get danger zones for a campaign:
```bash
curl -s 'https://api.atrai.bike/collections/danger_zones_lauds/items?f=json&limit=10' | jq '.features[0]'
```

### Get collection metadata (for bbox):
```bash
curl -s 'https://api.atrai.bike/collections/bumpy_roads_lauds?f=json' | jq '.extent.spatial.bbox'
```

---

## Adding New Campaigns

1. **Update .env**:
   ```env
   VITE_CAMPAIGNS=...;NewCity,newcity,lon1,lat1,lon2,lat2
   ```

2. **Ensure API collections exist** for the campaign:
   ```
   /collections/bumpy_roads_newcity
   /collections/danger_zones_newcity
   etc.
   ```

3. **No code changes required** - app automatically picks up new campaigns from environment

---

## Summary

The ATRAI API uses a **campaign-centric data model** where:

- **Campaigns** are geographic regions configured in environment variables
- **Each campaign** has its own set of data collections (danger zones, bumpy roads, etc.)
- **API endpoints** follow the pattern: `/collections/{collection_name}_{campaign}/items`
- **Redux** manages active campaign and bbox for efficient data fetching and map viewport management
- **Automatic bbox fetching** enables smooth UX when switching campaigns
- **All campaign names** are normalized to lowercase for API URLs

The system is designed for easy addition of new geographic campaigns without code changes - just update the environment configuration and ensure API collections exist.
