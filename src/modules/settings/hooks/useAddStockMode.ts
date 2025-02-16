import { SubmitHandler, useForm } from "react-hook-form";
import { StockModeFormType, stockModeSchema } from "../schemas/stockModeSchema";
import { useAlert } from "@/hooks/useAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStockModeActions } from "../actions/stockModeActions";

export const useAddStockMode = () => {
    const { add } = useStockModeActions()
    const { emitErrorAlert, emitSuccessAlert } = useAlert()

    const form = useForm<StockModeFormType>({
        defaultValues: { name: '' },
        resolver: zodResolver(stockModeSchema)
    })

    const submitHandler: SubmitHandler<StockModeFormType> = async (values) => {
        await add.run({
            onSuccess: () => emitSuccessAlert('Modo de almacenamiento agregado con éxito'),
            onError: () => emitErrorAlert('No se pudo agregar el modo de almacenamiento'),
            onFinish: () => form.reset()
        }, values)
    }

    return {
        form,
        submitHandler,
    }
}
