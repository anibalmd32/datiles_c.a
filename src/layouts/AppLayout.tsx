import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar/AppSidebar";
import { useEffect } from "react";
// import { databaseSeeder } from "@/seeder";
// import { useToast } from "@/hooks/use-toast"
import { useDolarStore } from "@/hooks/us-dolar-store";

export function AppLayout() {
    // const { toast } = useToast()
    const getDolarPrice = useDolarStore((store) => store.getDolarPrice);

    useEffect(() => {
        const disableContextMenu = (event: MouseEvent) => {
            event.preventDefault(); // Evita que se muestre el menú contextual
        };

        // Agrega el listener para todo el documento
        document.addEventListener("contextmenu", disableContextMenu);

        // Limpia el listener al desmontar el componente
        return () => {
            document.removeEventListener("contextmenu", disableContextMenu);
        };
    }, []);

    // useEffect(() => {
    //   databaseSeeder()
    //     .then(() => {
    //       toast({
    //         title: 'Éxito',
    //         description: 'La base de datos esta sincronizada',
    //         duration: 3000
    //       })
    //     })
    //     .catch(err => {
    //       toast({
    //         title: 'Error',
    //         description: `Error al sincronizar la base de datos: ${err.message}`,
    //         variant: 'destructive',
    //       })
    //     })
    // }, [])

    useEffect(() => {
        getDolarPrice();
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <Outlet />
                <Toaster />
            </main>
        </SidebarProvider>
    );
}
