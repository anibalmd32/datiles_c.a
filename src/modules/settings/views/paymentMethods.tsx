import { AddPaymentMethodForm, EditPaymentMethodForm } from "../components/paymentMethods/forms";
import { SearchPaymentMethodsFilter } from "../components/paymentMethods/filters";
import { PaymentMethodsDataTable } from "../components/paymentMethods/table";
import { PaymentMethodsPagination } from "../components/paymentMethods/pagination";

export default function PaymentMethodsTab() {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex gap-2 justify-between">
                <SearchPaymentMethodsFilter />
                <AddPaymentMethodForm />
            </div>
            <div className="w-full flex flex-col justify-between gap-2 min-h-[500px]">
                <PaymentMethodsDataTable />
                <PaymentMethodsPagination />
            </div>

            <EditPaymentMethodForm />
        </div>
    )
}
