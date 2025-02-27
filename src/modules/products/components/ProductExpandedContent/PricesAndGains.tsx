import { ProductData } from "@/definitions/data";
import { Box, DollarSign, PackageSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PriceSection } from "./PriceSection";
import { useProductExpandedContent } from "../../hooks/useProductExpandedContent";

interface PricesAndGainsProps {
    product: ProductData;
}

export function PricesAndGains({ product }: PricesAndGainsProps) {
    const {
        retailCost,
        retailSalePrice,
        retailGain,
        wholesaleCost,
        wholesaleSalePrice,
        wholesaleGain
    } = useProductExpandedContent(product);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <CardTitle className="text-lg">Precios y Ganancias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Al Detal */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Box className="w-4 h-4" />
                        <h4 className="text-base font-semibold">
                            Detal (unidad por {product.stock?.measurement?.name || "unidad"})
                        </h4>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <PriceSection label="Precio de compra" value={retailCost} />
                        <PriceSection label="Precio de venta" value={retailSalePrice} />
                        <div className="sm:col-span-2">
                            <PriceSection label="Ganancia" value={retailGain} />
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Al Mayor */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <PackageSearch className="w-4 h-4" />
                        <h4 className="text-base font-semibold">
                            Al Mayor ({product.stock?.data.quantity || 1} {product.stock?.measurement?.name || "unidades"})
                        </h4>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <PriceSection label="Precio de compra" value={wholesaleCost} />
                        <PriceSection label="Precio de venta" value={wholesaleSalePrice} />
                        <div className="sm:col-span-2">
                            <PriceSection label="Ganancia" value={wholesaleGain} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}