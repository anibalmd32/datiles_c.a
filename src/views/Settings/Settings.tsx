import { ViewContainer } from "@/components/shared/ViewMisc/ViewContainer"
import { ViewTitle } from "@/components/shared/ViewMisc/ViewTitle"
import { Separator } from "@/components/ui/separator"
import { DynamicTabs } from "@/components/shared/DynamicTabs/DynamicTabs"
import { CategoriesTab } from "./tabs/CategoriesTab/CategoriesTab"
import { PaymentMethodsTab } from "./tabs/PaymentMethodsTab/PaymentMethodsTab"

export function Settings() {
    return (
        <ViewContainer>
            <ViewTitle titleValue="Configuraciones" />

            <Separator />

            <DynamicTabs
                items={[
                    {
                        label: 'Usuario',
                        value: 'user',
                        element: <div>Perfil de usuario</div>
                    },
                    {
                        label: 'Categorías',
                        value: 'categories',
                        element: <CategoriesTab />
                    },
                    {
                        label: 'Métodos de pago',
                        value: 'payment_methods',
                        element: <PaymentMethodsTab />
                    },
                ]}
            />
        </ViewContainer>
    )
}
