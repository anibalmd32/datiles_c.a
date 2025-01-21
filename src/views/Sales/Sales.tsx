import { ViewContainer } from "@/components/shared/ViewMisc/ViewContainer"
import { ViewTitle } from "@/components/shared/ViewMisc/ViewTitle"
import { IconButton } from "@/components/shared/IconButton/IconButton"
import { SearchInput } from "@/components/shared/SearchInput/SearchInput"
import { SelectOptions } from "@/components/shared/SelectOption/SelectOption"
import { DateRangePicker } from "@/components/shared/DateRangePicker/DateRangePicker"
import { Separator } from "@/components/ui/separator"
import { DataPagination } from "@/components/shared/DataTable/DataPagination"
import { Plus } from 'lucide-react'
import { useSales } from "./useSales"


export function Sales() {
    const {
        handleSearchSale,
        searchSale,
        handleSelectFilter,
        selectOptionItems,
        handleRangeFilter,
    } = useSales()

    return (
        <ViewContainer>
            <div className="w-full flex justify-between">
                <ViewTitle titleValue="Ventas" />
                <IconButton
                    text="Nueva venta"
                    Icon={Plus}
                />
            </div>

            <Separator />

            <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="flex-1">
                    <SearchInput
                        onExternalChange={(e) => {
                            handleSearchSale(e.target.value)
                        }}
                        placeholder="Buscar factura"
                        value={searchSale}
                    />

                </div>
                <div className="flex-3">
                    <SelectOptions
                        options={selectOptionItems}
                        onExternalChange={(v) => {
                            handleSelectFilter(Number(v))
                        }}
                        placeholder="Categorías"
                    />
                </div>
                <div className="flex-3">
                    <DateRangePicker onExternalSelect={async ({ from, to }) => {
                        await handleRangeFilter({ from, to })
                    }} />
                </div>
            </div>

            <div>
                {/* <DataTable cols={cols} rows={rows} loading={false} /> */}
                <DataPagination
                    currentPage={1}
                    onPageChange={async (pageNumber) => {
                        console.log('cambiando a la pagina:', pageNumber)
                    }}
                    totalPages={1}
                />
            </div>
        </ViewContainer>
    )
}
