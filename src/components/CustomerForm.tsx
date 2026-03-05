import { useMutation, useQuery } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import customerQuieries from '../queries/customer_quieries'
import DM_Input from './forms/DM_Input'
import DM_Select from './forms/DM_Select'

const schema = z.object({
    code: z.string().min(1, 'Code is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.email('Enter a valid email address'),
    phone: z.string(),
    billingTermId: z.number(),
    shippingTermId: z.number(),
})

type CustomerFormSchema = z.infer<typeof schema>

export default function CustomerForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            code: '',
            name: '',
            email: '',
            phone: '',
            billingTermId: 1,
            shippingTermId: 1,
        },
    })

    const [createCustomer, { loading, error }] = useMutation(
        customerQuieries.CREATE_CUSTOMER,
    )

    const { billingTerms } = useQuery<any>(customerQuieries.GET_BILLING_TERMS)
        .data || {
        billingTerms: [],
    }
    const { shippingTerms } = useQuery<any>(customerQuieries.GET_SHIPPING_TERMS)
        .data || {
        shippingTerms: [],
    }

    const onSubmit: SubmitHandler<CustomerFormSchema> = (data) => {
        console.log(data)
        createCustomer({ variables: { input: { ...data } } })
    }

    if (loading) return <p>Adding customer...</p>
    if (error) return <p>{`Error : ${error.message}`}</p>

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-lg space-y-4 rounded-lg border border-gray-300 p-6"
        >
            <h1 className="text-2xl font-bold">Create Customer</h1>

            <DM_Input
                {...register('code')}
                label="Code"
                error={errors.code?.message}
            />

            <DM_Input
                {...register('name')}
                label="Name"
                error={errors.name?.message}
            />

            <DM_Input
                {...register('email')}
                type="email"
                label="Email"
                error={errors.email?.message}
            />

            <DM_Input
                {...register('phone')}
                type="tel"
                label="Phone"
                error={errors.phone?.message}
            />

            <DM_Select
                {...register('billingTermId', {
                    valueAsNumber: true,
                })}
                label="Billing Terms"
                options={
                    billingTerms?.map(
                        (term: {
                            id: number
                            code: string
                            description: string
                        }) => ({
                            value: term.id,
                            label: `${term.code}: ${term.description}`,
                        }),
                    ) ?? []
                }
                error={errors.billingTermId?.message}
            />

            <DM_Select
                {...register('shippingTermId', {
                    valueAsNumber: true,
                })}
                label="Shipping Terms"
                options={
                    shippingTerms?.map(
                        (term: {
                            id: number
                            code: string
                            description: string
                        }) => ({
                            value: term.id,
                            label: `${term.code}: ${term.description}`,
                        }),
                    ) ?? []
                }
                error={errors.shippingTermId?.message}
            />

            <button
                type="submit"
                className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none"
            >
                Create Customer
            </button>
        </form>
    )
}
