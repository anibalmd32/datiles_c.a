import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryFilters } from "./CategoryFilters/CategoryFilters";
import { AddCategoryForm } from "./CategoryForm/AddCategoryForm/AddCategoryForm";
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore";
import { useEffect } from "react";
import { CategoryTable } from "./CategoryTable/CategoryTable";

export default function CategoriesTab() {
    const loadCategories = useCategoriesStore(store => store.loadCategories)

    useEffect(() => {
        loadCategories.run()
    }, [loadCategories])
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de categorías</CardTitle>
                <CardDescription>
                    Categorías que se le asignan a un producto para un mejor control
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex gap-2">
                    <CategoryFilters />
                    <AddCategoryForm />
                </div>
                <div>
                    <CategoryTable />
                </div>
            </CardContent>
        </Card>
    )
}
