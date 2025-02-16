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
  onPageChange: (pageNumber: number) => void;
  isLoadingData: boolean;
};

export function DataPagination({
    currentPage,
    totalPages,
    onPageChange,
    isLoadingData,
}: Props) {
    const [paginationItems, setPaginationItems] = useState<number[]>([]);
    const [visiblePages, setVisiblePages] = useState<number[]>([]);

    useEffect(() => {
        const itemsArr = Array.from({ length: totalPages }, (_, i) => i + 1);
        setPaginationItems(itemsArr);
    }, [totalPages]);

    useEffect(() => {
        if (paginationItems.length > 0) {
            const groupIndex = Math.floor((currentPage - 1) / 3);
            const start = groupIndex * 3;
            const end = Math.min(start + 3, totalPages);
            setVisiblePages(paginationItems.slice(start, end));
        }
    }, [paginationItems, currentPage, totalPages]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber !== currentPage) {
            onPageChange(pageNumber);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem
                    onClick={() => {
                        if (!isLoadingData && currentPage > 1) {
                            handlePageChange(currentPage - 1);
                        }
                    }}
                >
                    <button
                        disabled={isLoadingData}
                        className={`
                        mr-2 p-2 rounded-sm transition-all duration-300 select-none
                        ${
        currentPage === 1 || isLoadingData
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }  
                    `}
                    >
            atrás
                    </button>
                </PaginationItem>

                {currentPage > 3 && (
                    <>
                        <PaginationItem
                            className="py-1 px-4 border rounded-sm cursor-pointer hover:bg-gray-200 transition-all duration-300"
                            onClick={() => handlePageChange(1)}
                        >
              1
                        </PaginationItem>
                        <PaginationEllipsis />
                    </>
                )}

                {visiblePages.map((item) => (
                    <PaginationItem
                        key={item}
                        onClick={() => {
                            if (!isLoadingData) {
                                handlePageChange(item);
                            }
                        }}
                        className={`py-1 px-4 border rounded-sm ${
                            currentPage === item
                                ? "bg-primary text-secondary hover:text-black"
                                : ""
                        } cursor-pointer hover:bg-gray-200 transition-all duration-300`}
                    >
                        {item}
                    </PaginationItem>
                ))}

                {currentPage < totalPages - 2 && (
                    <>
                        <PaginationEllipsis />
                        <PaginationItem
                            className="py-1 px-4 border rounded-sm cursor-pointer hover:bg-gray-200 transition-all duration-300"
                            onClick={() => {
                                if (!isLoadingData) {
                                    handlePageChange(totalPages);
                                }
                            }}
                        >
                            {totalPages}
                        </PaginationItem>
                    </>
                )}

                <PaginationItem
                    onClick={() => {
                        if (!isLoadingData && currentPage < totalPages) {
                            handlePageChange(currentPage + 1);
                        }
                    }}
                >
                    <button
                        disabled={isLoadingData}
                        className={`
                            ${
        currentPage === totalPages || isLoadingData
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }
                            ml-2 p-2 rounded-sm transition-all duration-300 select-none
                        `}
                    >
            siguiente
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
