// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { addRoadRoughnessData } from "@/lib/kepler/road-roughness-data";
import { Button, Icons, SidePanelFactory } from "@kepler.gl/components";
import { PlusIcon } from "lucide-react";

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
              <div>
                <Button onClick={addRoadRoughnessData}>
                  <PlusIcon size={16} />
                  Add road roughness
                </Button>
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
