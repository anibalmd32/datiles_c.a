import { UpdatePaymentMethodProvider } from '../../Providers/UpdatePaymentMethodProvider'
import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore/paymentMethodStore'
import { useEffect } from 'react'
import { PaymentMethodsTable } from './Table/PaymentMethodTable'
import { AddPaymentMethodForm } from './Form/AddForm/AddForm'
import { EditPaymentMethodForm } from './Form/EditForm/EditForm'
import { DataPagination } from '@/components/shared/DataTable/DataPagination'

export default function PaymentMethodsTab() {
    const { loadPaymentMethods, pagination } = usePaymentMethodsStore()

    useEffect(() => {
        loadPaymentMethods.run()
    }, [loadPaymentMethods])

    return (
        <UpdatePaymentMethodProvider>
            <div className="flex flex-col md:flex-row gap-2">
                <AddPaymentMethodForm />
            </div>
            <div>
                <PaymentMethodsTable />
                <DataPagination
                    currentPage={pagination.currentPage}
                    onPageChange={async (page) => {
                        pagination.setCurrentPage(page)
                        await loadPaymentMethods.run()
                    }}
                    totalPages={pagination.totalPages}
                />
            </div>
            <EditPaymentMethodForm />
        </UpdatePaymentMethodProvider>
    )
}