// Zustand
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Libs
import { createPaginationSlice, PaginationState } from "@/lib/paginationSlice";
import { createFilterSlice, FilterState } from "@/lib/filtersSlice";

// Data Definition
import { ProductData } from "@/definitions/data";

// State Definition
type StoreState = {
    products: Array<ProductData>;
    pagination: PaginationState;
    filters: FilterState;
};

// Store instance
export const useProductsStore = create<StoreState>()(
    subscribeWithSelector((...a) => ({
        products: [],
        ...createFilterSlice()(...a),
        ...createPaginationSlice()(...a),
    })),
);
