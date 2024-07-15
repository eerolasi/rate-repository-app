import { gql } from '@apollo/client'
import {
  CORE_REVIEW_FIELDS,
  USER_FIELDS,
  CORE_REPOSITORY_FIELDS,
} from './fragments'

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...CoreRepositoryFields
        }
      }
    }
  }
`

export const GET_AUTHORIZED_USER = gql`
  ${CORE_REVIEW_FIELDS}
  ${USER_FIELDS}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      ...UserFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...CoreReviewFields
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  ${CORE_REVIEW_FIELDS}
  ${USER_FIELDS}
  ${CORE_REPOSITORY_FIELDS}
  query Repository($id: ID!, $first: Int!, $after: String) {
    repository(id: $id) {
      ...CoreRepositoryFields
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...CoreReviewFields
            user {
              ...UserFields
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`
