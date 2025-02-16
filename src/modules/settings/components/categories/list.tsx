import { useCategoriesList } from "../../hooks/useCategoriesList";
import { List, ListItem } from "@/components/shared/List/List";
import { BadgeX, Pencil, Trash } from "lucide-react";
import { useCategories } from "../../Providers/CategoriesProvider";
import { Button } from "@/components/ui/button";

export function CategoriesDataList() {
    const { deleteAction, editAction } = useCategoriesList();
    const { categories } = useCategories();

    return (
        <List>
            {categories.length === 0 && (
                <p className="flex justify-center items-center gap-2 w-full m-auto">
                    <span>Sin Datos</span> <BadgeX />
                </p>
            )}
            {categories.map((item) => {
                return (
                    <ListItem key={item.id}>
                        <div className="flex justify-between items-center">
                            <div className="font-semibold capitalize">{item.name}</div>
                            <div className="flex gap-2">
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
