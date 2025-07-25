// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { SidePanelFactory } from "@kepler.gl/components";
import { Card } from "@/components/ui/card";
import RoadRoughnessImageUrl from "@/assets/road-roughness.png";
import DistancesImageUrl from "@/assets/distances.png";
import {
  useLazyGetDistanceFlowQuery,
  useLazyGetRoadRoughnessQuery,
} from "@/lib/redux/keplerApi";
import { useState } from "react";
import { BikeIcon, SaveIcon } from "lucide-react";
import { saveMapToSupabase } from "@/utils/saveMapeSupabase";
import { UserAuth } from "@/context/AuthContext";
import { useRefresh } from "@/context/RefreshContext";

function CustomSidePanelFactory(...args) {
  const CustomSidePanel = SidePanelFactory(...args);

  const CustomSidePanelWrapper = (props) => {
    const { triggerRefresh } = useRefresh();
    const [triggerDistanceFlowQuery] = useLazyGetDistanceFlowQuery();
    const [triggerRoughnessQuery] = useLazyGetRoadRoughnessQuery();

    const [isLoadingRoughness, setIsLoadingRoughness] = useState(false);
    const [isLoadingDistance, setIsLoadingDistance] = useState(false);

    const auth = UserAuth();
    const session = auth?.session;

    const handleAddDistancesFlowmap = async () => {
      try {
        setIsLoadingDistance(true);
        await triggerDistanceFlowQuery();
      } catch (err) {
        console.error("Failed to load distance flow data:", err);
      } finally {
        setIsLoadingDistance(false);
      }
    };

    const handleRoadRoughnessClick = async () => {
      try {
        setIsLoadingRoughness(true);
        await triggerRoughnessQuery();
      } catch (err) {
        console.error("Failed to load road roughness data:", err);
      } finally {
        setIsLoadingRoughness(false);
      }
    };
    const handleSaveMap = async () => {
      if (!session?.user) {
        alert("You should log in first.");
        return;
      }

      try {
        await saveMapToSupabase(session);
        triggerRefresh();
      } catch (err) {
        console.error("Failed to save map:", err);
        alert("Failed to save map. Please try again.");
      }
    };

    return (
      <>
        <CustomSidePanel
          {...props}
          panels={[
            {
              id: "bike",
              label: "senseBox:bike",
              iconComponent: BikeIcon,
              component: () => (
                <div className="grid grid-cols-2 gap-4 relative">
                  {/* Road Roughness Card */}
                  <Card
                    className={`relative p-0 overflow-clip hover:shadow-lg cursor-pointer transition-opacity ${
                      isLoadingRoughness ? "opacity-50" : ""
                    }`}
                    onClick={
                      !isLoadingRoughness ? handleRoadRoughnessClick : undefined
                    }
                  >
                    {isLoadingRoughness && (
                      <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-70">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                    <div className="relative w-full h-full">
                      <img src={RoadRoughnessImageUrl} alt="Road Roughness" />
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-0.5 bg-card">
                        <span className="text-gray-700 text-xs font-medium">
                          Road Roughness
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Distances Card */}
                  <Card
                    className={`relative p-0 overflow-clip hover:shadow-lg cursor-pointer transition-opacity ${
                      isLoadingDistance ? "opacity-50" : ""
                    }`}
                    onClick={
                      !isLoadingDistance ? handleAddDistancesFlowmap : undefined
                    }
                  >
                    {isLoadingDistance && (
                      <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-70">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                    <div className="relative w-full h-full">
                      <img src={DistancesImageUrl} alt="Overtaking Distances" />
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-0.5 bg-card">
                        <span className="text-gray-700 text-xs font-medium">
                          Overtaking Distances
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              ),
            },

            {
              id: "save",
              label: "Save",
              iconComponent: SaveIcon,
              component: () => (
                <div className="p-4">
                  <button
                    className="w-full py-3 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    onClick={handleSaveMap}
                  >
                    <SaveIcon className="w-5 h-5" />
                    <span>Save Current Map</span>
                  </button>
                </div>
              ),
            },
            ...CustomSidePanel.defaultPanels,
          ]}
        />
      </>
    );
  };

  return CustomSidePanelWrapper;
}
CustomSidePanelFactory.deps = SidePanelFactory.deps;

export default CustomSidePanelFactory;
