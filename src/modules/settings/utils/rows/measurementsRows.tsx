import { formatEsFullDate } from "@/lib/utils";
import { MeasurementUnitData } from "@/definitions/data";
import { DataTableRow } from "@/components/shared/DataTable/DataTable";

export const measurementsTableRows = (data: MeasurementUnitData[]): DataTableRow<MeasurementUnitData>[] => {
    return data.map((category) => ({
        field: category,
        render: ({ colName, field }) => {
            if (colName === 'id') {
                return <div className="text-center">{field.id}</div>
            }

            if (colName === 'name') {
                return <div className="text-center" >{field.name}</div>
            }

            if (colName === 'created_at') {
                return <div className="text-center">{formatEsFullDate(field.created_at)}</div>
            }
        }
    }))
} 
