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

const TabContentFallback = () => <Skeleton className='md:max-w-xl h-[400px]' />

export const settingTabItems: DynamicTabItems[] = [
    {
        label: 'Categorías',
        value: 'categories',
        element: (
            <TabContentWrapper
                title="Lista de categorías"
                description="Categorías que se le asignan a un producto para un mejor control"
            >
                <Suspense fallback={<TabContentFallback />}>
                    <CategoriesTab />
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
                    <PaymentMethodsTab />
                </Suspense>
            </TabContentWrapper>
        )
    },
    {
        label: 'Medidas',
        value: 'measurements',
        element: (
            <TabContentWrapper
                title="Unidades de medida"
                description="Medidas para determinar la cantidad de sus productos"
            >
                <Suspense fallback={<TabContentFallback />}>
                    <MeasurementTab />
                </Suspense>
            </TabContentWrapper>
        )
    }
]
