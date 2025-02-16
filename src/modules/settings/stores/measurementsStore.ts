import { create, StateCreator } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createPaginationSlice, PaginationState } from "@/lib/paginationSlice";
import { MeasurementUnitData } from "@/definitions/data";

// State Definition
type StoreState = {
  measurements: MeasurementUnitData[];
  pagination: PaginationState;
  filters: FilterState;
};

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

// Store instance
export const useMeasurementsStore = create<StoreState>()(
    subscribeWithSelector((...a) => ({
        measurements: [],
        ...createFilterSlice()(...a),
        ...createPaginationSlice()(...a),
    })),
);
