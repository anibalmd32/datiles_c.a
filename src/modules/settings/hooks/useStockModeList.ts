import { useAlert } from "@/hooks/useAlert";
import { StockModeData } from "@/definitions/data";
import { useStockModeActions } from "../actions/stockModeActions";
import { useEditStockMode } from "./useEditStockMode";

export const useStockModeList = () => {
    const { remove } = useStockModeActions();
    const { form, setOpenForm, setItemToEdit } = useEditStockMode();
    const { emitErrorAlert, emitSuccessAlert } = useAlert();

    const editAction = (item: StockModeData) => {
        setOpenForm(true);
        setItemToEdit(item);
        form.setValue("name", item.name);
    };

    const deleteAction = async (item: StockModeData) => {
        await remove.run(
            {
                onSuccess: () => emitSuccessAlert("Modo de almacenamiento eliminado"),
                onError: () =>
                    emitErrorAlert("Error al eliminar el modo de almacenamiento"),
            },
            item,
        );
    };

    return {
        editAction,
        deleteAction,
    };
};
