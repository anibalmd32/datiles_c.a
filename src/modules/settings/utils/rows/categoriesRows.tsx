import { formatEsFullDate } from "@/lib/utils";
import { CategoryData } from "@/definitions/data";
import { DataTableRow } from "@/components/shared/DataTable/DataTable";

export const categoryTableRows = (
    data: CategoryData[],
): DataTableRow<CategoryData>[] => {
    return data.map((category) => ({
        field: category,
        render: ({ colName, field }) => {
            if (colName === "id") {
                return <div className="text-center">{field.id}</div>;
            }

            if (colName === "name") {
                return <div className="text-center">{field.name}</div>;
            }

            if (colName === "created_at") {
                return (
                    <div className="text-center">
                        {formatEsFullDate(field.created_at)}
                    </div>
                );
            }
        },
    }));
};
