import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import { injectComponents, SidePanelFactory } from "@kepler.gl/components";
import { KeplerGlState } from "@kepler.gl/reducers";
import { Action, Dispatch } from "redux";
import CustomSidePanelFactory from "./components/side-panel";

// Inject custom components
const KeplerGl = injectComponents([
  [SidePanelFactory, CustomSidePanelFactory] as never,
]);

const App = () => {
  // const dispatch = useDispatch();

  // const initMap = async () => {
  //   const dataReq = await fetch(
  //     "https://api.atrai.bike/collections/road_roughness/items?f=json&limit=100000",
  //   );
  //   const data = await dataReq.json();
  //   const geojson = processGeojson(data);

  //   dispatch(
  //     addDataToMap({
  //       datasets: {
  //         info: {
  //           label: "Road Roughness",
  //           id: "road_roughness",
  //         },
  //         data: geojson,
  //       },
  //       options: {
  //         centerMap: true,
  //         readOnly: false,
  //         keepExistingConfig: false,
  //       },
  //     }),
  //   );
  // };

  // useEffect(() => {
  //   initMap();
  // }, [dispatch]);

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
