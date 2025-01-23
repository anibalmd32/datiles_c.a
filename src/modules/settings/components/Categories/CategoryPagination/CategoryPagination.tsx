import { DataPagination } from "@/components/shared/DataTable/DataPagination";
import { useCategoryPagination } from "./useCategoryPagination";

export function CategoryPagination() {
    const pagination = useCategoryPagination()

    return (
        <div>
            <DataPagination
                currentPage={pagination.currentPage}
                onPageChange={pagination.onChangePages}
                totalPages={pagination.totalPages}
            />
        </div>
    )
}
