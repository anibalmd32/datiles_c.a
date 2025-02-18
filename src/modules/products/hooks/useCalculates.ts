import { useDolarStore } from "@/hooks/us-dolar-store";

export const useProductCalculates = () => {
    const dolarPrice = useDolarStore((store) => store.dolarPrice);

    // Costo al detal: precio de compra dividido por la cantidad por unidad
    const retailCost = (purchase: number, quantity: number) => {
        const result = purchase / quantity;
        return { usd: result, bs: result * Number(dolarPrice) };
    };

    // Costo al mayor: precio de compra multiplicado por la cantidad
    const wholesaleCost = (purchase: number, quantity: number) => {
        const result = purchase * quantity;
        return { usd: result, bs: result * Number(dolarPrice) };
    };

    // Venta al detal: se calcula un margen (porcentaje de IVA) sobre el costo unitario
    const retailSale = (iva: number, purchase: number, quantity: number) => {
        const costPerUnit = purchase / quantity;
        const result = costPerUnit * (iva / 100);
        // const result = costPerUnit + markup;
        return { usd: result, bs: result * Number(dolarPrice) };
    };

    // Venta al mayor: se calcula el costo total y se le aplica el IVA como margen
    const wholesaleSale = (iva: number, purchase: number, quantity: number) => {
        const costTotal = purchase * quantity;
        const result = costTotal * (iva / 100);
        // const result = costTotal + markup;
        return { usd: result, bs: result * Number(dolarPrice) };
    };

    // Ganancia al detal: diferencia entre el precio de venta al detal y el costo unitario
    const gainRetail = (iva: number, purchase: number, quantity: number) => {
        const sale = retailSale(iva, purchase, quantity).usd;
        const cost = retailCost(purchase, quantity).usd;
        const result = sale - cost;
        return { usd: result, bs: result * Number(dolarPrice) };
    };

    // Ganancia al mayor: se calcula la diferencia entre el precio de venta y el costo total
    const wholesaleGain = (cost: number, sale: number) => {
        const result = sale - cost;
        return { usd: result, bs: result * Number(dolarPrice) };
    };

    return {
        retailCost,
        wholesaleCost,
        retailSale,
        wholesaleSale,
        gainRetail,
        wholesaleGain,
    };
};
