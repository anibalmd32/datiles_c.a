import { TableCell, TableRow } from "@/components/ui/table";
import { BadgeX } from "lucide-react";

interface Props {
    colSpan: number;
}

export function DataTableEmpty({ colSpan }: Props) {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} className="text-md">
                <p className="flex justify-center items-center gap-2 w-full m-auto">
                    <span>Sin Datos</span> <BadgeX />
                </p>
            </TableCell>
        </TableRow>
    );
}
