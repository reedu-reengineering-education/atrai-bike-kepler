"use client";

import { MoreHorizontal, type LucideIcon } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteMapById } from "@/supabase/deleteMap";

export function MapsNav({
  title,
  items,
}: {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    mapId?: string;
  }[];
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = async (mapId: string) => {
    await deleteMapById(mapId);
    navigate({ to: "/", reloadDocument: true });
  };

  const renderNavItem = (item: any, level = 0) => {
    return (
      <Collapsible
        key={item.title + level}
        asChild
        defaultOpen={item.isActive}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <Link to={item.url}>
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction>
                <MoreHorizontal />
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem onClick={() => handleDelete(item.mapId)}>
                <span>{t("sidebar.deleteMap")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </Collapsible>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      {items.length > 0 && (
        <SidebarMenu>{items.map((item) => renderNavItem(item))}</SidebarMenu>
      )}
      {items.length === 0 && (
        <div className="px-2 py-1 text-sm text-muted-foreground">
          {t("sidebar.noMapsAvailable")}
        </div>
      )}
    </SidebarGroup>
  );
}
