import { SearchStockMode } from "../components/stockModes/filters";
import { AddStockModeForm } from "../components/stockModes/forms";
import { StockModeDataList } from "../components/stockModes/list";
import { EditStockModeProvider } from "../hooks/useEditStockMode";
import { EditStockModeForm } from "../components/stockModes/forms";
import { StockModePagination } from "../components/stockModes/pagination";

export default function StockMode() {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex gap-2 justify-between">
                <SearchStockMode />
                <AddStockModeForm />
            </div>
            <div className="w-full flex flex-col justify-between gap-2 min-h-[420px]">
                <EditStockModeProvider>
                    <StockModeDataList />
                    <EditStockModeForm />
                </EditStockModeProvider>
                <StockModePagination />
            </div>
        </div>
    );
}
