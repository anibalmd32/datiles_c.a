// React
import { useEffect } from "react";

// Zustand
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Tauri db plugin
import Database from '@tauri-apps/plugin-sql'

// Libs
import { useAsyncExecute } from "@/hooks/useAsyncExecute";
import { createPaginationSlice, PaginationState } from "@/lib/paginationSlice";
import { createFilterSlice, FilterState } from "@/lib/filtersSlice";

// Data Definition
import { MeasurementUnit, MeasurementUnitData } from "@/definitions/data";

// State Definition
type StoreState = {
    measurements: MeasurementUnitData[]
    pagination: PaginationState;
    filters: FilterState
}

// Store instance
export const useMeasurementsStore = create<StoreState>()(
    subscribeWithSelector((...a) => ({
        measurements: [],
        ...createFilterSlice()(...a),
        ...createPaginationSlice()(...a)
    }))
)

// Async actions that mutate the store
export const useMeasurementsActions = () => {
    const loadMeasurements = useAsyncExecute<MeasurementUnit>({
        execute: async () => {
            const db = await Database.load('sqlite:datiles.db')
            const { pagination, filters } = useMeasurementsStore.getState()

            let countSql = `
                SELECT COUNT(*) AS total
                FROM measurement_units;
            `
            let countParams: Array<string | number> = []

            let selectSql = `
                SELECT *
                FROM measurement_units
                ORDER BY id DESC
                LIMIT ? OFFSET ?;
            `
            let selectParams: Array<string | number> = [
                pagination.pageSize,
                (pagination.currentPage - 1) * pagination.pageSize
            ]

            if (filters.search?.trim()) {
                const searchValue = filters.search.replace(/[%_]/g, "\\$&");

                countSql = `
                    SELECT COUNT(*) AS total
                    FROM measurement_units
                    WHERE name LIKE '%' || ? || '%';
                `
                countParams = [searchValue]

                selectSql = `
                    SELECT *
                    FROM measurement_units
                    WHERE name LIKE '%' || ? || '%'
                    ORDER BY id DESC
                    LIMIT ? OFFSET ?;
                `
                selectParams = [
                    searchValue,
                    pagination.pageSize,
                    (pagination.currentPage - 1) * pagination.pageSize
                ]
            }

            const [totalDataStoredRows] = await db.select<Array<{ total: number }>>(
                countSql,
                countParams
            )

            const totalPages = Math.ceil(totalDataStoredRows.total / pagination.pageSize);

            const paginatedData = await db.select<Array<MeasurementUnitData>>(
                selectSql,
                selectParams
            )

            useMeasurementsStore.setState((state) => ({
                ...state,
                measurements: [...paginatedData],
                pagination: {
                    ...state.pagination,
                    totalPages
                }
            }))
        }
    })

    const addMeasurement = useAsyncExecute<MeasurementUnit>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')
                await db.execute(
                    'INSERT INTO measurement_units (name) VALUES (?)',
                    [values.name]
                )
            }
        }
    })

    const deleteMeasurement = useAsyncExecute<MeasurementUnitData>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')

                await db.execute(
                    'DELETE FROM measurement_units WHERE id = ?',
                    [values.id]
                )
            }
        }
    })

    const updateMeasurement = useAsyncExecute<MeasurementUnitData>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')
                const state = useMeasurementsStore.getState().measurements

                const queryResult = await db.execute(
                    'UPDATE measurement_units SET name = ? WHERE id = ?;',
                    [values.name, values.id]
                )

                if (queryResult.rowsAffected >= 1) {
                    useMeasurementsStore.setState((prev) => ({
                        ...prev,
                        measurements: [...state.map(item => {
                            if (item.id === values.id) {
                                return {...item, name: values.name}
                            } else {
                                return {...item}
                            }
                        })]
                    }))
                }
            }
        }
    })

    useEffect(() => {
        const unsubscribe = useMeasurementsStore.subscribe(
            (state) => state.pagination.currentPage,
            () => {
                loadMeasurements.run()
            }
        )

        return () => {
            unsubscribe();
        };
    }, [])

    useEffect(() => {
        const unsubscribe = useMeasurementsStore.subscribe(
            (state) => state.filters.search,
            (newSearch, prevSearch) => {
                const state = useMeasurementsStore.getState()

                // Start search
                if (newSearch.trim() && !prevSearch.trim()) {
                    state.pagination.prevPage = state.pagination.currentPage
                    state.pagination.setCurrentPage(1)
                }

                // Input search cleared
                if (!newSearch.trim() && prevSearch.trim()) {
                    state.pagination.setCurrentPage(state.pagination.prevPage)
                }

                loadMeasurements.run()
            }
        )

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (addMeasurement.finished && addMeasurement.success && !addMeasurement.loading) {
            loadMeasurements.run()
            addMeasurement.reset()
        }
    }, [addMeasurement.finished])

    useEffect(() => {
        if (deleteMeasurement.finished && deleteMeasurement.success && !deleteMeasurement.loading) {
            loadMeasurements.run()
            deleteMeasurement.reset()
        }
    }, [deleteMeasurement.finished])

    return {
        loadMeasurements,
        addMeasurement,
        updateMeasurement,
        deleteMeasurement
    }
}
