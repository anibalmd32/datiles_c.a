import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore/paymentMethodStore'
import * as Card from '@/components/ui/card'
import { useEffect } from 'react'
import { PaymentMethodsTable } from './Table/PaymentMethodTable'

export default function PaymentMethodsTab() {
    const { loadPaymentMethods } = usePaymentMethodsStore()

    useEffect(() => {
        loadPaymentMethods.run()
    }, [loadPaymentMethods])

    return (
        <Card.Card>
            <Card.CardHeader>
                <Card.CardTitle>
                    Métodos de pago
                </Card.CardTitle>
                <Card.CardDescription>
                    Métodos o medios mediante los cuales sus clientes pueden pagar al comprar sus productos
                </Card.CardDescription>
            </Card.CardHeader>

            <Card.CardContent className='space-y-e'>
                <PaymentMethodsTable />
            </Card.CardContent>
        </Card.Card>
    )
}