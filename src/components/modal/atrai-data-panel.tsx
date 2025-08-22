import { useState, useCallback } from "react";
import { DatasetConfig } from "@/lib/kepler/dataset-registry";
import { useDispatch } from "react-redux";
import { setActiveDataset } from "@/lib/redux/active-dataset-slice";
import { getErrorMessage } from "@/lib/kepler/data-loader";
import { Loader2, AlertCircle, RotateCcw } from "lucide-react";

/**
 * Props interface for the ATRAI Data Panel component
 */
interface ATRAIDataPanelProps {
  /** Array of dataset configurations to display */
  datasets: DatasetConfig[];
  /** Optional callback when modal should close */
  onClose?: () => void;
  /** Optional callback when data is successfully loaded */
  onDataLoad?: (datasetInfo: any) => void;
}

/**
 * Props interface for individual dataset list items
 */
interface DatasetItemProps {
  /** Dataset configuration */
  dataset: DatasetConfig;
  /** Whether the dataset is currently loading */
  isLoading: boolean;
  /** Error message if loading failed */
  error?: string;
  /** Click handler for the dataset item */
  onClick: () => void;
  /** Retry handler for failed loads */
  onRetry?: () => void;
}

/**
 * Simple dataset list item component
 */
function DatasetItem({
  dataset,
  isLoading,
  error,
  onClick,
  onRetry,
}: DatasetItemProps) {
  const hasError = !!error;
  const isInteractive = !isLoading && !hasError;

  return (
    <div
      className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-200 ${
        isInteractive
          ? "hover:bg-gray-50 cursor-pointer border-gray-200"
          : hasError
            ? "border-red-200 bg-red-50"
            : "opacity-50 border-gray-200"
      }`}
      onClick={isInteractive ? onClick : undefined}
    >
      <div className="flex items-center gap-3">
        {/* Dataset icon placeholder - you can add specific icons here */}
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">{dataset.label}</h3>
          <p className="text-sm text-gray-500">
            {dataset.datasetInfo.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLoading && (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        )}

        {hasError && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Failed</span>
            </div>
            {onRetry && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRetry();
                }}
                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                title="Retry loading"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Generic ATRAI Data Panel component that accepts datasets array as props
 *
 * Features:
 * - Dynamic grid layout that adapts to number of datasets
 * - Generic loading state management using dataset IDs as keys
 * - Reusable dataset card components
 * - Error handling for failed data loads
 */
export function ATRAIDataPanel({
  datasets,
  onClose,
  onDataLoad,
}: ATRAIDataPanelProps) {
  const dispatch = useDispatch();

  // Enhanced state management for loading and errors
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );
  const [errorStates, setErrorStates] = useState<Record<string, string>>({});
  const [activeRequests, setActiveRequests] = useState<Set<string>>(new Set());

  // Initialize all the lazy query hooks for each dataset
  const queryHooks = datasets.reduce(
    (hooks, dataset) => {
      const [trigger] = dataset.queryHook();
      hooks[dataset.id] = trigger;
      return hooks;
    },
    {} as Record<string, any>,
  );

  /**
   * Generic data loading handler that works with any dataset configuration
   * Includes comprehensive error handling and loading state management
   */
  const handleDatasetLoad = useCallback(
    async (dataset: DatasetConfig) => {
      const datasetId = dataset.id;

      // Prevent multiple concurrent requests for the same dataset
      if (activeRequests.has(datasetId)) {
        console.warn(`Request for ${dataset.label} is already in progress`);
        return;
      }

      try {
        // Clear any previous error for this dataset
        setErrorStates((prev) => {
          const newState = { ...prev };
          delete newState[datasetId];
          return newState;
        });

        // Set loading state and track active request
        setLoadingStates((prev) => ({ ...prev, [datasetId]: true }));
        setActiveRequests((prev) => new Set(prev).add(datasetId));

        // Get the trigger function for this dataset
        const triggerQuery = queryHooks[datasetId];

        if (!triggerQuery) {
          throw new Error("Query trigger not found for dataset");
        }

        // Execute the query and wait for the result
        const result = await triggerQuery().unwrap();

        // Check if the result indicates an error
        if (!result || result.error) {
          const errorMessage =
            result?.error?.statusText ||
            result?.error?.message ||
            "Failed to load dataset";
          throw new Error(errorMessage);
        }

        // Update Redux state with the dataset info
        dispatch(setActiveDataset(dataset.datasetInfo));

        // Call optional callbacks
        onDataLoad?.(dataset.datasetInfo);
        onClose?.();
      } catch (err) {
        console.error(`Failed to load ${dataset.label} data:`, err);

        // Set user-friendly error message
        const errorMessage = getErrorMessage(err);

        setErrorStates((prev) => ({
          ...prev,
          [datasetId]: errorMessage,
        }));
      } finally {
        // Clear loading state and remove from active requests
        setLoadingStates((prev) => ({ ...prev, [datasetId]: false }));
        setActiveRequests((prev) => {
          const newSet = new Set(prev);
          newSet.delete(datasetId);
          return newSet;
        });
      }
    },
    [dispatch, onDataLoad, onClose, activeRequests, queryHooks],
  );

  /**
   * Retry handler for failed data loads
   */
  const handleRetry = useCallback(
    (dataset: DatasetConfig) => {
      handleDatasetLoad(dataset);
    },
    [handleDatasetLoad],
  );

  return (
    <div className="space-y-2">
      {datasets.map((dataset) => (
        <DatasetItem
          key={dataset.id}
          dataset={dataset}
          isLoading={loadingStates[dataset.id] || false}
          error={errorStates[dataset.id]}
          onClick={() => handleDatasetLoad(dataset)}
          onRetry={() => handleRetry(dataset)}
        />
      ))}
    </div>
  );
}
