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
import { getCampaigns, type Campaign } from "@/lib/campaigns";
import { setActiveCampaign } from "@/lib/redux/campaign-slice";
import { RootState } from "@/lib/redux/store";
import { useCampaignBbox } from "@/hooks/useCampaignBbox";

// Helper to render a simple SVG polygon icon from GeoJSON geometry
// Simple placeholder icon (first letter)
function CampaignIcon({ label }: { label: string }) {
  const bg = "#f8f9fa";
  return (
    <div className="w-8 h-8 rounded-md flex items-center justify-center border" style={{ background: bg }}>
      <span className="font-semibold">{label.charAt(0)}</span>
    </div>
  );
}

export function CampaignSelectionModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeCampaign = useSelector(
    (state: RootState) => state.campaign.activeCampaign,
  );

  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCampaign, setSelectedCampaign] = React.useState<string | null>(null);

  // Initialize bbox fetching for campaign changes
  useCampaignBbox();

  const handleSelectCampaign = (value: string) => {
    setSelectedCampaign(value);
  };

  const handleConfirm = () => {
    if (selectedCampaign) {
      dispatch(setActiveCampaign(selectedCampaign));
    }
  };

  React.useEffect(() => {
    const list = getCampaigns();
    setCampaigns(list);
    setIsLoading(false);
    if (list.length === 1) setSelectedCampaign(list[0].value);
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
              <div className="text-sm text-muted-foreground">{t("campaignModal.loadingCampaigns")}</div>
            </div>
          ) : (
            campaigns.map((c) => (
              <button
                key={c.value}
                onClick={() => handleSelectCampaign(c.value)}
                className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                  selectedCampaign === c.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CampaignIcon label={c.label} />
                  <div className="flex-1">
                    <div className="font-medium">{c.label}</div>
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
            {selectedCampaign ? campaigns.find(c => c.value === selectedCampaign)?.label || selectedCampaign : ""}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
