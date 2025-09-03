# Adding New Collections to ATRAI Kepler

This guide explains how to add new data collections to the ATRAI Kepler application.

## Overview

The ATRAI Kepler app supports two types of collections:

1. **Global collections** - Available for all campaigns (e.g., `road_roughness`)
2. **Campaign-specific collections** - Require a campaign parameter (e.g., `danger_zones_PM_${campaign}`)

## Steps to Add a New Collection

### 1. Create Kepler Configuration File

Create a new JSON configuration file in `src/lib/kepler/` directory:

```json
// Example: config-new-dataset.json
{
  "version": "v1",
  "config": {
    "visState": {
      "filters": [],
      "layers": [
        {
          "id": "new_dataset",
          "type": "point", // or "arc", "line", etc.
          "config": {
            "dataId": "new_dataset",
            "label": "New Dataset",
            "color": [255, 0, 0], // RGB color
            "columns": {
              "lat": "latitude",
              "lng": "longitude"
            },
            "isVisible": true,
            "visConfig": {
              "radius": 8,
              "opacity": 0.8
              // ... other visualization config
            }
          }
        }
      ]
    }
  }
}
```

### 2. Add Dataset Info

Add dataset information to `src/lib/kepler/dataset-info.ts`:

```typescript
export const NEW_DATASET_INFO = {
  title: "New Dataset",
  description: "Description of the new dataset",
  url: "https://api.atrai.bike/collections/new_dataset/items?f=json&limit=1000000",
  configUrl:
    "https://github.com/reedu-reengineering-education/atrai-bike-kepler/tree/main/src/lib/kepler/config-new-dataset.json",
};
```

### 3. Add API Endpoint

Add the endpoint to `src/lib/redux/keplerApi.ts`:

#### For Global Collections:

```typescript
// Import the config
import configNewDataset from "@/lib/kepler/config-new-dataset.json";

// Add endpoint
getNewDataset: builder.query<any, void>({
  async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
    const response = await baseQuery(
      "new_dataset/items?f=json&limit=1000000",
    );
    return loadKeplerDataset({
      response,
      datasetId: "new_dataset",
      label: "New Dataset",
      config: configNewDataset,
    });
  },
}),

// Export hooks
export const {
  // ... existing hooks
  useGetNewDatasetQuery,
  useLazyGetNewDatasetQuery,
} = keplerApi;
```

#### For Campaign-Specific Collections:

```typescript
// Import the config
import configNewDataset from "@/lib/kepler/config-new-dataset.json";

// Add endpoint
getNewDataset: builder.query<any, string>({
  async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
    if (!campaign) {
      return { error: { status: 400, statusText: "Campaign is required" } };
    }

    try {
      const collectionName = \`new_dataset_\${campaign.toLowerCase()}\`;
      const response = await baseQuery(
        \`\${collectionName}/items?f=json&limit=1000000\`,
      );

      return loadKeplerDataset({
        response,
        datasetId: \`new_dataset_\${campaign.toLowerCase()}\`,
        label: \`New Dataset - \${campaign}\`,
        config: configNewDataset,
      });
    } catch (error) {
      return {
        error: {
          status: 404,
          statusText: \`No new dataset data available for campaign: \${campaign}\`,
        },
      };
    }
  },
}),

// Export hooks
export const {
  // ... existing hooks
  useGetNewDatasetQuery,
  useLazyGetNewDatasetQuery,
} = keplerApi;
```

### 4. Add to Dataset Registry

Add the dataset to `src/lib/kepler/dataset-registry.ts`:

```typescript
// Import the hook and info
import { useLazyGetNewDatasetQuery } from "@/lib/redux/keplerApi";
import { NEW_DATASET_INFO } from "./dataset-info";
import { SomeIcon } from "lucide-react"; // Choose appropriate icon

// Add to ATRAI_DATASETS
export const ATRAI_DATASETS: DatasetRegistry = {
  // ... existing datasets
  new_dataset: {
    id: "new_dataset",
    label: "New Dataset",
    imageUrl: SomeImageUrl, // Add appropriate image
    icon: SomeIcon,
    iconColor: "#ff0000", // Choose appropriate color
    queryHook: useLazyGetNewDatasetQuery,
    datasetInfo: NEW_DATASET_INFO,
    requiresCampaign: true, // Set to true for campaign-specific collections
  },
};
```

## Collection Naming Conventions

### Global Collections

- Collection name: `collection_name`
- API endpoint: `https://api.atrai.bike/collections/collection_name/items`

### Campaign-Specific Collections

- Collection name pattern: `collection_name_${campaign}`
- Special case for danger zones: `danger_zones_PM_${campaign}`
- API endpoint: `https://api.atrai.bike/collections/collection_name_${campaign}/items`

## Current Campaign-Specific Collections

The following campaign-specific collections are currently supported:

1. `danger_zones_PM_${campaign}` - Danger zones data
2. `bumpy_roads_${campaign}` - Bumpy roads data
3. `overtaking_distance_${campaign}` - Overtaking distance data
4. `speed_map_${campaign}` - Speed map data
5. `traffic_flow_${campaign}` - Traffic flow data

## Error Handling

Campaign-specific collections use a simple try-catch approach:

- If the collection exists, data is loaded successfully
- If the collection doesn't exist, a 404 error is returned gracefully
- The UI handles missing data by showing appropriate messages

## Testing

After adding a new collection:

1. Ensure the collection exists in the API for at least one campaign
2. Test loading the data through the Add Data modal
3. Verify the visualization appears correctly on the map
4. Test error handling with non-existent campaigns

## File Structure

```
src/
├── lib/
│   ├── kepler/
│   │   ├── config-new-dataset.json     # Kepler visualization config
│   │   ├── dataset-info.ts             # Dataset metadata
│   │   └── dataset-registry.ts         # Dataset registry
│   └── redux/
│       └── keplerApi.ts                # API endpoints
└── assets/
    └── new-dataset-image.png           # Preview image (optional)
```
