import { useDispatch, useSelector } from "react-redux";
import { MapControlButton } from "@reedu-kepler.gl/components";
import { updateMap } from "@reedu-kepler.gl/actions";
import styled from "styled-components";
import { RootState } from "@/lib/redux/store";
import { MinusIcon, PlusIcon } from "lucide-react";

const StyledZoomControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-right: 12px;
  margin-top: 12px;
`;

const ZoomIcon = styled.span`
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
`;

/**
 * ZoomControls component provides zoom in and zoom out buttons for the Kepler.gl map.
 * The controls are positioned in the top-right area of the map and allow users to
 * incrementally zoom in and out of the map view.
 *
 * Features:
 * - Zoom in/out by 1 level per click
 * - Respects zoom limits (0-24)
 * - Disabled state when at zoom limits
 * - Accessible with proper ARIA labels
 */
export function ZoomControls() {
  const dispatch = useDispatch();
  const mapState = useSelector(
    (state: RootState) => (state.keplerGl as any)?.map?.mapState,
  );

  const handleZoomIn = () => {
    if (!mapState) return;
    const newZoom = Math.min(mapState.zoom + 1, 24); // Max zoom level 24
    dispatch(
      updateMap({
        ...mapState,
        zoom: newZoom,
      }), // mapIndex 0 for the first map
    );
  };

  const handleZoomOut = () => {
    if (!mapState) return;
    const newZoom = Math.max(mapState.zoom - 1, 0); // Min zoom level 0
    dispatch(
      updateMap({
        ...mapState,
        zoom: newZoom,
      }), // mapIndex 0 for the first map
    );
  };

  if (!mapState) {
    return null; // Don't render if map state is not available
  }

  return (
    <StyledZoomControls>
      <MapControlButton
        className="map-control-button zoom-in"
        onClick={handleZoomIn}
        title="Zoom In"
        aria-label="Zoom in"
        disabled={mapState.zoom >= 24}
      >
        <ZoomIcon>
          <PlusIcon />
        </ZoomIcon>
      </MapControlButton>
      <MapControlButton
        className="map-control-button zoom-out"
        onClick={handleZoomOut}
        title="Zoom Out"
        aria-label="Zoom out"
        disabled={mapState.zoom <= 0}
      >
        <ZoomIcon>
          <MinusIcon />
        </ZoomIcon>
      </MapControlButton>
    </StyledZoomControls>
  );
}
