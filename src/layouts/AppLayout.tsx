import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/AppSidebar/AppSidebar"

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />

        <div aria-roledescription="container" className="p-2 md:p-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
