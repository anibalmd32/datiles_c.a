import { UpdatePaymentMethodProvider } from '../../Providers/UpdatePaymentMethodProvider'
import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore/paymentMethodStore'
import * as Card from '@/components/ui/card'
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
            <Card.Card className='md:max-w-xl'>
                <Card.CardHeader>
                    <Card.CardTitle>
                        Métodos de pago
                    </Card.CardTitle>
                    <Card.CardDescription>
                        Métodos o medios mediante los cuales sus clientes pueden pagar al comprar sus productos
                    </Card.CardDescription>
                </Card.CardHeader>

                <Card.CardContent className='space-y-2'>
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

                </Card.CardContent>
            </Card.Card>
            <EditPaymentMethodForm />
        </UpdatePaymentMethodProvider>
    )
}