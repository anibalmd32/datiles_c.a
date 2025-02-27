import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableCol } from "./DataTableTypes";

interface Props<T> {
    cols: DataTableCol<T>[];
}

export function DataTableHeader<T>({ cols }: Props<T>) {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-10"></TableHead>
                {cols.map((col, i) => (
                    <TableHead
                        key={i}
                        className={`text-${col.position} font-bold`}
                        style={{ width: "400px" }}
                    >
                        {col.label}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
    );
}
