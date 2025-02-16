import {
    AddMeasurementForm,
    EditMeasurementForm,
} from "../components/measurements/forms";
import { SearchMeasurementsFilter } from "../components/measurements/filters";
import { MeasurementsDataTable } from "../components/measurements/table";
import { MeasurementsPagination } from "../components/measurements/pagination";

export default function MeasurementsTab() {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex gap-2 justify-between">
                <SearchMeasurementsFilter />
                <AddMeasurementForm />
            </div>
            <div className="w-full flex flex-col justify-between gap-2 min-h-[500px]">
                <MeasurementsDataTable />
                <MeasurementsPagination />
            </div>

            <EditMeasurementForm />
        </div>
    );
}
