// Zustand
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Libs
import { createPaginationSlice, PaginationState } from "@/lib/paginationSlice";
import { createFilterSlice, FilterState } from "@/lib/filtersSlice";
import { StockModeData } from "@/definitions/data";

// State Definition
type StoreState = {
  data: StockModeData[];
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
