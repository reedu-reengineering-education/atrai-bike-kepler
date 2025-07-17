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
import KeplerGlSchema from "@kepler.gl/schemas";
import { addDataToMap } from "@kepler.gl/actions";
import { useDispatch } from "react-redux";

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
  const session = auth?.session;

  const [maps, setMaps] = React.useState<any[]>([]);
  const dispatch = useDispatch();

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
  }, [session]);

  const handleMapClick = (map: any) => {
    const mapToLoad = KeplerGlSchema.load(map.dataset, map.config);
    if (!mapToLoad || !mapToLoad.datasets) {
      console.warn("Invalid map data:", map);
      return;
    }
    dispatch(addDataToMap(mapToLoad));
  };

  const navMain = React.useMemo(() => {
    if (maps.length === 0) return staticNavMain;

    return [
      ...staticNavMain,
      {
        title: "Maps",
        icon: MapIcon,
        items: maps.map((map) => ({
          title: (
            <div key={map.title} className="flex gap-3">
              <button
                className="text-xs"
                onClick={() => {
                  handleMapClick(map);
                }}
              >
                {map.title}
              </button>
            </div>
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
        <NavMain items={navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
