// import * as React from "react";
// import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   ChartLine,
//   Command,
//   Frame,
//   GalleryVerticalEnd,
//   Map,
//   MapIcon,
//   PieChart,
//   Settings2,
// } from "lucide-react";

// import { NavMain } from "@/components/layout/nav-main";
// import { NavUser } from "@/components/layout/nav-user";
// import { CampaignSwitcher } from "@/components/layout/campaign-switcher";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import {listMapsFromSupabase} from "@/utils/listMaps";
// import { UserAuth } from "@/context/AuthContext";

// // This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Playground",
//       url: "/",
//       icon: MapIcon,
//       isActive: true,
//     },
//     {
//       title: "Statistics",
//       url: "/statistics",
//       icon: ChartLine,
//     },
//     {
//       title: "Models",
//       url: "??",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "/genesis",
//         },
//         {
//           title: "Explorer",
//           url: "/explorer",
//         },
//         {
//           title: "Quantum",
//           url: "/quantum",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const auth = UserAuth();
//   const session = auth?.session;
//   const [maps, setMaps] = React.useState([]);
//   React.useEffect(() => {
//     if (session?.user) {
//       listMapsFromSupabase(session.user.id).then((fetchedMaps) => {
//         setMaps(fetchedMaps);
//       });
//     }
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <CampaignSwitcher />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//         {/* <NavProjects projects={data.projects} /> */}
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

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
import { loadKeplerDataset } from "@/lib/redux/loadkeplerData";

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

  React.useEffect(() => {
    const fetchMaps = async () => {
      if (session?.user) {
        const fetchedMaps = await listMapsFromSupabase(session.user.id);
        if (fetchedMaps) {
          setMaps(
            fetchedMaps.map((map) => ({
              ...map, // keep all fields
            })),
          );
        }
      } else {
        setMaps([]); // Clear maps if no session
      }
    };
    fetchMaps();
  }, [session]);

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
                  loadKeplerDataset({
                    response: { data: map.dataset },
                    datasetId: map.dataset_id,
                    label: map.title,
                    config: map.config,
                    keep: true,
                  });
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
