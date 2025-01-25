export type PaginatedData<T> = {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    data: T;
}

export type FilterState = {
    search: string;
    setSearch: (value: string) => void;
}
