import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setActiveDataset } from "@/lib/redux/active-dataset-slice";
import { useLazyGetOsemBikeDataQuery } from "@/lib/redux/keplerApi";
import { OSEM_BIKE_DATA_INFO } from "@/lib/kepler/dataset-info";
import { getErrorMessage } from "@/lib/kepler/data-loader";
import {
  Loader2,
  AlertCircle,
  Database,
  CheckCircle,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Props interface for the OSEM Data Panel component
 */
interface OSEMDataPanelProps {
  /** Optional callback when modal should close */
  onClose?: () => void;
  /** Optional callback when data is successfully loaded */
  onDataLoad?: (datasetInfo: any) => void;
}

/**
 * OSEM Data Panel component for loading OSEM bike sensor data
 *
 * This component provides a form interface for users to enter a box ID
 * and load corresponding OSEM bike sensor data from the API.
 */
export function OSEMDataPanel({ onClose, onDataLoad }: OSEMDataPanelProps) {
  const dispatch = useDispatch();

  // State for the box ID input
  const [boxId, setBoxId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastLoadedBoxId, setLastLoadedBoxId] = useState<string | null>(null);

  // RTK Query hook for OSEM bike data
  const [triggerOsemQuery] = useLazyGetOsemBikeDataQuery();

  /**
   * Handle form submission to load OSEM bike data
   */
  const handleLoadData = useCallback(async () => {
    if (!boxId.trim()) {
      setError("Please enter a valid box ID");
      return;
    }

    const trimmedBoxId = boxId.trim();
    setIsLoading(true);
    setError(null);

    try {
      console.log("🚀 Loading OSEM bike data for box ID:", trimmedBoxId);

      // Execute the query
      const result = await triggerOsemQuery(trimmedBoxId).unwrap();

      // Check if the result indicates an error
      if (!result || result.error) {
        const errorMessage =
          result?.error?.statusText ||
          result?.error?.message ||
          "Failed to load OSEM bike data";
        throw new Error(errorMessage);
      }

      // Update Redux state with the dataset info
      const datasetInfo = {
        ...OSEM_BIKE_DATA_INFO,
        title: `OSEM Bike Data - ${trimmedBoxId}`,
        url: `https://api.atrai.bike/collections/osem_bike_data/items?f=json&boxId=${trimmedBoxId}`,
      };

      dispatch(setActiveDataset(datasetInfo));
      setLastLoadedBoxId(trimmedBoxId);

      // Show success toast
      toast.success("OSEM bike data loaded successfully", {
        description: `Data for box ID ${trimmedBoxId} has been added to the map`,
        duration: 3000,
      });

      // Call optional callbacks
      onDataLoad?.(datasetInfo);
      onClose?.();

      console.log(
        "✅ Successfully loaded OSEM bike data for box ID:",
        trimmedBoxId,
      );
    } catch (err) {
      console.error("🚨 Failed to load OSEM bike data:", err);

      let errorMessage: string;
      if (err instanceof Error) {
        if (err.message.includes("404") || err.message.includes("not found")) {
          errorMessage = `No OSEM bike data found for box ID: ${trimmedBoxId}`;
          toast.error("Box ID not found", {
            description: `No data available for box ID ${trimmedBoxId}`,
            duration: 4000,
          });
        } else if (err.message.includes("timeout")) {
          errorMessage = "Request timed out. Please try again.";
        } else if (
          err.message.includes("network") ||
          err.message.includes("fetch")
        ) {
          errorMessage = "Network error. Please check your connection.";
        } else {
          errorMessage = getErrorMessage(err);
        }
      } else {
        errorMessage = "Unknown error occurred";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [boxId, triggerOsemQuery, dispatch, onDataLoad, onClose]);

  /**
   * Handle Enter key press in the input field
   */
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !isLoading) {
        handleLoadData();
      }
    },
    [handleLoadData, isLoading],
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>OSEM Bike Data</CardTitle>
              <CardDescription>
                Load environmental sensor data by entering a box ID
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Form */}
          <div className="space-y-2">
            <Label htmlFor="boxId">Box ID</Label>
            <Input
              id="boxId"
              type="text"
              value={boxId}
              onChange={(e) => setBoxId(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="e.g., 668fe613e3b7f1000877e41a"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Enter the unique identifier for the OSEM bike sensor box
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <Card className="border-destructive bg-destructive/5">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <span className="text-sm text-destructive">{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Success Display */}
          {lastLoadedBoxId && !error && !isLoading && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-700">
                    Successfully loaded data for box ID: {lastLoadedBoxId}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Load Button */}
          <Button
            onClick={handleLoadData}
            disabled={isLoading || !boxId.trim()}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading Data...
              </>
            ) : (
              <>
                <Database className="w-4 h-4 mr-2" />
                Load OSEM Data
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
