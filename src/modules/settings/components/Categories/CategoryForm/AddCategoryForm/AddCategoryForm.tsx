import { useAddCategory } from "./useAddCategoryForm";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { LoaderSpinner } from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { ArrowRightCircle } from "lucide-react";

export function AddCategoryForm() {
    const form = useAddCategory()

    return (
        <div>
            <Form {...form.addCategoryForm}>
                <form autoComplete="off" onSubmit={form.onSubmit} className="flex gap-2">
                    <FormField
                        control={form.addCategoryForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Agregar categoría"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {
                            form.addCategoryForm.formState.isSubmitting
                            ? <LoaderSpinner color="white"/>
                            : <ArrowRightCircle />
                        }
                    </Button>
                </form>
            </Form>
        </div>
    )
}
