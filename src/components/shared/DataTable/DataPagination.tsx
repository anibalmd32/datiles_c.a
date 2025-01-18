import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => Promise<void>;
};

export function DataPagination({
    currentPage,
    totalPages,
    onPageChange,
}: Props) {
    const [paginationItems, setPaginationItems] = useState<number[]>([]);
    const [page, setPage] = useState<number>(currentPage);
    const [visiblePages, setVisiblePages] = useState<number[]>([]);

    useEffect(() => {
        const itemsArr = Array.from({ length: totalPages }, (_, i) => i + 1);
        setPaginationItems(itemsArr);
    }, [totalPages]);

    useEffect(() => {
        if (paginationItems.length > 0) {
            const groupIndex = Math.floor((page - 1) / 3);
            const start = groupIndex * 3;
            const end = Math.min(start + 3, totalPages);
            setVisiblePages(paginationItems.slice(start, end));
        }
    }, [paginationItems, page, totalPages]);

    const handlePageChange = async (pageNumber: number) => {
        if (pageNumber !== page) {
            setPage(pageNumber);
            await onPageChange(pageNumber);
        }
    };

    if (totalPages === 1) return null

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem
                    className={`${
                        page === 1 ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-200"
                    } mr-2 p-2 rounded-sm transition-all duration-300 select-none`}
                    onClick={async () => {
                        if (page > 1) await handlePageChange(page - 1);
                    }}
                >
                    atrás
                </PaginationItem>

                {page > 3 && (
                    <>
                        <PaginationItem
                            className="py-1 px-4 border rounded-sm cursor-pointer hover:bg-gray-200 transition-all duration-300"
                            onClick={async () => await handlePageChange(1)}
                        >
                            1
                        </PaginationItem>
                        <PaginationEllipsis />
                    </>
                )}

                {visiblePages.map((item) => (
                    <PaginationItem
                        key={item}
                        onClick={async () => await handlePageChange(item)}
                        className={`py-1 px-4 border rounded-sm ${
                            page === item
                                ? "bg-primary text-secondary hover:text-black"
                                : ""
                        } cursor-pointer hover:bg-gray-200 transition-all duration-300`}
                    >
                        {item}
                    </PaginationItem>
                ))}

                {page <= totalPages - 3 && (
                    <>
                        <PaginationEllipsis />
                        <PaginationItem
                            className="py-1 px-4 border rounded-sm cursor-pointer hover:bg-gray-200 transition-all duration-300"
                            onClick={async () => await handlePageChange(totalPages)}
                        >
                            {totalPages}
                        </PaginationItem>
                    </>
                )}

                <PaginationItem
                    className={`${
                        page === totalPages
                            ? "cursor-not-allowed"
                            : "cursor-pointer hover:bg-gray-200"
                    } ml-2 p-2 rounded-sm transition-all duration-300 select-none`}
                    onClick={async () => {
                        if (page < totalPages) await handlePageChange(page + 1);
                    }}
                >
                    siguiente
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
