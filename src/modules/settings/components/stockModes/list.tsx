import { List, ListItem } from "@/components/shared/List/List";
import { BadgeX, MinusSquare, Pencil, PlusSquare, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStockModeList } from "../../hooks/useStockModeList";
import { useStockModesStore } from "../../stores/stockModesStore";
import { useStockModeActions } from "../../actions/stockModeActions";
import { useEffect, useState } from "react";
import { StockModeData } from "@/definitions/data";

const MeasurementUnits = () => {
    return (
        <div>
            <p>Unidades de medida</p>
        </div>
    );
};

function StockModeListItem({
    item,
    editAction,
    deleteAction,
}: {
  item: StockModeData;
  editAction: (item: StockModeData) => void;
  deleteAction: (item: StockModeData) => Promise<void>;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ListItem key={item.id}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize flex justify-center items-center gap-4">
                        <Button variant="ghost" onClick={() => setIsOpen((prev) => !prev)}>
                            {isOpen ? (
                                <MinusSquare className="hover:scale-105 transition-all duration-150 cursor-pointer" />
                            ) : (
                                <PlusSquare className="hover:scale-105 transition-all duration-150 cursor-pointer" />
                            )}
                        </Button>
                        {item.name}
                    </div>

                    {isOpen && <MeasurementUnits />}
                </div>
                <div className="flex gap-2">
                    <Button
                        size="icon"
                        onClick={() => editAction(item)}
                        variant="outline"
                    >
                        <Pencil className="text-blue-400 hover:scale-105 transition-all duration-150 cursor-pointer" />
                    </Button>
                    <Button
                        size="icon"
                        onClick={async () => deleteAction(item)}
                        variant="outline"
                    >
                        <Trash className="text-red-400 hover:scale-105 transition-all duration-150 cursor-pointer" />
                    </Button>
                </div>
            </div>
        </ListItem>
    );
}

export function StockModeDataList() {
    const { editAction, deleteAction } = useStockModeList();
    const stockModeData = useStockModesStore((store) => store.data);
    const { load } = useStockModeActions();

    useEffect(() => {
        load.run();
    }, []);

    return (
        <List>
            {stockModeData.length === 0 && (
                <p className="flex justify-center items-center gap-2 w-full m-auto">
                    <span>Sin Datos</span> <BadgeX />
                </p>
            )}
            {stockModeData.map((item) => (
                <StockModeListItem
                    key={item.id}
                    item={item}
                    editAction={editAction}
                    deleteAction={deleteAction}
                />
            ))}
        </List>
    );
}
