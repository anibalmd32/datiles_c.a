import { ReactNode } from "react";

export type DataTableRow<T> = {
    field: T;
    render: ({
        field,
        colName,
    }: {
        field: T;
        colName: keyof T;
    }) => ReactNode;
    expandedContent?: ReactNode;
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

export interface DataTableProps<T> {
    cols: DataTableCol<T>[];
    rows: DataTableRow<T>[];
    loading: boolean;
    contextMenuItems: DataTableContextMenu<T>[];
}