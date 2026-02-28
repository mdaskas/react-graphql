import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'

const GET_CUSTOMERS_FOR_LISTING: TypedDocumentNode<{
    customers: {
        id: number
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
        id: number
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

const CREATE_CUSTOMER: TypedDocumentNode<{
    createCustomer: {
        id: number
        code: string
        name: string
        email: string
        phone: string
    }
}> = gql`
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

const UPDATE_CUSTOMER: TypedDocumentNode<{
    updateCustomer: {
        id: number
        code: string
        name: string
        email: string
        phone: string
    }
}> = gql`
    mutation UpdateCustomer($id: ID!, $input: UpdateCustomerInput!) {
        updateCustomer(id: $id, input: $input) {
            id
            code
            name
            email
            phone
        }
    }
`

const GET_BILLING_TERMS: TypedDocumentNode<{
    billingTerms: {
        id: number
        code: string
        description: string
        dueDays: number
    }[]
}> = gql`
    query GetBillingTerms {
        billingTerms {
            id
            code
            description
            dueDays
        }
    }
`

const CREATE_BILLING_TERM: TypedDocumentNode<{
    billingTerms: {
        id: number
        code: string
        description: string
        dueDays: number
    }
}> = gql`
    mutation CreateBillingTerm($input: CreateBillingTermInput!) {
        createBillingTerm(input: $input) {
            id
            code
            description
            dueDays
        }
    }
`

const UPDATE_BILLING_TERM: TypedDocumentNode<{
    billingTerms: {
        id: number
        code: string
        description: string
        dueDays: number
    }
}> = gql`
    mutation UpdateBillingTerm($id: ID!, $input: UpdateBillingTermInput!) {
        updateBillingTerms(id: $id, input: $input) {
            id
            code
            description
            dueDays
        }
    }
`

const GET_SHIPPING_TERMS: TypedDocumentNode<{
    shippingTerms: { id: number; code: string; description: string }[]
}> = gql`
    query GetShippingTerms {
        shippingTerms {
            id
            code
            description
        }
    }
`

const CREATE_SHIPPING_TERM: TypedDocumentNode<{
    shippingTerms: { id: number; code: string; description: string }
}> = gql`
    mutation CreateShippingTerm($input: CreateShippingTermInput!) {
        createShippingTerm(input: $input) {
            id
            code
            description
        }
    }
`

const UPDATE_SHIPPING_TERM: TypedDocumentNode<{
    shippingTerms: { id: number; code: string; description: string }
}> = gql`
    mutation UpdateShippingTerm($id: ID!, $input: UpdateShippingTermInput!) {
        updateShippingTerm(id: $id, input: $input) {
            id
            code
            description
        }
    }
`

export default {
    GET_CUSTOMERS_FOR_LISTING,
    GET_CUSTOMERS_BY_ID,
    CREATE_CUSTOMER,
    UPDATE_CUSTOMER,
    GET_BILLING_TERMS,
    CREATE_BILLING_TERM,
    UPDATE_BILLING_TERM,
    GET_SHIPPING_TERMS,
    CREATE_SHIPPING_TERM,
    UPDATE_SHIPPING_TERM,
}
