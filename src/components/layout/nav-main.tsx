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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavMain({
  title,
  items,
}: {
  title: string;
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
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const renderNavItem = (item: any, level = 0) => {
    const hasNestedItems = item.items && item.items.length > 0;

    if (isCollapsed) {
    
      if (!hasNestedItems) {
        return (
          <SidebarMenuItem key={item.title + level}>
            <Link to={item.url}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      }
      
     
      return (
        <SidebarMenuItem key={item.title + level}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                {!isCollapsed && <span>{item.title}</span>}
                {!isCollapsed && (
                  <ChevronRight className="ml-auto transition-transform duration-200" />
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              sideOffset={8}
              className="min-w-48"
              align="start"
            >
              {item.items?.map((subItem: any) => (
                <DropdownMenuItem key={subItem.title} asChild>
                  <Link
                    to={subItem.url}
                    className="flex w-full items-center justify-between"
                  >
                    <span>{subItem.title}</span>
                    {subItem.endicon}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      );
    }

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
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>{items.map((item) => renderNavItem(item))}</SidebarMenu>
    </SidebarGroup>
  );
}

