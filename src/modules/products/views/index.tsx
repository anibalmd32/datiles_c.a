import { ProductsProvider } from "../providers/ProductsProviders";
import { ViewContainer } from "@/components/shared/ViewMisc/ViewContainer";
import { ViewTitle } from "@/components/shared/ViewMisc/ViewTitle";
import { Separator } from "@/components/ui/separator";
import { ProductsTable } from "../components/productsTable";
import { useNavigate } from "react-router";
import { IconButton } from "@/components/shared/IconButton/IconButton";
import { PlusCircle } from "lucide-react";

export function IndexProducts() {
    const navigate = useNavigate();

    return (
        <ProductsProvider>
            <ViewContainer>
                <div className="flex justify-between">
                    <ViewTitle titleValue="Productos" />
                    <IconButton
                        Icon={PlusCircle}
                        text="Agregar Product"
                        onClick={() => navigate("create")}
                    />
                </div>

                <Separator />

                <ProductsTable />
            </ViewContainer>
        </ProductsProvider>
    );
}
