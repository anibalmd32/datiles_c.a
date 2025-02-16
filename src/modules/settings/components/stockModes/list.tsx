import { List, ListItem } from "@/components/shared/List/List";
import { BadgeX, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStockModeList } from "../../hooks/useStockModeList";
import { useStockModesStore } from "../../stores/stockModesStore";
import { useStockModeActions } from "../../actions/stockModeActions";
import { useEffect } from "react";

export function StockModeDataList() {
    const { deleteAction, editAction } = useStockModeList()
    const stockModeData = useStockModesStore(store => store.data)
    const { load } = useStockModeActions()

    useEffect(() => {
        load.run()
    }, [])

    return (
        <List>
            {stockModeData.length === 0 && (
                <p className="flex justify-center items-center gap-2 w-full m-auto">
                    <span>Sin Datos</span> <BadgeX />
                </p>
            )}
            {stockModeData.map((item) => {
                return (
                    <ListItem key={item.id}>
                        <div className="flex justify-between items-center">
                            <div className="font-semibold capitalize">
                                {item.name}
                            </div>
                            <div className="flex gap-2">
                                <Button size={'icon'} onClick={() => editAction(item)} variant={'outline'}>
                                    <Pencil
                                        className="text-blue-400 hover:scale-105 transition-all duration-150 cursor-pointer"
                                    />
                                </Button>
                                <Button size={'icon'} onClick={async () => deleteAction(item)} variant={'outline'}>
                                    <Trash
                                        className="text-red-400 hover:scale-105 transition-all duration-150 cursor-pointer"
                                    />
                                </Button>
                            </div>
                        </div>
                    </ListItem>
                )
            })}
        </List>
    )
}
