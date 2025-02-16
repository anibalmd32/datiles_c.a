import { StateCreator } from "zustand";

export type FilterState = {
  search: string;
  setSearch: (value: string) => void;
};

export const createFilterSlice =
  (): StateCreator<
    { filters: FilterState },
    [],
    [],
    { filters: FilterState }
  > =>
      (set) => ({
          filters: {
              search: "",
              setSearch: (value) => {
                  set((state) => ({
                      ...state,
                      filters: {
                          ...state.filters,
                          search: value,
                      },
                  }));
              },
          },
      });
