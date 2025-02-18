import * as ShadForm from "@/components/ui/form";
import { ProductFormType } from "../schemas/productSchema";
import { Control, ControllerRenderProps } from "react-hook-form";
import { useProductsForm } from "../hooks/useProductsForm";
import { ReactNode, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    SelectOptionItem,
    SelectOptions,
} from "@/components/shared/SelectOption/SelectOption";
import {
    useCategoriesStore,
    useCategoryActions,
} from "@/modules/settings/stores/categoriesStore";
import { IconButton } from "@/components/shared/IconButton/IconButton";
import { Save, RotateCcw } from "lucide-react";
import { useStockModesStore } from "@/modules/settings/stores/stockModesStore";
import { useProductCalculates } from "../hooks/useCalculates";
import { useProductsActions } from "../stores/productsStore";
import { useAlert } from "@/hooks/useAlert";
import { useStockModeActions } from "@/modules/settings/actions/stockModeActions";

const FormField = ({
    control,
    name,
    label,
    render,
}: {
    name: keyof ProductFormType;
    control: Control<ProductFormType>;
    label: string;
    render: (field: ControllerRenderProps<ProductFormType>) => ReactNode;
}) => {
    return (
        <ShadForm.FormField
            control={control}
            name={name}
            render={({ field }) => (
                <ShadForm.FormItem className="w-full flex-1">
                    <ShadForm.FormLabel>{label}</ShadForm.FormLabel>
                    <ShadForm.FormControl>{render(field)}</ShadForm.FormControl>
                    <ShadForm.FormMessage />
                </ShadForm.FormItem>
            )}
        />
    );
};

export function ProductsForm() {
    const categories = useCategoriesStore((store) => store.categories);
    const stockModes = useStockModesStore((store) => store.data);
    const { form } = useProductsForm();
    const { addProducts } = useProductsActions();
    const { loadCategories } = useCategoryActions();
    const { load: loadStockMode } = useStockModeActions();
    const { emitErrorAlert, emitSuccessAlert } = useAlert();

    const {
        retailCost,
        wholesaleCost,
        retailSale,
        wholesaleSale,
        gainRetail,
        wholesaleGain,
    } = useProductCalculates();

    const [categoriesSelectOptions, setCategoriesSelectOptions] = useState<
        SelectOptionItem[]
    >([]);
    const [stockModesSelectOptions, setStockModesSelectOptions] = useState<
        SelectOptionItem[]
    >([]);
    const [measurementOptions, setMeasurementOptions] = useState<
        SelectOptionItem[]
    >([]);
    const [measurementName, setMeasurementName] = useState<string>("");
    const [isWholesale, setIsWholesale] = useState(false);
    const [calculatedValues, setCalculatedValues] = useState({
        retailCost: { usd: 0, bs: 0 },
        wholesaleCost: { usd: 0, bs: 0 },
        retailSale: { usd: 0, bs: 0 },
        wholesaleSale: { usd: 0, bs: 0 },
        gainRetail: { usd: 0, bs: 0 },
        wholesaleGain: { usd: 0, bs: 0 },
    });

    // Obtenemos los valores mediante form.watch para usarlos en los efectos
    const stockModeId = form.watch("stock_mode_id");
    const measurementUnitId = form.watch("measurement_unit_id");
    const purchaseUsd = form.watch("purchase_usd");
    const unitPerMeasurement = form.watch("unit_per_measurement");
    const quantity = form.watch("quantity");
    const iva = form.watch("iva");

    const resetFormAndState = async () => {
        form.reset(); // Resets the form using react-hook-form's reset function

        // Resets calculated values to their initial state.
        setCalculatedValues({
            retailCost: { usd: 0, bs: 0 },
            wholesaleCost: { usd: 0, bs: 0 },
            retailSale: { usd: 0, bs: 0 },
            wholesaleSale: { usd: 0, bs: 0 },
            gainRetail: { usd: 0, bs: 0 },
            wholesaleGain: { usd: 0, bs: 0 },
        });

        setMeasurementName("");
        setCategoriesSelectOptions([]);
        setStockModesSelectOptions([]);
        setMeasurementOptions([]);
        setIsWholesale(false); // or whatever your initial value is
        await loadCategories.run(); // Loads the categories from the database
        await loadStockMode.run(); // Loads the stock modes from the database
    };

    const onSubmit = form.handleSubmit(async (values) => {
        await addProducts.run(
            {
                onSuccess: () =>
                    emitSuccessAlert("Producto agregado con éxito"),
                onError: () => emitErrorAlert("Error al agregar producto"),
                onFinish: async () => await resetFormAndState(),
            },
            values,
        );
    });

    // useEffect for Stock Mode and Measurements (Combined and simplified)
    useEffect(() => {
        if (!stockModeId || !stockModes.length) return;

        const stockMode = stockModes.find(
            (item) => item.id === Number(stockModeId),
        );
        if (!stockMode) return;

        setIsWholesale(stockMode.name.toLocaleLowerCase().includes("al mayor")); // Clearer naming

        setMeasurementOptions(
            stockMode.measurements.map((item) => ({
                label: item.name,
                value: String(item.id),
            })),
        );

        if (measurementUnitId) {
            // Moved measurement name update inside this effect
            const measurement = stockMode.measurements.find(
                (item) => item.id === Number(measurementUnitId),
            );
            setMeasurementName(measurement?.name || ""); // Handle undefined case
        }
    }, [stockModeId, stockModes, measurementUnitId]);

    // useEffect for Calculations (Consolidated and more efficient)
    useEffect(() => {
        if (!purchaseUsd) return;

        const purchase = Number(purchaseUsd);

        if (unitPerMeasurement) {
            const unitPerMeas = Number(unitPerMeasurement);
            setCalculatedValues((prev) => ({
                ...prev,
                retailCost: retailCost(purchase, unitPerMeas),
                gainRetail: gainRetail(Number(iva), purchase, unitPerMeas),
                retailSale: retailSale(Number(iva), purchase, unitPerMeas),
            }));
        }

        if (quantity) {
            const qty = Number(quantity);
            setCalculatedValues((prev) => ({
                ...prev,
                wholesaleCost: wholesaleCost(purchase, qty),
                wholesaleSale: wholesaleSale(Number(iva), purchase, qty),
            }));
        }
    }, [
        purchaseUsd,
        unitPerMeasurement,
        quantity,
        iva,
        retailCost,
        wholesaleCost,
        retailSale,
        wholesaleSale,
        gainRetail,
    ]);

    useEffect(() => {
        setCalculatedValues((prev) => ({
            ...prev,
            wholesaleGain: wholesaleGain(
                calculatedValues.wholesaleCost.usd,
                calculatedValues.wholesaleSale.usd,
            ),
        }));
    }, [
        calculatedValues.wholesaleCost.usd,
        calculatedValues.wholesaleSale.usd,
        wholesaleGain,
    ]);

    useEffect(() => {
        if (categories.length > 0) {
            setCategoriesSelectOptions(
                categories.map((item) => ({
                    label: item.name,
                    value: String(item.id),
                })),
            );
        }
    }, [categories]);

    useEffect(() => {
        if (stockModes.length > 0) {
            setStockModesSelectOptions(
                stockModes.map((item) => ({
                    label: item.name,
                    value: String(item.id),
                })),
            );
        }
    }, [stockModes]);

    return (
        <ShadForm.Form {...form}>
            <form
                onSubmit={onSubmit}
                className="space-y-6 p-6 bg-white rounded-lg shadow-md"
                autoComplete="off"
            >
                {/* Información del producto */}
                <fieldset className="border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
                    <legend className="px-2 text-xl font-medium text-gray-700 bg-white">
                        Información del producto
                    </legend>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormField
                            label="Nombre"
                            control={form.control}
                            name="name"
                            render={(field) => (
                                <Input {...field} value={String(field.value)} />
                            )}
                        />
                        <FormField
                            label="Categoría"
                            control={form.control}
                            name="category_id"
                            render={(field) => (
                                <SelectOptions
                                    onExternalChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                    placeholder="Selecciona una categoría"
                                    options={categoriesSelectOptions}
                                />
                            )}
                        />
                        <FormField
                            label="IVA"
                            control={form.control}
                            name="iva"
                            render={(field) => (
                                <Input {...field} value={String(field.value)} />
                            )}
                        />
                        <FormField
                            label="Costo de compra (USD)"
                            control={form.control}
                            name="purchase_usd"
                            render={(field) => (
                                <Input {...field} value={String(field.value)} />
                            )}
                        />
                        <FormField
                            label="Código"
                            control={form.control}
                            name="code"
                            render={(field) => (
                                <Input {...field} value={String(field.value)} />
                            )}
                        />
                    </div>
                </fieldset>

                {/* Información del stock */}
                <fieldset className="border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
                    <legend className="px-2 text-xl font-medium text-gray-700 bg-white">
                        Información del stock
                    </legend>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormField
                            label="Modo de almacenamiento"
                            control={form.control}
                            name="stock_mode_id"
                            render={(field) => (
                                <SelectOptions
                                    onExternalChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                    placeholder="Seleccione el modo del almacenamiento"
                                    options={stockModesSelectOptions}
                                />
                            )}
                        />
                        <FormField
                            label="Unidad"
                            control={form.control}
                            name="measurement_unit_id"
                            render={(field) => (
                                <SelectOptions
                                    onExternalChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                    placeholder="Selecciona una unidad"
                                    options={measurementOptions}
                                />
                            )}
                        />
                        <FormField
                            label={`Cantidad de ${measurementName}`}
                            control={form.control}
                            name="quantity"
                            render={(field) => (
                                <Input
                                    {...field}
                                    value={Number(field.value)}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                    type="number"
                                />
                            )}
                        />
                        {isWholesale && (
                            <FormField
                                label={`Unidades por ${measurementName}`}
                                control={form.control}
                                name="unit_per_measurement"
                                render={(field) => (
                                    <Input
                                        {...field}
                                        value={Number(field.value)}
                                        onChange={(e) =>
                                            field.onChange(
                                                Number(e.target.value),
                                            )
                                        }
                                        type="number"
                                    />
                                )}
                            />
                        )}
                    </div>
                </fieldset>

                {/* Resumen de precios */}
                <fieldset className="border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
                    <legend className="px-2 text-xl font-medium text-gray-700 bg-white">
                        Resumen de precios
                    </legend>
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold">Costos</h2>
                            <p>
                                <span>Costo por mayor: </span>$
                                {calculatedValues.wholesaleCost.usd.toFixed(2)}{" "}
                                (Bs.{" "}
                                {calculatedValues.wholesaleCost.bs.toFixed(2)})
                            </p>
                            <p>
                                <span>Costo por detal: </span>$
                                {calculatedValues.retailCost.usd.toFixed(2)}{" "}
                                (Bs. {calculatedValues.retailCost.bs.toFixed(2)}
                                )
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Precios</h2>
                            <p>
                                <span>Precio de venta al mayor: </span>$
                                {calculatedValues.wholesaleSale.usd.toFixed(2)}{" "}
                                (Bs. {calculatedValues.retailSale.bs.toFixed(2)}
                                )
                            </p>
                            <p>
                                <span>Precio de venta al detal: </span>$
                                {calculatedValues.retailSale.usd.toFixed(2)}{" "}
                                (Bs. {calculatedValues.retailSale.bs.toFixed(2)}
                                )
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Ganancias</h2>
                            <p>
                                <span>Ganancia por mayor: </span>$
                                {calculatedValues.wholesaleGain.usd.toFixed(2)}{" "}
                                (Bs.{" "}
                                {calculatedValues.wholesaleGain.bs.toFixed(2)})
                            </p>
                            <p>
                                <span>Ganancia por detal: </span>$
                                {calculatedValues.gainRetail.usd.toFixed(2)}{" "}
                                (Bs. {calculatedValues.gainRetail.bs.toFixed(2)}
                                )
                            </p>
                        </div>
                    </div>
                </fieldset>

                {/* Botones de acción */}
                <div className="flex justify-center items-center gap-4">
                    <IconButton
                        Icon={RotateCcw}
                        text="Limpiar"
                        type="reset"
                        onClick={async () => await resetFormAndState()}
                        className="bg-gray-200 text-black hover:bg-gray-300 px-4 py-2 rounded-md transition-colors"
                    />
                    <IconButton Icon={Save} text="Guardar" type="submit" />
                </div>
            </form>
        </ShadForm.Form>
    );
}
