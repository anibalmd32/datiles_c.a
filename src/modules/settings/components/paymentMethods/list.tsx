import { usePaymentMethodsList } from "../../hooks/usePaymentMethodsList";
import { usePaymentMethods } from "../../Providers/PaymentMethodsProvider";
import { List, ListItem } from "@/components/shared/List/List";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BadgeX, Pencil, Trash } from "lucide-react";

export function PaymentMethodsDataList() {
    const { deleteAction, editAction, handleActivePaymentMethod } =
    usePaymentMethodsList();
    const { paymentMethods } = usePaymentMethods();

    return (
        <List>
            {paymentMethods.length === 0 && (
                <p className="flex justify-center items-center gap-2 w-full m-auto">
                    <span>Sin Datos</span> <BadgeX />
                </p>
            )}
            {paymentMethods.map((item) => {
                return (
                    <ListItem key={item.id}>
                        <div className="flex justify-between items-center">
                            <div className="font-semibold capitalize">{item.name}</div>
                            <div className="flex items-center gap-2">
                                <Switch
                                    defaultChecked={item.active}
                                    checked={item.active}
                                    onClick={async () => {
                                        handleActivePaymentMethod(item.id, !item.active);
                                    }}
                                />
                                <Button
                                    size={"icon"}
                                    onClick={() => editAction(item)}
                                    variant={"outline"}
                                >
                                    <Pencil className="text-blue-400 hover:scale-105 transition-all duration-150 cursor-pointer" />
                                </Button>
                                <Button
                                    size={"icon"}
                                    onClick={async () => deleteAction(item)}
                                    variant={"outline"}
                                >
                                    <Trash className="text-red-400 hover:scale-105 transition-all duration-150 cursor-pointer" />
                                </Button>
                            </div>
                        </div>
                    </ListItem>
                );
            })}
        </List>
    );
}
