import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import customerQuieries from '../queries/customer_quieries'

export const Route = createFileRoute('/billingTerms')({
    component: BillingTerms,
    loader: async ({ context }) => {
        const { apolloClient } = context
        const { data } = await apolloClient.query({
            query: customerQuieries.GET_BILLING_TERMS,
        })
        return data
    },
})

function BillingTerms() {
    const { billingTerms } = useLoaderData<any>({ from: '/billingTerms' })

    return (
        <div className="min-h-screen">
            <h1>Billing Terms</h1>
            <div>
                <ul>
                    {billingTerms.map(
                        (term: { code: string; description: string }) => (
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
