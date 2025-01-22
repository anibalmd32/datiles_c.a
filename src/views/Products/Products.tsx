import { useProductsStore } from "@/stores/productsStore/useProductsStore"
import { ViewContainer } from "@/components/shared/ViewMisc/ViewContainer"
import { ViewTitle } from "@/components/shared/ViewMisc/ViewTitle"
import { IconButton } from "@/components/shared/IconButton/IconButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { ProductsTable } from "./ProductsTable/ProductsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function Products() {
    const loadProducts = useProductsStore(store => store.loadProducts);
    const totalInvested = useProductsStore(store => store.totalInvested)

    const navigate = useNavigate()

    useEffect(() => {
        loadProducts.run();
    }, [loadProducts]);

    return (
        <ViewContainer>
            <div className="w-full flex justify-between">
                <ViewTitle titleValue="Productos" />
                <IconButton
                    text="Agregar Producto"
                    Icon={Plus}
                    onClick={() => {
                        navigate('add')
                    }}
                />
            </div>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>
                        Total invertido
                    </CardTitle>
                    <CardContent>
                        <p>En Dolares: $ {totalInvested.usd}</p>
                        <p>En Bolivares: Bs. {totalInvested.bs}</p>
                    </CardContent>
                </CardHeader>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>
                        Lista de productos en el inventario
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductsTable />
                </CardContent>
            </Card>
        </ViewContainer>
    )
}
