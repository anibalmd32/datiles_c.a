import { MeasurementUnitData } from "@/definitions/data";
import { createContext, ReactNode, useContext, useState } from "react";
import {
    measurementSchema,
    MeasurementFormType,
} from "../schemas/measurementsSchema";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMeasurementsActions } from "../actions/measurementActions";
import { useAlert } from "@/hooks/useAlert";
import { useStockModeActions } from "../actions/stockModeActions";

const MeasurementUnitFormCtx = createContext(
    {} as {
        openForm: boolean;
        editDefaultValues: MeasurementUnitData | null;
        handleOpenForm: (values?: Partial<MeasurementUnitData>) => void;
        handleCloseEditForm: () => void;
        form: UseFormReturn<MeasurementFormType>;
        submitHandler: SubmitHandler<MeasurementFormType>;
        setStockModeId: (value: number) => void;
        handleDelete: (values: MeasurementUnitData) => Promise<void>;
    },
);

export function MeasurementsUnitFormProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [openForm, setOpenForm] = useState(false);
    const [stockModeId, setStockModeId] = useState(0);
    const [editDefaultValues, setEditDefaultValues] =
        useState<MeasurementUnitData | null>(null);

    const form = useForm<MeasurementFormType>({
        defaultValues: { name: "", stock_mode_id: stockModeId },
        resolver: zodResolver(measurementSchema),
    });

    const { load } = useStockModeActions();

    const { addMeasurement, updateMeasurement, deleteMeasurement } =
        useMeasurementsActions();
    const { emitErrorAlert, emitSuccessAlert } = useAlert();

    const handleOpenForm = (values?: Partial<MeasurementUnitData>) => {
        setOpenForm(true);
        if (values?.id) {
            setStockModeId(values.id);
            form.setValue("stock_mode_id", values.id);
        }
        if (values?.name) {
            setEditDefaultValues(values as MeasurementUnitData);
            form.setValue("name", values.name);
        }
    };

    const handleCloseEditForm = () => {
        setOpenForm(false);
        setEditDefaultValues(null);
        form.reset({ name: "" });
    };

    const handleDelete = async (values: MeasurementUnitData) => {
        await deleteMeasurement.run(
            {
                onSuccess: async () => {
                    emitSuccessAlert("Eliminado");
                    load.run();
                },
                onError: () => emitErrorAlert("Error al eliminar"),
            },
            values,
        );
    };

    const submitHandler: SubmitHandler<MeasurementFormType> = async (
        values,
    ) => {
        if (editDefaultValues) {
            await updateMeasurement.run(
                {
                    onSuccess: () => emitSuccessAlert("Actualización exitosa"),
                    onError: () => emitErrorAlert("Error al actualizar"),
                    onFinish: () => handleCloseEditForm(),
                },
                { ...editDefaultValues, name: values.name },
            );
        } else {
            await addMeasurement.run(
                {
                    onSuccess: () => emitSuccessAlert("Agregado con éxito"),
                    onError: () => emitErrorAlert("Error al agregar"),
                    onFinish: () => handleCloseEditForm(),
                },
                values,
            );
        }

        await load.run();
    };

    return (
        <MeasurementUnitFormCtx.Provider
            value={{
                editDefaultValues,
                handleCloseEditForm,
                handleOpenForm,
                openForm,
                form,
                submitHandler,
                setStockModeId,
                handleDelete,
            }}
        >
            {children}
        </MeasurementUnitFormCtx.Provider>
    );
}

export const useMeasurementsUnitForm = () => useContext(MeasurementUnitFormCtx);
