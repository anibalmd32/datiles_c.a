export type PaginatedData<T> = {
    totalPages: number;
    currentPage: number;
    nextPage: number;
    prevPage: number;
    pageSize: number;
    data: T;
}
