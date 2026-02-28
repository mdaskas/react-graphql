import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import customerQueries from '@/queries/customer_quieries'

export const Route = createFileRoute('/customers/')({
    component: Customers,
    loader: async ({ context }) => {
        const { apolloClient } = context
        const { data } = await apolloClient.query({
            query: customerQueries.GET_CUSTOMERS_FOR_LISTING,
        })
        return data
    },
})

function Customers() {
    const { customers } = useLoaderData<any>({ from: '/customers/' })

    return (
        <div className="min-h-screen">
            <h1>Customer Listing</h1>
            <div>
                <ul>
                    {customers.map(
                        (customer: {
                            id: string
                            code: string
                            name: string
                            email: string
                            phone: string
                        }) => (
                            <li key={customer.id}>
                                <span>id: {customer.id}</span>
                                <strong className="mr-2 ml-2">
                                    {customer.code}:
                                </strong>{' '}
                                {customer.name} ({customer.email}) -{' '}
                                {customer.phone}
                            </li>
                        ),
                    )}
                </ul>
            </div>
        </div>
    )
}
