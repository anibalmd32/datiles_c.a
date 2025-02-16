import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type DynamicTabItems = {
  value: string;
  label: string;
  element: React.ReactNode;
};

type Props = {
  items: DynamicTabItems[];
};

export function DynamicTabs({ items }: Props) {
    return (
        <Tabs defaultValue={items[0].value}>
            <TabsList>
                {items.map((item, i) => {
                    return (
                        <TabsTrigger key={i} value={item.value}>
                            {item.label}
                        </TabsTrigger>
                    );
                })}
            </TabsList>
            {items.map((item, i) => {
                return (
                    <TabsContent key={i} value={item.value}>
                        {item.element}
                    </TabsContent>
                );
            })}
        </Tabs>
    );
}
