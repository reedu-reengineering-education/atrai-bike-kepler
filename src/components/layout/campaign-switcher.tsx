import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getAllStatistics } from "@/lib/pygeiapi-client/statistics";
import { setActiveCampaign } from "@/lib/redux/campaign-slice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/lib/redux/store";

// Helper to render a simple SVG polygon icon from GeoJSON geometry
function PolygonIcon({ geometry }: { geometry: GeoJSON.Geometry }) {
  // Use theme background (light) for SVG background
  const bg = "var(--sidebar-accent, #fff)";
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
        width={24}
        height={24}
        viewBox="0 0 24 24"
        style={{ background: bg, borderRadius: 4 }}
      >
        <rect x={0} y={0} width={24} height={24} fill={bg} />
        <polygon
          points={points}
          fill="var(--sidebar-accent-foreground, #8884d8)"
          stroke="var(--sidebar-accent-foreground, #555)"
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
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{ background: bg, borderRadius: 4 }}
    >
      <rect x={0} y={0} width={24} height={24} fill={bg} />
      <circle cx={12} cy={12} r={8} fill="#ccc" />
    </svg>
  );
}

export function CampaignSwitcher() {
  const { t } = useTranslation();
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const activeCampaign = useSelector(
    (state: RootState) => state.campaign.activeCampaign,
  );
  const [statistics, setStatistics] = React.useState<GeoJSON.Feature[]>([]);
  const [activeStat, setActiveStat] = React.useState<GeoJSON.Feature | null>(
    null,
  );

  const getName = (feature: GeoJSON.Feature) =>
    feature.properties?.name || feature.id || "Unnamed";

  const getValue = (feature: GeoJSON.Feature) => {
    const { statistics } = feature.properties || {};
    if (statistics?.latest_stats?.total_distance_m)
      return `${(statistics.latest_stats.total_distance_m / 1000).toFixed(2)} km`;
  };

  function handleSelect(stat: GeoJSON.Feature) {
    dispatch(setActiveCampaign(getName(stat)));
  }

  React.useEffect(() => {
    getAllStatistics().then((data) => {
      setStatistics(data.features);
    });
  }, []);

  // Update activeStat when activeCampaign changes
  React.useEffect(() => {
    if (activeCampaign && statistics.length > 0) {
      const matchingStat = statistics.find(
        (stat) => getName(stat) === activeCampaign,
      );
      setActiveStat(matchingStat || null);
    }
  }, [activeCampaign, statistics]);

  // Show placeholder when no campaign is selected
  if (!activeCampaign) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="bg-sidebar-accent text-sidebar-primary-foreground border-2 border-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <div className="text-xs">?</div>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium text-muted-foreground">
                {t("campaignSwitcher.noCampaignSelected")}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!activeStat) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-accent text-sidebar-primary-foreground border-2 border-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <PolygonIcon geometry={activeStat.geometry} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {getName(activeStat)}
                </span>
                <span className="truncate text-xs">{getValue(activeStat)}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Campaigns
            </DropdownMenuLabel>
            {statistics.map((stat, index) => (
              <DropdownMenuItem
                key={stat.id || index}
                onClick={() => handleSelect(stat)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <PolygonIcon geometry={stat.geometry} />
                </div>
                {getName(stat)}
                <div className="text-xs text-muted-foreground">
                  {getValue(stat)}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => dispatch(setActiveCampaign(null))}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                ↻
              </div>
              <div className="font-medium">
                {t("campaignSwitcher.changeCampaign")}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
