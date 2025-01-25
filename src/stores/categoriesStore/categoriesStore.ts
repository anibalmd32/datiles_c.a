// Zustand imports
import { create, StateCreator } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

// Data Definitions
import { CategoryData, Category } from '@/definitions/data'

// Async Slices
import { AsyncSlice } from '@/lib/asyncSlices'
import { loadCategoriesSlice } from './categorySlices/loadCategoriesSlice'
import { deleteCategorySlice } from './categorySlices/deleteCategorySlice'
import { updateCategorySlice } from './categorySlices/updateCategorySlice'
import { addCategorySlice } from './categorySlices/addCategorySlice'

// Utilities slices
import { createPaginationSlice, PaginationState } from "@/lib/paginationSlice";
import { createFilterSlice, FilterState } from '@/lib/filtersSlice'

// Base Data State Definition
export type CategoriesBaseState = {
    categories: Array<CategoryData>;
    pagination: PaginationState;
    filters: FilterState
}

// Async Slices Schema definition
type CategoryAsyncSlices = {
    loadCategories: AsyncSlice<Category[]>;
    addCategory: AsyncSlice<Category>;
    updateCategory: AsyncSlice<Category>;
    deleteCategory: AsyncSlice<Category>;
}

// Create state with base state and async slices combined
const combinedStore: StateCreator<
    CategoriesBaseState & CategoryAsyncSlices
> = (...args) => ({
    categories: [],
    ...createFilterSlice()(...args),
    ...createPaginationSlice()(...args),
    addCategory: addCategorySlice(...args),
    deleteCategory: deleteCategorySlice(...args),
    loadCategories: loadCategoriesSlice(...args),
    updateCategory: updateCategorySlice(...args),
});

// Create Store with a middleware for select and subscribe to store prop
export const useCategoriesStore = create<
    CategoriesBaseState & CategoryAsyncSlices
>()(
    subscribeWithSelector(combinedStore)
);

// Reload data when the page change
useCategoriesStore.subscribe(
    (state) => state.pagination.currentPage,
    () => {
        const state = useCategoriesStore.getState()
        state.loadCategories.run()
    }
)

// Reload data when type a search value
useCategoriesStore.subscribe(
    (state) => state.filters.search,
    (newSearch, prevSearch) => {
        const state = useCategoriesStore.getState()

        // Start search
        if (newSearch.trim() && !prevSearch.trim()) {
            state.pagination.prevPage = state.pagination.currentPage
            state.pagination.setCurrentPage(1)
        }

        // Input search cleared
        if (!newSearch.trim() && prevSearch.trim()) {
            state.pagination.setCurrentPage(state.pagination.prevPage)
        }

        state.loadCategories.run()
    }
)
