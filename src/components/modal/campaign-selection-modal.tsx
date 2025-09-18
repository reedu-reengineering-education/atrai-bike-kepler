import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getAllStatistics } from "@/lib/pygeiapi-client/statistics";
import { setActiveCampaign } from "@/lib/redux/campaign-slice";
import { RootState } from "@/lib/redux/store";

// Helper to render a simple SVG polygon icon from GeoJSON geometry
function PolygonIcon({ geometry }: { geometry: GeoJSON.Geometry }) {
  const bg = "#f8f9fa";
  if (
    geometry.type === "Polygon" &&
    Array.isArray(geometry.coordinates) &&
    geometry.coordinates[0]?.length > 2
  ) {
    const coords = geometry.coordinates[0];
    const xs = coords.map(([x]) => x);
    const ys = coords.map(([, y]) => y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const scale = 18 / Math.max(maxX - minX, maxY - minY || 1);
    const points = coords
      .map(([x, y]) => `${4 + (x - minX) * scale},${20 - (y - minY) * scale}`)
      .join(" ");
    return (
      <svg
        width={32}
        height={32}
        viewBox="0 0 24 24"
        style={{ background: bg, borderRadius: 4 }}
      >
        <rect x={0} y={0} width={24} height={24} fill={bg} />
        <polygon
          points={points}
          fill="#8884d8"
          stroke="#555"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  // Fallback icon
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 24 24"
      style={{ background: bg, borderRadius: 4 }}
    >
      <rect x={0} y={0} width={24} height={24} fill={bg} />
      <circle cx={12} cy={12} r={8} fill="#ccc" />
    </svg>
  );
}

export function CampaignSelectionModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeCampaign = useSelector(
    (state: RootState) => state.campaign.activeCampaign,
  );

  const [statistics, setStatistics] = React.useState<GeoJSON.Feature[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCampaign, setSelectedCampaign] =
    React.useState<GeoJSON.Feature | null>(null);

  const getName = (feature: GeoJSON.Feature) =>
    feature.properties?.name || feature.id || "Unnamed";

  const getValue = (feature: GeoJSON.Feature) => {
    const { statistics } = feature.properties || {};
    if (statistics?.latest_stats?.total_distance_m)
      return `${(statistics.latest_stats.total_distance_m / 1000).toFixed(2)} km`;
    return "";
  };

  const handleSelectCampaign = (campaign: GeoJSON.Feature) => {
    setSelectedCampaign(campaign);
  };

  const handleConfirm = () => {
    if (selectedCampaign) {
      dispatch(setActiveCampaign(getName(selectedCampaign)));
    }
  };

  React.useEffect(() => {
    getAllStatistics().then((data) => {
      setStatistics(data.features);
      setIsLoading(false);

      // Auto-select if there's only one campaign
      if (data.features.length === 1) {
        setSelectedCampaign(data.features[0]);
      }
    });
  }, []);

  // Show modal only if no campaign is selected
  const isOpen = !activeCampaign;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("campaignModal.title")}</DialogTitle>
          <DialogDescription>
            {t("campaignModal.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">
                {t("campaignModal.loadingCampaigns")}
              </div>
            </div>
          ) : (
            statistics.map((campaign, index) => (
              <button
                key={campaign.id || index}
                onClick={() => handleSelectCampaign(campaign)}
                className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                  selectedCampaign === campaign
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <PolygonIcon geometry={campaign.geometry} />
                  <div className="flex-1">
                    <div className="font-medium">{getName(campaign)}</div>
                    {getValue(campaign) && (
                      <div className="text-sm text-muted-foreground">
                        {getValue(campaign)}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            onClick={handleConfirm}
            disabled={!selectedCampaign || isLoading}
            className="w-full"
          >
            {t("campaignModal.continueWith")}{" "}
            {selectedCampaign ? getName(selectedCampaign) : "Selected Campaign"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
