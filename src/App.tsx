import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import {
  injectComponents,
  SidePanelFactory,
} from "@reedu-kepler.gl/components";
import { KeplerGlState } from "@reedu-kepler.gl/reducers";
import { Action, Dispatch } from "redux";
import CustomSidePanelFactory from "./components/kepler/side-panel";
import { replaceMapControl } from "./factories/map-control-factory";

// Inject custom components

const KeplerGl = injectComponents([
  [SidePanelFactory, CustomSidePanelFactory] as never,
  replaceMapControl() as never,
]);
const ApiAccessToken = import.meta.env.VITE_BASE_MAP_TOKEN;

const App = () => {
  return (
    <div className="w-full h-full overflow-clip">
      <AutoSizer>
        {({ height, width }) => (
          <KeplerGl
            id="map"
            width={width}
            height={height}
            theme="light"
            mapboxApiAccessToken={ApiAccessToken}
          />
        )}
      </AutoSizer>
    </div>
  );
};

const mapStateToProps = (state: KeplerGlState) => state;
const dispatchToProps = (dispatch: Dispatch<Action<string>>) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
