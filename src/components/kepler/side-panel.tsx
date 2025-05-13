// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { addRoadRoughnessData } from "@/lib/kepler/road-roughness-data";
import { Icons, SidePanelFactory } from "@kepler.gl/components";
import { Card } from "@/components/ui/card";
import RoadRoughnessImageUrl from "@/assets/road-roughness.png";
import DistancesImageUrl from "@/assets/distances.png";
import { addDistancesFlowmapData } from "@/lib/kepler/distances-flowmap-data";

function CustomSidePanelFactory(...args) {
  const CustomSidePanel = SidePanelFactory(...args);

  const CustomSidePanelWrapper = (props) => {
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
                  onClick={addRoadRoughnessData}
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
                  onClick={addDistancesFlowmapData}
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
              // <Image>
              //   <Button onClick={addRoadRoughnessData}>
              //     <PlusIcon size={16} />
              //     Add road roughness
              //   </Button>
              // </div>
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
