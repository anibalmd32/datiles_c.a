import { ProductData } from "@/definitions/data";
import { useProductCalculates } from "./useCalculates";

export const useProductExpandedContent = (product: ProductData) => {
    const calculations = useProductCalculates();
    
    // Cálculos al detal
    const retailCost = calculations.retailCost(
        Number(product.purchase_usd),
        Number(product.stock?.data.unit_per_measurement || product.stock?.data.quantity || 1)
    );

    const retailSalePrice = calculations.retailSale(
        Number(product.iva),
        Number(product.purchase_usd),
        Number(product.stock?.data.unit_per_measurement || product.stock?.data.quantity || 1)
    );

    const retailGain = calculations.gainRetail(
        Number(product.iva),
        Number(product.purchase_usd),
        Number(product.stock?.data.unit_per_measurement || product.stock?.data.quantity || 1)
    );

    // Cálculos al mayor
    const wholesaleCost = calculations.wholesaleCost(
        Number(product.purchase_usd),
        Number(product.stock?.data.quantity || 1)
    );

    const wholesaleSalePrice = calculations.wholesaleSale(
        Number(product.iva),
        Number(product.purchase_usd),
        Number(product.stock?.data.quantity || 1)
    );

    const wholesaleGain = calculations.wholesaleGain(
        wholesaleCost.usd,
        wholesaleSalePrice.usd
    );

    return {
        retailCost,
        retailSalePrice,
        retailGain,
        wholesaleCost,
        wholesaleSalePrice,
        wholesaleGain
    };
};