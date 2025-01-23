import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from "react";
import { BadgeX } from 'lucide-react'
import { LoaderSpinner } from "../LoaderSpinner/LoaderSpinner";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

export type DataTableRow<T> = {
    field: T;
    render: ({ field, colName }: { field: T; colName: keyof T }) => React.ReactNode;
}

export type DataTableCol<T> = {
    position: 'center' | 'start' | 'end';
    name: keyof T;
    label: string;
}

export type DataTableContextMenu<T> = {
    label: string;
    action: (row: T) => Promise<void>;
}

interface Props<T> {
    cols: DataTableCol<T>[];
    rows: DataTableRow<T>[];
    loading: boolean;
    contextMenuItems: DataTableContextMenu<T>[]
}

export function DataTable<T>({ cols, rows, loading, contextMenuItems }: Props<T>) {
    return (
        <div>
            <Table className="border rounded-sm">
                <TableHeader>
                    <TableRow>
                        {cols.map((col, i) => {
                            return (
                                <TableHead key={i} className={`text-${col.position} font-bold`}>
                                    {col.label}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading && (
                        <TableRow>
                            <TableCell colSpan={cols.length}>
                                <div className="m-auto w-full flex justify-center gap-2 items-center">
                                    <p>Cargando...</p> <LoaderSpinner />
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
                    {rows.length > 0 && rows.map((row, i) => {
                        return (
                            <TableRow key={i}>
                                {cols.map((col, i) => {
                                    return (
                                        <TableCell key={i} className="cursor-pointer">
                                            <ContextMenu>
                                                <ContextMenuTrigger>
                                                    {row.render({ field: row.field, colName: col.name })}
                                                </ContextMenuTrigger>
                                                <ContextMenuContent>
                                                    {contextMenuItems.map((item, j) => {
                                                        return (
                                                            <ContextMenuItem key={j} onClick={async () => {
                                                                await item.action(row.field)
                                                            }}>
                                                                {item.label}
                                                            </ContextMenuItem>
                                                        )
                                                    })}
                                                </ContextMenuContent>
                                            </ContextMenu>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
