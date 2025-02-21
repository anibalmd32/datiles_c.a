import { useState } from "react";
import { useProductCalculates } from "./useCalculates";

export interface CalculatedValues {
    retailCost: { usd: number; bs: number };
    wholesaleCost: { usd: number; bs: number };
    retailSale: { usd: number; bs: number };
    wholesaleSale: { usd: number; bs: number };
    gainRetail: { usd: number; bs: number };
    wholesaleGain: { usd: number; bs: number };
}

export const initialCalculatedValues: CalculatedValues = {
    retailCost: { usd: 0, bs: 0 },
    wholesaleCost: { usd: 0, bs: 0 },
    retailSale: { usd: 0, bs: 0 },
    wholesaleSale: { usd: 0, bs: 0 },
    gainRetail: { usd: 0, bs: 0 },
    wholesaleGain: { usd: 0, bs: 0 },
};

export const useProductFormCalculations = () => {
    const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>(initialCalculatedValues);
    const calculations = useProductCalculates();

    const updateRetailCalculations = (purchase: number, unitPerMeas: number, iva: number) => {
        setCalculatedValues((prev) => ({
            ...prev,
            retailCost: calculations.retailCost(purchase, unitPerMeas),
            gainRetail: calculations.gainRetail(iva, purchase, unitPerMeas),
            retailSale: calculations.retailSale(iva, purchase, unitPerMeas),
        }));
    };

    const updateWholesaleCalculations = (purchase: number, qty: number, iva: number) => {
        setCalculatedValues((prev) => ({
            ...prev,
            wholesaleCost: calculations.wholesaleCost(purchase, qty),
            wholesaleSale: calculations.wholesaleSale(iva, purchase, qty),
        }));
    };

    const updateWholesaleGain = () => {
        setCalculatedValues((prev) => ({
            ...prev,
            wholesaleGain: calculations.wholesaleGain(
                calculatedValues.wholesaleCost.usd,
                calculatedValues.wholesaleSale.usd,
            ),
        }));
    };

    const resetCalculations = () => {
        setCalculatedValues(initialCalculatedValues);
    };

    return {
        calculatedValues,
        updateRetailCalculations,
        updateWholesaleCalculations,
        updateWholesaleGain,
        resetCalculations,
    };
};