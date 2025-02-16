import { StockModeData, StockMode } from "@/definitions/data"
import { useAsyncExecute } from "@/hooks/useAsyncExecute"
import { useStockModesStore } from "../stores/stockModesStore"
import { TABLES } from "@/definitions/enums"
import { Model } from "@/lib/queryBuilder/Model"
import { useEffect } from "react"

export const useStockModeActions = () => {
    const load = useAsyncExecute<StockModeData>({
        execute: async () => {
            const { pagination, filters } = useStockModesStore.getState()

            const model = new Model<StockModeData>(TABLES.STOCK_MODE)

            const data = await model.select({
                filters: [{ column: 'name', operator: 'like', value: '?' }],
                order: 'DESC',
                pagination: { size: '?', skip: '?' },
            }, [
                filters.search,
                pagination.pageSize,
                (pagination.currentPage - 1) * pagination.pageSize
            ])

            const total = await model.count({
                where: [{ column: 'name', operator: 'like', value: '?' }]
            }, [filters.search,])

            const totalPages = Math.ceil(total / pagination.pageSize);

            useStockModesStore.setState((state) => ({
                ...state,
                data: [...data],
                pagination: {
                    ...state.pagination,
                    totalPages
                }
            }))
        }
    })

    const add = useAsyncExecute<StockMode>({
        execute: async (values) => {
            if (values) {
                const model = new Model<StockMode>(TABLES.STOCK_MODE)
                await model.create(
                    { name: '?', },
                    [values.name]
                )
            }
        }
    })

    const remove = useAsyncExecute<StockModeData>({
        execute: async (values) => {
            if (values) {
                const model = new Model<StockModeData>(TABLES.STOCK_MODE)
                await model.delete({ id: values.id })
            }
        }
    })

    const update = useAsyncExecute<StockModeData>({
        execute: async (values) => {
            if (values) {
                const model = new Model<StockModeData>(TABLES.STOCK_MODE)
                await model.update({
                    data: { name: '?' },
                    id: '?'
                }, [values.name, values.id])

                useStockModesStore.setState((prev) => ({
                    ...prev,
                    data: [...prev.data.map(paymentMethod => {
                        if (paymentMethod.id === values.id) {
                            return {...paymentMethod, name: values.name}
                        } else {
                            return {...paymentMethod}
                        }
                    })]
                }))
            }
        }
    })

    useEffect(() => {
        const unsubscribe = useStockModesStore.subscribe(
            (state) => state.pagination.currentPage,
            () => load.run()
        )

        return () => {
            unsubscribe();
        };
    }, [])

    useEffect(() => {
        const unsubscribe = useStockModesStore.subscribe(
            (state) => state.filters.search,
            (newSearch, prevSearch) => {
                const state = useStockModesStore.getState()

                // Start search
                if (newSearch.trim() && !prevSearch.trim()) {
                    state.pagination.prevPage = state.pagination.currentPage
                    state.pagination.setCurrentPage(1)
                }

                // Input search cleared
                if (!newSearch.trim() && prevSearch.trim()) {
                    state.pagination.setCurrentPage(state.pagination.prevPage)
                }

                load.run()
            }
        )

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (add.finished && add.success && !add.loading) {
            load.run()
            add.reset()
        }
    }, [add.finished])

    useEffect(() => {
        if (remove.finished && remove.success && !remove.loading) {
            load.run()
            remove.reset()
        }
    }, [remove.finished])

    return {
        load,
        add,
        update,
        remove,
    }
}
