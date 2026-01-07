import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import {
  injectComponents,
  LoadDataModalFactory,
} from "@reedu-kepler.gl/components";
import { KeplerGlState } from "@reedu-kepler.gl/reducers";
import { Action, Dispatch } from "redux";
import CustomAddDataModalFactory from "./components/modal/custom-add-data-modal";
import { replaceMapControl } from "./factories/map-control-factory";
import TourManager from "./components/tour/TourManager";
import { TOUR_STEPS } from "./components/tour/tourSteps";
import { RootState } from "@/lib/redux/store";

// Inject custom components
const KeplerGl = injectComponents([
  [LoadDataModalFactory, CustomAddDataModalFactory] as never,
  replaceMapControl() as never,
]);

const ApiAccessToken = import.meta.env.VITE_BASE_MAP_TOKEN;

interface AppProps {
  activeCampaign?: string | null;
  keplerLocale?: string;
  
}

const App = ({ activeCampaign }: AppProps) => {

  return (
    <div id="map-tour-wrapper" className="w-full h-full overflow-clip relative">
  
          <TourManager 
        steps={TOUR_STEPS} 
        campaignName={activeCampaign || undefined}
      />
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

const mapStateToProps = (state: KeplerGlState & RootState) => ({
  ...state,
  activeCampaign: state.campaign?.activeCampaign,
});

const dispatchToProps = (dispatch: Dispatch<Action<string>>) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);