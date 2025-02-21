import { useState, useMemo } from "react";
import { SelectOptionItem } from "@/components/shared/SelectOption/SelectOption";
import { useCategoriesStore } from "@/modules/settings/stores/categoriesStore";
import { useStockModesStore } from "@/modules/settings/stores/stockModesStore";

export const useProductFormSelects = () => {    
    const [measurementOptions, setMeasurementOptions] = useState<SelectOptionItem[]>([]);
    const [measurementName, setMeasurementName] = useState<string>("");
    const [isWholesale, setIsWholesale] = useState(false);

    const categories = useCategoriesStore((store) => store.categories);
    const stockModes = useStockModesStore((store) => store.data);

    const stockModesSelectOptions = useMemo<SelectOptionItem[]>(() => {
        return stockModes.map((item) => ({
            label: item.name,
            value: String(item.id),
        })) ?? [];
    }, [stockModes]);

    const categoriesSelectOptions = useMemo<SelectOptionItem[]>(() => {
        return categories.map((item) => ({
            label: item.name,
            value: String(item.id),
        })) ?? [];
    }, [categories]);

    const updateMeasurements = (stockModeId: number, measurementUnitId?: number) => {
        if (!stockModeId || !stockModes.length) return;

        const stockMode = stockModes.find((item) => item.id === stockModeId);
        if (!stockMode) return;

        setIsWholesale(stockMode.name.toLocaleLowerCase().includes("al mayor"));

        setMeasurementOptions(
            stockMode.measurements.map((item) => ({
                label: item.name,
                value: String(item.id),
            }))
        );

        if (measurementUnitId) {
            const measurement = stockMode.measurements.find(
                (item) => item.id === measurementUnitId
            );
            setMeasurementName(measurement?.name || "");
        }
    };

    const resetSelects = async () => {
        setMeasurementOptions([]);
        setMeasurementName("");
        setIsWholesale(false);
    };

    return {
        categoriesSelectOptions,
        stockModesSelectOptions,
        measurementOptions,
        measurementName,
        isWholesale,
        updateMeasurements,
        resetSelects,
    };
};