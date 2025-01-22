import { SearchInput } from "@/components/shared/SearchInput/SearchInput"
import { usePaymentMethodTable } from "./usePaymentMethodsTable/usePaymentMethodTable"
import { DataTable } from "@/components/shared/DataTable/DataTable"
import { usePaymentMethodsStore } from "@/stores/paymentMethodsStore/paymentMethodStore"
import { useEffect } from "react"
import { DataPagination } from "@/components/shared/DataTable/DataPagination"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function PaymentMethodsTab() {
    const loadPaymentMethods = usePaymentMethodsStore(store => store.loadPaymentMethods)
    const table = usePaymentMethodTable()

    useEffect(() => {
        loadPaymentMethods.run()
    }, [loadPaymentMethods])

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Métodos de pago
                </CardTitle>
                <CardDescription>
                    Métodos o medios mediante los cuales sus clientes pueden pagar al comprar sus productos
                </CardDescription>
            </CardHeader>


            <CardContent className="space-y-2">
                <div className="flex gap-4">
                    <SearchInput
                        onExternalChange={async () => {

                        }}
                        placeholder="Buscar método de pago"
                        value=""
                    />

                    {/* TODO: input para agregar método de pago */}
                </div>
                <DataTable
                    cols={table.cols}
                    rows={table.rows}
                    loading={loadPaymentMethods.isLoading}
                    contextMenuItems={[
                        {
                            label: 'Editar',
                            action: async () => { }
                        },
                        {
                            label: 'Eliminar',
                            action: async () => { }
                        }
                    ]}
                />
                <DataPagination
                    currentPage={table.currentPage}
                    totalPages={table.totalPages}
                    onPageChange={async () => { }}
                />
            </CardContent>
        </Card>
    )
}