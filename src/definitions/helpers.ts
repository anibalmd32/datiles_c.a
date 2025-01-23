export type PaginatedData<T> = {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    data: T;
}

export type PaginationState = {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
}

export type FilterState = {
    search: string;
    setSearch: (value: string) => void;
}
