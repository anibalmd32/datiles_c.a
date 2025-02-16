import { useContext, createContext, useState, ReactNode } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StockModeFormType, stockModeSchema } from "../schemas/stockModeSchema";
import { useStockModeActions } from "../actions/stockModeActions";
import { useAlert } from "@/hooks/useAlert";
import { StockModeData } from "@/definitions/data";

const EditStockModeContext = createContext(
  {} as {
    openForm: boolean;
    setOpenForm: (value: boolean) => void;
    setItemToEdit: (values: StockModeData) => void;
    form: UseFormReturn<StockModeFormType>;
    submitHandler: SubmitHandler<StockModeFormType>;
  },
);

export const EditStockModeProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const [openForm, setOpenForm] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<StockModeData>();

    const form = useForm<StockModeFormType>({
        defaultValues: { name: "" },
        resolver: zodResolver(stockModeSchema),
    });

    const { update } = useStockModeActions();
    const { emitErrorAlert, emitSuccessAlert } = useAlert();

    const resetForm = () => {
        setOpenForm(false);
        form.reset();
    };

    const submitHandler: SubmitHandler<StockModeFormType> = async (values) => {
        if (itemToEdit) {
            await update.run(
                {
                    onSuccess: () => emitSuccessAlert("Actualizado con éxito"),
                    onError: () => emitErrorAlert("Error al actualizar"),
                    onFinish: () => resetForm(),
                },
                { ...itemToEdit, name: values.name },
            );
        }
    };

    return (
        <EditStockModeContext.Provider
            value={{
                openForm,
                setOpenForm,
                form,
                setItemToEdit,
                submitHandler,
            }}
        >
            {children}
        </EditStockModeContext.Provider>
    );
};

export const useEditStockMode = () => useContext(EditStockModeContext);
