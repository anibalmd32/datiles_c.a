// Zustand
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Libs
import { createPaginationSlice, PaginationState } from "@/lib/paginationSlice";
import { createFilterSlice, FilterState } from "@/lib/filtersSlice";
import { MeasurementUnitData, StockModeData } from "@/definitions/data";

// State Definition
type StoreState = {
    data: Array<StockModeData & { measurements: MeasurementUnitData[] }>;
    pagination: PaginationState;
    filters: FilterState;
};

// Store instance
export const useStockModesStore = create<StoreState>()(
    subscribeWithSelector((...a) => ({
        data: [],
        ...createFilterSlice()(...a),
        ...createPaginationSlice()(...a),
    })),
);
