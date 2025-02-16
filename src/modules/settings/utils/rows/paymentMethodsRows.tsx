import { DataTableRow } from "@/components/shared/DataTable/DataTable";
import { PaymentMethodData } from "@/definitions/data";
import { formatEsFullDate } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

export const paymentMethodsTableRows = (
    data: PaymentMethodData[],
    activeConfig: {
    change: (id: number, status: boolean) => Promise<void>;
  },
): DataTableRow<PaymentMethodData>[] => {
    return data.map((category) => ({
        field: category,
        render: ({ colName, field }) => {
            if (colName === "id") {
                return <div className="text-center">{field.id}</div>;
            }

            if (colName === "name") {
                return <div className="text-center">{field.name}</div>;
            }

            if (colName === "created_at") {
                return (
                    <div className="text-center">
                        {formatEsFullDate(field.created_at)}
                    </div>
                );
            }

            if (colName === "active") {
                return (
                    <Switch
                        defaultChecked={field.active}
                        checked={field.active}
                        onClick={async () => {
                            await activeConfig.change(field.id, !field.active);
                        }}
                    />
                );
            }
        },
    }));
};
