import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useProductForm } from "./useProductForm";
import { SelectOptions } from "@/components/shared/SelectOption/SelectOption";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProductForm() {
    const {
        categoriesOptions,
        form,
        handleSubmit
    } = useProductForm()

    return (
        <div className="bg-primary p-6 md:max-w-xl m-auto mt-10 rounded-sm">
            <div className="bg-secondary p-4 rounded-sm">
                <h2 className="text-xl font-bold mb-4 text-center">Complete los campos para agregar un nuevo producto a su inventario</h2>
                <Form {...form}>
                    <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Nombre
                                        </FormLabel>
                                        <FormDescription>
                                            Introduzca el nombre exacto del producto
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                placeholder="Ejemplo: Harina Pan"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="category_id"
                            render={() => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Categoría
                                        </FormLabel>
                                        <FormDescription>
                                            Seleccione la categoría en la que desea ubicar este producto
                                        </FormDescription>
                                        <FormControl>
                                            <SelectOptions
                                                options={categoriesOptions}
                                                onExternalChange={(value) => {
                                                    form.setValue('category_id', Number(value))
                                                }}
                                                placeholder=""
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="purchase_usd"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Precio de compra (Dolares)
                                        </FormLabel>
                                        <FormDescription>
                                            Introduzca el precio del costo del producto en dolares
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                placeholder="Ejemplo: 3,99"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="purchase_bs"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Precio de compra (Bolivares)
                                        </FormLabel>
                                        <FormDescription>
                                            Introduzca el precio del costo del producto en bolivares
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ejemplo: 4491,20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="sale_usd"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Precio de venta (Dolares)
                                        </FormLabel>
                                        <FormDescription>
                                            Introduzca el precio de venta del producto en dolares
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ejemplo: 3,99"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="sale_bs"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Precio de venta (Bolivares)
                                        </FormLabel>
                                        <FormDescription>
                                            Introduzca el precio de venta del producto en bolivares
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ejemplo: 4491,20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Código
                                        </FormLabel>
                                        <FormDescription>
                                            El código del producto se auto genera en base al nombre y la categoría
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                disabled
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <div className="w-full flex gap-4 justify-center md:justify-end">
                            <Button type="reset" onClick={() => {
                                form.reset()
                            }}>Reiniciar Formulario</Button>
                            <Button type="submit">Agregar Producto</Button>
                        </div>
                    </form>
                </Form>

            </div>
        </div>
    )
}