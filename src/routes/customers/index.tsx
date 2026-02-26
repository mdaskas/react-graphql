import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

const GET_CUSTOMERS: TypedDocumentNode<{
    customers: { id: string; code: string; name: string; email: string }[]
}> = gql`
    query GetCustomers {
        customers {
            id
            code
            name
            email
        }
    }
`
export const Route = createFileRoute('/customers/')({
    component: Customers,
    loader: async ({ context }) => {
        const { apolloClient } = context
        const { data } = await apolloClient.query({
            query: GET_CUSTOMERS,
        })
        return data
    },
})

function Customers() {
    const { customers } = useLoaderData<any>({ from: '/customers/' })

    return (
        <div className="min-h-screen">
            <h1 style={{ color: 'white' }}>Customer Listing</h1>
            <div style={{ color: 'white' }}>
                <ul>
                    {customers.map(
                        (customer: {
                            id: string
                            code: string
                            name: string
                            email: string
                        }) => (
                            <li key={customer.id}>
                                <span>id: {customer.id}</span>
                                <strong className="mr-2 ml-2">
                                    {customer.code}:
                                </strong>{' '}
                                {customer.name} ({customer.email})
                            </li>
                        ),
                    )}
                </ul>
            </div>
        </div>
    )
}
