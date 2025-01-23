import React, { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ViewContainer } from "@/components/shared/ViewMisc/ViewContainer"
import { ViewTitle } from "@/components/shared/ViewMisc/ViewTitle"
import { Separator } from "@/components/ui/separator"
import { DynamicTabs } from "@/components/shared/DynamicTabs/DynamicTabs"

const CategoriesTab = React.lazy(() => import("../components/Categories/Categories"))
const PaymentMethodsTab = React.lazy(() => import("../components/PaymentMethods/PaymentMethods"))

export function IndexSettings() {
    return (
        <ViewContainer>
            <ViewTitle titleValue="Configuraciones" />
            <Separator />

            <DynamicTabs
                items={[
                    {
                        label: 'Categorías',
                        value: 'categories',
                        element: (
                            <Suspense fallback={<Skeleton className="w-full h-screen" />}>
                                <CategoriesTab />
                            </Suspense>
                        )
                    },
                    {
                        label: 'Métodos de pago',
                        value: 'payment_methods',
                        element: (
                            <Suspense fallback={<Skeleton className="w-full h-screen" />}>
                                <PaymentMethodsTab />
                            </Suspense>
                        )
                    }
                ]}
            />
        </ViewContainer>
    )
}
