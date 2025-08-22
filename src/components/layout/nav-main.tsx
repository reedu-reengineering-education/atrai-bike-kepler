"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      endicon?: React.ReactNode;
      items?: any[];
    }[];
  }[];
}) {
  const renderNavItem = (item: any, level = 0) => {
    const hasNestedItems = item.items && item.items.length > 0;

    return (
      <Collapsible
        key={item.title + level}
        asChild
        defaultOpen={item.isActive}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          {hasNestedItems ? (
            <>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem: any) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      {subItem.items && subItem.items.length > 0 ? (
                        <div>{renderNavItem(subItem, level + 1)}</div>
                      ) : (
                        <SidebarMenuSubButton asChild>
                          <div className="flex justify-between h-10">
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                            {subItem.endicon && (
                              <div onClick={(e) => e.stopPropagation()}>
                                {subItem.endicon}
                              </div>
                            )}
                          </div>
                        </SidebarMenuSubButton>
                      )}
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </>
          ) : (
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <Link to={item.url}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      </Collapsible>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>{items.map((item) => renderNavItem(item))}</SidebarMenu>
    </SidebarGroup>
  );
}
