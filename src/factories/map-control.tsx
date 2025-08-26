// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { ComponentType } from "react";
import styled from "styled-components";
import {
  BannerMapPanel,
  SampleMapPanel,
} from "../components/map-control/map-control";

interface StyledMapControlOverlayProps {
  top?: number;
  rightPanelVisible?: boolean;
  fullHeight?: boolean;
  theme: {
    rightPanelMarginTop: number;
    rightPanelMarginRight: number;
    bottomWidgetPaddingBottom: number;
  };
}

const StyledMapControlPanel = styled.div`
  position: relative;
`;

const StyledMapControlContextPanel = styled.div`
  max-height: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none !important; /* prevent padding from blocking input */
  & > * {
    /* all children should allow input */
    pointer-events: all;
  }
`;

const StyledMapControlOverlay = styled.div<StyledMapControlOverlayProps>`
  position: absolute;
  display: flex;
  top: ${(props) => props.top || 0}px;
  right: 0;
  z-index: 1;
  pointer-events: none !important; /* prevent padding from blocking input */
  & > * {
    /* all children should allow input */
    pointer-events: all;
  }

  margin-top: ${(props) =>
    props.rightPanelVisible ? props.theme.rightPanelMarginTop : 0}px;
  margin-right: ${(props) =>
    props.rightPanelVisible ? props.theme.rightPanelMarginRight : 0}px;
  ${(props) => (props.fullHeight ? "height" : "max-height")}: calc(100% - ${(
    props,
  ) =>
    props.theme.rightPanelMarginTop + props.theme.bottomWidgetPaddingBottom}px);

  .map-control {
    ${(props) => (props.rightPanelVisible ? "padding-top: 0px;" : "")}
  }
`;

interface SampleData {
  label: string;
  detail?: string;
  description?: string;
  dataUrl?: string;
  configUrl?: string;
}

interface MapControlProps {
  top?: number;
  mapControls?: {
    effect?: {
      active: boolean;
    };
  };
  isExport?: boolean;
  currentSample?: SampleData;
  theme: StyledMapControlOverlayProps["theme"];
}

export function MapControlComponent(
  MapControl: ComponentType<
    MapControlProps & { actionComponents: ComponentType[] }
  >,
  EffectManager: ComponentType,
  actionComponents: ComponentType[],
) {
  return function CustomMapControl(props: MapControlProps) {
    const showEffects = Boolean(props.mapControls?.effect?.active);
    return (
      <StyledMapControlOverlay top={props.top} rightPanelVisible={showEffects}>
        <StyledMapControlPanel>
          <BannerMapPanel />
          {!props.isExport && props.currentSample ? (
            <SampleMapPanel
              currentSample={props.currentSample}
              theme={props.theme}
            />
          ) : null}
          <MapControl {...props} top={0} actionComponents={actionComponents} />
        </StyledMapControlPanel>
        <StyledMapControlContextPanel>
          {showEffects ? <EffectManager /> : null}
        </StyledMapControlContextPanel>
      </StyledMapControlOverlay>
    );
  };
}
