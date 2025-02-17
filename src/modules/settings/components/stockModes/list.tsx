import { List, ListItem } from "@/components/shared/List/List";
import { BadgeX, MinusSquare, Pencil, PlusSquare, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStockModeList } from "../../hooks/useStockModeList";
import { useStockModesStore } from "../../stores/stockModesStore";
import { useStockModeActions } from "../../actions/stockModeActions";
import { useEffect, useState } from "react";
import { MeasurementUnitData, StockModeData } from "@/definitions/data";
import { MeasurementUnitsDataList } from "../measurements/list";
import { MeasurementsUnitFormProvider } from "../../hooks/useMeasurementUnitForm";
import { motion, AnimatePresence } from "framer-motion";

function StockModeListItem({
    item,
    editAction,
    deleteAction,
}: {
    item: StockModeData & { measurements: MeasurementUnitData[] };
    editAction: (item: StockModeData) => void;
    deleteAction: (item: StockModeData) => Promise<void>;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ListItem key={item.id} className="relative">
            {" "}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize flex justify-center items-center gap-4">
                        <Button variant="ghost">
                            {isOpen ? (
                                <MinusSquare className="hover:scale-105 transition-all duration-150 cursor-pointer" />
                            ) : (
                                <PlusSquare className="hover:scale-105 transition-all duration-150 cursor-pointer" />
                            )}
                        </Button>
                        {item.name}
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            editAction(item);
                        }}
                        variant="outline"
                    >
                        <Pencil className="text-blue-400 hover:scale-105 transition-all duration-150 cursor-pointer" />
                    </Button>
                    <Button
                        size="icon"
                        onClick={async (e) => {
                            e.stopPropagation();
                            deleteAction(item);
                        }}
                        variant="outline"
                    >
                        <Trash className="text-red-400 hover:scale-105 transition-all duration-150 cursor-pointer" />
                    </Button>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                        className="top-full left-0 w-full bg-white shadow-md rounded mt-4"
                    >
                        <MeasurementsUnitFormProvider>
                            <MeasurementUnitsDataList
                                stockModeId={item.id}
                                measurements={item.measurements}
                            />
                        </MeasurementsUnitFormProvider>
                    </motion.div>
                )}
            </AnimatePresence>
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
