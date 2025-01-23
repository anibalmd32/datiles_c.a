import { DataTableRow } from "@/components/shared/DataTable/DataTable";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";
import { formatEsFullDate } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

type Data = PaymentMethod & SharedDataProp
type OnChangeStatusCb = (data: { id: number, status: boolean }) => Promise<void>
type Rows = Array<DataTableRow<Data>>

export const renderPaymentMethodsRows = ({
    data,
    onChangeStatus
}: {
    data: Data[];
    onChangeStatus: OnChangeStatusCb;
}): Rows => {
    return data.map((payment_method) => ({
        field: payment_method,
        render({ field, colName }) {
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
        },
    }))
}
