import { MeasurementUnitData } from "@/definitions/data";
import { createContext, ReactNode, useContext, useState } from "react";

const EditMeasurementCtx = createContext(
    {} as {
        openEditForm: boolean;
        editDefaultValues: MeasurementUnitData | null;
        handleOpenEditForm: (values: MeasurementUnitData) => void;
        handleCloseEditForm: () => void;
    },
);

export function MeasurementsProvider({ children }: { children: ReactNode }) {
    const [openEditForm, setOpenEditForm] = useState(false);
    const [editDefaultValues, setEditDefaultValues] =
        useState<MeasurementUnitData | null>(null);

    const handleOpenEditForm = (values: MeasurementUnitData) => {
        setOpenEditForm(true);
        setEditDefaultValues(values);
    };

    //

    const handleCloseEditForm = () => {
        setOpenEditForm(false);
        setEditDefaultValues(null);
    };

    return (
        <EditMeasurementCtx.Provider
            value={{
                editDefaultValues,
                handleCloseEditForm,
                handleOpenEditForm,
                openEditForm,
            }}
        >
            {children}
        </EditMeasurementCtx.Provider>
    );
}

export const useMeasurements = () => useContext(EditMeasurementCtx);
