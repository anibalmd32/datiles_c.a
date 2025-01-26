import { useMeasurements } from "../Providers/MeasurementsProvider";
import { useAlert } from "@/hooks/useAlert";
import { SubmitHandler, useForm } from "react-hook-form";
import { measurementSchema, MeasurementFormType } from "../schemas/measurementsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const useEditMeasurement = () => {
    const { editDefaultValues, updateMeasurement, handleCloseEditForm } = useMeasurements()
    const { emitErrorAlert, emitSuccessAlert } = useAlert()

    const form = useForm<MeasurementFormType>({
        defaultValues: { name: '' },
        resolver: zodResolver(measurementSchema)
    })

    const submitHandler: SubmitHandler<MeasurementFormType> = async (values) => {
        if (editDefaultValues) {
            await updateMeasurement.run({
                onSuccess: () => emitSuccessAlert('Unidad actualiza con éxito'),
                onError: () => emitErrorAlert('Error al actualizar unidad'),
                onFinish: () => handleCloseEditForm()
            }, {...editDefaultValues, name: values.name })
        }
    }

    useEffect(() => {
        if (editDefaultValues) {
            form.reset({ name: editDefaultValues.name })
        }
    }, [editDefaultValues])

    return {
        form,
        submitHandler,
    }
}