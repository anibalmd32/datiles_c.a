import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";
import { BadgeX } from "lucide-react";
import { LoaderSpinner } from "../LoaderSpinner/LoaderSpinner";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

export type DataTableRow<T> = {
  field: T;
  render: ({
      field,
      colName,
  }: {
    field: T;
    colName: keyof T;
  }) => React.ReactNode;
};

export type DataTableCol<T> = {
  position: "center" | "start" | "end";
  name: keyof T;
  label: string;
};

export type DataTableContextMenu<T> = {
  label: string;
  action: (row: T) => Promise<void>;
};

interface Props<T> {
  cols: DataTableCol<T>[];
  rows: DataTableRow<T>[];
  loading: boolean;
  contextMenuItems: DataTableContextMenu<T>[];
}

export function DataTable<T>({
    cols,
    rows,
    loading,
    contextMenuItems,
}: Props<T>) {
    return (
        <div className="overflow-x-auto">
            <Table className="border rounded-sm min-w-full">
                <TableHeader>
                    <TableRow>
                        {cols.map((col, i) => {
                            return (
                                <TableHead
                                    key={i}
                                    className={`text-${col.position} font-bold`}
                                    style={{ width: "400px" }}
                                >
                                    {col.label}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody className="relative">
                    {loading && (
                        <TableRow className="absolute left-0 right-0 top-0 bottom-0 w-full">
                            <TableCell colSpan={cols.length}>
                                <div className="m-auto bg-gray-100 bg-transparent animate-pulse flex justify-center gap-2 items-center absolute left-0 right-0 top-0 bottom-0 w-full">
                                    <LoaderSpinner />
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                    {rows.length === 0 && !loading && (
                        <TableRow>
                            <TableCell colSpan={cols.length} className="text-md">
                                <p className="flex justify-center items-center gap-2 w-full m-auto">
                                    <span>Sin Datos</span> <BadgeX />
                                </p>
                            </TableCell>
                        </TableRow>
                    )}
                    {rows.length > 0 &&
            rows.map((row, i) => {
                return (
                    <TableRow key={i}>
                        {cols.map((col, i) => {
                            return (
                                <TableCell
                                    key={i}
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
                                            {contextMenuItems.map((item, j) => {
                                                return (
                                                    <ContextMenuItem
                                                        key={j}
                                                        onClick={async () => {
                                                            await item.action(row.field);
                                                        }}
                                                    >
                                                        {item.label}
                                                    </ContextMenuItem>
                                                );
                                            })}
                                        </ContextMenuContent>
                                    </ContextMenu>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
                </TableBody>
            </Table>
        </div>
    );
}
