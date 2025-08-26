import { useState, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DatasetConfig } from "@/lib/kepler/dataset-registry";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDataset } from "@/lib/redux/active-dataset-slice";
import { getErrorMessage } from "@/lib/kepler/data-loader";
import {
  selectLoadedDatasetIds,
  selectDatasetStatusError,
} from "@/lib/redux/selectors";
import {
  Loader2,
  AlertCircle,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

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
 * Interface for tracking dataset status
 */
interface DatasetStatus {
  isLoaded: boolean;
  isLoading: boolean;
  error?: string;
  statusDetectionError?: boolean;
}

/**
 * Props interface for individual dataset list items
 */
interface DatasetItemProps {
  /** Dataset configuration */
  dataset: DatasetConfig;
  /** Whether the dataset is currently loading */
  isLoading: boolean;
  /** Whether the dataset is currently loaded in the map */
  isLoaded: boolean;
  /** Error message if loading failed */
  error?: string;
  /** Whether there's an error with status detection */
  statusDetectionError?: boolean;
  /** Click handler for the dataset item */
  onClick: () => void;
  /** Retry handler for failed loads */
  onRetry?: () => void;
}

/**
 * Dataset list item component with status indicators
 */
function DatasetItem({
  dataset,
  isLoading,
  isLoaded,
  error,
  statusDetectionError,
  onClick,
  onRetry,
}: DatasetItemProps) {
  const { t } = useTranslation();
  const hasError = !!error;
  const hasStatusError = !!statusDetectionError;
  const isInteractive = !isLoading;

  // Determine the visual state and styling
  const getItemStyling = () => {
    if (hasError) {
      return "border-red-200 bg-red-50";
    }
    if (hasStatusError) {
      return "border-yellow-200 bg-yellow-50";
    }
    if (isLoaded) {
      return "border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer";
    }
    if (isLoading) {
      return "opacity-50 border-gray-200";
    }
    return "hover:bg-gray-50 cursor-pointer border-gray-200";
  };

  return (
    <div
      className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-200 ${getItemStyling()}`}
      onClick={isInteractive ? onClick : undefined}
      role="button"
      tabIndex={isInteractive ? 0 : -1}
      aria-label={`${dataset.label} dataset ${isLoaded ? `(${t("atraiData.clickToReload")})` : isLoading ? `(${t("atraiData.loadingStatus")})` : hasError ? `(${t("atraiData.failedStatus")})` : hasStatusError ? `(${t("atraiData.statusUnknownStatus")})` : `(${t("atraiData.clickToLoad")})`}`}
    >
      <div className="flex items-center gap-3">
        {/* Custom dataset icon */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isLoaded
              ? "bg-green-100"
              : hasError
                ? "bg-red-100"
                : hasStatusError
                  ? "bg-yellow-100"
                  : "bg-blue-100"
          }`}
        >
          {(() => {
            const IconComponent = dataset.icon;
            return (
              <IconComponent
                className={`w-4 h-4 ${
                  isLoaded
                    ? "text-green-600"
                    : hasError
                      ? "text-red-600"
                      : hasStatusError
                        ? "text-yellow-600"
                        : "text-blue-600"
                }`}
                style={{
                  color:
                    !isLoaded && !hasError && !hasStatusError
                      ? dataset.iconColor
                      : undefined,
                }}
              />
            );
          })()}
        </div>

        <div>
          <h3 className="font-medium text-gray-900">{dataset.label}</h3>
          <p className="text-sm text-gray-500">
            {dataset.datasetInfo.description}
          </p>
          {isLoaded && !isLoading && !hasError && (
            <p className="text-xs text-green-600 mt-1">
              {t("atraiData.currentlyLoaded")}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLoading && (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">{t("atraiData.loading")}</span>
          </div>
        )}

        {isLoaded && !isLoading && !hasError && !hasStatusError && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">{t("atraiData.loaded")}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="px-2 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded transition-colors"
              title={t("atraiData.reloadDataset")}
              aria-label={`${t("atraiData.reload")} ${dataset.label}`}
            >
              {t("atraiData.reload")}
            </button>
          </div>
        )}

        {hasStatusError && !hasError && !isLoading && (
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">{t("atraiData.statusUnknown")}</span>
          </div>
        )}

        {hasError && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{t("atraiData.failed")}</span>
            </div>
            {onRetry && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRetry();
                }}
                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                title={t("atraiData.retryLoading")}
                aria-label={`${t("atraiData.retryLoading")} ${dataset.label}`}
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
 * - Real-time dataset status detection from kepler.gl state
 * - Visual indicators for loaded, loading, and error states
 * - Reusable dataset card components
 * - Error handling for failed data loads
 */
export function ATRAIDataPanel({
  datasets,
  onClose,
  onDataLoad,
}: ATRAIDataPanelProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Redux selectors to get loaded dataset IDs and error status from kepler.gl state
  const loadedDatasetIds = useSelector(selectLoadedDatasetIds);
  const statusError = useSelector(selectDatasetStatusError);

  // Enhanced state management for loading and errors
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );
  const [errorStates, setErrorStates] = useState<Record<string, string>>({});
  const [activeRequests, setActiveRequests] = useState<Set<string>>(new Set());

  // State management for tracking dataset statuses
  const [datasetStatuses, setDatasetStatuses] = useState<
    Record<string, DatasetStatus>
  >({});

  // State for tracking status detection errors
  const [statusDetectionFailed, setStatusDetectionFailed] =
    useState<boolean>(false);

  // Initialize all the lazy query hooks for each dataset
  const queryHooks = datasets.reduce(
    (hooks, dataset) => {
      const [trigger] = dataset.queryHook();
      hooks[dataset.id] = trigger;
      return hooks;
    },
    {} as Record<string, any>,
  );

  // Memoized function to determine if a dataset is loaded with error handling
  const isDatasetLoaded = useCallback(
    (datasetId: string): boolean => {
      try {
        // If status detection has failed, we can't reliably determine loaded state
        if (statusError.hasError) {
          console.warn(
            `Cannot determine loaded status for dataset ${datasetId}: ${statusError.errorMessage}`,
          );
          return false; // Conservative fallback - assume not loaded
        }

        if (!Array.isArray(loadedDatasetIds)) {
          console.error("loadedDatasetIds is not an array:", loadedDatasetIds);
          return false;
        }

        return loadedDatasetIds.includes(datasetId);
      } catch (error) {
        console.error(
          `Error checking if dataset ${datasetId} is loaded:`,
          error,
        );
        return false; // Conservative fallback
      }
    },
    [loadedDatasetIds, statusError],
  );

  // Update dataset statuses when loaded dataset IDs change
  useEffect(() => {
    try {
      const newStatuses: Record<string, DatasetStatus> = {};

      // Update status detection failure state
      setStatusDetectionFailed(statusError.hasError);

      // Log status detection errors for debugging
      if (statusError.hasError) {
        console.error("Dataset status detection failed:", {
          errorType: statusError.errorType,
          errorMessage: statusError.errorMessage,
          fallbackBehavior: statusError.fallbackBehavior,
        });
      }

      datasets.forEach((dataset) => {
        try {
          const isLoaded = isDatasetLoaded(dataset.id);
          const isLoading = loadingStates[dataset.id] || false;
          const error = errorStates[dataset.id];

          // Debug logging for dataset status
          if (isLoaded) {
            console.log(`Dataset ${dataset.label} (${dataset.id}) is loaded`);
          }

          newStatuses[dataset.id] = {
            isLoaded,
            isLoading,
            error,
            statusDetectionError: statusError.hasError,
          };
        } catch (datasetError) {
          console.error(
            `Error processing status for dataset ${dataset.id}:`,
            datasetError,
          );
          // Provide fallback status to keep UI functional
          newStatuses[dataset.id] = {
            isLoaded: false,
            isLoading: loadingStates[dataset.id] || false,
            error: errorStates[dataset.id],
            statusDetectionError: true,
          };
        }
      });

      setDatasetStatuses(newStatuses);
    } catch (error) {
      console.error("Critical error updating dataset statuses:", error);
      // Ensure UI remains functional with minimal status information
      const fallbackStatuses: Record<string, DatasetStatus> = {};
      datasets.forEach((dataset) => {
        fallbackStatuses[dataset.id] = {
          isLoaded: false,
          isLoading: loadingStates[dataset.id] || false,
          error: errorStates[dataset.id],
          statusDetectionError: true,
        };
      });
      setDatasetStatuses(fallbackStatuses);
      setStatusDetectionFailed(true);
    }
  }, [
    datasets,
    loadedDatasetIds,
    loadingStates,
    errorStates,
    isDatasetLoaded,
    statusError,
  ]);

  // Memoized dataset statuses for performance
  const memoizedDatasetStatuses = useMemo(
    () => datasetStatuses,
    [datasetStatuses],
  );

  /**
   * Generic data loading handler that works with any dataset configuration
   * Includes comprehensive error handling and loading state management
   */
  const handleDatasetLoad = useCallback(
    async (dataset: DatasetConfig) => {
      const datasetId = dataset.id;

      // Validate dataset configuration
      if (!dataset || !datasetId) {
        console.error("Invalid dataset configuration provided:", dataset);
        setErrorStates((prev) => ({
          ...prev,
          [datasetId || "unknown"]: "Invalid dataset configuration",
        }));
        return;
      }

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

        // Get the trigger function for this dataset with validation
        const triggerQuery = queryHooks[datasetId];

        if (!triggerQuery || typeof triggerQuery !== "function") {
          throw new Error(
            `Query trigger not found or invalid for dataset ${dataset.label}`,
          );
        }

        // Execute the query and wait for the result with timeout handling
        let result;
        try {
          result = await Promise.race([
            triggerQuery().unwrap(),
            new Promise((_, reject) =>
              setTimeout(
                () => reject(new Error("Dataset loading timeout")),
                30000,
              ),
            ),
          ]);
        } catch (queryError) {
          // Enhanced error handling for query execution
          console.error(
            `Query execution failed for ${dataset.label}:`,
            queryError,
          );
          throw queryError;
        }

        // Check if the result indicates an error
        if (!result || result.error) {
          const errorMessage =
            result?.error?.statusText ||
            result?.error?.message ||
            "Failed to load dataset - no data received";
          throw new Error(errorMessage);
        }

        // Validate result structure
        if (typeof result !== "object") {
          throw new Error("Invalid response format received from server");
        }

        // Update Redux state with the dataset info
        try {
          dispatch(setActiveDataset(dataset.datasetInfo));
        } catch (dispatchError) {
          console.error("Error updating Redux state:", dispatchError);
          throw new Error("Failed to update application state");
        }

        // Call optional callbacks with error handling
        try {
          onDataLoad?.(dataset.datasetInfo);
          onClose?.();
        } catch (callbackError) {
          console.error("Error in callback functions:", callbackError);
          // Don't throw here as the data loading was successful
        }

        console.log(`Successfully loaded dataset: ${dataset.label}`);
      } catch (err) {
        console.error(`Failed to load ${dataset.label} data:`, {
          error: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : undefined,
          datasetId,
          datasetLabel: dataset.label,
        });

        // Set user-friendly error message with enhanced error categorization
        let errorMessage: string;
        if (err instanceof Error) {
          if (err.message.includes("timeout")) {
            errorMessage = t("atraiData.loadingTimeout");
          } else if (
            err.message.includes("network") ||
            err.message.includes("fetch")
          ) {
            errorMessage = t("atraiData.networkError");
          } else if (err.message.includes("Query trigger")) {
            errorMessage = t("atraiData.configError");
          } else {
            errorMessage = getErrorMessage(err);
          }
        } else {
          errorMessage = "Unknown error occurred";
        }

        setErrorStates((prev) => ({
          ...prev,
          [datasetId]: errorMessage,
        }));
      } finally {
        // Clear loading state and remove from active requests with error handling
        try {
          setLoadingStates((prev) => ({ ...prev, [datasetId]: false }));
          setActiveRequests((prev) => {
            const newSet = new Set(prev);
            newSet.delete(datasetId);
            return newSet;
          });
        } catch (cleanupError) {
          console.error("Error during cleanup:", cleanupError);
          // Force cleanup even if there's an error
          setLoadingStates({});
          setActiveRequests(new Set());
        }
      }
    },
    [activeRequests, queryHooks, dispatch, onDataLoad, onClose, t],
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
      {/* Show status detection error warning if needed */}
      {statusDetectionFailed && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {t("atraiData.statusDetectionIssue")}
            </span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            {t("atraiData.statusDetectionMessage")}
          </p>
        </div>
      )}

      {datasets.map((dataset) => {
        const status = memoizedDatasetStatuses[dataset.id] || {
          isLoaded: false,
          isLoading: false,
          error: undefined,
          statusDetectionError: statusDetectionFailed,
        };

        return (
          <DatasetItem
            key={dataset.id}
            dataset={dataset}
            isLoading={status.isLoading}
            isLoaded={status.isLoaded}
            error={status.error}
            statusDetectionError={status.statusDetectionError}
            onClick={() => handleDatasetLoad(dataset)}
            onRetry={() => handleRetry(dataset)}
          />
        );
      })}
    </div>
  );
}
