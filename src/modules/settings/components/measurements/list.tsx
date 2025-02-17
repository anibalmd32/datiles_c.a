import { useEffect } from "react";
import { MeasurementUnitForm } from "./forms";
import { Check, Plus } from "lucide-react";
import { useMeasurementsUnitForm } from "../../hooks/useMeasurementUnitForm";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MeasurementUnitData } from "@/definitions/data";

type Props = {
    stockModeId: number;
    measurements: MeasurementUnitData[];
};

export const MeasurementUnitsDataList = ({
    stockModeId,
    measurements,
}: Props) => {
    const { handleOpenForm, form, handleDelete } = useMeasurementsUnitForm();

    useEffect(() => {
        if (stockModeId) {
            form.setValue("stock_mode_id", stockModeId);
        }
    }, [stockModeId]);

    return (
        <div className="relative p-6">
            <div className="flex justify-between items-center absolute top-0 right-0">
                <Button
                    variant={"ghost"}
                    onClick={() => handleOpenForm({ id: stockModeId })}
                >
                    <Plus className="text-green-400" />
                </Button>
            </div>
            <ul className="mt-2">
                {measurements.length === 0 && (
                    <p className="text-center text-sm text-gray-500">
                        Agrega unidades de medida para este modo de
                        almacenamiento
                    </p>
                )}
                {measurements.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center"
                    >
                        <span className="flex gap-2">
                            <Check />
                            {item.name}
                        </span>

                        <DropdownMenu>
                            <DropdownMenuTrigger>...</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    Unidad de medida
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        handleOpenForm(item);
                                    }}
                                >
                                    Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={async () =>
                                        await handleDelete(item)
                                    }
                                >
                                    Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>
                ))}
            </ul>

            <MeasurementUnitForm />
        </div>
    );
};
