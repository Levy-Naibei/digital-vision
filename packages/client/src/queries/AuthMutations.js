import { gql } from 'apollo-boost';

export const LOGIN = gql `
    mutation($email: String!, $password: String!) {
        Login(email: $email, password: $password) {
            token
        }
    }
`;

export const SIGNUP = gql `
    mutation($email: String!, $password: String!) {
        Signup(email: $email, password: $password) {
            message
        }
    }
`;
