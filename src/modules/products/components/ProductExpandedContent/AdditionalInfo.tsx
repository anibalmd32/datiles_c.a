import { ProductData } from "@/definitions/data";
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdditionalInfoProps {
    product: ProductData;
}

export function AdditionalInfo({ product }: AdditionalInfoProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <Info className="w-5 h-5" />
                <CardTitle className="text-lg">Información adicional</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
                <span className="font-medium">Categoría:</span>
                <span>{product.category?.name || "Sin categoría"}</span>

                <span className="font-medium">Código:</span>
                <span>{product.code}</span>

                <span className="font-medium">IVA:</span>
                <span>{product.iva}%</span>
            </CardContent>
        </Card>
    );
}