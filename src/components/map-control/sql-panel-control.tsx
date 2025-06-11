// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { useCallback, ComponentType } from "react";

import {
  MapControlButton,
  MapControlTooltipFactory,
} from "@kepler.gl/components";
import { MapControls } from "@kepler.gl/types";

interface SQLControlIcons {
  sqlPanelIcon: ComponentType<{ height?: string }>;
}

interface ExtendedMapControls extends MapControls {
  sqlPanel?: {
    show: boolean;
    active: boolean;
  };
}

type SqlPanelControlProps = {
  mapControls: ExtendedMapControls;
  onToggleMapControl: (control: string) => void;
  actionIcons: SQLControlIcons;
};

type SqlPanelControlComponent = ComponentType<SqlPanelControlProps>;

SqlPanelControlFactory.deps = [MapControlTooltipFactory];

export default function SqlPanelControlFactory(
  MapControlTooltip: ReturnType<typeof MapControlTooltipFactory>,
): SqlPanelControlComponent {
  const SqlPanelControl = ({
    mapControls,
    onToggleMapControl,
  }: SqlPanelControlProps) => {
    const onClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onToggleMapControl("sqlPanel");
      },
      [onToggleMapControl],
    );

    const showControl = mapControls?.sqlPanel?.show;
    if (!showControl) {
      return null;
    }

    const active = mapControls?.sqlPanel?.active;
    return (
      <MapControlTooltip
        id="show-sql-panel"
        message={active ? "tooltip.hideSQLPanel" : "tooltip.showSQLPanel"}
      >
        <MapControlButton
          className="map-control-button toggle-sql-panel"
          onClick={onClick}
          active={active}
        >
          SQL
        </MapControlButton>
      </MapControlTooltip>
    );
  };

  return SqlPanelControl;
}
