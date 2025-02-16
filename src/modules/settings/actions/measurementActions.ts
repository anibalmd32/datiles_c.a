import { MeasurementUnit, MeasurementUnitData } from "@/definitions/data";
import { useAsyncExecute } from "@/hooks/useAsyncExecute";
import { useMeasurementsStore } from "../stores/measurementsStore";
import { TABLES } from "@/definitions/enums";
import { Model } from "@/lib/queryBuilder/Model";
import { useEffect } from "react";

export const useMeasurementsActions = () => {
    const loadMeasurements = useAsyncExecute<MeasurementUnit>({
        execute: async () => {
            const { pagination, filters } = useMeasurementsStore.getState();
            const model = new Model<MeasurementUnitData>(TABLES.MEASUREMENT_UNITS);
            const data = await model.select(
                {
                    filters: [{ column: "name", value: "?", operator: "like" }],
                    pagination: { size: "?", skip: "?" },
                    order: "DESC",
                },
                [
                    filters.search,
                    pagination.pageSize,
                    (pagination.currentPage - 1) * pagination.pageSize,
                ],
            );

            const total = await model.count(
                {
                    where: [{ column: "name", value: "?", operator: "like" }],
                },
                [filters.search],
            );

            const totalPages = Math.ceil(total / pagination.pageSize);

            useMeasurementsStore.setState((state) => ({
                ...state,
                measurements: [...data],
                pagination: {
                    ...state.pagination,
                    totalPages,
                },
            }));
        },
    });

    const addMeasurement = useAsyncExecute<MeasurementUnit>({
        execute: async (values) => {
            if (values) {
                const model = new Model<MeasurementUnit>(TABLES.MEASUREMENT_UNITS);
                await model.create({ name: "?", stock_mode_id: "?" }, [
                    values.name,
                    values.stock_mode_id,
                ]);
            }
        },
    });

    const deleteMeasurement = useAsyncExecute<MeasurementUnitData>({
        execute: async (values) => {
            if (values) {
                const model = new Model<MeasurementUnitData>(TABLES.MEASUREMENT_UNITS);
                await model.delete({ id: values.id });
            }
        },
    });

    const updateMeasurement = useAsyncExecute<MeasurementUnitData>({
        execute: async (values) => {
            if (values) {
                const model = new Model<MeasurementUnitData>(TABLES.MEASUREMENT_UNITS);
                const state = useMeasurementsStore.getState().measurements;

                await model.update(
                    {
                        data: { name: "?" },
                        id: "?",
                    },
                    [values.name, values.id],
                );

                useMeasurementsStore.setState((prev) => ({
                    ...prev,
                    measurements: [
                        ...state.map((item) => {
                            if (item.id === values.id) {
                                return { ...item, name: values.name };
                            } else {
                                return { ...item };
                            }
                        }),
                    ],
                }));
            }
        },
    });

    useEffect(() => {
        const unsubscribe = useMeasurementsStore.subscribe(
            (state) => state.pagination.currentPage,
            () => {
                loadMeasurements.run();
            },
        );

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = useMeasurementsStore.subscribe(
            (state) => state.filters.search,
            (newSearch, prevSearch) => {
                const state = useMeasurementsStore.getState();

                // Start search
                if (newSearch.trim() && !prevSearch.trim()) {
                    state.pagination.prevPage = state.pagination.currentPage;
                    state.pagination.setCurrentPage(1);
                }

                // Input search cleared
                if (!newSearch.trim() && prevSearch.trim()) {
                    state.pagination.setCurrentPage(state.pagination.prevPage);
                }

                loadMeasurements.run();
            },
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (
            addMeasurement.finished &&
      addMeasurement.success &&
      !addMeasurement.loading
        ) {
            loadMeasurements.run();
            addMeasurement.reset();
        }
    }, [addMeasurement.finished]);

    useEffect(() => {
        if (
            deleteMeasurement.finished &&
      deleteMeasurement.success &&
      !deleteMeasurement.loading
        ) {
            loadMeasurements.run();
            deleteMeasurement.reset();
        }
    }, [deleteMeasurement.finished]);

    return {
        loadMeasurements,
        addMeasurement,
        updateMeasurement,
        deleteMeasurement,
    };
};
