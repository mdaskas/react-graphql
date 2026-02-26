import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'

const GET_CUSTOMERS_FOR_LISTING: TypedDocumentNode<{
    customers: {
        id: string
        code: string
        name: string
        email: string
        phone: string
    }[]
}> = gql`
    query GetCustomersForListing {
        customers {
            id
            code
            name
            email
            phone
        }
    }
`

const GET_CUSTOMERS_BY_ID: TypedDocumentNode<{
    customers: {
        id: string
        code: string
        name: string
        email: string
        phone: string
    }
}> = gql`
    query GetCustomersById($ids: [ID!]!) {
        customers(ids: $ids) {
            id
            code
            name
            email
            phone
        }
    }
`

const CREATE_CUSTOMER = gql`
    mutation CreateCustomer($input: CreateCustomerInput!) {
        createCustomer(input: $input) {
            id
            code
            name
            email
            phone
        }
    }
`

const GET_BILLING_TERMS: TypedDocumentNode<{
    billingTerms: { id: string; code: string; description: string }[]
}> = gql`
    query GetBillingTerms {
        billingTerms {
            code
            description
        }
    }
`

const GET_SHIPPING_TERMS: TypedDocumentNode<{
    shippingTerms: { id: string; code: string; description: string }[]
}> = gql`
    query GetShippingTerms {
        shippingTerms {
            code
            description
        }
    }
`

export default {
    GET_CUSTOMERS_FOR_LISTING,
    GET_CUSTOMERS_BY_ID,
    CREATE_CUSTOMER,
    GET_BILLING_TERMS,
    GET_SHIPPING_TERMS,
}
