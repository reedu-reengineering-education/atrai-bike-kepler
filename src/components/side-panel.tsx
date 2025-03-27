// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Icons, SidePanelFactory } from "@kepler.gl/components";

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
            component: () => <div className="rocket-panel">Rocket</div>,
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
