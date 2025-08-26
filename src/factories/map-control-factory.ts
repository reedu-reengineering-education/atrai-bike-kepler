// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { ComponentType } from "react";
import {
  MapControlFactory,
  EffectControlFactory,
  EffectManagerFactory,
} from "@reedu-kepler.gl/components";
import { MapControlComponent } from "./map-control";

function CustomMapControlFactory(
  EffectControl: ComponentType,
  EffectManager: ComponentType,
  ...deps: [...Parameters<typeof MapControlFactory>]
) {
  const MapControl = MapControlFactory(...deps);
  const actionComponents = [
    ...(MapControl.defaultActionComponents ?? []),
    EffectControl,
  ];
  // @ts-expect-error: MapControlComponent requires internal typing that's not exposed
  return MapControlComponent(MapControl, EffectManager, actionComponents);
}

CustomMapControlFactory.deps = [
  EffectControlFactory,
  EffectManagerFactory,
  ...MapControlFactory.deps,
];

export function replaceMapControl() {
  return [MapControlFactory, CustomMapControlFactory];
}
