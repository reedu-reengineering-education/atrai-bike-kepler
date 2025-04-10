// components/page-container.tsx
import { SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage, } from "../ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <SidebarInset className="border rounded-lg">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
          <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">ATRAI Data Platform</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Playground</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {children}
      </div>
    </SidebarInset>
  );
}