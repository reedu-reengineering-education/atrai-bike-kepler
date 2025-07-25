import store from "@/lib/redux/store"; // adjust if your store export is default/named
import { KeplerGlSchema } from "@kepler.gl/schemas";

export function exportKeplerDatasetAndConfig() {
  const state = store.getState() as { keplerGl: any };

  const dataTest = KeplerGlSchema.save(state.keplerGl.map);
  const config = dataTest.config;
  const dataset = dataTest.datasets;

  return {
    config,
    dataset,
  };
}
