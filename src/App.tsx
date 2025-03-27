import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import styled from "styled-components";

import "./App.css";
import { injectComponents, SidePanelFactory } from "@kepler.gl/components";
import { KeplerGlState } from "@kepler.gl/reducers";
import { Action, Dispatch } from "redux";
import CustomSidePanelFactory from "./components/side-panel";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

// Inject custom components
const KeplerGl = injectComponents([[SidePanelFactory, CustomSidePanelFactory]]);

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
    <StyledWrapper>
      <AutoSizer>
        {({ height, width }) => <KeplerGl width={width} height={height} />}
      </AutoSizer>
    </StyledWrapper>
  );
};

const mapStateToProps = (state: KeplerGlState) => state;
const dispatchToProps = (dispatch: Dispatch<Action<string>>) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
