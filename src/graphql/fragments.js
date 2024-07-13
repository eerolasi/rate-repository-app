import { gql } from '@apollo/client'

export const CORE_REVIEW_FIELDS = gql`
  fragment CoreReviewFields on Review {
    id
    text
    rating
    createdAt
  }
`
export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    fullName
  }
`

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepositoryFields on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  }
`
