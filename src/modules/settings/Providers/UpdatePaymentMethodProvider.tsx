import { PaymentMethod, SharedDataProp } from "@/definitions/data";
import { ReactNode, createContext, useContext, useState } from 'react'

type Data = PaymentMethod & SharedDataProp

const UpdatePaymentMethodContext = createContext({} as {
    openUpdateForm: boolean;
    paymentMethodToUpdateValues: Data | null;
    handleOpenForm: (data: Data) => void;
    handleCloseForm: () => void;
})

export function UpdatePaymentMethodProvider({ children }: { children: ReactNode }) {
    const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false)
    const [paymentMethodToUpdateValues, setPaymentMethodToUpdateValues] = useState<Data | null>(null)

    const handleOpenForm = (data: Data) => {
        setOpenUpdateForm(true)
        setPaymentMethodToUpdateValues(data)
    }

    const handleCloseForm = () => {
        setOpenUpdateForm(false)
        setPaymentMethodToUpdateValues(null)
    }

    return (
        <UpdatePaymentMethodContext.Provider value={{
            handleCloseForm,
            handleOpenForm,
            openUpdateForm,
            paymentMethodToUpdateValues
        }}>
            {children}
        </UpdatePaymentMethodContext.Provider>
    )
}

export const useUpdatePaymentMethodContext = () => useContext(UpdatePaymentMethodContext)
