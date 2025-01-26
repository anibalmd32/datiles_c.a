import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMeasurementsActions, useMeasurementsStore } from "../stores/measurementsStore";
import { MeasurementUnit, MeasurementUnitData } from "@/definitions/data";
import { FilterState } from "@/lib/filtersSlice";
import { PaginationState } from "@/lib/paginationSlice";
import { AsyncAction } from "@/hooks/useAsyncExecute";

const MeasurementCtx = createContext({} as {
    measurements: MeasurementUnitData[];
    filters: FilterState;
    pagination: PaginationState;
    addMeasurement: AsyncAction<MeasurementUnit>;
    deleteMeasurement: AsyncAction<MeasurementUnitData>;
    loadMeasurements: AsyncAction<MeasurementUnitData>;
    updateMeasurement: AsyncAction<MeasurementUnitData>;
    openEditForm: boolean;
    editDefaultValues: MeasurementUnitData | null;
    handleOpenEditForm: (values: MeasurementUnitData) => void;
    handleCloseEditForm: () => void
})

export function MeasurementsProvider({ children }: { children: ReactNode }) {
    const [openEditForm, setOpenEditForm] = useState(false)
    const [editDefaultValues, setEditDefaultValues] = useState<MeasurementUnitData | null>(null)

    const { measurements, filters, pagination } = useMeasurementsStore()
    const {
        addMeasurement,
        deleteMeasurement,
        loadMeasurements,
        updateMeasurement
    } = useMeasurementsActions()

    const handleOpenEditForm = (values: MeasurementUnitData) => {
        setOpenEditForm(true)
        setEditDefaultValues(values)
    }

    const handleCloseEditForm = () => {
        setOpenEditForm(false)
        setEditDefaultValues(null)
    }

    useEffect(() => {
        loadMeasurements.run()
    }, [])

    return (
        <MeasurementCtx.Provider value={{
            filters,
            pagination,
            editDefaultValues,
            handleCloseEditForm,
            handleOpenEditForm,
            addMeasurement,
            deleteMeasurement,
            loadMeasurements,
            measurements,
            updateMeasurement,
            openEditForm
        }} >
            {children}
        </MeasurementCtx.Provider>
    )
}

export const useMeasurements = () => useContext(MeasurementCtx)
