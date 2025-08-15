import * as React from "react";
import {
  BookOpen,
  Bot,
  ChartLine,
  MapIcon,
  Settings2,
  Trash2,
} from "lucide-react";
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
} from "@/components/ui/sidebar";
import { listMapsFromSupabase } from "@/utils/listMaps";
import { deleteMapById } from "@/utils/deleteMap";
import { UserAuth } from "@/context/AuthContext";
import { useRefresh } from "@/context/RefreshContext";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/layout/language-toggle";

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
    translationKey: "models",
    url: "",
    icon: Bot,
    items: [
      { translationKey: "genesis", url: "/genesis" },
      { translationKey: "explorer", url: "/explorer" },
      { translationKey: "quantum", url: "/quantum" },
    ],
  },
  {
    translationKey: "documentation",
    url: "docs",
    icon: BookOpen,
    items: [
      { translationKey: "introduction", url: "/docs/introduction" },
      { translationKey: "getStarted", url: "#" },
      { translationKey: "tutorials", url: "#" },
      { translationKey: "changelog", url: "#" },
    ],
  },
  {
    translationKey: "settings",
    url: "#",
    icon: Settings2,
    items: [
      { translationKey: "general", url: "#" },
      { translationKey: "team", url: "#" },
      { translationKey: "billing", url: "#" },
      { translationKey: "limits", url: "#" },
    ],
  },
];

export const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = (
  props,
) => {
  const { t } = useTranslation();
  const { triggerRefresh, refreshKey } = useRefresh();
  const { session } = UserAuth();
  const [maps, setMaps] = React.useState<NavItem[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchMaps = async () => {
      if (session?.user) {
        const fetchedMaps = await listMapsFromSupabase(session.user.id);
        if (fetchedMaps) {
          setMaps(
            fetchedMaps.map((map: any) => ({
              title: map.title,
              url: `/maps/${map.id}`,
              endicon: (
                <Button
                  onClick={() => handleDelete(map.id)}
                  variant="destructive"
                  className="mr-0 pr-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              ),
            })),
          );
        }
      } else {
        setMaps([]);
      }
    };
    fetchMaps();
  }, [session, refreshKey]);

  const handleDelete = async (mapId: string) => {
    const confirm = window.confirm(t("map.confirmDelete"));
    if (!confirm) return;

    try {
      await deleteMapById(mapId);
      alert(t("map.deleteSuccess"));
      triggerRefresh();
      navigate({ to: "/" });
    } catch (e: any) {
      alert(t("map.deleteError") + e.message);
    }
  };

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

  const navMain = React.useMemo(() => {
    const baseItems =
      maps.length === 0
        ? staticNavMain
        : [
            ...staticNavMain,
            {
              translationKey: "maps",
              icon: MapIcon,
              url: "",
              items: maps,
            },
          ];

    return translateNavItems(baseItems);
  }, [maps, translateNavItems]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CampaignSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain as any} />
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-between px-2">
        <LanguageToggle />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
