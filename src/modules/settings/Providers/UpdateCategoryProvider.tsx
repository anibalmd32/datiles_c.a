import { Category, SharedDataProp } from "@/definitions/data";
import React, { useState, createContext, useContext } from "react";
import { UpdateCategoryForm } from "../components/Categories/CategoryForm/UpdateCategoryForm/UpdateCategoryForm";

const UpdateCategoryCtx = createContext({} as {
    openUpdateCategory: boolean;
    categoryToUpdateValues: (Category & SharedDataProp) | null;
    handleOpenForm: (categoryValues: Category & SharedDataProp) => void;
    handleCloseForm: () => void
})

export function UpdateCategoryProvider({ children }: { children: React.ReactNode }) {
    const [openUpdateCategory, setOpenUpdateCategory] = useState(false)
    const [categoryToUpdateValues, setCategoryToUpdateValues] = useState<Category & SharedDataProp | null>(null)

    const handleOpenForm = (categoryValues: Category & SharedDataProp) => {
        setOpenUpdateCategory(true)
        setCategoryToUpdateValues(categoryValues)
    }

    const handleCloseForm = () => {
        setOpenUpdateCategory(false)
        setCategoryToUpdateValues(null)
    }

    return (
        <UpdateCategoryCtx.Provider value={{
            categoryToUpdateValues,
            handleOpenForm,
            openUpdateCategory,
            handleCloseForm
        }}>
            {children}
            <UpdateCategoryForm />
        </UpdateCategoryCtx.Provider>
    )
}

export const useUpdateCategoryCtx = () => useContext(UpdateCategoryCtx)
