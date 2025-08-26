// components/page-container.tsx
import { SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
export function PageContainer({
  children,
  breadcrumb,
  breadcrumbRight,
  urlPath,
  className = "",
}: {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  breadcrumbRight?: React.ReactNode;
  urlPath?: string[];
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <SidebarInset className="border rounded-lg">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-50 bg-white">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">ATRAI Data Platform</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {urlPath?.map((item, i) => (
                  <React.Fragment key={i}>
                    <BreadcrumbItem>
                      <BreadcrumbPage>{t(`docs.${item}`)}</BreadcrumbPage>
                    </BreadcrumbItem>
                    {i < urlPath.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </React.Fragment>
                ))}
                {breadcrumb && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="flex items-center gap-2">
                        {breadcrumb}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {breadcrumbRight && (
            <div className="flex items-center gap-2">{breadcrumbRight}</div>
          )}
        </div>
      </header>
      <div
        className={cn(
          "flex flex-1 flex-col gap-4 p-4 pt-0 overflow-auto",
          className,
        )}
      >
        {children}
      </div>
    </SidebarInset>
  );
}
