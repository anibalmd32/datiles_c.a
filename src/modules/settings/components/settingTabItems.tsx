import React, { ReactNode, Suspense } from "react"
import * as Card from '@/components/ui/card'
import { Skeleton } from "@/components/ui/skeleton"
import { DynamicTabItems } from "@/components/shared/DynamicTabs/DynamicTabs"

// Providers
import { CategoriesProvider } from "../Providers/CategoriesProvider"
import { PaymentMethodsProvider } from "../Providers/PaymentMethodsProvider"

// Lazy components
const CategoriesTab = React.lazy(() => import("../views/categories"))
const PaymentMethodsTab = React.lazy(() => import("../views/paymentMethods"))

const TabContentWrapper = ({
    children,
    description,
    title
}: {
    title: string;
    description: string;
    children: ReactNode;
}) => {
    return (
        <Card.Card className='md:max-w-xl'>
            <Card.CardHeader>
                <Card.CardTitle>
                    {title}
                </Card.CardTitle>
                <Card.CardDescription>
                    {description}
                </Card.CardDescription>
            </Card.CardHeader>

            <Card.CardContent className='space-y-2'>
                {children}
            </Card.CardContent>
        </Card.Card>
    )
}

const TabContentFallback = () => <Skeleton className='md:max-w-xl h-[400px]' />

export const SettingTabItems = () => {
    return [
        {
            label: 'Categorías',
            value: 'categories',
            element: (
                <TabContentWrapper
                    title="Lista de categorías"
                    description="Categorías que se le asignan a un producto para un mejor control"
                >
                    <Suspense fallback={<TabContentFallback />}>
                        <CategoriesProvider>
                            <CategoriesTab />
                        </CategoriesProvider>
                    </Suspense>
                </TabContentWrapper>
            )
        },
        {
            label: 'Métodos de pago',
            value: 'payment_methods',
            element: (
                <TabContentWrapper
                    title="Métodos de pago"
                    description="Métodos o medios mediante los cuales sus clientes pueden pagar al comprar sus productos"
                >
                    <Suspense fallback={<TabContentFallback />}>
                        <PaymentMethodsProvider>
                            <PaymentMethodsTab />
                        </PaymentMethodsProvider>
                    </Suspense>
                </TabContentWrapper>
            )
        },
        // {
        //     label: 'Medidas',
        //     value: 'measurements',
        //     element: (
        //         <TabContentWrapper
        //             title="Unidades de medida"
        //             description="Medidas para determinar la cantidad de sus productos"
        //         >
        //             <Suspense fallback={<TabContentFallback />}>
        //                 <MeasurementTab />
        //             </Suspense>
        //         </TabContentWrapper>
        //     )
        // }
    ] as DynamicTabItems[]
    
} 