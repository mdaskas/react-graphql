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
    billingTerms: { code: string; description: string }[]
}> = gql`
    query GetBillingTerms {
        billingTerms {
            code
            description
            dueDays
        }
    }
`

const CREATE_BILLING_TERM: TypedDocumentNode<{
    billingTerms: { code: string; description: string; dueDays: number }
}> = gql`
    mutation CreateBillingTerms($input: CreateBillingTermsInput!) {
        createBillingTerms(input: $input) {
            code
            description
            dueDays
        }
    }
`

const UPDATE_BILLING_TERM: TypedDocumentNode<{
    billingTerms: { code: string; description: string; dueDays: number }
}> = gql`
    mutation UpdateBillingTerms($code: ID!, $input: UpdateBillingTermsInput!) {
        updateBillingTerms(code: $code, input: $input) {
            code
            description
            dueDays
        }
    }
`

const GET_SHIPPING_TERMS: TypedDocumentNode<{
    shippingTerms: { code: string; description: string }[]
}> = gql`
    query GetShippingTerms {
        shippingTerms {
            code
            description
        }
    }
`

const CREATE_SHIPPING_TERM: TypedDocumentNode<{
    shippingTerms: { code: string; description: string }
}> = gql`
    mutation CreateShippingTerm($input: CreateShippingTermsInput!) {
        createShippingTerms(input: $input) {
            code
            description
        }
    }
`

const UPDATE_SHIPPING_TERM: TypedDocumentNode<{
    shippingTerms: { code: string; description: string }
}> = gql`
    mutation UpdateShippingTerms(
        $code: ID!
        $input: UpdateShippingTermsInput!
    ) {
        updateShippingTerms(code: $code, input: $input) {
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
    CREATE_BILLING_TERM,
    UPDATE_BILLING_TERM,
    GET_SHIPPING_TERMS,
    CREATE_SHIPPING_TERM,
    UPDATE_SHIPPING_TERM,
}
