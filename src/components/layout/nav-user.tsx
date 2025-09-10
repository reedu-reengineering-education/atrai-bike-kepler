"use client";

import {
  // BadgeCheck,
  // Bell,
  // CreditCard,
  // Sparkles,
  ChevronsUpDown,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function NavUser() {
  const { isMobile } = useSidebar();
  const auth = UserAuth();
  const session = auth?.session;
  const { t } = useTranslation();

  const user = session?.user;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.user_metadata?.avatar_url || ""}
                  alt={user?.user_metadata?.name || "User"}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.email?.[0]?.toUpperCase() || <User />}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.email?.split("@")[0] || ""}
                </span>
                <span className={cn(user?.email ? "truncate" : "", "text-xs")}>
                  {user?.email || t("signIn.loginPrompt")}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {session ? (
              <>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.user_metadata?.avatar_url || ""}
                        alt={user?.user_metadata?.name || "User"}
                      />
                      <AvatarFallback className="rounded-lg">
                        {user?.email?.[0]?.toUpperCase() || "CN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.email?.split("@")[0] || "shadcn"}
                      </span>
                      <span className="truncate text-xs">
                        {user?.email || "m@example.com"}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                {/* <DropdownMenuSeparator /> */}

                {/* <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles className="mr-2" />
                    {t("nav.Upgrade to Pro")}
                  </DropdownMenuItem>
                </DropdownMenuGroup> */}

                {/* <DropdownMenuSeparator /> */}

                {/* <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2" />
                    {t("nav.Account")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2" />
                    {t("nav.billing")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2" />
                    {t("nav.Notifications")}
                  </DropdownMenuItem>
                </DropdownMenuGroup> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={async () => {
                    await auth?.signOut();
                    window.location.reload();
                  }}
                >
                  {t("Sign out")}
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>
                  <a href="/signin">{t("Sign In")}</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/signup">{t("Sign Up")}</a>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
export default NavUser;
