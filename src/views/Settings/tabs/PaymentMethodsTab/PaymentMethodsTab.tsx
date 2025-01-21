import { SearchInput } from "@/components/shared/SearchInput/SearchInput"
import { usePaymentMethodTable } from "./usePaymentMethodsTable/usePaymentMethodTable"
import { DataTable } from "@/components/shared/DataTable/DataTable"
import { usePaymentMethodsStore } from "@/stores/paymentMethodsStore/paymentMethodStore"
import { useEffect } from "react"
import { DataPagination } from "@/components/shared/DataTable/DataPagination"

export function PaymentMethodsTab() {
    const loadPaymentMethods = usePaymentMethodsStore(store => store.loadPaymentMethods)
    const table = usePaymentMethodTable()

    useEffect(() => {
        loadPaymentMethods.run()
    }, [loadPaymentMethods])

    return (
        <div className="md:max-w-xl space-y-4">
            <div className="mb-4 mt-4">
                <h2 className="text-xl font-semibold">
                    Métodos de pago
                </h2>
            </div>

            <div className="flex gap-4">
                <SearchInput
                    onExternalChange={async () => {

                    }}
                    placeholder="Buscar método de pago"
                    value=""
                />

                {/* TODO: input para agregar método de pago */}
            </div>

            <div>
                <DataTable
                    cols={table.cols}
                    rows={table.rows}
                    loading={loadPaymentMethods.isLoading}
                    contextMenuItems={[
                        {
                            label: 'Editar',
                            action: async () => {}
                        },
                        {
                            label: 'Eliminar',
                            action: async () => {}
                        }
                    ]}
                />
                <DataPagination
                    currentPage={table.currentPage}
                    totalPages={table.totalPages}
                    onPageChange={async () => {}}
                />
            </div>
        </div>
    )
}