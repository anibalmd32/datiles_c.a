import { AddCategoryForm, EditCategoryForm } from "../components/categories/forms";
import { SearchCategoriesFilter } from "../components/categories/filters";
import { CategoriesDataTable } from "../components/categories/table";
import { CategoriesPagination } from "../components/categories/pagination";

export default function CategoriesTab() {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex gap-2 justify-between">
                <SearchCategoriesFilter />
                <AddCategoryForm />
            </div>
            <div className="w-full flex flex-col justify-between gap-2 min-h-[500px]">
                <CategoriesDataTable />
                <CategoriesPagination />
            </div>

            <EditCategoryForm />
        </div>
    )
}
