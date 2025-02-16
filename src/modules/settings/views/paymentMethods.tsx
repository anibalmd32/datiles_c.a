import {
    AddPaymentMethodForm,
    EditPaymentMethodForm,
} from "../components/paymentMethods/forms";
import { SearchPaymentMethodsFilter } from "../components/paymentMethods/filters";
import { PaymentMethodsDataList } from "../components/paymentMethods/list";
import { PaymentMethodsPagination } from "../components/paymentMethods/pagination";

export default function PaymentMethodsTab() {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex gap-2 justify-between">
                <SearchPaymentMethodsFilter />
                <AddPaymentMethodForm />
            </div>
            <div className="w-full flex flex-col justify-between gap-2 min-h-[420px]">
                <PaymentMethodsDataList />
                <PaymentMethodsPagination />
            </div>

            <EditPaymentMethodForm />
        </div>
    );
}
