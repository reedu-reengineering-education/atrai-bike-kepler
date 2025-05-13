import {SidebarProvider,} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layout/app-sidebar";
import { Outlet } from "@tanstack/react-router";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
        <Outlet/>
    </SidebarProvider>
  );
}
