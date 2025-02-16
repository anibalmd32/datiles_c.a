import { SubmitHandler, useForm } from "react-hook-form";
import { useMeasurements } from "../Providers/MeasurementsProvider";
import {
    measurementSchema,
    MeasurementFormType,
} from "../schemas/measurementsSchema";
import { useAlert } from "@/hooks/useAlert";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAddMeasurement = () => {
    const { addMeasurement } = useMeasurements();
    const { emitErrorAlert, emitSuccessAlert } = useAlert();

    const form = useForm<MeasurementFormType>({
        defaultValues: { name: "" },
        resolver: zodResolver(measurementSchema),
    });

    const submitHandler: SubmitHandler<MeasurementFormType> = async (values) => {
        await addMeasurement.run(
            {
                onSuccess: () => emitSuccessAlert("Unidad agregada con éxito"),
                onError: () => emitErrorAlert("No se pudo agregar la unidad"),
                onFinish: () => form.reset(),
            },
            values,
        );
    };

    return {
        form,
        submitHandler,
    };
};
