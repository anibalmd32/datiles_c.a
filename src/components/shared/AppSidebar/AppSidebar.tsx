import { DollarSign, LucideBox, Settings } from "lucide-react";
import { NavLink } from "react-router";
import { useDolarStore } from "@/hooks/us-dolar-store";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
    {
        title: "Ventas",
        url: "app/sales",
        icon: DollarSign,
    },
    {
        title: "Productos",
        url: "app/products",
        icon: LucideBox,
    },
    {
        title: "Configuraciones",
        url: "app/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const dolarPrice = useDolarStore((store) => store.dolarPrice);

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className="h-full">
                    <SidebarGroupLabel className="text-xl font-bold mb-4">
            DATILES C.A.
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col justify-between h-full">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url} className="font-semibold">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                        <div>
                            {dolarPrice && (
                                <p className="text-center font-bold text-xl">
                  $1 = Bs. {dolarPrice}
                                </p>
                            )}
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
