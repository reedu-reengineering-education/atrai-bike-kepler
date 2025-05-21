// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Icons, SidePanelFactory } from "@kepler.gl/components";
import { Card } from "@/components/ui/card";
import RoadRoughnessImageUrl from "@/assets/road-roughness.png";
import DistancesImageUrl from "@/assets/distances.png";
import { useDispatch, useSelector } from 'react-redux';
// import { fetchKeplerData } from "@/lib/redux/distanceFlowDataSlice";
import { useEffect } from 'react';
// import { useLazyGetRoadRoughnessQuery } from '@/lib/redux/roadRoughnessDataSlice';
import { useLazyGetDistanceFlowQuery, useLazyGetRoadRoughnessQuery } from "@/lib/redux/keplerApi";

function CustomSidePanelFactory(...args) {
  const CustomSidePanel = SidePanelFactory(...args);

  const CustomSidePanelWrapper = (props) => {
  //       const dispatch = useDispatch();
  //   const { loading, error } = useSelector((state) => state.distanceFlowData);

  
  //   const handleAddDistancesFlowmap = async () => {
  //     try {
  //       await dispatch(fetchKeplerData());
  //     } catch (err) {
  //       console.error('Failed to load distances data:', err);
  //     }
  //   };
  //   const [triggerRoughnessQuery, result] = useLazyGetRoadRoughnessQuery(); 
  // const { isLoading, error: roadError } = result;
  //  const handleRoadRoughnessClick = () => {
  //   triggerRoughnessQuery(); //
  // };
    const [triggerDistanceFlowQuery, distanceResult] = useLazyGetDistanceFlowQuery();
    const [triggerRoughnessQuery, roughnessResult] = useLazyGetRoadRoughnessQuery();

    const handleAddDistancesFlowmap = async () => {
      try {
        await triggerDistanceFlowQuery();
      } catch (err) {
        console.error("Failed to load distance flow data:", err);
      }
    };

    const handleRoadRoughnessClick = async () => {
      try {
        await triggerRoughnessQuery();
      } catch (err) {
        console.error("Failed to load road roughness data:", err);
      }
    };
    return (
      <CustomSidePanel
        {...props}
        panels={[
          {
            id: "rocket",
            label: "Rocket",
            iconComponent: Icons.Rocket,
            component: () => (
              <div className="grid grid-cols-2 gap-4">
                <Card
                  className="p-0 overflow-clip hover:shadow-lg cursor-pointer"
                  onClick={handleRoadRoughnessClick}
                >
                  <div className="relative w-full h-full">
                    <img src={RoadRoughnessImageUrl} alt="Road Roughness" />
                    <div className="absolute bottom-0 left-0 right-0 px-2 py-0.5 bg-card">
                      <span className="text-gray-700 text-xs font-medium">
                        Road Roughness
                      </span>
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-0 overflow-clip hover:shadow-lg cursor-pointer"
                  onClick={handleAddDistancesFlowmap}
                >
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
          ...CustomSidePanel.defaultPanels,
        ]}
      />
    );
  };

  return CustomSidePanelWrapper;
}
CustomSidePanelFactory.deps = SidePanelFactory.deps;

export default CustomSidePanelFactory;
