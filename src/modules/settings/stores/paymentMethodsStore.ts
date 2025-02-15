// Zustand
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Libs
import { createPaginationSlice, PaginationState } from "@/lib/paginationSlice";
import { createFilterSlice, FilterState } from "@/lib/filtersSlice";
import { PaymentMethodData } from "@/definitions/data";

// State Definition
type StoreState = {
    paymentMethods: PaymentMethodData[]
    pagination: PaginationState;
    filters: FilterState
}

// Store instance
export const usePaymentMethodsStore = create<StoreState>()(
    subscribeWithSelector((...a) => ({
        paymentMethods: [],
        ...createFilterSlice()(...a),
        ...createPaginationSlice()(...a)
    }))
)
