import { ProductData } from "@/definitions/data";
import { PackageSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StockInfoProps {
    product: ProductData;
}

export function StockInfo({ product }: StockInfoProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <PackageSearch className="w-5 h-5" />
                <CardTitle className="text-lg">Información de Stock</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
                <span className="font-medium">
                    Cantidad de {product.stock?.measurement?.name || "unidades"}:
                </span>
                <span>{product.stock?.data.quantity || 0}</span>

                <span className="font-medium">Unidad de medida:</span>
                <span>{product.stock?.measurement?.name || "N/A"}</span>

                <span className="font-medium">
                    Unidades por {product.stock?.measurement?.name || "unidad"}:
                </span>
                <span>{product.stock?.data.unit_per_measurement || "N/A"}</span>
            </CardContent>
        </Card>
    );
}