import { StateCreator } from "zustand";

export type PaginationState = {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    prevPage: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
}

export const createPaginationSlice = (): StateCreator<
  { pagination: PaginationState },
  [],
  [],
  { pagination: PaginationState }
> => (set) => ({
  pagination: {
    currentPage: 1,
    pageSize: 5,
    prevPage: 1,
    totalPages: 0,
    setCurrentPage: (page) => {
      set((state) => ({
        pagination: {
          ...state.pagination,
          currentPage: page,
        },
      }));
    },
    setPageSize: (size) => {
      set((state) => ({
        pagination: {
          ...state.pagination,
          pageSize: size,
        },
      }));
    },
  },
});