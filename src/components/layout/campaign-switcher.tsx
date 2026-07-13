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
import { getCampaigns } from "@/lib/campaigns";
import { setActiveCampaign } from "@/lib/redux/campaign-slice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/lib/redux/store";

export function CampaignSwitcher() {
  const { t } = useTranslation();
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const activeCampaign = useSelector(
    (state: RootState) => state.campaign.activeCampaign,
  );

  const campaigns = getCampaigns();

  const selected = campaigns.find((c) => c.value === activeCampaign) ||
    (activeCampaign ? { label: activeCampaign, value: activeCampaign } : null);

  function handleSelectValue(value: string) {
    dispatch(setActiveCampaign(value));
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="bg-sidebar-accent text-sidebar-primary-foreground border-2 border-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <div className="text-sm font-semibold">{selected ? selected.label.charAt(0) : "?"}</div>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{selected ? selected.label : t("campaignSwitcher.noCampaignSelected")}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" align="start" side={isMobile ? "bottom" : "right"} sideOffset={4}>
            <DropdownMenuLabel className="text-muted-foreground text-xs">Campaigns</DropdownMenuLabel>
            {campaigns.map((c) => (
              <DropdownMenuItem key={c.value} onClick={() => handleSelectValue(c.value)} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <div className="text-sm font-semibold">{c.label.charAt(0)}</div>
                </div>
                {c.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={() => dispatch(setActiveCampaign(null))}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">↻</div>
              <div className="font-medium">{t("campaignSwitcher.changeCampaign")}</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
