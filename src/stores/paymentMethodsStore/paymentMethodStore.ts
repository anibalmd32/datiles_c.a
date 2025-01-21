import { create } from "zustand";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";
import { PaginatedData } from "@/definitions/helpers";
import { AsyncSlice } from "@/lib/asyncSlices";
import { loadPaymentMethodsSlice } from "./paymentMethodsSlices/loadPaymentMethodsSlice";
import { changePaymentMethodStatusSlice } from "./paymentMethodsSlices/changeStatusSlice";

export type PaymentMethodsBaseState = {
    paymentMethods: PaginatedData<Array<PaymentMethod & SharedDataProp>>;
}

type PaymentMethodsSlices = {
    loadPaymentMethods: AsyncSlice<PaginatedData<Array<PaymentMethod>>>;
    changePaymentMethodStatus: AsyncSlice<{ id: number, status: boolean }>
}

export const usePaymentMethodsStore = create<
    PaymentMethodsBaseState & PaymentMethodsSlices
>()((...a) => ({
    paymentMethods: {
        currentPage: 1,
        data: [],
        nextPage: 2,
        pageSize: 5,
        prevPage: 0,
        totalPages: 0,
    },
    loadPaymentMethods: loadPaymentMethodsSlice(...a),
    changePaymentMethodStatus: changePaymentMethodStatusSlice(...a)
}))
