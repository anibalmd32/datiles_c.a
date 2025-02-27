import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
import { DataTableProps } from "./DataTableTypes";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableLoading } from "./DataTableLoading";
import { DataTableEmpty } from "./DataTableEmpty";
import { DataTableRow } from "./DataTableRow";

export function DataTable<T>({
    cols,
    rows,
    loading,
    contextMenuItems,
}: DataTableProps<T>) {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const toggleRow = (index: number) => {
        setExpandedRows((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index],
        );
    };

    return (
        <div className="overflow-x-auto">
            <Table className="border rounded-sm min-w-full">
                <DataTableHeader cols={cols} />
                <TableBody className="relative">
                    {loading && <DataTableLoading colSpan={cols.length + 1} />}
                    {rows.length === 0 && !loading && (
                        <DataTableEmpty colSpan={cols.length + 1} />
                    )}
                    {rows.length > 0 &&
                        rows.map((row, i) => (
                            <DataTableRow
                                key={i}
                                row={row}
                                cols={cols}
                                contextMenuItems={contextMenuItems}
                                isExpanded={expandedRows.includes(i)}
                                onToggle={() => toggleRow(i)}
                                rowIndex={i}
                            />
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}

// Re-export types for convenience
export * from "./DataTableTypes";
