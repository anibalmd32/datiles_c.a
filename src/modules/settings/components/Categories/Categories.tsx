import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryFilters } from "./CategoryFilters/CategoryFilters";
import { AddCategoryForm } from "./CategoryForm/AddCategoryForm/AddCategoryForm";
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore";
import { useEffect } from "react";
import { CategoryTable } from "./CategoryTable/CategoryTable";
import { CategoryPagination } from "./CategoryPagination/CategoryPagination";
import { UpdateCategoryProvider } from "../../Providers/UpdateCategoryProvider";
import { UpdateCategoryForm } from "./CategoryForm/UpdateCategoryForm/UpdateCategoryForm";

export default function CategoriesTab() {
    const loadCategories = useCategoriesStore(store => store.loadCategories)

    useEffect(() => {
        loadCategories.run()
    }, [loadCategories])
    
    return (
        <UpdateCategoryProvider>
            <Card className="md:max-w-xl">
                <CardHeader>
                    <CardTitle>Lista de categorías</CardTitle>
                    <CardDescription>
                        Categorías que se le asignan a un producto para un mejor control
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex flex-col md:flex-row gap-2">
                        <CategoryFilters />
                        <AddCategoryForm />
                    </div>
                    <div>
                        <CategoryTable />
                        <CategoryPagination />
                    </div>
                </CardContent>
            </Card>
            <UpdateCategoryForm />
        </UpdateCategoryProvider>
    )
}
