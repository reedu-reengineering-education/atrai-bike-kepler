import * as React from "react";
import { BookOpen, ChartLine, MapIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import { CampaignSwitcher } from "@/components/layout/campaign-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { listMapsFromSupabase } from "@/supabase/listMaps";
import { UserAuth } from "@/context/AuthContext";
import { useRefresh } from "@/context/RefreshContext";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { MapsNav } from "./maps-nav";

interface NavItem {
  translationKey?: string;
  title?: string;
  url: string;
  icon?: React.ElementType;
  items?: NavItem[];
  isActive?: boolean;
  endicon?: React.ReactNode;
}

const staticNavMain: NavItem[] = [
  {
    translationKey: "playground",
    url: "/",
    icon: MapIcon,
    isActive: true,
  },
  {
    translationKey: "statistics",
    url: "/statistics",
    icon: ChartLine,
  },
  {
    translationKey: "documentation",
    url: "docs",
    icon: BookOpen,
    items: [
      { translationKey: "introduction", url: "/docs/introduction" },
      {
        translationKey: "getStarted",
        url: "docs/get-Started",
      },

      { translationKey: "Custom Features", url: "/docs/custom-features" },
      { translationKey: "Built-in Datasets", url: "/docs/built-in-datasets" },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const { session } = UserAuth();
  const { refreshKey } = useRefresh();

  const [maps, setMaps] = React.useState<any[]>([]);

  const { state } = useSidebar();

  React.useEffect(() => {
    const fetchMaps = async () => {
      if (session?.user) {
        const fetchedMaps = await listMapsFromSupabase(session.user.id);
        if (fetchedMaps) {
          setMaps(
            fetchedMaps.map((map: any) => ({
              title: map.title,
              url: `/maps/${map.id}`,
              mapId: map.id,
            })),
          );
        }
      } else {
        setMaps([]);
      }
    };
    fetchMaps();
  }, [session, refreshKey]);

  const translateNavItems = React.useCallback(
    (items: NavItem[]): NavItem[] => {
      return items.map((item) => ({
        ...item,
        title: item.translationKey
          ? t(`nav.${item.translationKey}`)
          : item.title,
        items: item.items ? translateNavItems(item.items) : undefined,
      }));
    },
    [t],
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img
          src="/logo.png"
          alt="Logo"
          className="h-10 w-auto object-contain"
        />
        {state === "expanded" && (
          <h1 className="font-bold text-primary mb-2 tracking-tight text-center">
            {t("sidebar.atraiDataPlatform")}
          </h1>
        )}
        <CampaignSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          title={t("sidebar.platform")}
          items={translateNavItems(staticNavMain) as any}
        />
        {session && <MapsNav title={t("sidebar.userMaps")} items={maps} />}
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-between px-2">
        <LanguageToggle />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
