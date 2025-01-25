import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore";
import { useEffect, useState } from "react";
import { UpdateCategoryProvider } from "../../Providers/UpdateCategoryProvider";
import { Modal } from "@/components/shared/Modal/Modal";
import { AddCategoryForm } from "./AddCategoryForm";
import { Category, SharedDataProp } from "@/definitions/data";
import { SearchInput } from "@/components/shared/SearchInput/SearchInput";
import { DataTable } from "@/components/shared/DataTable/DataTable";
import { categoryTableRows } from "./categoryTableRows";
import { useToast } from "@/hooks/use-toast";
import { DataPagination } from "@/components/shared/DataTable/DataPagination";
import { EditCategoryForm } from "./EditCategoryForm";

export type CategoryData = Category & SharedDataProp

export default function CategoriesTab() {
    const [openModal, setOpenModal] = useState(false)
    const [defaultData, setDefaultData] = useState<CategoryData>()

    const { toast } = useToast()

    const {
        loadCategories,
        filters,
        categories,
        deleteCategory,
        pagination
    } = useCategoriesStore()

    const handleOpenForm = (data: CategoryData) => {
        setDefaultData(data)
        setOpenModal(true)
    }

    const handleCloseForm = () => {
        setDefaultData(undefined)
        setOpenModal(false)
    }

    useEffect(() => {
        loadCategories.run()
    }, [loadCategories])

    return (
        <UpdateCategoryProvider>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full">
                    <SearchInput
                        placeholder="Buscar categoría"
                        value={filters.search}
                        onExternalChange={async (e) => {
                            filters.setSearch(e.target.value)
                        }}
                    />
                </div>
                <AddCategoryForm />
            </div>
            <div>
                <DataTable
                    cols={[
                        {
                            label: 'Nro',
                            name: 'id',
                            position: 'center'
                        },
                        {
                            label: 'Nombre',
                            name: 'name',
                            position: 'center'
                        },
                        {
                            label: 'Fecha de creación',
                            name: 'created_at',
                            position: 'center'
                        }
                    ]}
                    rows={categoryTableRows(categories)}
                    loading={loadCategories.isLoading}
                    contextMenuItems={[
                        {
                            action: async (row) => {
                                handleOpenForm(row)
                            },
                            label: 'Editar'
                        },
                        {
                            action: async (row) => {
                                await deleteCategory.run({
                                    onSuccess: async () => {
                                        await loadCategories.run()
                                        toast({ title: 'Categoría Eliminada con éxito'})
                                    },
                                    onError: (err) => toast({
                                        title: 'Error al eliminar categoría',
                                        description: err,
                                        variant: 'destructive'
                                    })
                                }, row)
                            },
                            label: 'Eliminar'
                        }
                    ]}
                />
                <DataPagination
                    currentPage={pagination.currentPage}
                    onPageChange={(page) => {
                        pagination.setCurrentPage(page)
                    }}
                    totalPages={pagination.totalPages}
                    isLoadingData={loadCategories.isLoading}
                />
            </div>
            <Modal
                isOpen={openModal}
                title="Actualizar el nombre de la categoría"
                onClose={handleCloseForm}
            >
                <EditCategoryForm
                    closeForm={handleCloseForm}
                    defaultValues={defaultData}
                />
            </Modal>
        </UpdateCategoryProvider>
    )
}
