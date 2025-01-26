import { DataTable } from "@/components/shared/DataTable/DataTable";
import { useMeasurementTable } from "../../hooks/useMeasurementsTable";

export function MeasurementsDataTable() {
    const { cols, loadingData, menu, rows } = useMeasurementTable()

    return (
        <DataTable
            cols={cols}
            contextMenuItems={menu}
            loading={loadingData}
            rows={rows}
        />
    )
}
