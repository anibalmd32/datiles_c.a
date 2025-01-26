import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AsyncAction } from "@/hooks/useAsyncExecute";
import { usePaymentMethodsActions, usePaymentMethodsStore } from "../stores/paymentMethodsStore";
import { PaymentMethod, PaymentMethodData } from "@/definitions/data";
import { FilterState } from "@/lib/filtersSlice";
import { PaginationState } from "@/lib/paginationSlice";

const PaymentMethodsCtx = createContext({} as {
    paymentMethods: PaymentMethodData[];
    filters: FilterState;
    pagination: PaginationState;
    addPaymentMethod: AsyncAction<PaymentMethod>;
    deletePaymentMethod: AsyncAction<PaymentMethodData>;
    loadPaymentMethods: AsyncAction<PaymentMethodData>;
    updatePaymentMethod: AsyncAction<PaymentMethodData>;
    updateStatus: AsyncAction<{ id: number, status: boolean }>;
    openEditForm: boolean;
    editDefaultValues: PaymentMethodData | null;
    handleOpenEditForm: (values: PaymentMethodData) => void;
    handleCloseEditForm: () => void
})

export function PaymentMethodsProvider({ children }: { children: ReactNode }) {
    const [openEditForm, setOpenEditForm] = useState(false)
    const [editDefaultValues, setEditDefaultValues] = useState<PaymentMethodData | null>(null)

    const { paymentMethods, filters, pagination } = usePaymentMethodsStore()
    const {
        addPaymentMethod,
        deletePaymentMethod,
        loadPaymentMethods,
        updatePaymentMethod,
        updateStatus
    } = usePaymentMethodsActions()

    const handleOpenEditForm = (values: PaymentMethodData) => {
        setOpenEditForm(true)
        setEditDefaultValues(values)
    }

    const handleCloseEditForm = () => {
        setOpenEditForm(false)
        setEditDefaultValues(null)
    }

    useEffect(() => {
        loadPaymentMethods.run()
    }, [])

    return (
        <PaymentMethodsCtx.Provider value={{
            filters,
            pagination,
            editDefaultValues,
            handleCloseEditForm,
            handleOpenEditForm,
            openEditForm,
            addPaymentMethod,
            deletePaymentMethod,
            loadPaymentMethods,
            paymentMethods,
            updatePaymentMethod,
            updateStatus
        }} >
            {children}
        </PaymentMethodsCtx.Provider>
    )
}

export const usePaymentMethods = () => useContext(PaymentMethodsCtx)