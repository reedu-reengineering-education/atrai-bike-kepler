import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import { injectComponents, SidePanelFactory } from "@kepler.gl/components";
import { KeplerGlState } from "@kepler.gl/reducers";
import { Action, Dispatch } from "redux";
import CustomSidePanelFactory from "./components/kepler/side-panel";
import { replaceMapControl } from "./factories/map-control-factory";

// Inject custom components

const KeplerGl = injectComponents([
  [SidePanelFactory, CustomSidePanelFactory] as never,
  replaceMapControl() as never,
]);

const App = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <AutoSizer>
        {({ height, width }) => (
          <KeplerGl width={width} height={height} theme="light" />
        )}
      </AutoSizer>
    </div>
  );
};

const mapStateToProps = (state: KeplerGlState) => state;
const dispatchToProps = (dispatch: Dispatch<Action<string>>) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
