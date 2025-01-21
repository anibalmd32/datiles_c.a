import { DataTableRow } from "@/components/shared/DataTable/DataTable";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";
import { Switch } from "@/components/ui/switch"
import { formatEsFullDate } from "@/lib/utils";


export function createPaymentMethodsTableRows(
    paymentMethodsData: Array<PaymentMethod & SharedDataProp>,
    onChangeStatus: (data: { id: number, status: boolean }) => Promise<void>
): DataTableRow<PaymentMethod & SharedDataProp>[] {
    return paymentMethodsData.map((paymentMethod) => ({
        field: paymentMethod,
        render: ({ colName, field }) => {
            if (colName === 'id') {
                return <div className="text-center">
                    {field.id}
                </div>
            }

            if (colName === 'name') {
                return (
                    <div className="text-center">
                        {field.name}
                    </div>
                )
            }

            if (colName === 'created_at') {
                return (
                    <div className="text-center">
                        {formatEsFullDate(field.created_at)}
                    </div>
                )
            }

            if (colName === 'active') {
                
                return (
                    <div className="text-center">
                        <Switch
                            defaultChecked={field.active}
                            checked={field.active}
                            onCheckedChange={async () => {
                                await onChangeStatus({
                                    id: field.id,
                                    status: !field.active
                                })
                            }}
                        />
                    </div>
                )
            }
        }
    }))
}
