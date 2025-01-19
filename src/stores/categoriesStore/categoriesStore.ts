import { create } from 'zustand'
import { Category, SharedDataProp } from '@/definitions/data'
import { AsyncSlice } from '@/lib/asyncSlices'
import { loadCategoriesSlice } from './categorySlices/loadCategoriesSlice'
import { deleteCategorySlice } from './categorySlices/deleteCategorySlice'
import { updateCategorySlice } from './categorySlices/updateCategorySlice'
import { addCategorySlice } from './categorySlices/addCategorySlice'
import { PaginatedData } from '@/definitions/helpers'

export type CategoriesBaseState = {
    categories: PaginatedData<Array<Category & SharedDataProp>>
}

type CategoryAsyncSlices = {
    loadCategories: AsyncSlice<PaginatedData<Category[]>>;
    addCategory: AsyncSlice<Category>;
    updateCategory: AsyncSlice<Category>;
    deleteCategory: AsyncSlice<Category>;
}

export const useCategoriesStore = create<CategoriesBaseState & CategoryAsyncSlices>()((...a) => ({
    categories: {
        currentPage: 1,
        data: [],
        nextPage: 2,
        pageSize: 5,
        prevPage: 0,
        totalPages: 0
    } as PaginatedData<Array<Category & SharedDataProp>>,
    addCategory: addCategorySlice(...a),
    deleteCategory: deleteCategorySlice(...a),
    loadCategories: loadCategoriesSlice(...a),
    updateCategory: updateCategorySlice(...a)
}))
