import { useMutation, useQuery } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import customerQuieries from '../queries/customer_quieries'

const schema = z.object({
    code: z.string().min(1, 'Code is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.email('Enter a valid email address'),
    phone: z.string().optional(),
    billingTermsCode: z.string(),
    shippingTermsCode: z.string(),
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
            billingTermsCode: '',
            shippingTermsCode: '',
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

            {/* Code */}
            <div className="flex flex-col">
                <label htmlFor="code" className="mb-1 text-sm font-medium">
                    Code
                </label>
                <input
                    id="code"
                    type="text"
                    {...register('code', { required: 'Code is required' })}
                    className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
                {errors.code && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.code.message}
                    </span>
                )}
            </div>

            {/* Name */}
            <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-sm font-medium">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
                {errors.name && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                    </span>
                )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-sm font-medium">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email address',
                        },
                    })}
                    className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
                {errors.email && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </span>
                )}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
                <label htmlFor="phone" className="mb-1 text-sm font-medium">
                    Phone
                </label>
                <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
                {errors.phone && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.phone.message}
                    </span>
                )}
            </div>

            {/* Billing Terms */}
            <div className="flex flex-col">
                <label
                    htmlFor="billingTermsCode"
                    className="mb-1 text-sm font-medium"
                >
                    Billing Terms
                </label>
                <select
                    id="billingTermsCode"
                    {...register('billingTermsCode')}
                    className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                    {billingTerms?.map(
                        (term: { code: string; description: string }) => (
                            <option key={term.code} value={term.code}>
                                {term.code}: {term.description}
                            </option>
                        ),
                    )}
                </select>
                {errors.billingTermsCode && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.billingTermsCode.message}
                    </span>
                )}
            </div>

            {/* Shipping Terms */}
            <div className="flex flex-col">
                <label
                    htmlFor="shippingTermsCode"
                    className="mb-1 text-sm font-medium"
                >
                    Shipping Terms
                </label>
                <select
                    id="shippingTermsCode"
                    {...register('shippingTermsCode')}
                    className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                    {shippingTerms?.map(
                        (term: { code: string; description: string }) => (
                            <option key={term.code} value={term.code}>
                                {term.code}: {term.description}
                            </option>
                        ),
                    )}
                </select>
                {errors.shippingTermsCode && (
                    <span className="mt-1 text-sm text-red-500">
                        {errors.shippingTermsCode.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none"
            >
                Create Customer
            </button>
        </form>
    )
}
