import * as React from "react";
import { BookOpen, Bot, ChartLine, MapIcon, Settings2 } from "lucide-react";

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
import { UserAuth } from "@/context/AuthContext";

import { useNavigate } from "@tanstack/react-router";
import { useRefresh } from "@/context/RefreshContext";
import { Trash2 } from "lucide-react";
import { deleteMapById } from "@/utils/deleteMap";
import { Button } from "@/components/ui/button";

const staticNavMain = [
  {
    title: "Playground",
    url: "/",
    icon: MapIcon,
    isActive: true,
  },
  {
    title: "Statistics",
    url: "/statistics",
    icon: ChartLine,
  },
  {
    title: "Models",
    url: "??",
    icon: Bot,
    items: [
      { title: "Genesis", url: "/genesis" },
      { title: "Explorer", url: "/explorer" },
      { title: "Quantum", url: "/quantum" },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Introduction", url: "#" },
      { title: "Get Started", url: "#" },
      { title: "Tutorials", url: "#" },
      { title: "Changelog", url: "#" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      { title: "General", url: "#" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
      { title: "Limits", url: "#" },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const auth = UserAuth();
  const { triggerRefresh } = useRefresh();
  const session = auth?.session;
  const { refreshKey } = useRefresh();

  const [maps, setMaps] = React.useState<any[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchMaps = async () => {
      if (session?.user) {
        const fetchedMaps = await listMapsFromSupabase(session.user.id);
        if (fetchedMaps) {
          setMaps(
            fetchedMaps.map((map) => ({
              ...map,
            })),
          );
        }
      } else {
        setMaps([]);
      }
    };
    fetchMaps();
  }, [session, refreshKey]);

  const navMain = React.useMemo(() => {
    if (maps.length === 0) return staticNavMain;

    const handleDelete = async (mapId: string) => {
      const confirm = window.confirm(
        "Are you sure you want to delete this map?",
      );
      if (!confirm) return;

      try {
        await deleteMapById(mapId);

        alert("Map deleted successfully");
        triggerRefresh();
        navigate({ to: "/" });
        // or another route
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e: any) {
        alert("Failed to delete map");
      }
    };

    return [
      ...staticNavMain,
      {
        title: "Maps",
        icon: MapIcon,
        items: maps.map((map) => ({
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
      },
    ];
  }, [maps]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CampaignSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain as any} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
