import * as Form from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAddPaymentMethodForm } from './useAddForm'
import { Button } from '@/components/ui/button'
import { LoaderSpinner } from '@/components/shared/LoaderSpinner/LoaderSpinner'
import { ArrowRightCircle } from 'lucide-react'

export function AddPaymentMethodForm() {
    const form = useAddPaymentMethodForm()

    return (
        <div className="w-full">
            <Form.Form {...form.paymentMethodForm}>
                <form
                    autoComplete='off'
                    className='flex justify-between gap-2 w-full'
                    onSubmit={form.handleSubmit}
                >
                    <Form.FormField
                        control={form.paymentMethodForm.control}
                        name='name'
                        render={({ field }) => (
                            <Form.FormItem className='w-full'>
                                <Form.FormControl>
                                    <Input
                                        autoComplete='off'
                                        placeholder='Agregar método de pago'
                                        {...field}
                                    />
                                </Form.FormControl>
                            </Form.FormItem>
                        )}
                    />
                    <Button type="submit">
                        {
                            form.paymentMethodForm.formState.isSubmitting
                            ? <LoaderSpinner color="white"/>
                            : <ArrowRightCircle />
                        }
                    </Button>
                </form>
            </Form.Form>
        </div>
    )
}
