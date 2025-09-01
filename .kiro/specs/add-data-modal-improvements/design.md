# Design Document

## Overview

This design enhances the ATRAI Data Panel component within the "Add Data" modal to show which datasets are already loaded and prevent map clearing when adding new data. The solution involves accessing the kepler.gl Redux state to determine loaded datasets and modifying the data loading configuration to preserve existing data.

## Architecture

The enhancement follows the existing architecture patterns:

1. **State Management**: Utilize Redux to access kepler.gl's internal dataset state
2. **Component Enhancement**: Extend the existing `ATRAIDataPanel` component with dataset status detection
3. **Data Loading**: Modify the `loadKeplerDataset` function to preserve existing datasets
4. **UI Indicators**: Add visual indicators to show dataset loading status

## Components and Interfaces

### Enhanced ATRAIDataPanel Component

**New Props:**

```typescript
interface ATRAIDataPanelProps {
  datasets: DatasetConfig[];
  onClose?: () => void;
  onDataLoad?: (datasetInfo: any) => void;
  // New: Access to kepler.gl state for dataset detection
  loadedDatasets?: string[]; // Array of loaded dataset IDs
}
```

**New State Management:**

```typescript
interface DatasetStatus {
  isLoaded: boolean;
  isLoading: boolean;
  error?: string;
}

// Enhanced state to track dataset status
const [datasetStatuses, setDatasetStatuses] = useState<
  Record<string, DatasetStatus>
>({});
```

### Dataset Status Detection

**Redux Selector:**

```typescript
// New selector to get loaded dataset IDs from kepler.gl state
const selectLoadedDatasetIds = (state: RootState): string[] => {
  const keplerState = state.keplerGl.map;
  return Object.keys(keplerState?.datasets || {});
};
```

**Hook Integration:**

```typescript
// Use selector in ATRAIDataPanel component
const loadedDatasetIds = useSelector(selectLoadedDatasetIds);
```

### Enhanced DatasetItem Component

**New Visual States:**

- **Loaded State**: Green checkmark icon with "Loaded" text
- **Loading State**: Spinner with "Loading..." text (existing)
- **Error State**: Red error icon with "Failed" text (existing)
- **Available State**: Default state for unloaded datasets

**Updated Props:**

```typescript
interface DatasetItemProps {
  dataset: DatasetConfig;
  isLoading: boolean;
  isLoaded: boolean; // New prop
  error?: string;
  onClick: () => void;
  onRetry?: () => void;
}
```

## Data Models

### Dataset Status Model

```typescript
interface DatasetStatus {
  id: string;
  isLoaded: boolean;
  isLoading: boolean;
  error?: string;
  lastLoadedAt?: Date;
}
```

### Enhanced DatasetConfig

The existing `DatasetConfig` interface remains unchanged, but we'll add runtime status tracking:

```typescript
// Runtime status tracking (not persisted)
interface DatasetRuntimeStatus extends DatasetConfig {
  status: DatasetStatus;
}
```

## Error Handling

### Dataset Status Detection Errors

1. **Redux State Access Errors**: Gracefully handle cases where kepler.gl state is not available
2. **Dataset ID Mismatch**: Handle cases where dataset IDs don't match between registry and kepler.gl state
3. **State Update Errors**: Ensure UI remains functional even if status updates fail

### Data Loading Preservation Errors

1. **Configuration Conflicts**: Handle cases where new dataset configs conflict with existing ones
2. **Memory Constraints**: Monitor for potential memory issues when loading multiple large datasets
3. **Layer Management**: Ensure layer creation doesn't interfere with existing layers

## Testing Strategy

### Unit Tests

1. **Dataset Status Detection**:

   - Test selector returns correct loaded dataset IDs
   - Test component correctly identifies loaded vs unloaded datasets
   - Test status updates when datasets are loaded/unloaded

2. **Visual Indicators**:

   - Test correct icons and text are displayed for each state
   - Test accessibility attributes are properly set
   - Test hover states and interactions

3. **Data Loading Preservation**:
   - Test `keepExistingConfig: true` preserves existing datasets
   - Test new datasets are added without clearing existing ones
   - Test error scenarios don't affect existing datasets

### Integration Tests

1. **Modal Workflow**:

   - Test opening modal shows correct dataset statuses
   - Test loading new dataset updates status indicators
   - Test modal remains functional with multiple datasets loaded

2. **Redux Integration**:
   - Test selector correctly reads from kepler.gl state
   - Test component updates when Redux state changes
   - Test data loading updates both kepler.gl and local state

### User Acceptance Tests

1. **Visual Feedback**:

   - User can clearly see which datasets are already loaded
   - User understands the meaning of different status indicators
   - User can distinguish between loaded, loading, and available states

2. **Data Preservation**:
   - User can load multiple datasets without losing existing data
   - User can reload a dataset without affecting others
   - User sees expected behavior when loading fails

## Implementation Notes

### keepExistingConfig Option

The key change to prevent map clearing is in the `loadKeplerDataset` function:

```typescript
// Current implementation clears existing data
options: {
  readOnly: false,
  keepExistingConfig: false, // This clears existing data
  autoCreateLayers: false,
}

// Enhanced implementation preserves existing data
options: {
  readOnly: false,
  keepExistingConfig: true, // This preserves existing data
  autoCreateLayers: false,
}
```

### Real-time Status Updates

The component will use Redux subscriptions to update dataset status in real-time:

```typescript
// Subscribe to kepler.gl state changes
useEffect(() => {
  const unsubscribe = store.subscribe(() => {
    const currentLoadedIds = selectLoadedDatasetIds(store.getState());
    updateDatasetStatuses(currentLoadedIds);
  });

  return unsubscribe;
}, []);
```

### Performance Considerations

1. **Memoization**: Use `useMemo` for expensive dataset status calculations
2. **Selective Updates**: Only update status for datasets that have actually changed
3. **Debouncing**: Debounce rapid state changes to prevent excessive re-renders
