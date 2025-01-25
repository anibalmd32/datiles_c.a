import React, { ReactNode, Suspense } from "react"
import * as Card from '@/components/ui/card'
import { Skeleton } from "@/components/ui/skeleton"
import { DynamicTabItems } from "@/components/shared/DynamicTabs/DynamicTabs"

// Lazy components
const CategoriesTab = React.lazy(() => import("./Categories/Categories"))
const PaymentMethodsTab = React.lazy(() => import("./PaymentMethods/PaymentMethods"))
const MeasurementTab = React.lazy(() => import("./Measurements/Measurements"))

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

const TabContentFallback = () => <Skeleton className='md:max-w-xl h-full' />

export const settingTabItems: DynamicTabItems[] = [
    {
        label: 'Categorías',
        value: 'categories',
        element: (
            <Suspense fallback={<TabContentFallback />}>
                <TabContentWrapper
                    title="Lista de categorías"
                    description="Categorías que se le asignan a un producto para un mejor control"
                >
                    <CategoriesTab />
                </TabContentWrapper>
            </Suspense>
        )
    },
    {
        label: 'Métodos de pago',
        value: 'payment_methods',
        element: (
            <Suspense fallback={<TabContentFallback />}>
                <TabContentWrapper
                    title="Métodos de pago"
                    description="Métodos o medios mediante los cuales sus clientes pueden pagar al comprar sus productos"
                >
                    <PaymentMethodsTab />
                </TabContentWrapper>
            </Suspense>
        )
    },
    {
        label: 'Medidas',
        value: 'measurements',
        element: (
            <Suspense fallback={<TabContentFallback />}>
                <TabContentWrapper
                    title="Unidades de medida"
                    description="Medidas para determinar la cantidad de sus productos"
                >
                    <MeasurementTab />
                </TabContentWrapper>
            </Suspense>
        )
    }
]
