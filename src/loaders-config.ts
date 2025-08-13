import { registerLoaders } from "@loaders.gl/core";
import { WMSCapabilitiesLoader } from "@loaders.gl/wms";

// Register WMS loader before Kepler.gl initializes
registerLoaders([WMSCapabilitiesLoader]);
