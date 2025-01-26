import { useMeasurements } from "@/modules/settings/Providers/MeasurementsProvider";
import { measurementsMenu } from "../utils/menus/measurementsTableMenu";
import { measurementsCols } from "../utils/cols/measurementsCols";
import { measurementsTableRows } from "../utils/rows/measurementsRows";
import { useAlert } from "@/hooks/useAlert";
import { MeasurementUnitData } from "@/definitions/data";

export const useMeasurementTable = () => {
    const { measurements, deleteMeasurement, loadMeasurements, handleOpenEditForm } = useMeasurements()
    const { emitErrorAlert, emitSuccessAlert } = useAlert()

    const editAction = (row: MeasurementUnitData) => {
        handleOpenEditForm(row)
    }
    const deleteAction = async (row: MeasurementUnitData) => {
        await deleteMeasurement.run({
            onSuccess: () => emitSuccessAlert('Unidad eliminada'),
            onError: () => emitErrorAlert('Error al eliminar unidad')
        }, row)
    }

    const cols = measurementsCols;
    const rows = measurementsTableRows(measurements)
    const menu = measurementsMenu({ editAction, deleteAction })

    return {
        cols,
        rows,
        menu,
        loadingData: loadMeasurements.loading
    }
}