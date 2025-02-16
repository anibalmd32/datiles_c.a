import { createContext, ReactNode, useContext, useState } from "react";
import { MeasurementUnitData } from "@/definitions/data";

const MeasurementCtx = createContext(
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

    const handleCloseEditForm = () => {
        setOpenEditForm(false);
        setEditDefaultValues(null);
    };

    return (
        <MeasurementCtx.Provider
            value={{
                editDefaultValues,
                handleCloseEditForm,
                handleOpenEditForm,
                openEditForm,
            }}
        >
            {children}
        </MeasurementCtx.Provider>
    );
}

export const useMeasurements = () => useContext(MeasurementCtx);
