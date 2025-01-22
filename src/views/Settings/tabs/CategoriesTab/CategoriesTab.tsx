// Components
import { DataTable } from "@/components/shared/DataTable/DataTable";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SearchInput } from "@/components/shared/SearchInput/SearchInput";
import { LoaderSpinner } from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { DataPagination } from "@/components/shared/DataTable/DataPagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Hooks
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore";
import { useDeleteCategory } from "./useDeleteCategory/useDeleteCategory";
import { useCategoryFilters } from "./useCategoryFilters/useCategoryFilters";
import { useCategoryTable } from "./useCategoryTable/useCategoryTable";
import { useCategoryForm } from "./useCategoryForm/useCategoryForm";
import { useEffect } from "react";
import { ArrowRightCircle } from 'lucide-react'

// Tab Element
export function CategoriesTab() {
    const { loadCategories, addCategory, categories } = useCategoriesStore()
    const { handleDeleteCategory } = useDeleteCategory()
    const { categoryTableRows, categoryTableCols } = useCategoryTable()
    const { categoryForm, handleSubmitCategory, handleEditCategory } = useCategoryForm()
    const { handleSearchFilter, searchFilter } = useCategoryFilters()

    useEffect(() => {
        loadCategories.run()
    }, [loadCategories])
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de categorías</CardTitle>
                <CardDescription>Categorías que se le asignan a un producto para un mejor control</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <div className="flex gap-2">
                    <SearchInput
                        value={searchFilter}
                        onExternalChange={(e) => {
                            handleSearchFilter(e.target.value)
                        }}
                        placeholder="Buscar categoría"
                    />
                    <Form {...categoryForm}>
                        <form autoComplete="off" onSubmit={handleSubmitCategory} className="flex gap-2">
                            <FormField
                                control={categoryForm.control}
                                name='name'
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Agregar categoría" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <Button type="submit">
                                {addCategory.isLoading && <LoaderSpinner color="white" loading={addCategory.isLoading} />}
                                {!addCategory.isLoading && <ArrowRightCircle />}
                            </Button>
                        </form>
                    </Form>

                </div>
                <div>
                    <DataTable
                        cols={categoryTableCols}
                        rows={categoryTableRows}
                        loading={loadCategories.isLoading}
                        contextMenuItems={[
                            {
                                label: 'Editar',
                                action: async (field) => {
                                    categoryForm.setValue('name', field.name)
                                    handleEditCategory(field.id)
                                }
                            },
                            {
                                label: 'Eliminar',
                                action: async (filed) => {
                                    await handleDeleteCategory(filed)
                                }
                            }
                        ]}
                    />
                    <DataPagination
                        currentPage={categories.currentPage}
                        onPageChange={async (pageNumber) => {
                            // TODO: Actualizar la pagina actual a la pagina entrante
                            // TODO: Modificar el componente para que vaya a la pagina actual después de la ejecución de la función
                            console.log('Visitando la pagina:', pageNumber)
                        }}
                        totalPages={categories.totalPages}
                    />
                </div>
            </CardContent>

        </Card>
    )
}