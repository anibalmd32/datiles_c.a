import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
    DataTableCol,
    DataTableContextMenu,
    DataTableRow as IDataTableRow,
} from "./DataTableTypes";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { motion, AnimatePresence } from "framer-motion";

interface Props<T> {
    row: IDataTableRow<T>;
    cols: DataTableCol<T>[];
    contextMenuItems: DataTableContextMenu<T>[];
    isExpanded: boolean;
    onToggle: () => void;
    rowIndex: number;
}

export function DataTableRow<T>({
    row,
    cols,
    contextMenuItems,
    isExpanded,
    onToggle,
    rowIndex,
}: Props<T>) {
    return (
        <>
            <TableRow key={`row-${rowIndex}`}>
                <TableCell className="w-10">
                    {row.expandedContent && (
                        <Button
                            onClick={onToggle}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="h-4 w-4" />
                            </motion.div>
                        </Button>
                    )}
                </TableCell>
                {cols.map((col, j) => (
                    <TableCell
                        key={j}
                        className="cursor-pointer"
                        style={{ width: "400px" }}
                    >
                        <ContextMenu>
                            <ContextMenuTrigger>
                                {row.render({
                                    field: row.field,
                                    colName: col.name,
                                })}
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                {contextMenuItems.map((item, k) => (
                                    <ContextMenuItem
                                        key={k}
                                        onClick={async () => {
                                            await item.action(row.field);
                                        }}
                                    >
                                        {item.label}
                                    </ContextMenuItem>
                                ))}
                            </ContextMenuContent>
                        </ContextMenu>
                    </TableCell>
                ))}
            </TableRow>
            <AnimatePresence>
                {isExpanded && row.expandedContent && (
                    <motion.tr
                        key={`expanded-${rowIndex}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                            transition: {
                                height: {
                                    duration: 0.3,
                                    ease: "easeOut",
                                },
                                opacity: {
                                    duration: 0.2,
                                    delay: 0.1,
                                },
                            },
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                                height: {
                                    duration: 0.3,
                                    ease: "easeIn",
                                },
                                opacity: {
                                    duration: 0.2,
                                },
                            },
                        }}
                    >
                        <td
                            colSpan={cols.length + 1}
                            className="bg-gray-50"
                            style={{ overflow: "hidden" }}
                        >
                            <motion.div
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                exit={{ y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {row.expandedContent}
                            </motion.div>
                        </td>
                    </motion.tr>
                )}
            </AnimatePresence>
        </>
    );
}
