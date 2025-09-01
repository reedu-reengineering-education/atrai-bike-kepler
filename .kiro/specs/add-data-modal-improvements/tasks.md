# Implementation Plan

- [x] 1. Create Redux selector for loaded dataset detection

  - Create a new selector function in Redux utilities to extract loaded dataset IDs from kepler.gl state
  - Add proper TypeScript types for the selector return value
  - _Requirements: 1.1, 1.4_

- [x] 2. Modify data loading to preserve existing datasets

  - Update the `loadKeplerDataset` function in `src/lib/redux/loadkeplerData.ts` to set `keepExistingConfig: true`
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 3. Enhance ATRAIDataPanel component with dataset status detection

  - Add Redux selector hook to detect loaded datasets in `ATRAIDataPanel` component
  - Create state management for tracking dataset loading status
  - Implement logic to determine if each dataset is currently loaded
  - Add real-time updates when dataset state changes
  - _Requirements: 1.1, 1.4_

- [x] 4. Update DatasetItem component with visual status indicators

  - Add new props to `DatasetItem` component for loaded state
  - Implement visual indicators (icons and text) for loaded datasets
  - Add appropriate styling for different dataset states (loaded, loading, available, error)
  - Ensure accessibility attributes are properly set for status indicators
  - _Requirements: 1.2, 1.3_

- [x] 5. Add comprehensive error handling for dataset status detection
  - Handle cases where kepler.gl state is not available or malformed
  - Add fallback behavior when dataset status cannot be determined
  - Ensure UI remains functional even if status detection fails
  - Add error logging for debugging dataset status issues
  - _Requirements: 2.4_
