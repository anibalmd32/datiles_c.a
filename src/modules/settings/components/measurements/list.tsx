import { useEffect } from "react";
import { useMeasurementsActions } from "../../actions/measurementActions";
import { useMeasurementsStore } from "../../stores/measurementsStore";

export const MeasurementUnitsDataList = () => {
    const { loadMeasurements } = useMeasurementsActions();
    const measurementUnitData = useMeasurementsStore(
        (store) => store.measurements,
    );

    useEffect(() => {
        loadMeasurements.run();
    }, []);

    return (
        <div>
            <ul>
                {measurementUnitData.length === 0 && (
                    <p>
            No se han agregado unidades de medida para este modo de
            almacenamiento
                    </p>
                )}
                {measurementUnitData.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};
