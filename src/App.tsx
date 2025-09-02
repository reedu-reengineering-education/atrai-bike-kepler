import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import {
  injectComponents,
  // SidePanelFactory,
  LoadDataModalFactory,
} from "@reedu-kepler.gl/components";
import { KeplerGlState } from "@reedu-kepler.gl/reducers";
import { Action, Dispatch } from "redux";
// import CustomSidePanelFactory from "./components/kepler/side-panel";
import { replaceMapControl } from "./factories/map-control-factory";
import CustomAddDataModalFactory from "./components/modal/custom-add-data-modal";
import { AiAssistantComponent } from "@reedu-kepler.gl/ai-assistant";
// Inject custom components

const KeplerGl = injectComponents([
  // [SidePanelFactory, CustomSidePanelFactory] as never,
  [LoadDataModalFactory, CustomAddDataModalFactory] as never,
  replaceMapControl() as never,
  [AiAssistantComponent] as never,
]);
const ApiAccessToken = import.meta.env.VITE_BASE_MAP_TOKEN;
const OpenAiKey = import.meta.env.VITE_OPENAI_API_KEY;

const App = () => {
  const aiAssistantConfig = {
    provider: "openai",
    model: "gpt-4o",
    apiKey: OpenAiKey,
    temperature: 1,
    topP: 0.8,
  };
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
            aiAssistantConfig={aiAssistantConfig}
          />
        )}
      </AutoSizer>
    </div>
  );
};

const mapStateToProps = (state: KeplerGlState) => state;
const dispatchToProps = (dispatch: Dispatch<Action<string>>) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
