// Custom hook to manage complete map state persistence across navigation
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDataToMap } from "@reedu-kepler.gl/actions";
import KeplerGlSchema from "@reedu-kepler.gl/schemas";
import { RootState } from "@/lib/redux/store";
import { exportKeplerDatasetAndConfig } from "@/supabase/exportKeplerMap";
import { useCampaignBbox } from "./useCampaignBbox";

interface MapData {
  dataset: any;
  config: any;
}

// Store complete map configurations in memory (survives navigation but not page refresh)
const mapStateCache = new Map<string, { dataset: any; config: any }>();
let currentMapId: string | null = null;

export function useMapState(mapId: string, mapData: MapData | null) {
  const dispatch = useDispatch();
  const keplerGlState = useSelector(
    (state: RootState) => (state.keplerGl as any)?.map,
  );
  const hasData =
    keplerGlState?.visState?.datasets &&
    Object.keys(keplerGlState.visState.datasets).length > 0;

  // Initialize campaign bbox functionality
  const { campaignBbox, bboxLoading, bboxError, activeCampaign } =
    useCampaignBbox();

  // Save current state when switching maps or when component unmounts
  useEffect(() => {
    const saveCurrentMapState = () => {
      if (currentMapId && hasData) {
        try {
          console.log(`Saving state for map: ${currentMapId}`);
          const { dataset, config } = exportKeplerDatasetAndConfig();
          mapStateCache.set(currentMapId, { dataset, config });
        } catch (e) {
          console.warn(`Failed to save state for map ${currentMapId}:`, e);
        }
      }
    };

    // Save state when switching to a different map
    if (currentMapId && currentMapId !== mapId && hasData) {
      saveCurrentMapState();
    }

    return () => {
      // Save state when component unmounts (navigation away)
      if (currentMapId && hasData) {
        saveCurrentMapState();
      }
    };
  }, [mapId, hasData]);

  useEffect(() => {
    if (!mapData || !mapId) return;

    // Check if we have cached state for this map
    const cachedMapData = mapStateCache.get(mapId);

    // Skip loading if this is the same map and we already have data
    if (currentMapId === mapId && hasData) {
      console.log(`Map ${mapId} already loaded and active`);
      return;
    }

    const dataToLoad = cachedMapData || mapData;
    const isFromCache = !!cachedMapData;

    try {
      console.log(
        `${isFromCache ? "Restoring cached" : "Loading fresh"} map: ${mapId}`,
      );
      const keplerMap = KeplerGlSchema.load(
        dataToLoad.dataset,
        dataToLoad.config,
      );
      dispatch(addDataToMap(keplerMap as any));
      currentMapId = mapId;
    } catch (e) {
      console.error("Failed to load map into Kepler.gl", e);
      // If cached data failed, try original data
      if (isFromCache && mapData) {
        try {
          console.log(`Fallback: Loading original map data for: ${mapId}`);
          const keplerMap = KeplerGlSchema.load(
            mapData.dataset,
            mapData.config,
          );
          dispatch(addDataToMap(keplerMap as any));
          currentMapId = mapId;
        } catch (fallbackError) {
          console.error("Fallback loading also failed:", fallbackError);
        }
      }
    }
  }, [mapData, mapId, dispatch, hasData]);

  // Cleanup function to clear cache when needed
  const clearMapCache = (targetMapId?: string) => {
    if (targetMapId) {
      mapStateCache.delete(targetMapId);
      if (currentMapId === targetMapId) {
        currentMapId = null;
      }
    } else {
      mapStateCache.clear();
      currentMapId = null;
    }
  };

  return {
    clearMapCache,
    campaignBbox,
    bboxLoading,
    bboxError,
    activeCampaign,
  };
}
