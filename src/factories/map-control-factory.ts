// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { ComponentType } from "react";
import {
  MapControlFactory,
  EffectControlFactory,
  EffectManagerFactory,
} from "@kepler.gl/components";
// import { AiAssistantControlFactory } from "@kepler.gl/ai-assistant";
// import SqlPanelControlFactory from "../components/map-control/sql-panel-control";
import { MapControlComponent } from "./map-control";

function CustomMapControlFactory(
  EffectControl: ComponentType,
  EffectManager: ComponentType,
  //   SqlPanelControl: ComponentType,

  ...deps: ComponentType[]
) {
  const MapControl = MapControlFactory(...deps);
  const actionComponents = [
    ...(MapControl.defaultActionComponents ?? []),
    EffectControl,
    // SqlPanelControl,
    // AiAssistantControl,
  ];

  return MapControlComponent(MapControl, EffectManager, actionComponents);
}

CustomMapControlFactory.deps = [
  EffectControlFactory,
  EffectManagerFactory,
  //   SqlPanelControlFactory,
  //   AiAssistantControlFactory,
  ...MapControlFactory.deps,
];

export function replaceMapControl() {
  return [MapControlFactory, CustomMapControlFactory];
}
