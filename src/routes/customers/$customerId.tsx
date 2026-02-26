import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

const GET_CUSTOMER_BY_ID: TypedDocumentNode<
  { customer: { id: string; code: string; name: string; email: string } },
  { id: string }
> = gql`
  query GetCustomerById($id: ID!) {
    customer(id: $id) {
      id
      code
      name
      email
    }
  }
`

export const Route = createFileRoute('/customers/$customerId')({
  component: Customer,
  loader: async ({ context, params }) => {
    const { apolloClient } = context
    const { customerId } = params
    console.log('** customerId', customerId)
    const { data } = await apolloClient.query({
      query: GET_CUSTOMER_BY_ID,
      variables: { id: customerId },
    })
    return data
  },
})

function Customer() {
  const { customer } = useLoaderData<any>({ from: '/customers/$customerId' })

  return (
    <div>
      <h2>Customer Detail</h2>
      <p>id: {customer.id}</p>
      <p>code: {customer.code}</p>
      <p>name: {customer.name}</p>
      <p>email: {customer.email}</p>
    </div>
  )
}
