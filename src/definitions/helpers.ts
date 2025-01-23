export type PaginatedData<T> = {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    data: T;
}
