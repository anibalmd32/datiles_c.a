import { MeasurementUnit, MeasurementUnitData } from "@/definitions/data";
import { useAsyncExecute } from "@/hooks/useAsyncExecute";
import { TABLES } from "@/definitions/enums";
import { Model } from "@/lib/queryBuilder/Model";
import { useEffect } from "react";
import { useStockModeActions } from "./stockModeActions";

export const useMeasurementsActions = () => {
    const { load } = useStockModeActions();

    const addMeasurement = useAsyncExecute<MeasurementUnit>({
        execute: async (values) => {
            if (values) {
                const model = new Model<MeasurementUnit>(
                    TABLES.MEASUREMENT_UNITS,
                );
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
                const model = new Model<MeasurementUnitData>(
                    TABLES.MEASUREMENT_UNITS,
                );
                await model.delete({ id: values.id });
            }
        },
    });

    const updateMeasurement = useAsyncExecute<MeasurementUnitData>({
        execute: async (values) => {
            if (values) {
                const model = new Model<MeasurementUnitData>(
                    TABLES.MEASUREMENT_UNITS,
                );

                await model.update(
                    {
                        data: { name: "?" },
                        id: "?",
                    },
                    [values.name, values.id],
                );
            }
        },
    });

    useEffect(() => {
        if (
            addMeasurement.finished &&
            addMeasurement.success &&
            !addMeasurement.loading
        ) {
            load.run();
            load.reset();
        }
    }, [addMeasurement.finished]);

    useEffect(() => {
        if (
            deleteMeasurement.finished &&
            deleteMeasurement.success &&
            !deleteMeasurement.loading
        ) {
            load.run();
            load.reset();
        }
    }, [deleteMeasurement.finished]);

    useEffect(() => {
        if (
            updateMeasurement.finished &&
            updateMeasurement.success &&
            !updateMeasurement.loading
        ) {
            load.run();
            load.reset();
        }
    }, [updateMeasurement.finished]);

    return {
        addMeasurement,
        updateMeasurement,
        deleteMeasurement,
    };
};
