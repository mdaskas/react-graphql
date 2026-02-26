import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import customerQuieries from '../queries/customer_quieries'

export const Route = createFileRoute('/shippingTerms')({
    component: ShippingTerms,
    loader: async ({ context }) => {
        const { apolloClient } = context
        const { data } = await apolloClient.query({
            query: customerQuieries.GET_SHIPPING_TERMS,
        })
        return data
    },
})

function ShippingTerms() {
    const { shippingTerms } = useLoaderData<any>({ from: '/shippingTerms' })

    return (
        <div className="min-h-screen">
            <h1>Shipping Terms</h1>
            <div>
                <ul>
                    {shippingTerms.map(
                        (term: {
                            id: string
                            code: string
                            description: string
                        }) => (
                            <li key={term.code}>
                                <strong>{term.code}: </strong>{' '}
                                {term.description}
                            </li>
                        ),
                    )}
                </ul>
            </div>
        </div>
    )
}
