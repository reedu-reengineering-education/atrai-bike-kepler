---
inclusion: always
---

# ATRAI Collections Development Guide

This steering document provides guidance for working with ATRAI data collections in the Kepler application.

## Collection Architecture

The ATRAI Kepler app supports two types of collections:

### Global Collections

- Available for all campaigns
- Examples: `road_roughness`, `distances_flowmap`
- No campaign parameter required

### Campaign-Specific Collections

- Require a campaign parameter
- Naming pattern: `collection_name_${campaign}`
- Special case: `danger_zones_PM_${campaign}`
- Examples: `bumpy_roads_muenster`, `speed_map_greifswald`

## Current Collections

### Global Collections

- `road_roughness` - Road surface quality data
- `distances_flowmap` - General overtaking distances flowmap

### Campaign-Specific Collections

- `danger_zones_PM_${campaign}` - Identified danger zones
- `bumpy_roads_${campaign}` - Road surface roughness data
- `overtaking_distance_${campaign}` - Campaign-specific overtaking distances
- `speed_map_${campaign}` - Speed distribution data
- `traffic_flow_${campaign}` - Traffic flow patterns

## Implementation Pattern

### API Endpoints (keplerApi.ts)

```typescript
// Campaign-specific endpoint pattern
getCollectionName: builder.query<any, string>({
  async queryFn(campaign, _queryApi, _extraOptions, baseQuery) {
    if (!campaign) {
      return { error: { status: 400, statusText: "Campaign is required" } };
    }

    try {
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
    } catch (error) {
      return {
        error: {
          status: 404,
          statusText: `No collection data available for campaign: ${campaign}`,
        },
      };
    }
  },
}),
```

### Error Handling Philosophy

- Use simple try-catch approach
- Let API handle collection existence validation
- Graceful degradation when collections don't exist
- No complex campaign validation in frontend

### Dataset Registry Pattern

```typescript
collection_name: {
  id: "collection_name",
  label: "Collection Display Name",
  imageUrl: PreviewImageUrl,
  icon: LucideIcon,
  iconColor: "#hexcolor",
  queryHook: useLazyGetCollectionNameQuery,
  datasetInfo: COLLECTION_NAME_INFO,
  requiresCampaign: true, // for campaign-specific collections
},
```

## File Structure Requirements

When adding new collections, ensure these files are created/updated:

1. **Config File**: `src/lib/kepler/config-collection-name.json`
2. **Dataset Info**: Add to `src/lib/kepler/dataset-info.ts`
3. **API Endpoint**: Add to `src/lib/redux/keplerApi.ts`
4. **Registry Entry**: Add to `src/lib/kepler/dataset-registry.ts`

## Campaign State Management

- Campaign selection is managed in Redux (`campaign-slice.ts`)
- RTK Query automatically refetches when campaign changes
- No manual data loading components needed
- Campaign parameter flows through query hooks automatically

## Visualization Configuration

Each collection needs a Kepler.gl configuration file defining:

- Layer type (point, arc, line, etc.)
- Color schemes and styling
- Data column mappings
- Default visibility settings

## Development Guidelines

1. **Keep it simple** - Use try-catch pattern for error handling
2. **Consistent naming** - Follow `collection_name_${campaign}` pattern
3. **Graceful errors** - Handle missing collections without breaking UI
4. **Automatic reactivity** - Let RTK Query handle data refetching
5. **Documentation** - Update this guide when adding new collections

## API Base URL

`https://api.atrai.bike/collections/`

## Query Parameters

All collections use: `?f=json&limit=1000000`
