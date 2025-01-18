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

export type DataTableRow<T> = {
    field: T;
    render: ({ field, colName }: { field: T; colName: keyof T }) => React.ReactNode;
}

export type DataTableCol<T> = {
    position: 'center' | 'start' | 'end';
    name: keyof T;
    label: string;
}

interface Props<T> {
    cols: DataTableCol<T>[];
    rows: DataTableRow<T>[];
}

export function DataTable<T>({ cols, rows }: Props<T>) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {cols.map((col, i) => {
                            return (
                                <TableHead key={i} className={`text-${col.position}`}>
                                    {col.label}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={cols.length} className="text-md">
                                <p className="flex justify-center items-center gap-2 w-full m-auto">
                                    <span>Vacía</span> <BadgeX />
                                </p>
                            </TableCell>
                        </TableRow>
                    )}
                    {rows.map((row, i) => {
                        return (
                            <TableRow key={i}>
                                {cols.map((col, i) => {
                                    return (
                                        <TableCell key={i}>
                                            {row.render({ field: row.field, colName: col.name })}
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