import Database from '@tauri-apps/plugin-sql'
import { InvoiceStatus, MeasurementUnit, PaymentMethod } from "./definitions/data";

export async function databaseSeeder() {
    const db = await Database.load('sqlite:datiles.db')
    
    const paymentMethodResult = await db.select<PaymentMethod[]>('SELECT * FROM payment_methods;')
    const invoiceStatusResult = await db.select<InvoiceStatus[]>('SELECT * FROM invoice_status;')
    const measurementsUnitsResult = await db.select<MeasurementUnit[]>('SELECT * FROM measurement_units')

    const paymentMethodData: PaymentMethod[] = [
        {
            name: 'cualquiera',
            active: true
        },
        {
            name: 'tarjeta',
            active: true,
        },
        {
            name: 'efectivo',
            active: true,
        },
        {
            name: 'transferencia',
            active: true,
        }
    ];
    const invoiceStatusData: InvoiceStatus[] = [
        {
            name: 'pagada'
        },
        {
            name: 'pendiente'
        },
        {
            name: 'rechazada'
        }
    ];

    const measurementsUnitsData: MeasurementUnit[] = [
        {
            name: 'kilo',
        },
        {
            name: 'gramo',
        },
        {
            name: 'caja'
        },
        {
            name: 'paquete'
        }
    ]

    const paymentMethodSeeder = async () => {
        for (const data of paymentMethodData) {
            const { active, name } = data;
            await db.execute(
                'INSERT INTO payment_methods (name, active) VALUES (?, ?)',
                [name, active]
            )
        }
    }

    const invoiceStatusSeeder = async () => {
        for (const data of invoiceStatusData) {
            const { name } = data;
            await db.execute(
                'INSERT INTO invoice_status (name) VALUES (?)',
                [name]
            )
        }
    }

    const measurementUnitsSeeder = async () => {
        for (const data of measurementsUnitsData) {
            const { name } = data;
            await db.execute(
                'INSERT INTO measurement_units (name) VALUES (?)',
                [name]
            )
        }
    }

    paymentMethodResult.length === 0 && await paymentMethodSeeder()
    invoiceStatusResult.length === 0 && await invoiceStatusSeeder()
    measurementsUnitsResult.length === 0 && await measurementUnitsSeeder()
}
