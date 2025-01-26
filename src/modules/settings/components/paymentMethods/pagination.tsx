import { usePaymentMethods } from "../../Providers/PaymentMethodsProvider";
import { DataPagination } from "@/components/shared/DataTable/DataPagination";

export function PaymentMethodsPagination() {
    const { pagination: {
        currentPage,
        totalPages,
        setCurrentPage,
    }, loadPaymentMethods } = usePaymentMethods()

    return (
        <DataPagination
            currentPage={currentPage}
            isLoadingData={loadPaymentMethods.loading}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={totalPages}
        />
    )
}
