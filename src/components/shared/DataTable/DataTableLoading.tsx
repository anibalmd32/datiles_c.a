import { TableCell, TableRow } from "@/components/ui/table";
import { LoaderSpinner } from "../LoaderSpinner/LoaderSpinner";

interface Props {
    colSpan: number;
}

export function DataTableLoading({ colSpan }: Props) {
    return (
        <TableRow className="absolute left-0 right-0 top-0 bottom-0 w-full">
            <TableCell colSpan={colSpan}>
                <div className="m-auto bg-gray-100 bg-transparent animate-pulse flex justify-center gap-2 items-center absolute left-0 right-0 top-0 bottom-0 w-full">
                    <LoaderSpinner />
                </div>
            </TableCell>
        </TableRow>
    );
}
