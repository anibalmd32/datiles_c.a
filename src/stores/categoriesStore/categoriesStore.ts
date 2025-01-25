import { create } from 'zustand'
import { Category, SharedDataProp } from '@/definitions/data'
import { AsyncSlice } from '@/lib/asyncSlices'
import { loadCategoriesSlice } from './categorySlices/loadCategoriesSlice'
import { deleteCategorySlice } from './categorySlices/deleteCategorySlice'
import { updateCategorySlice } from './categorySlices/updateCategorySlice'
import { addCategorySlice } from './categorySlices/addCategorySlice'
import { FilterState, PaginationState } from '@/definitions/helpers'

export type CategoriesBaseState = {
    categories: Array<Category & SharedDataProp>;
    pagination: PaginationState;
    filters: FilterState
}

type CategoryAsyncSlices = {
    loadCategories: AsyncSlice<Category[]>;
    addCategory: AsyncSlice<Category>;
    updateCategory: AsyncSlice<Category>;
    deleteCategory: AsyncSlice<Category>;
}

export const useCategoriesStore = create<
CategoriesBaseState & CategoryAsyncSlices
>()((...a) => ({
    categories: [],
    pagination: {
        currentPage: 1,
        pageSize: 5,
        totalPages: 0,
        setCurrentPage: (page) => {
            const [set] = a
            set((prev) => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    currentPage: page
                }
            }))
        },
        setPageSize: (size) => {
            const [set] = a
            set((prev) => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    pageSize: size
                }
            }))
        }
    },
    filters: {
        search: '',
        setSearch: (value) => {
            const [set] = a
            set((prev) => ({
                ...prev,
                filters: {
                    ...prev.filters,
                    search: value
                }
            }))
        }
    },
    addCategory: addCategorySlice(...a),
    deleteCategory: deleteCategorySlice(...a),
    loadCategories: loadCategoriesSlice(...a),
    updateCategory: updateCategorySlice(...a)
}))
