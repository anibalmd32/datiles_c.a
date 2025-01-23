import { useState } from "react"

export const useCategoryFilter = () => {
    const [searchFilterValue, setSearchFilterValue] = useState<string>('')

    const handleSearch = (value: string) => setSearchFilterValue(value)

    return {
        searchFilterValue,
        handleSearch,
    }
}