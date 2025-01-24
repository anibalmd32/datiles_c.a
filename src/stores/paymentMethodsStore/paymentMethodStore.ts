import { create } from "zustand";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";
import { PaginationState, FilterState } from "@/definitions/helpers";
import { AsyncSlice } from "@/lib/asyncSlices";
import { loadPaymentMethodsSlice } from "./paymentMethodsSlices/loadPaymentMethodsSlice";
import { changePaymentMethodStatusSlice } from "./paymentMethodsSlices/changeStatusSlice";
import { addPaymentMethodSlice } from "./paymentMethodsSlices/addPaymentMethodSlice";
import { editPaymentMethodSlice } from "./paymentMethodsSlices/editPaymentMethod";

export type PaymentMethodsBaseState = {
    paymentMethods: Array<PaymentMethod & SharedDataProp>;
    pagination: PaginationState;
    filters: FilterState
}

type PaymentMethodsSlices = {
    loadPaymentMethods: AsyncSlice<Array<PaymentMethod & SharedDataProp>>;
    changePaymentMethodStatus: AsyncSlice<{ id: number, status: boolean }>;
    addPaymentMethod: AsyncSlice<PaymentMethod>;
    editPaymentMethod: AsyncSlice<PaymentMethod & SharedDataProp>;
}

export const usePaymentMethodsStore = create<
    PaymentMethodsBaseState & PaymentMethodsSlices
>()((...a) => ({
    paymentMethods: [],
    pagination: {
        currentPage: 1,
        pageSize: 5,
        totalPages: 0,
        setCurrentPage: (page) => {
            const [set] = a
            set((prev) => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    currentPage: page
                }
            }))
        },
        setPageSize: (size) => {
            const [set] = a
            set((prev) => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    pageSize: size
                }
            }))
        }
    },
    filters: {
        search: '',
        setSearch: (value) => {
            const [set] = a
            set((prev) => ({
                ...prev,
                filters: {
                    ...prev.filters,
                    search: value
                }
            }))
        }
    },
    loadPaymentMethods: loadPaymentMethodsSlice(...a),
    changePaymentMethodStatus: changePaymentMethodStatusSlice(...a),
    addPaymentMethod: addPaymentMethodSlice(...a),
    editPaymentMethod: editPaymentMethodSlice(...a),
}))
