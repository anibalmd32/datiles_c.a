import * as ShadForm from "@/components/ui/form";
import { ProductFormType } from "../schemas/productSchema";
import { Control, ControllerRenderProps } from "react-hook-form";
import { useProductsForm } from "../hooks/useProductsForm";
import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { SelectOptions } from "@/components/shared/SelectOption/SelectOption";
import { useCategoriesStore } from "@/modules/settings/stores/categoriesStore";
// import { useMeasurementsStore } from "@/modules/settings/stores/measurementsStore";
import { IconButton } from "@/components/shared/IconButton/IconButton";
import { Save, RotateCcw } from "lucide-react";

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
    // const measurements = useMeasurementsStore((store) => store.measurements);
    const { form, onSubmit } = useProductsForm();

    return (
        <ShadForm.Form {...form}>
            <form
                onSubmit={onSubmit}
                className="space-y-6 p-6 bg-white rounded-lg shadow-md"
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
                                    options={categories.map((item) => ({
                                        label: item.name,
                                        value: String(item.id),
                                    }))}
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
                            label="Código"
                            control={form.control}
                            name="code"
                            render={(field) => (
                                <Input {...field} value={String(field.value)} />
                            )}
                        />
                        <div className="flex justify-between gap-4">
                            <FormField
                                label="Cantidad"
                                control={form.control}
                                name="quantity"
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
                            {/* <FormField
                                label="Unidad"
                                control={form.control}
                                name="unit_id"
                                render={(field) => (
                                    <SelectOptions
                                        onExternalChange={(value) => field.onChange(Number(value))}
                                        placeholder=""
                                        options={measurements.map((item) => ({
                                            label: item.name,
                                            value: String(item.id),
                                        }))}
                                    />
                                )}
                            /> */}
                        </div>
                    </div>
                </fieldset>

                {/* Precios de compra */}
                <fieldset className="border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
                    <legend className="px-2 text-xl font-medium text-gray-700 bg-white">
                        Precios
                    </legend>
                    <div className="flex flex-col md:flex-row gap-4">
                        <FormField
                            label="Precio de compra (USD)"
                            control={form.control}
                            name="purchase_usd"
                            render={(field) => (
                                <Input {...field} value={String(field.value)} />
                            )}
                        />
                        <FormField
                            label="Precio de venta (USD)"
                            control={form.control}
                            name="sale_usd"
                            render={(field) => (
                                <Input {...field} value={String(field.value)} />
                            )}
                        />
                    </div>
                </fieldset>

                {/* Botones de acción */}
                <div className="flex justify-center items-center gap-4">
                    <IconButton
                        Icon={RotateCcw}
                        text="Limpiar"
                        type="reset"
                        onClick={() => form.reset()}
                        className="bg-gray-200 text-black hover:bg-gray-300 px-4 py-2 rounded-md transition-colors"
                    />
                    <IconButton Icon={Save} text="Guardar" type="submit" />
                </div>
            </form>
        </ShadForm.Form>
    );
}
