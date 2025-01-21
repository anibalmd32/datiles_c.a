import { InvoiceData } from "@/definitions/data"
import { DataTableCol } from "@/components/shared/DataTable/DataTable"
import { salesRows } from "./SalesRows"
import { useState } from "react"
import { PAYMENT_METHOD } from "@/definitions/enums"
import { SelectOptionItem } from "@/components/shared/SelectOption/SelectOption"

export const useSales = () => {
    const [invoicesData] = useState<InvoiceData[]>([])
    const [searchSale, setSearchSale] = useState<string>('')
    const [selectFilter, setSelectFilter] = useState<PAYMENT_METHOD>(PAYMENT_METHOD.ANY)
    const [dateRangeFilter, setDateRangeFilter] = useState<{ from: Date, to?: Date }>()

    const handleSearchSale = (value: string) => {
        console.log('filtrando por método de pago:', value)
        setSearchSale(value)
    }

    const handleSelectFilter = (value: PAYMENT_METHOD) => {
        console.log('buscando por código: ', value)
        setSelectFilter(value)
    }

    const handleRangeFilter = async (values: { from: Date, to?: Date }) => {
        console.log('Filtrando por rango de fecha', values)
        setDateRangeFilter(values)
    }

    const cols: DataTableCol<InvoiceData>[] = [
        {
            label: 'ID',
            name: 'id',
            position: 'center'
        },
        {
            label: 'Código',
            name: 'code',
            position: 'center'
        },
        {
            name: 'paymentMethod',
            position: 'center',
            label: 'Método de pago'
        },
        {
            name: 'totalUSD',
            label: 'Total en dolares',
            position: 'center'
        },
        {
            name: 'totalBS',
            label: 'Total en Bolivares',
            position: 'center'
        }
    ]

    const rows = salesRows(invoicesData)

    const selectOptionItems: SelectOptionItem[] = [
        {
            value: String(PAYMENT_METHOD.ANY),
            label: 'Todos'
        },
        {
            value: String(PAYMENT_METHOD.CARD),
            label: 'Tarjeta'
        },
        {
            value: String(PAYMENT_METHOD.CASH),
            label: 'Efectivo'
        },
        {
            value: String(PAYMENT_METHOD.TRANSFER),
            label: 'Transferencia'
        }
    ]

    return {
        cols,
        rows,
        invoicesData,
        searchSale,
        handleSearchSale,
        selectOptionItems,
        handleSelectFilter,
        selectFilter,
        handleRangeFilter,
        dateRangeFilter,
    }

}