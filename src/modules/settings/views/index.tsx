import { ViewContainer } from "@/components/shared/ViewMisc/ViewContainer";
import { ViewTitle } from "@/components/shared/ViewMisc/ViewTitle";
import { Separator } from "@/components/ui/separator";
import { DynamicTabs } from "@/components/shared/DynamicTabs/DynamicTabs";
import { SettingTabItems } from "../components/settingTabItems";

export function IndexSettings() {
    return (
        <ViewContainer>
            <ViewTitle titleValue="Configuraciones" />

            <Separator />

            <DynamicTabs items={SettingTabItems()} />
        </ViewContainer>
    );
}
