import { useState } from "react"

export const useCategoryFilters = () => {
    const [searchFilter, setSearchFilter] = useState<string>('')

    const handleSearchFilter = (value: string) => {
        setSearchFilter(value)
    }

    return {
        searchFilter,
        handleSearchFilter
    }
}