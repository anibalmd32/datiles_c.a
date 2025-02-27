import { ProductData } from "@/definitions/data";
import { StockInfo } from "./StockInfo";
import { AdditionalInfo } from "./AdditionalInfo";
import { PricesAndGains } from "./PricesAndGains";

interface ProductExpandedContentProps {
    product: ProductData;
}

export function ProductExpandedContent({
    product,
}: ProductExpandedContentProps) {
    return (
        <div className="p-4 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <StockInfo product={product} />
                <AdditionalInfo product={product} />
            </div>
            <PricesAndGains product={product} />
        </div>
    );
}
