# Requirements Document

## Introduction

This feature enhancement improves the "Add Data" modal in the ATRAI bike mapping application by adding two key improvements: showing which datasets are already loaded in the map and preventing the map from being cleared when adding new data. These changes will provide better user experience by giving users visibility into their current data state and allowing them to build up multiple datasets on the same map.

## Requirements

### Requirement 1

**User Story:** As a user, I want to see which datasets are already loaded in the map when I open the "Add Data" modal, so that I can make informed decisions about what additional data to load.

#### Acceptance Criteria

1. WHEN the user opens the "Add Data" modal THEN the system SHALL display visual indicators next to datasets that are already loaded in the map
2. WHEN a dataset is already loaded THEN the system SHALL show a clear "Already loaded" or similar status indicator
3. WHEN a dataset is already loaded THEN the system SHALL still allow the user to reload it if desired
4. WHEN the modal displays dataset status THEN the system SHALL update the status in real-time if datasets are loaded/unloaded while the modal is open

### Requirement 2

**User Story:** As a user, I want to add new datasets to my existing map without clearing the current data, so that I can build up a comprehensive view with multiple data layers.

#### Acceptance Criteria

1. WHEN the user loads a new dataset from the "Add Data" modal THEN the system SHALL preserve all existing datasets on the map
2. WHEN multiple datasets are loaded THEN the system SHALL maintain all existing layers and configurations
3. WHEN a dataset is reloaded THEN the system SHALL replace only that specific dataset while preserving others
4. WHEN loading fails THEN the system SHALL not affect any existing datasets on the map
