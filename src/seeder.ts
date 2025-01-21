import Database from '@tauri-apps/plugin-sql'
import { InvoiceStatus, PaymentMethod } from "./definitions/data";
import { INVOICE_STATUS, PAYMENT_METHOD } from "./definitions/enums";

export async function databaseSeeder() {
    const db = await Database.load('sqlite:datiles.db')
    
    const paymentMethodResult = await db.select<PaymentMethod[]>('SELECT * FROM payment_methods;')
    const invoiceStatusResult = await db.select<InvoiceStatus[]>('SELECT * FROM invoice_status;')

    const paymentMethodData: PaymentMethod[] = [
        {
            value: PAYMENT_METHOD.ANY,
            name: 'cualquiera',
            active: true
        },
        {
            value: PAYMENT_METHOD.CARD,
            name: 'tarjeta',
            active: true,
        },
        {
            value: PAYMENT_METHOD.CASH,
            name: 'efectivo',
            active: true,
        },
        {
            value: PAYMENT_METHOD.TRANSFER,
            name: 'transferencia',
            active: true,
        }
    ];
    const invoiceStatusData: InvoiceStatus[] = [
        {
            value: INVOICE_STATUS.PAID,
            name: 'pagada'
        },
        {
            value: INVOICE_STATUS.PENDING,
            name: 'pendiente'
        },
        {
            value: INVOICE_STATUS.REJECTED,
            name: 'rechazada'
        }
    ];

    const paymentMethodSeeder = async () => {
        for (const data of paymentMethodData) {
            const { active, name, value } = data;
            await db.execute(
                'INSERT INTO payment_methods (name, value, active) VALUES (?, ?, ?)',
                [name, value, active]
            )
        }
    }

    const invoiceStatusSeeder = async () => {
        for (const data of invoiceStatusData) {
            const { name, value } = data;
            await db.execute(
                'INSERT INTO invoice_status (name, value) VALUES (?, ?)',
                [name, value]
            )
        }
    }

    paymentMethodResult.length === 0 && await paymentMethodSeeder()
    invoiceStatusResult.length === 0 && await invoiceStatusSeeder()
}
