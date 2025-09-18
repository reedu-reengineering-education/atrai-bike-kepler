import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layout/app-sidebar";
import { CampaignSelectionModal } from "./components/modal/campaign-selection-modal";
import { Outlet } from "@tanstack/react-router";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <Outlet />
      <CampaignSelectionModal />
    </SidebarProvider>
  );
}
