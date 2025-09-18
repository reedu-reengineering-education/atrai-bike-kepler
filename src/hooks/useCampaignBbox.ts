import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useLazyGetCampaignBboxQuery } from "@/lib/redux/keplerApi";
import {
  setBboxLoading,
  setCampaignBbox,
  setBboxError,
} from "@/lib/redux/campaign-slice";

/**
 * Hook that automatically fetches and stores the bbox for the active campaign
 * based on the bumpy_roads collection extent
 */
export function useCampaignBbox() {
  const dispatch = useDispatch();
  const { activeCampaign, campaignBbox, bboxLoading, bboxError } = useSelector(
    (state: RootState) => state.campaign,
  );

  const [fetchBbox] = useLazyGetCampaignBboxQuery();

  useEffect(() => {
    if (!activeCampaign) {
      // Clear bbox when no campaign is selected
      dispatch(setCampaignBbox(null));
      return;
    }

    const loadBbox = async () => {
      dispatch(setBboxLoading(true));

      try {
        console.log(`📍 Fetching bbox for campaign: ${activeCampaign}`);
        const result = await fetchBbox(activeCampaign);

        if (result.error) {
          console.warn(
            `📍 Failed to fetch bbox for ${activeCampaign}:`,
            result.error,
          );
          dispatch(setBboxError(`Failed to load bbox for ${activeCampaign}`));
        } else if (result.data) {
          console.log(
            `📍 Successfully loaded bbox for ${activeCampaign}:`,
            result.data,
          );
          dispatch(setCampaignBbox(result.data));
        }
      } catch (error) {
        console.error(`📍 Error fetching bbox for ${activeCampaign}:`, error);
        dispatch(setBboxError(`Error loading bbox for ${activeCampaign}`));
      }
    };

    loadBbox();
  }, [activeCampaign, dispatch, fetchBbox]);

  return {
    campaignBbox,
    bboxLoading,
    bboxError,
    activeCampaign,
  };
}
