import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation authorize($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`
